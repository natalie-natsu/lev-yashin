import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import './Lobby.scss';
import selectEntities from '../../../selectors/entities';
import Slot from '../../../components/Game/Slot';

class Lobby extends React.Component {
    renderSlots() {
        const { game, players } = this.props;
        if (players.length < 1) { return false; }

        return players.map((player, index) => (
            <Slot player={player} index={index} admin={player._id === game.admin} key={player._id} />
        ));
    }

    render() {
        const { players } = this.props;
        return (
            <section id="game-lobby">
                {this.renderSlots()}
                <Slot player={null} index={players.length} />
            </section>
        );
    }
}

Lobby.propTypes = {
    game: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        admin: PropTypes.string.isRequired,
        users: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            userName: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        }).isRequired,
    })),
};

Lobby.defaultProps = {
    players: [],
};

export default translate()(connect(
    (state, ownProps) => ({
        players: selectEntities(state.entities.users, ownProps.game.users),
    }),
    dispatch => ({ dispatch }),
)(Lobby));
