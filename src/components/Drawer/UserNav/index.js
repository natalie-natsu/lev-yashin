import React from 'react';
import PropTypes from 'prop-types';
import './UserNav.scss';

function generateName(email, userName, firstName, lastName) {
    if (firstName && lastName) { return `${firstName} ${lastName}`; }
    return email;
}

const UserNav = ({ email, userName, firstName, lastName, picture }) => (
    <div className="user-nav media">
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
                <a href="/" className="nav-link">
                    {generateName(email, userName, firstName, lastName)}
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
