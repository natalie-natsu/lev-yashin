import React from 'react';
import PropTypes from 'prop-types';
import { getName } from '../../../helpers/user';

import './UserNav.scss';

const UserNav = ({ email, userName, firstName, lastName, picture }) => (
    <div className="user-nav media">
        <a href="/" className="mr-3 align-self-center">
            <img
                className="rounded-circle"
                // eslint-disable-next-line max-len
                src={picture}
                alt={getName(email, userName, firstName, lastName)}
            />
        </a>
        <div className="media-body align-self-center">
            <p className="mb-0">
                <a href="/" className="nav-link">
                    {getName(email, userName, firstName, lastName)}
                </a>
            </p>
        </div>
    </div>
);

UserNav.propTypes = {
    email: PropTypes.string.isRequired,
    userName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    picture: PropTypes.string.isRequired,
};

UserNav.defaultProps = {
    userName: null,
    firstName: null,
    lastName: null,
};

export default UserNav;
