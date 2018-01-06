import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import './Success.scss';

function generateName(email, userName, firstName, lastName) {
    if (firstName && lastName) { return `${firstName} ${lastName}`; }
    return email;
}

const Success = ({ email, userName, firstName, lastName, picture, t }) => (
    <div className="toast-fetch-profile-success media">
        <a href="/" className="mr-3 align-self-center">
            <img
                className="rounded-circle"
                // eslint-disable-next-line max-len
                src={picture}
                alt={generateName(email, userName, firstName, lastName)}
            />
        </a>
        <div className="media-body align-self-center">
            <p className="mb-0">
                {t(`fetchProfile.success.text.${Math.floor(Math.random() * 3) + 1}`)}<br />
                {generateName(email, userName, firstName, lastName)}
            </p>
        </div>
    </div>
);

Success.propTypes = {
    email: PropTypes.string.isRequired,
    userName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    picture: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
};

Success.defaultProps = {
    userName: null,
    firstName: null,
    lastName: null,
};

export default translate(['toast'])(Success);
