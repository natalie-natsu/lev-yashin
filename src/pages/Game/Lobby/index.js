import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSpinner } from '@fortawesome/fontawesome-free-solid';

import './Lobby.scss';
import selectEntities from '../../../selectors/entities';
import { routes } from '../../../helpers/routes';
import { joinGame, readyGame } from '../../../actions/entities/game/lobby';

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

    renderSlots() {
        const { game, page, players, userId } = this.props;
        if (players.length < 1) { return false; }

        return players.map((player, index) => (
            <Slot
                admin={player._id === game.admin}
                index={index}
                isGettingReady={page.isGettingReady}
                isReady={game.readyUsers.includes(player._id)}
                key={player._id}
                onReady={(isReady, e, playerId) => this.handleReady(isReady, e, playerId)}
                player={player}
                userId={userId}
            />
        ));
    }

    render() {
        const { game, page, t, userId } = this.props;
        const canJoin = !game.users.includes(userId);

        return (
            <section id="game-lobby">
                {this.renderSlots()}
                <div className="actions text-right">
                    {canJoin && (
                        <button
                            className="btn btn-complementary"
                            onClick={e => this.handleJoin(e)}
                            onKeyPress={e => this.handleJoin(e)}
                        >
                            <FontAwesomeIcon icon={page.isJoining ? faSpinner : faSignInAlt} spin={page.isJoining} />
                            <span className="ml-2">{t('page:Game.Lobby.join.text')}</span>
                        </button>
                    )}
                </div>
            </section>
        );
    }
}

Lobby.propTypes = {
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
};

Lobby.defaultProps = {
    players: [],
};

export default translate(['page', 'toast'])(connect(
    (state, ownProps) => ({
        page: state.pages.GameLobby,
        players: selectEntities(state.entities.users, ownProps.game.users),
        userId: state.credentials._id,
    }),
    dispatch => ({ dispatch }),
)(Lobby));
