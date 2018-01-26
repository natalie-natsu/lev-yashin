import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner, faSignOutAlt, faBan } from '@fortawesome/fontawesome-free-solid';

import './Slot.scss';
import { getPublicName } from '../../../helpers/user';

const Slot = ({
    adminId, onBan, onKick, index,
    isAdmin, isGettingReady, isReady,
    onReady, player, t, userId,
}) => (
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
        <span className="player-name ml-3 mr-auto align-self-center">
            {isAdmin || adminId !== userId || !(onKick && onBan)
                ? <span className="text">{getPublicName(player.profile)}</span> : (
                    <div className="dropdown btn-group">
                        <button
                            id={`${player._id}-dropdown`}
                            type="button"
                            className="no-style dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span className="text">{getPublicName(player.profile)}</span>
                        </button>
                        <div className="dropdown-menu" htmlFor={`${player._id}-dropdown`}>
                            {onKick && (
                                <button className="dropdown-item" onClick={e => onKick(e, player)}>
                                    <FontAwesomeIcon icon={faSignOutAlt} /> {t('component:GameSlot.kick')}
                                </button>
                            )}
                            {onBan && (
                                <button className="dropdown-item text-danger" onClick={e => onBan(e, player)}>
                                    <FontAwesomeIcon icon={faBan} /> {t('component:GameSlot.ban')}
                                </button>
                            )}
                        </div>
                    </div>
                )}
        </span>
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
    adminId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isGettingReady: PropTypes.bool.isRequired,
    isReady: PropTypes.bool.isRequired,
    onBan: PropTypes.func,
    onKick: PropTypes.func,
    onReady: PropTypes.func,
    player: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            userName: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        }).isRequired,
    }),
    t: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
};

Slot.defaultProps = {
    onBan: null,
    onKick: null,
    onReady: null,
    player: null,
};

export default translate(['component'])(Slot);
