import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/fontawesome-free-solid';

import { getPublicName } from '../../helpers/user';
import './Chat.scss';
import Message from './Message';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = { content: props.inputValue };
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentWillReceiveProps(nextProps) {
        const { inputValue } = nextProps;
        if (inputValue !== this.props.inputValue) { this.setState({ content: inputValue }); }
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    handleFetchMore(e) {
        e.preventDefault();
        const { isFetching } = this.props;
        if (!isFetching) { this.props.onFetchMore(); }
        return false;
    }

    handleSubmit(e) {
        e.preventDefault();
        const { gameId, isSending } = this.props;
        if (!isSending) {
            this.props.onSubmit({ id: gameId, message: this.state.content });
            this.setState({ content: '' });
        }
        return false;
    }

    renderMessages() {
        const { messages, userId } = this.props;
        return messages.map(message => (
            <Message
                {...message}
                isUser={message.user._id === userId}
                key={message._id}
                picture={message.user.profile.picture}
                sentAt={message.sentAt}
                userName={getPublicName(message.user.profile)}
            />
        ));
    }

    render() {
        const { children, gameId, isFetching, isSending, remainMessages, t, userName } = this.props;
        return (
            <div id={`chat-${gameId}`} className="chat">
                <div className="chat-window">
                    <ul className="messages">
                        <li className="fetch-more text-center mb-3">
                            <button
                                className="btn btn-link"
                                disabled={!remainMessages || isFetching}
                                onClick={e => this.handleFetchMore(e)}
                                onKeyPress={e => this.handleFetchMore(e)}
                            >
                                {t(`component:Chat.${remainMessages ? 'fetchMore' : 'noMoreMessages'}`)}
                            </button>
                        </li>
                        <li className="message left">
                            <div className="avatar" />
                            <div className="text-wrapper">
                                <div className="text">
                                    {t('component:Chat.helpText', { name: userName })}
                                </div>
                            </div>
                        </li>
                        {this.renderMessages()}
                        <div ref={(el) => { this.messagesEnd = el; }} />
                    </ul>
                    {children}
                    <form
                        className="bottom-wrapper clearfix"
                        onSubmit={e => this.handleSubmit(e)}
                    >
                        <div className="input-group mb-3">
                            <input
                                className="form-control"
                                name="content"
                                onChange={e => this.setState({ content: e.target.value })}
                                placeholder={t('component:Chat.placeholder')}
                                value={this.state.content}
                            />
                            <div className="input-group-append">
                                <button disabled={isSending} type="submit" className="btn btn-outline-secondary">
                                    <FontAwesomeIcon icon={isSending ? faSpinner : faPaperPlane} spin={isSending} />
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
    isFetching: PropTypes.bool.isRequired,
    isSending: PropTypes.bool.isRequired,
    inputValue: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        sentAt: PropTypes.string.isRequired,
        user: PropTypes.shape({ profile: PropTypes.shape({ picture: PropTypes.string.isRequired }).isRequired }),
    })),
    onFetchMore: PropTypes.func,
    onSubmit: PropTypes.func,
    remainMessages: PropTypes.bool,
    t: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
};

Chat.defaultProps = {
    children: null,
    inputValue: '',
    messages: [],
    // eslint-disable-next-line no-console
    onFetchMore: () => console.log('Please provide an onFetchMore callback.'),
    // eslint-disable-next-line no-console
    onSubmit: () => console.log('Please provide an onSubmit callback.'),
    remainMessages: false,
};

export default translate()(Chat);
