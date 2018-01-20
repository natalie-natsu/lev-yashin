import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/fontawesome-free-solid';

import './Slot.scss';
import { getPublicName } from '../../../helpers/user';

class Slot extends React.Component {
    renderJoin() {
        const { index, onJoin, t } = this.props;
        return (
            <button
                className="slot join btn btn-block"
                onClick={e => onJoin(index, e)}
                onKeyPress={e => onJoin(index, e)}
            >
                <p className="mb-0">{t('component:GameSlot.join.text')}</p>
            </button>
        );
    }

    render() {
        const { index, onReady, player } = this.props;
        if (!player) { return this.renderJoin(); }

        return (
            <div className="slot d-flex justify-content-between">
                <img
                    className="player-picture"
                    src={player.profile.picture}
                    alt={getPublicName(player.profile)}
                />
                <span className="player-name ml-3 mr-auto align-self-center">{getPublicName(player.profile)}</span>
                <button
                    className="btn btn-light align-self-center mx-3 text-primary"
                    onClick={e => onReady(index, e)}
                    onKeyPress={e => onReady(index, e)}
                >
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            </div>
        );
    }
}

Slot.propTypes = {
    index: PropTypes.number.isRequired,
    onJoin: PropTypes.func,
    onReady: PropTypes.func,
    player: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            userName: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        }).isRequired,
    }),
    t: PropTypes.func.isRequired,
};

Slot.defaultProps = {
    onJoin: null,
    onReady: null,
    player: null,
};

export default translate(['component'])(Slot);
