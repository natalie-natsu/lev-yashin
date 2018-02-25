import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusSquare, faCheck } from '@fortawesome/fontawesome-free-solid';

import './AddOn.scss';

const AddOn = ({ disabled, selectedBy, userId }) => (
    <div className="group-team-addOn">
        {disabled && selectedBy && selectedBy._id === userId && (
            <FontAwesomeIcon icon={faCheck} size="2x" className="text-success" />
        )}
        {disabled && selectedBy && selectedBy._id !== userId && (
            <img alt={selectedBy.profile.userName} src={selectedBy.profile.picture} />
        )}
        {!disabled && !selectedBy && (
            <FontAwesomeIcon icon={faPlusSquare} size="2x" />
        )}
    </div>
);

AddOn.propTypes = {
    disabled: PropTypes.bool,
    selectedBy: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            userName: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        }).isRequired,
    }),
    userId: PropTypes.string.isRequired,
};

AddOn.defaultProps = {
    disabled: false,
    selectedBy: null,
};

export default translate(['component'])(AddOn);
