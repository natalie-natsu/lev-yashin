import React from 'react';
import Raven from 'raven-js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendarAlt } from '@fortawesome/fontawesome-free-solid/index';

import { failFetchMatch, fetchMatch, successFetchMatch } from '../../actions/entities/match';
import { matchCalendarSchema } from '../../schemas/calendar';
import { routes } from '../../helpers/routes';
import { getTeamName } from '../../helpers/team';
import cityToPicture from './cityToPicture';

import './Match.scss';
import RavenError from '../../components/RavenError';
import SideAction from '../../components/MainHeader/SideAction';
import Title from '../../components/MainHeader/Title';
import Loader from '../../components/Loader';
import MatchComponent from '../../components/Match';
import Group from '../../components/Group';

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: false };
    }

    componentDidMount() {
        if (!this.props.page.match) { this.fetchMatch(); }
    }

    getMatchName() {
        const { page } = this.props;

        if (!page.match) { return false; }

        const { against, team } = this.props.page.match;
        return `${getTeamName(team)} - ${getTeamName(against)}`;
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Raven.captureException(error, { extra: errorInfo });
    }

    fetchMatch(e) {
        if (e) { e.preventDefault(); }

        const { page, dispatch, match } = this.props;

        if (!page.isFetching) {
            const scope = routes.match;
            dispatch(fetchMatch({ id: match.params.id }, scope, (response) => {
                if (response.error) dispatch(failFetchMatch(response, scope));
                else dispatch(successFetchMatch(response, scope));
            }));
        }
    }

    render() {
        if (this.state.error) { return <div className="container"><RavenError /></div>; }

        const { history, location, match, page, t } = this.props;

        const gameSearchParam = new URLSearchParams(location.search.substring(1)).get('game');
        const referer = !history && gameSearchParam
            ? routes.game.replace(':id', gameSearchParam)
            : `${routes.calendar}?match=${match.params.id}`;

        return (
            <div id="match">
                <Title>{page.match ? this.getMatchName() : t('page:Match.title')}</Title>
                <SideAction>
                    <div className="btn-side-action mx-2 mx-sm-3">
                        {history ? (
                            <button type="button" className="btn" onClick={() => history.goBack()}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                        ) : (
                            <Link to={referer} className="btn">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                            </Link>
                        )}
                    </div>
                </SideAction>
                <header
                    className="jumbotron jumbotron-fluid bg-city mb-3"
                    style={{ backgroundImage: `url(${cityToPicture[page.match && page.match.city]})` }}
                >
                    <div className="container">
                        {page.match && (
                            <span className="animated fadeInUp">
                                <MatchComponent {...page.match} />
                            </span>
                        )}
                    </div>
                </header>
                <div className="container">
                    {page.isFetching || !page.match ? <Loader /> : (
                        <div>
                            {page.match.group && <Group {...page.match.group} className="mb-3" />}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Match.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({ goBack: PropTypes.func.isRequired }),
    i18n: PropTypes.shape({ language: PropTypes.string }).isRequired,
    location: PropTypes.shape({ seal: PropTypes.string }).isRequired,
    page: PropTypes.shape({
        match: PropTypes.shape({
            against: PropTypes.shape({
                flagIcon: PropTypes.string,
                id: PropTypes.string.isRequired,
                nbChampion: PropTypes.number,
                rank: PropTypes.number,
            }).isRequired,
            city: PropTypes.string,
            datetime: PropTypes.string.isRequired,
            group: PropTypes.shape({ id: PropTypes.string, teams: PropTypes.arrayOf(PropTypes.object) }),
            id: PropTypes.number.isRequired,
            live: PropTypes.bool,
            scores: PropTypes.shape({
                against: PropTypes.number.isRequired,
                team: PropTypes.number.isRequired,
                penaltyShootOut: PropTypes.any,
            }),
            stadium: PropTypes.string,
            team: PropTypes.shape({
                flagIcon: PropTypes.string,
                id: PropTypes.string.isRequired,
                nbChampion: PropTypes.number,
                rank: PropTypes.number,
            }).isRequired,
            timezone: PropTypes.string.isRequired,
        }),
        isFetching: PropTypes.bool,
        needRefresh: PropTypes.bool,
        receivedAt: PropTypes.number,
    }).isRequired,
    match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
    t: PropTypes.func.isRequired,
};

Match.defaultProps = {
    history: null,
};

export default translate(['common', 'page'])(connect(
    (state, ownProps) => ({
        credentials: state.credentials,
        page: {
            ...state.pages.Match,
            match: state.entities.matches && denormalize(ownProps.match.params.id, matchCalendarSchema, state.entities),
        },
    }),
    dispatch => ({ dispatch }),
)(Match));
