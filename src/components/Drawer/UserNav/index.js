import React from 'react';
import './UserNav.scss';

const UserNav = () => (
    <div className="user-nav media">
        <img
            className="mr-3 rounded-circle align-self-center"
            // eslint-disable-next-line max-len
            src="https://pbs.twimg.com/profile_images/579759187040841729/bEiE4yKd_400x400.png"
            alt="Generic placeholder"
        />
        <div className="media-body align-self-center">
            <p className="mb-0">
                <a href="/" className="nav-link">Nicolas Rouvière</a>
            </p>
        </div>
    </div>
);

export default UserNav;
