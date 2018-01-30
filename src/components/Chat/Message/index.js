import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import './Message.scss';

const Message = ({ isUser, picture, content }) => (
    <li className={className('message', { left: !isUser, right: isUser })}>
        <img className="avatar" src={picture} alt="Avatar" />
        <div className="text-wrapper">
            <div className="text">{content}</div>
        </div>
    </li>
);

Message.propTypes = {
    isUser: PropTypes.bool.isRequired,
    picture: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default Message;
