import React from 'react';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSpinner } from '@fortawesome/fontawesome-free-solid';

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

    render() {
        const { children, game, page, t, userId, userIsBanned } = this.props;
        const canJoin = !userIsBanned && game.users && !game.users.includes(userId);

        return (
            <section id="game-lobby">
                {this.renderSlots()}
                {canJoin && (
                    <div className="actions text-right mt-3">
                        <button
                            className="btn btn-complementary"
                            onClick={e => this.handleJoin(e)}
                            onKeyPress={e => this.handleJoin(e)}
                        >
                            <FontAwesomeIcon icon={page.isJoining ? faSpinner : faSignInAlt} spin={page.isJoining} />
                            <span className="ml-2">{t('page:Game.Lobby.join.text')}</span>
                        </button>
                    </div>
                )}
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
