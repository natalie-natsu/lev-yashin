import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCommentAlt, faSignOutAlt, faBan } from '@fortawesome/fontawesome-free-solid';

import selectEntities from '../../selectors/entities';
import { fetchGame, updateGameEntity } from '../../actions/entities/game';
import { routes } from '../../helpers/routes';
import { client } from '../../helpers/nes';

import NoMatch from '../NoMatch';
import Loader from '../../components/Loader';
import Title from '../../components/MainHeader/Title';
import SideAction from '../../components/MainHeader/SideAction';
import Lobby from './Lobby';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { alert: false };
    }

    componentWillMount() {
        const { dispatch, game, match } = this.props;
        if (!game._id) { dispatch(fetchGame({ id: match.params.id }, routes.game.read)); }
    }

    componentWillReceiveProps(nextProps) {
        const { credentials, dispatch, game } = this.props;
        // If we're receiving game for the first time
        if (!game._id && game !== nextProps.game) {
            client.subscribe(`/games/${nextProps.game._id}`, (update) => {
                // eslint-disable-next-line no-console
                console.log(update);
                const { error, payload } = update;
                if (!error) {
                    dispatch(updateGameEntity(payload));
                    const { lastAction } = update.payload;
                    if (lastAction === 'GAME_USER_KICKED' && lastAction.userId === credentials._id) {
                        // TODO register kicked notif
                        this.setState({ alert: 'GAME_USER_KICKED' });
                    }
                }
            });
        }

        const aUserWasBanned = game.bannedUsers !== nextProps.game.bannedUsers;
        if (aUserWasBanned && this.userIsBanned(nextProps.game)) {
            // TODO register notification
            this.setState({ alert: 'GAME_USER_BANNED' });
        }
    }

    async componentWillUnmount() {
        await client.unsubscribe(`/games/${this.props.game._id}`, null);
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
        const { game, page, t } = this.props;

        if (page.isFetching) return <Loader />;
        else if (!game._id) return <NoMatch message={t('page:Game.notFound')} />;

        return (
            <div id="game">
                <Title>{game.name}</Title>
                <SideAction>
                    <div className="btn-side-action mx-2 mx-sm-3">
                        <button type="button" className="btn">
                            <FontAwesomeIcon icon={faCommentAlt} />
                        </button>
                    </div>
                </SideAction>
                <div className="container">
                    {this.renderAlert()}
                    <Lobby game={game} userIsBanned={this.userIsBanned()} />
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
        game: selectEntities(state.entities.games, [ownProps.match.params.id])[0],
        page: state.pages.Game,
    }),
    dispatch => ({ dispatch }),
)(Game));
