import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/fontawesome-free-solid';

import selectEntities from '../../selectors/entities';
import { fetchGame } from '../../actions/entities/game';
import { routes } from '../../helpers/routes';
import { client } from '../../helpers/nes';

import NoMatch from '../NoMatch';
import Loader from '../../components/Loader';
import Title from '../../components/MainHeader/Title';
import SideAction from '../../components/MainHeader/SideAction';

class Game extends React.Component {
    componentWillMount() {
        const { dispatch, game, match } = this.props;
        if (!game) { dispatch(fetchGame({ id: match.params.id }, routes.game.read)); }
    }
    componentWillReceiveProps(nextProps) {
        const { game } = this.props;
        // If we're receiving game for the first time
        if (!game && game !== nextProps.game) {
            client.subscribe(`/games/${nextProps.game._id}`, (update, flags) => {
                // eslint-disable-next-line no-console
                console.log(update, flags);
            });
        }
    }
    async componentWillUnmount() {
        await client.unsubscribe(`/games/${this.props.game._id}`, null);
    }
    render() {
        const { game, page, t } = this.props;

        if (page.isFetching) return <Loader />;
        else if (!game) return <NoMatch message={t('page:Game.notFound')} />;

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
            </div>
        );
    }
}

Game.propTypes = {
    // credentials: PropTypes.shape({ token: PropTypes.string }).isRequired,
    dispatch: PropTypes.func.isRequired,
    game: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isWithBonuses: PropTypes.bool.isRequired,
        isPublic: PropTypes.bool.isRequired,
    }),
    match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }).isRequired }).isRequired,
    page: PropTypes.shape({ isFetching: PropTypes.bool }).isRequired,
    t: PropTypes.func.isRequired,
};

Game.defaultProps = {
    game: null,
};

export default translate()(connect(
    (state, ownProps) => ({
        credentials: state.credentials,
        game: selectEntities(state.entities.games, [ownProps.match.params.id])[0],
        page: state.pages.Game,
    }),
    dispatch => ({ dispatch }),
)(Game));
