import React from 'react';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Trans, translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSpinner, faEdit, faRocket } from '@fortawesome/fontawesome-free-solid';

import './Lobby.scss';
import selectEntities from '../../../selectors/entities';
import { routes } from '../../../helpers/routes';
import {
    joinGame, readyGame,
    kickUser, failKickUser, successKickUser,
    banUser, successBanUser, failBanUser,
} from '../../../actions/entities/game/lobby';
import { getPublicName } from '../../../helpers/user';

import Slot from '../../../components/Game/Slot';
import UpdateGameForm from '../../../components/Game/Update/Form';

class Lobby extends React.Component {
    handleJoin(e) {
        e.preventDefault();
        const { dispatch, game, userId } = this.props;

        const canJoin = !game.users.includes(userId);
        if (canJoin) { dispatch(joinGame({ id: game._id }, routes.game.read)); }
    }

    handleReady(isReady, e, playerId) {
        e.preventDefault();
        const { dispatch, game, t, userId } = this.props;

        if (playerId !== userId) toast.error(t('toast:hacker'), { position: toast.POSITION.BOTTOM_RIGHT });
        else dispatch(readyGame({ id: game._id, isReady }, routes.game.read));
    }

    handleKick(e, player) {
        if (e) { e.preventDefault(); }
        const { dispatch, game, t } = this.props;

        swal({
            type: 'warning',
            title: t('page:Game.Lobby.kick.swal.title', { name: getPublicName(player.profile) }),
            showCancelButton: true,
            confirmButtonText: t('page:Game.Lobby.kick.swal.confirm'),
            cancelButtonText: t('page:Game.Lobby.kick.swal.cancel'),
            confirmButtonClass: 'btn btn-danger',
            cancelButtonClass: 'btn btn-secondary',
            buttonsStyling: false,
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const payload = { id: game._id, userId: player._id };
                const scope = routes.game.read;

                dispatch(kickUser(payload, scope, (response) => {
                    if (response.error) {
                        dispatch(failKickUser(response, scope, () => {
                            toast.error(
                                t('toast:game.user.kick.error', { name: getPublicName(player.profile) }),
                                { position: toast.POSITION.BOTTOM_RIGHT },
                            );
                        }));
                    } else {
                        dispatch(successKickUser(response, scope, () => {
                            toast.success(
                                t('toast:game.user.kick.success', { name: getPublicName(player.profile) }),
                                { position: toast.POSITION.BOTTOM_RIGHT },
                            );
                        }));
                    }
                }));
            },
            allowOutsideClick: () => !swal.isLoading(),
        });
    }

    handleBan(e, player) {
        if (e) { e.preventDefault(); }
        const { dispatch, game, t } = this.props;

        swal({
            type: 'warning',
            title: t('page:Game.Lobby.ban.swal.title', { name: getPublicName(player.profile) }),
            showCancelButton: true,
            confirmButtonText: t('page:Game.Lobby.ban.swal.confirm'),
            cancelButtonText: t('page:Game.Lobby.ban.swal.cancel'),
            confirmButtonClass: 'btn btn-danger',
            cancelButtonClass: 'btn btn-secondary',
            buttonsStyling: false,
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const userId = player._id;
                const payload = { id: game._id, userId, isBanned: !game.bannedUsers.includes(userId) };
                const scope = routes.game.read;

                dispatch(banUser(payload, scope, (response) => {
                    if (response.error) {
                        dispatch(failBanUser(response, scope, () => {
                            toast.error(
                                t('toast:game.user.ban.error', { name: getPublicName(player.profile) }),
                                { position: toast.POSITION.BOTTOM_RIGHT },
                            );
                        }));
                    } else {
                        dispatch(successBanUser(response, scope, () => {
                            toast.success(
                                t('toast:game.user.ban.success', { name: getPublicName(player.profile) }),
                                { position: toast.POSITION.BOTTOM_RIGHT },
                            );
                        }));
                    }
                }));
            },
            allowOutsideClick: () => !swal.isLoading(),
        });
    }

    handleLaunch(e) {
        if (e) { e.preventDefault(); }
        const { game, t, userId } = this.props;
        const isAdmin = userId === game.admin;
        const canLaunch = isAdmin && game.readyUsers.length > 3;

        if (!canLaunch) {
            toast.error(t('toast:hacker'), { position: toast.POSITION.BOTTOM_RIGHT });
            return false;
        }

        swal({
            type: 'info',
            title: t('page:Game.Lobby.launch.swal.title'),
            showCancelButton: true,
            confirmButtonText: t('page:Game.Lobby.launch.swal.confirm'),
            cancelButtonText: t('page:Game.Lobby.launch.swal.cancel'),
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-secondary',
            buttonsStyling: false,
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                // TODO call API
            },
            allowOutsideClick: () => !swal.isLoading(),
        });

        return false;
    }

    renderSlots() {
        const { game, page, players, userId } = this.props;
        if (players.length < 1) { return false; }

        return players.map((player, index) => (
            <Slot
                adminId={game.admin}
                index={index}
                isAdmin={player._id === game.admin}
                isGettingReady={page.isGettingReady}
                isReady={game.readyUsers.includes(player._id)}
                key={player._id}
                last={index === players.length - 1}
                onBan={(e, p) => this.handleBan(e, p)}
                onKick={(e, p) => this.handleKick(e, p)}
                onReady={(isReady, e, playerId) => this.handleReady(isReady, e, playerId)}
                player={player}
                userId={userId}
            />
        ));
    }

    renderAdminSection() {
        const { game, t, userId } = this.props;
        const isAdmin = userId === game.admin;

        if (!isAdmin) { return false; }

        return (
            <div className="admin">
                <div className="card border-complementary mb-3 mb-sm-0">
                    <div className="card-header bg-complementary text-white">
                        <FontAwesomeIcon icon={faEdit} /> {t('form:updateGame.labelledBy')}
                    </div>
                    <div className="card-body">
                        <UpdateGameForm id={game._id} initialValues={game} scope={routes.game.read} />
                    </div>
                </div>
                <div className="alert alert-complementary alert-dismissible fade show mt-3" role="alert">
                    <Trans i18nKey="page:Game.Lobby.adminAlert" parent="span">
                        1 <a href={routes.game.messages.replace(':id', game._id)} className="alert-link">2</a>
                    </Trans>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        );
    }

    render() {
        const { children, game, page, t, userId, userIsBanned } = this.props;
        const isAdmin = userId === game.admin;

        const canJoin = !userIsBanned && game.users && !game.users.includes(userId);
        const canLaunch = isAdmin && game.readyUsers.length > 3;

        return (
            <section id="game-lobby">
                <div className="row">
                    <div className={classNames('d-none', { 'd-block col-md-6': isAdmin })}>
                        {this.renderAdminSection()}
                    </div>
                    <div className={classNames('col-sm-12', { 'col-md-6': isAdmin })}>
                        {this.renderSlots()}
                    </div>
                </div>
                <div className="actions text-right">
                    {canLaunch && (
                        <button
                            className="btn btn-success mt-3 ml-3 animated slideInUp"
                            onClick={e => this.handleLaunch(e)}
                            onKeyPress={e => this.handleLaunch(e)}
                            disabled={!canLaunch}
                        >
                            <FontAwesomeIcon icon={page.isLaunching ? faSpinner : faRocket} spin={page.isLaunching} />
                            <span className="ml-2">{t('page:Game.Lobby.launch.text')}</span>
                        </button>
                    )}
                    {canJoin && (
                        <button
                            className="btn btn-complementary mt-3 ml-3"
                            onClick={e => this.handleJoin(e)}
                            onKeyPress={e => this.handleJoin(e)}
                        >
                            <FontAwesomeIcon icon={page.isJoining ? faSpinner : faSignInAlt} spin={page.isJoining} />
                            <span className="ml-2">{t('page:Game.Lobby.join.text')}</span>
                        </button>
                    )}
                </div>
                {children}
            </section>
        );
    }
}

Lobby.propTypes = {
    children: PropTypes.element,
    dispatch: PropTypes.func.isRequired,
    game: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        admin: PropTypes.string.isRequired,
        users: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    page: PropTypes.shape({ isGettingReady: PropTypes.bool }).isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            userName: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        }).isRequired,
    })),
    t: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    userIsBanned: PropTypes.bool,
};

Lobby.defaultProps = {
    children: null,
    players: [],
    userIsBanned: false,
};

export default translate(['page', 'toast'])(connect(
    (state, ownProps) => ({
        credentials: state.credentials,
        page: state.pages.GameLobby,
        players: selectEntities(state.entities.users, ownProps.game.users),
        userId: state.credentials._id,
    }),
    dispatch => ({ dispatch }),
)(Lobby));
