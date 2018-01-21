import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/fontawesome-free-solid';

import './Slot.scss';
import { getPublicName } from '../../../helpers/user';

const Slot = ({ index, isGettingReady, isReady, onReady, player, userId }) => (
    <div
        className={classNames(
            'slot d-flex justify-content-between mb-3 animated slideInLeft',
            [`index-${index}`],
            { ready: isReady },
        )}
    >
        <img
            className="player-picture"
            src={player.profile.picture}
            alt={getPublicName(player.profile)}
        />
        <span className="player-name ml-3 mr-auto align-self-center">{getPublicName(player.profile)}</span>
        <button
            className={classNames('join btn btn-light align-self-center mx-3 bg-white', {
                disabled: userId !== player._id,
                'btn-outline-primary': userId === player._id && !isReady,
                'btn-outline-success': userId === player._id && isReady,
                'text-primary': !isReady,
                'text-success': isReady,
            })}
            onClick={e => onReady(!isReady, e, player._id)}
            onKeyPress={e => onReady(!isReady, e, player._id)}
            disabled={userId !== player._id}
        >
            <FontAwesomeIcon
                icon={userId === player._id && isGettingReady ? faSpinner : faCheck}
                spin={userId === player._id && isGettingReady}
            />
        </button>
    </div>
);

Slot.propTypes = {
    index: PropTypes.number.isRequired,
    isGettingReady: PropTypes.bool.isRequired,
    isReady: PropTypes.bool.isRequired,
    onReady: PropTypes.func,
    player: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            userName: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        }).isRequired,
    }),
    userId: PropTypes.string.isRequired,
};

Slot.defaultProps = {
    onReady: null,
    player: null,
};

export default translate(['component'])(Slot);
