import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import { translate } from 'react-i18next';

import './Message.scss';

const Layout = ({ isUser, picture, text }) => (
    <li className={className('message appeared', { left: !isUser, right: isUser })}>
        <img className="avatar" src={picture} alt="Avatar" />
        <div className="text-wrapper">
            <div className="text">{text}</div>
        </div>
    </li>
);

Layout.propTypes = {
    isUser: PropTypes.func.isRequired,
    picture: PropTypes.func.isRequired,
    text: PropTypes.element.isRequired,
};

export default translate(['common'])(Layout);
