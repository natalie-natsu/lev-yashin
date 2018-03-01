import React from 'react';
import { map } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/fontawesome-free-solid';

import { getPublicName } from '../../../../helpers/user';
import './StandBy.scss';

// eslint-disable-next-line react/prefer-stateless-function
class DraftStandBy extends React.Component {
    renderPlayers() {
        const { game } = this.props;
        return game.draftOrder.map(player => (
            <div className="media player mb-3" key={`standby-player-${player._id}`}>
                <img className="mr-3" src={player.profile.picture} alt={getPublicName(player.profile)} />
                <div className="media-body small">
                    <h5 className="mt-0">{getPublicName(player.profile)}</h5>
                    {map(game.chosenTeamsByUser[player._id], team => `${team} `)}
                </div>
            </div>
        ));
    }

    render() {
        const { credentials, game, t } = this.props;
        const playerTurn = game.draftOrder[game.draftIndex];
        const playerNext = game.draftOrder[(game.draftIndex + 1) % 4];
        const userIsNext = playerNext._id === credentials._id;

        return (
            <div id="game-draft-standBy" className="pt-3 animated slideInRight">
                <div className="container text-white">
                    <h5 className="section-title">
                        <FontAwesomeIcon icon={faCircleNotch} spin />
                        {t('page:Game.Draft.StandBy.title', { name: getPublicName(playerTurn.profile) })}
                    </h5>
                    <small className="text-neutral">
                        {t(`page:Game.Draft.StandBy.${userIsNext ? 'next' : 'description'}`)}
                    </small>
                    <hr />
                    {this.renderPlayers()}
                </div>
            </div>
        );
    }
}

DraftStandBy.propTypes = {
    credentials: PropTypes.shape({
        _id: PropTypes.string.isRequired,
    }).isRequired,
    // dispatch: PropTypes.func.isRequired,
    game: PropTypes.shape({
        _id: PropTypes.string,
        draftOrder: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate()(connect(
    state => ({ credentials: state.credentials }),
    dispatch => ({ dispatch }),
)(DraftStandBy));
