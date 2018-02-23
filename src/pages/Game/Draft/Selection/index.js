import React from 'react';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { denormalize } from 'normalizr';
import { translate } from 'react-i18next';

import { groupListSchema } from '../../../../schemas/group';
import { routes } from '../../../../helpers/routes';
import { failSelectDraftTeam, selectDraftTeam, successSelectDraftTeam } from '../../../../actions/entities/game/draft';

import './Selection.scss';
import AddOn from '../../../../components/Game/Draft/AddOn';
import Group from '../../../../components/Group';

const groupsIds = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

class DraftSelection extends React.Component {
    handleSelect(team, e) {
        if (e) { e.preventDefault(); }
        const { dispatch, game, t } = this.props;

        const canSelect = true;

        if (!canSelect) {
            toast.error(t('toast:hacker'), { position: toast.POSITION.BOTTOM_RIGHT });
            return false;
        }

        swal({
            type: 'info',
            title: t('page:Game.Draft.Selection.select.swal.title'),
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

    renderGroups() {
        const { credentials, groups, t } = this.props;
        return groups.map((group) => {
            const groupWithAddOn = group;
            group.teams.map((team, j) => {
                groupWithAddOn.teams[j].addOn = <AddOn team={team} userId={credentials._id} />;
                return team;
            });

            return (
                <div key={`draft-selection-group-${group.id}`} className="col-md-6 mb-3">
                    <Group
                        addOnTitle={t('component:DraftSelection.addOnTitle')}
                        onTeamClick={(team, e) => this.handleSelect(team, e)}
                        className="table-hover"
                        {...groupWithAddOn}
                    />
                </div>
            );
        });
    }

    render() {
        const { notUserTurn } = this.props;
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
