import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { translate } from 'react-i18next';
import { Link, Switch } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCommentAlt, faSignOutAlt, faBan, faArrowLeft } from '@fortawesome/fontawesome-free-solid';

import { messageListSchema } from '../../schemas/message';
import { gameSchema } from '../../schemas/game';
import { routes } from '../../helpers/routes';
import { client } from '../../helpers/nes';

import { getPublicName } from '../../helpers/user';
import { failSubscribeGame, subscribeGame, successSubscribeGame } from '../../actions/entities/game';
import {
    failFetchMessages,
    failSendMessage, failSubscribeMessages,
    fetchMessages, sendMessage, subscribeMessages, successFetchMessages,
    successSendMessage, successSubscribeMessages,
} from '../../actions/entities/messages';
import { resetMessages } from '../../actions/components/Game/Messages';

import NoMatch from '../NoMatch';
import PrivateRoute from '../../components/PrivateRoute';
import Loader from '../../components/Loader';
import Title from '../../components/MainHeader/Title';
import SideAction from '../../components/MainHeader/SideAction';
import Lobby from './Lobby';
import Draft from './Draft';
import Chat from '../../components/Chat';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: false,
            subscriptions: {
                game: false,
                messages: false,
            },
        };
    }

    componentWillMount() {
        const { dispatch, match } = this.props;

        const scope = routes.game.read;
        dispatch(subscribeGame({ id: match.params.id }, scope, (update) => {
            const { error, payload } = update;
            if (error) dispatch(failSubscribeGame(error, scope));
            else dispatch(successSubscribeGame(payload, scope, res => this.onSubscribeGameSuccess(res)));
        }));

        this.fetchMessages();
        const scopeMsg = routes.game.messages;
        dispatch(subscribeMessages({ id: match.params.id }, scopeMsg, (update) => {
            const { error, payload } = update;
            if (error) dispatch(failSubscribeMessages(error, scopeMsg));
            else dispatch(successSubscribeMessages(payload, scopeMsg, res => this.onSubscribeMessagesSuccess(res)));
        }));
    }

    componentWillReceiveProps(nextProps) {
        const { game } = this.props;
        const aUserWasBanned = game.bannedUsers !== nextProps.game.bannedUsers;
        if (aUserWasBanned && this.userIsBanned(nextProps.game)) {
            // TODO register notification.
            this.setState({ alert: 'GAME_USER_BANNED' });
        }
    }

    async componentWillUnmount() {
        const id = this.props.game._id;
        await client.unsubscribe(`/games/${id}`, null);
        await client.unsubscribe(`/games/${id}/messages`, null);
        this.props.dispatch(resetMessages(routes.game.read));
    }

    onSubscribeGameSuccess() {
        this.setState({ subscriptions: { ...this.state.subscriptions, game: true } });
    }

    onSubscribeMessagesSuccess() {
        this.setState({ subscriptions: { ...this.state.subscriptions, messages: true } });
    }

    userIsBanned(game = this.props.game, credentials = this.props.credentials) {
        return game.bannedUsers.map(u => u._id).includes(credentials._id);
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

    hideAlert(e) {
        if (e) { e.preventDefault(); }
        this.setState({ alert: false });
    }

    renderAlert(alert = this.state.alert) {
        const { t } = this.props;
        const alertClass = 'alert alert-dismissible fade show';
        const close = (
            <button
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={e => this.hideAlert(e)}
                onKeyPress={e => this.hideAlert(e)}
            >
                <span aria-hidden="true">&times;</span>
            </button>
        );

        switch (alert) {
        case 'GAME_USER_KICKED':
            return (
                <div className={classNames(alertClass, 'alert-warning')} role="alert">
                    <FontAwesomeIcon icon={faSignOutAlt} /> {t('page:Game.user.kicked')} {close}
                </div>
            );
        case 'GAME_USER_BANNED':
            return (
                <div className={classNames(alertClass, 'alert-danger')} role="alert">
                    <FontAwesomeIcon icon={faBan} /> {t('page:Game.user.banned')} {close}
                </div>
            );
        default:
            return false;
        }
    }

    render() {
        const { credentials, game, messages, page, t } = this.props;

        if (page.isFetching) return <Loader />;
        else if (!game._id) return <NoMatch message={t('page:Game.notFound')} />;

        const chatButton = (
            <SideAction>
                <div className="btn-side-action mx-2 mx-sm-3">
                    <Link to={routes.game.messages.replace(':id', game._id)} className="btn">
                        <FontAwesomeIcon icon={faCommentAlt} />
                    </Link>
                </div>
            </SideAction>
        );

        const lobbyProps = { game, userIsBanned: this.userIsBanned(), children: chatButton };
        const draftProps = { game, children: chatButton };
        const chatProps = {
            gameId: game._id,
            isFetching: messages.isFetching,
            isSending: messages.isSending,
            messages: messages.entities,
            onFetchMore: () => this.fetchMessages(15, messages.skip + 15),
            onSubmit: values => this.sendMessage(values),
            remainMessages: messages.entities.length < messages.totalMessages,
            step: game.step,
            totalMessages: messages.totalMessages,
            userId: credentials._id,
            userName: getPublicName(credentials.profile),
            children: (
                <SideAction>
                    <div className="btn-side-action mx-2 mx-sm-3">
                        <Link to={routes.game.read.replace(':id', game._id)} className="btn">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Link>
                    </div>
                </SideAction>
            ),
        };

        let stepComponent;
        let stepProps = {};

        switch (game.step) {
        case 'draft':
            stepComponent = Draft;
            stepProps = draftProps;
            break;
        default:
            stepComponent = Lobby;
            stepProps = lobbyProps;
            break;
        }

        return (
            <div id="game">
                <Title>{game.name}</Title>
                <div className="container">
                    {this.renderAlert()}
                    <Switch>
                        <PrivateRoute
                            exact
                            path={routes.game.read}
                            component={stepComponent}
                            componentProps={stepProps}
                        />
                        <PrivateRoute path={routes.game.messages} component={Chat} componentProps={chatProps} />
                    </Switch>
                </div>
            </div>
        );
    }
}

Game.propTypes = {
    credentials: PropTypes.shape({
        _id: PropTypes.string.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    game: PropTypes.shape({
        _id: PropTypes.string,
        bannedUsers: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
        })).isRequired,
        isWithBonuses: PropTypes.bool.isRequired,
        isPublic: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
    }),
    match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }).isRequired }).isRequired,
    messages: PropTypes.shape({
        isSending: PropTypes.bool.isRequired,
        entities: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
        })).isRequired,
    }),
    page: PropTypes.shape({ isFetching: PropTypes.bool }).isRequired,
    t: PropTypes.func.isRequired,
};

Game.defaultProps = {
    game: {
        _id: null,
        bannedUsers: [],
        isWithBonuses: true,
        isPublic: false,
        name: '',
    },
    messages: { isSending: false, entities: [] },
};

export default translate()(connect(
    (state, ownProps) => ({
        credentials: state.credentials,
        game: denormalize(ownProps.match.params.id, gameSchema, state.entities),
        messages: {
            ...state.pages.GameMessages,
            entities: denormalize(state.pages.GameMessages.ids, messageListSchema, state.entities),
        },
        page: state.pages.Game,
    }),
    dispatch => ({ dispatch }),
)(Game));
