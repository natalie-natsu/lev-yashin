import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link, Switch } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCommentAlt, faSignOutAlt, faBan, faArrowLeft } from '@fortawesome/fontawesome-free-solid';

import selectEntities from '../../selectors/entities';
import { failSubscribeGame, fetchGame, subscribeGame, successSubscribeGame } from '../../actions/entities/game';
import {
    failSendMessage, failSubscribeMessages,
    fetchMessages, sendMessage, subscribeMessages,
    successSendMessage, successSubscribeMessages,
} from '../../actions/entities/messages';
import { routes } from '../../helpers/routes';
import { client } from '../../helpers/nes';

import NoMatch from '../NoMatch';
import PrivateRoute from '../../components/PrivateRoute';
import Loader from '../../components/Loader';
import Title from '../../components/MainHeader/Title';
import SideAction from '../../components/MainHeader/SideAction';
import Lobby from './Lobby';
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

        dispatch(fetchGame({ id: match.params.id }, scope));
        dispatch(fetchMessages({ id: match.params.id }, scope));

        // dispatch(subscribeGame({ id: match.params.id }, scope, (update) => {
        //     const { error, payload } = update;
        //     if (error) dispatch(failSubscribeGame(error, scope));
        //     else dispatch(successSubscribeGame(payload, scope, res => this.onSubscribeGameSuccess(res)));
        // }));
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, game } = this.props;
        const scope = routes.game.read;
        const scopeMsg = routes.game.messages;

        // If we're receiving game for the first time
        if (!game._id && game !== nextProps.game) {
            // Subscribe to Game
            dispatch(subscribeGame({ id: nextProps.game._id }, scope, (update) => {
                const { error, payload } = update;
                if (error) dispatch(failSubscribeGame(error, scope));
                else dispatch(successSubscribeGame(payload, scope, res => this.onSubscribeGameSuccess(res)));
            }));

            // Subscribe to Game's Messages
            dispatch(subscribeMessages({ id: nextProps.game._id }, scopeMsg, (update) => {
                const { error, payload } = update;
                if (error) dispatch(failSubscribeMessages(error, scopeMsg));
                else dispatch(successSubscribeMessages(payload, scopeMsg, res => this.onSubscribeMessagesSuccess(res)));
            }));
        }

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
    }

    onSubscribeGameSuccess({ lastAction }) {
        const { credentials } = this.props;
        this.setState({ subscriptions: { ...this.state.subscriptions, game: true } });

        if (lastAction === 'GAME_USER_KICKED' && lastAction.userId === credentials._id) {
            // TODO register notification.
            this.setState({ alert: 'GAME_USER_KICKED' });
        }
    }

    onSubscribeMessagesSuccess() {
        this.setState({ subscriptions: { ...this.state.subscriptions, messages: true } });
    }

    userIsBanned(game = this.props.game, credentials = this.props.credentials) {
        return game.bannedUsers.map(u => u._id).includes(credentials._id);
    }

    handleGameMessage(message) {
        const { dispatch } = this.props;
        const scope = routes.game.messages;
        this.props.dispatch(sendMessage(message, routes.game.messages, (response) => {
            if (response.error) dispatch(failSendMessage(response.error, scope));
            else dispatch(successSendMessage(response, scope));
        }));
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
        const chatProps = {
            gameId: game._id,
            isSending: messages.isSending,
            messages: messages.entities,
            onSubmit: values => this.handleGameMessage(values),
            userId: credentials._id,
            users: messages.users,
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
        return (
            <div id="game">
                <Title>{game.name}</Title>
                <div className="container">
                    {this.renderAlert()}
                    <Switch>
                        <PrivateRoute exact path={routes.game.read} component={Lobby} componentProps={lobbyProps} />
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
    (state, ownProps) => {
        const { GameMessages } = state.pages;
        const messageEntities = selectEntities(state.entities.messages, state.pages.GameMessages.ids);

        return {
            credentials: state.credentials,
            game: selectEntities(state.entities.games, [ownProps.match.params.id])[0],
            messages: {
                ...GameMessages,
                entities: messageEntities,
                users: selectEntities(state.entities.users, messageEntities.map(msg => msg.user), true),
            },
            page: state.pages.Game,
        };
    },
    dispatch => ({ dispatch }),
)(Game));
