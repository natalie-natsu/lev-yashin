import React from 'react';
import PropTypes from 'prop-types';

import './Chat.scss';
import Message from './Message';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    handleSubmit(e) {
        e.preventDefault();
        const { gameId, userId } = this.props;
        this.props.onSubmit({ gameId, userId, text: this.state.text });
        this.setState({ text: '' });
    }

    renderMessages() {
        const { messages, userId } = this.props;
        messages.map(message => <Message {...message} isUser={message.userId === userId} />);
    }

    render() {
        const { children, gameId } = this.props;
        return (
            <div id={`chat-${gameId}`} className="chat">
                <div className="chat-window">
                    <ul className="messages">
                        <li className="message left appeared">
                            <div className="avatar" />
                            <div className="text-wrapper">
                                <div className="text">Hello Philip! :)</div>
                            </div>
                        </li>
                        <li className="message right appeared">
                            <div className="avatar" />
                            <div className="text-wrapper">
                                <div className="text">Hey hey</div>
                            </div>
                        </li>
                        <li className="message left appeared">
                            <div className="avatar" />
                            <div className="text-wrapper">
                                <div className="text">Hello Philip! :)</div>
                            </div>
                        </li>
                        <li className="message left appeared">
                            <div className="avatar" />
                            <div className="text-wrapper">
                                <div className="text">Hello Philip! :)</div>
                            </div>
                        </li>
                        <li className="message left appeared">
                            <div className="avatar" />
                            <div className="text-wrapper">
                                <div className="text">Hello Philip! :)</div>
                            </div>
                        </li>
                    </ul>
                    {children}
                    <form
                        className="bottom-wrapper clearfix"
                        onSubmit={e => this.handleSubmit(e)}
                    >
                        <div className="row">
                            <div className="col-md-8 col-lg-10">
                                <input
                                    autoComplete={false}
                                    className="form-control"
                                    name="text"
                                    onChange={e => this.setState({ text: e.target.value })}
                                    placeholder="Type your message here..."
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
        userId: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        dateTime: PropTypes.string.isRequired,
    })),
    onSubmit: PropTypes.func,
    userId: PropTypes.string.isRequired,
};

Chat.defaultProps = {
    children: null,
    messages: [],
    // eslint-disable-next-line no-console
    onSubmit: () => console.log('Please provide an onSubmit callback.'),
};

export default Chat;
