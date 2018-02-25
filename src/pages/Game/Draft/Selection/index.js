import React from 'react';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { some, filter } from 'lodash';
import { toast } from 'react-toastify';
import { denormalize } from 'normalizr';
import { translate } from 'react-i18next';
import ReactDOMServer from 'react-dom/server';

import { groupListSchema } from '../../../../schemas/group';
import { routes } from '../../../../helpers/routes';
import { failSelectDraftTeam, selectDraftTeam, successSelectDraftTeam } from '../../../../actions/entities/game/draft';
import { getName } from '../../../../helpers/user';

import './Selection.scss';
import AddOn from '../../../../components/Game/Draft/AddOn';
import Group from '../../../../components/Group';

const groupsIds = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

class DraftSelection extends React.Component {
    handleSelect(team, group, e) {
        if (e) { e.preventDefault(); }
        const { dispatch, game, t } = this.props;

        const canSelect = true;

        if (!canSelect) {
            toast.error(t('toast:hacker'), { position: toast.POSITION.BOTTOM_RIGHT });
            return false;
        }

        const groupStage = true;
        const groupText = t('page:Game.Draft.Selection.select.swal.group', { group: group.id });

        const html = (
            <div className="swal2-html">
                <i className={`flag-icon flag-icon-${team.flagIcon}`} />
                {groupStage && <p className="mt-3 mb-0">{groupText}</p>}
            </div>
        );

        swal({
            title: t('page:Game.Draft.Selection.select.swal.title', { choice: team.id }),
            html: ReactDOMServer.renderToStaticMarkup(html),
            showCancelButton: true,
            confirmButtonText: t('page:Game.Draft.Selection.select.swal.confirm'),
            cancelButtonText: t('page:Game.Draft.Selection.select.swal.cancel'),
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-secondary',
            buttonsStyling: false,
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const payload = { id: game._id, teamId: team.id };
                const scope = routes.game.read;

                dispatch(selectDraftTeam(payload, scope, (response) => {
                    if (response.error) dispatch(failSelectDraftTeam(response, scope));
                    else dispatch(successSelectDraftTeam(response, scope));
                }));
            },
            allowOutsideClick: () => !swal.isLoading(),
        });

        return false;
    }

    showTurnSwal() {
        const { credentials, notUserTurn, t } = this.props;
        const groupStage = true;

        if (!credentials || notUserTurn) { return false; }

        swal({
            title: t('page:Game.Draft.Selection.turn.swal.title', { name: getName(credentials.profile) }),
            imageUrl: credentials.profile.picture,
            imageHeight: 100,
            imageAlt: getName(credentials.profile),
            text: t(`page:Game.Draft.Selection.turn.swal.${groupStage ? 'groupStageText' : 'text'}`),
            confirmButtonText: t('page:Game.Draft.Selection.turn.swal.confirm'),
            confirmButtonClass: 'btn btn-complementary',
            buttonsStyling: false,
        });

        return false;
    }

    renderGroups() {
        const { credentials, game, groups, t } = this.props;
        return groups.map((group) => {
            const groupWithAddOn = group;

            group.teams.map((team, j) => {
                const { chosenTeamsByUser } = game;
                let selectedBy = null;
                let disabled = false;

                some(chosenTeamsByUser, (groupsByUser, userId) => some(groupsByUser, (teamByUser) => {
                    disabled = teamByUser === team.id;
                    selectedBy = disabled ? filter(game.users, user => user._id === userId)[0] : null;
                    return disabled;
                }));

                groupWithAddOn.teams[j].disabled = disabled;
                groupWithAddOn.teams[j].selectedBy = selectedBy;
                groupWithAddOn.teams[j].addOn = (
                    <AddOn team={team} userId={credentials._id} selectedBy={selectedBy} disabled={disabled} />
                );
                return team;
            });

            return (
                <div key={`draft-selection-group-${group.id}`} className="col-md-6 mb-3">
                    <Group
                        addOnTitle={t('component:DraftSelection.addOnTitle')}
                        onTeamClick={(team, e) => this.handleSelect(team, group, e)}
                        className="table-hover"
                        {...groupWithAddOn}
                    />
                </div>
            );
        });
    }

    render() {
        const { notUserTurn } = this.props;
        this.showTurnSwal();

        return (
            <div id="game-draft-selection" className={classNames({ notUserTurn })}>
                <div className="row">
                    {this.renderGroups()}
                </div>
            </div>
        );
    }
}

DraftSelection.propTypes = {
    dispatch: PropTypes.func.isRequired,
    credentials: PropTypes.shape({ _id: PropTypes.string }).isRequired,
    game: PropTypes.shape({ _id: PropTypes.string }).isRequired,
    groups: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, teams: PropTypes.arrayOf(PropTypes.object) })),
    notUserTurn: PropTypes.bool,
    t: PropTypes.func.isRequired,
};

DraftSelection.defaultProps = {
    groups: [],
    notUserTurn: false,
};

export default translate(['component'])(connect(
    state => ({
        credentials: state.credentials,
        groups: denormalize(groupsIds, groupListSchema, state.entities),
    }),
    dispatch => ({ dispatch }),
)(DraftSelection));
