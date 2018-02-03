import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import className from 'classnames';

import './Message.scss';

const Message = ({ content, isUser, picture, sentAt, userName }) => (
    <li className={className('message', { left: !isUser, right: isUser })}>
        <img className="avatar" src={picture} alt="Avatar" />
        <div className="text-wrapper">
            <div className="text">
                <div className="info">
                    {userName} <time className="d-none d-sm-inline">{moment(sentAt).format('LLL')}</time>
                </div>
                {content}
            </div>
        </div>
    </li>
);

Message.propTypes = {
    content: PropTypes.string.isRequired,
    isUser: PropTypes.bool.isRequired,
    picture: PropTypes.string.isRequired,
    sentAt: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
};

export default Message;
