import React from 'react';
import PropTypes from 'prop-types';

import './Chat.scss';
import Message from './Message';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = { content: '' };
    }

    handleSubmit(e) {
        e.preventDefault();
        const { gameId } = this.props;
        this.props.onSubmit({ id: gameId, message: this.state.content });
        this.setState({ content: '' });
    }

    renderMessages() {
        const { messages, userId, users } = this.props;
        return messages.map(message => (
            <Message
                {...message}
                isUser={message.user === userId}
                picture={users[message.user].profile.picture}
            />
        ));
    }

    render() {
        const { children, gameId } = this.props;
        return (
            <div id={`chat-${gameId}`} className="chat">
                <div className="chat-window">
                    <ul className="messages">
                        <li className="message left">
                            <div className="avatar" />
                            <div className="text-wrapper">
                                <div className="text">Hello Philip! :)</div>
                            </div>
                        </li>
                        {this.renderMessages()}
                    </ul>
                    {children}
                    <form
                        className="bottom-wrapper clearfix"
                        onSubmit={e => this.handleSubmit(e)}
                    >
                        <div className="row">
                            <div className="col-md-8 col-lg-10">
                                <input
                                    className="form-control"
                                    name="content"
                                    onChange={e => this.setState({ content: e.target.value })}
                                    placeholder="Type your message here..."
                                    value={this.state.content}
                                />
                            </div>
                            <div className="col-md-4 col-lg-2">
                                <button
                                    type="submit"
                                    className="btn btn-outline-complementary btn-block d-none d-sm-inline"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Chat.propTypes = {
    children: PropTypes.element,
    gameId: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        sentAt: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
    })),
    onSubmit: PropTypes.func,
    userId: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        picture: PropTypes.string.isRequired,
    })),
};

Chat.defaultProps = {
    children: null,
    messages: [],
    users: [],
    // eslint-disable-next-line no-console
    onSubmit: () => console.log('Please provide an onSubmit callback.'),
};

export default Chat;
