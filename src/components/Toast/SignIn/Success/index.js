import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { getName } from '../../../../helpers/user';
import './Success.scss';

const Success = ({ email, userName, firstName, lastName, picture, t }) => (
    <div className="toast-fetch-profile-success media">
        <a href="/" className="mr-3 align-self-center">
            <img
                className="rounded-circle"
                src={picture}
                alt={getName({ email, userName, firstName, lastName })}
            />
        </a>
        <div className="media-body align-self-center">
            <p className="mb-0">
                {t('fetchProfile.success.text')}<br />
                {getName({ email, userName, firstName, lastName })}
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
