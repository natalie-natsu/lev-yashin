import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { translate } from 'react-i18next';
import { Redirect, Switch } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBan } from '@fortawesome/fontawesome-free-solid';

import { gameSchema } from '../../schemas/game';
import { routes } from '../../helpers/routes';
import { client } from '../../helpers/nes';

import { failSubscribeGame, subscribeGame, successSubscribeGame } from '../../actions/entities/game';
import { resetMessages } from '../../actions/components/Game/Messages';

import NoMatch from '../NoMatch';
import PrivateRoute from '../../components/PrivateRoute';
import Loader from '../../components/Loader';
import Title from '../../components/MainHeader/Title';
import Lobby from './Lobby';
import Draft from './Draft';
import Messages from './Messages';

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
    }

    componentWillReceiveProps(nextProps) {
        const { game } = this.props;

        const aUserWasBanned = game.bannedUsers !== nextProps.game.bannedUsers;
        if (aUserWasBanned && this.userIsBanned(nextProps.game)) {
            this.setState({ alert: 'GAME_USER_BANNED' });
        }
    }

    async componentWillUnmount() {
        const id = this.props.game._id;
        await client.unsubscribe(`/games/${id}`, null);
        this.props.dispatch(resetMessages(routes.game.messages));
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
        const { game, match, page, t } = this.props;

        if (page.isFetching) {
            return <Loader />;
        } else if (!game._id) {
            return <NoMatch message={t('page:Game.notFound')} />;
        } else if (match.params.step !== 'messages' && game.step !== match.params.step) {
            const redirectTo = routes.game.read.replace(':id', match.params.id).replace(':step', game.step);
            return <Redirect to={redirectTo} />;
        }

        return (
            <div id="game">
                <Title>{game.name}</Title>
                <div className="container">
                    {this.renderAlert()}
                    <Switch>
                        <PrivateRoute
                            path={routes.game.lobby}
                            component={Lobby}
                            componentProps={{ game }}
                        />
                        <PrivateRoute
                            path={routes.game.draft}
                            component={Draft}
                            componentProps={{ game }}
                        />
                        <PrivateRoute
                            path={routes.game.messages}
                            component={Messages}
                            componentProps={{ game }}
                        />
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
        step: PropTypes.string,
    }),
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
            step: PropTypes.string,
        }).isRequired,
    }).isRequired,
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
};

export default translate()(connect(
    (state, ownProps) => ({
        credentials: state.credentials,
        game: denormalize(ownProps.match.params.id, gameSchema, state.entities),
        page: state.pages.Game,
    }),
    dispatch => ({ dispatch }),
)(Game));
