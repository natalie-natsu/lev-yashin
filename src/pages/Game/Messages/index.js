import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { denormalize } from 'normalizr';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';

import { messageListSchema } from '../../../schemas/message';
import { getPublicName } from '../../../helpers/user';
import { routes } from '../../../helpers/routes';
import { client } from '../../../helpers/nes';
import {
    failFetchMessages, failSendMessage, failSubscribeMessages,
    fetchMessages, sendMessage, subscribeMessages,
    successFetchMessages, successSendMessage, successSubscribeMessages,
} from '../../../actions/entities/messages';

import Chat from '../../../components/Chat';
import Title from '../../../components/MainHeader/Title';
import SideAction from '../../../components/MainHeader/SideAction';

class Messages extends React.Component {
    componentWillMount() {
        const { dispatch, match } = this.props;
        this.fetchMessages();
        const scope = routes.game.messages;
        dispatch(subscribeMessages({ id: match.params.id }, scope, (update) => {
            const { error, payload } = update;
            if (error) dispatch(failSubscribeMessages(error, scope));
            else dispatch(successSubscribeMessages(payload, scope, res => this.onSubscribeMessagesSuccess(res)));
        }));
    }

    async componentWillUnmount() {
        const id = this.props.game._id;
        await client.unsubscribe(`/games/${id}/messages`, null);
    }

    sendMessage(message) {
        const { dispatch } = this.props;
        const scope = routes.game.messages;

        dispatch(sendMessage(message, routes.game.messages, (response) => {
            if (response.error) dispatch(failSendMessage(response.error, scope));
            else dispatch(successSendMessage(response, scope));
        }));
    }

    fetchMessages(limit = 15, skip = 0) {
        const { dispatch, match } = this.props;
        const scope = routes.game.messages;
        const payload = { id: match.params.id, limit, skip };
        const then = (response) => {
            if (response.error) dispatch(failFetchMessages(response.error, scope));
            else dispatch(successFetchMessages(response, scope, payload));
        };

        dispatch(fetchMessages(payload, scope, then));
    }

    render() {
        const { credentials, game, messages, page } = this.props;
        return (
            <section id="game-messages">
                <Title>{game.name}</Title>
                <SideAction>
                    <div className="btn-side-action mx-2 mx-sm-3">
                        <Link to={routes.game.read.replace(':id', game._id)} className="btn">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Link>
                    </div>
                </SideAction>
                <Chat
                    gameId={game._id}
                    isFetching={page.isFetching}
                    isSending={page.isSending}
                    messages={messages}
                    onFetchMore={() => this.fetchMessages(15, page.skip + 15)}
                    onSubmit={values => this.sendMessage(values)}
                    remainMessages={messages.length < page.totalMessages}
                    step={game.step}
                    totalMessages={page.totalMessages}
                    userId={credentials._id}
                    userName={getPublicName(credentials.profile)}
                />
            </section>
        );
    }
}

Messages.propTypes = {
    credentials: PropTypes.shape({
        _id: PropTypes.string.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    game: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
            step: PropTypes.string,
        }).isRequired,
    }).isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
    })),
    page: PropTypes.shape({ isFetching: PropTypes.bool, isSending: PropTypes.bool }).isRequired,
};

Messages.defaultProps = {
    messages: [],
};

export default translate()(connect(
    state => ({
        credentials: state.credentials,
        page: state.pages.GameMessages,
        messages: denormalize(state.pages.GameMessages.ids, messageListSchema, state.entities),
    }),
    dispatch => ({ dispatch }),
)(Messages));
