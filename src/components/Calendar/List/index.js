import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment-timezone';
import { filter, last } from 'lodash';
import { translate } from 'react-i18next';
import countries from 'i18n-iso-countries';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCrosshairs } from '@fortawesome/fontawesome-free-solid';
import { faClock } from '@fortawesome/fontawesome-free-regular';

import { localeTo } from '../../../helpers/locales';
import { routes } from '../../../helpers/routes';
import './CalendarList.scss';
import FloatingActionButton from '../../FloatingActionButton';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));
countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));

class CalendarList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { scrollTo: props.scrollTo || this.getScrollTo(props.matches) };
    }

    componentWillReceiveProps(nextProps) {
        const { matches } = nextProps;
        if (matches !== this.props.matches) { this.setState({ scrollTo: this.getScrollTo(matches) }); }
    }

    componentDidUpdate(prevProps, prevState) {
        const { scrollTo } = this.state;
        if (prevState.scrollTo !== scrollTo) { this.scrollTo(scrollTo, prevState.scrollTo && 'smooth'); }
    }

    getScrollTo(matches = this.props.matches) {
        if (matches.length < 1) { return false; }

        const lastMatchWithScores = last(filter(matches, match => match.scores));
        return lastMatchWithScores ? lastMatchWithScores.id : 1;
    }

    scrollTo(scrollTo = this.state.scrollTo, behavior) {
        const el = scrollTo && this[`match-${scrollTo}`];
        if (el) { el.scrollIntoView(behavior && { behavior }); }
    }

    renderMatches() {
        const { i18n, matches, t } = this.props;
        const listGroupItemClass = 'list-group-item list-group-item-action flex-column align-items-start';

        return matches.map((match) => {
            const { against, city, datetime, group, id, scores, stadium, team, timezone } = match;
            return (
                <a
                    id={id}
                    key={id}
                    ref={(el) => { this[`match-${id}`] = el; }}
                    href={routes.calendar.match.replace(':id', id)}
                    className={classNames(listGroupItemClass)}
                >
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-2">
                            {group && (<span className={`badge mr-2 bg-white group ${group.id}`}>{group.id}</span>)}
                            {team ? team.id : t('undefined')}-{against ? against.id : t('undefined')}
                        </h5>
                        <small>
                            <FontAwesomeIcon icon={faClock} />&nbsp;
                            {moment.tz(datetime, timezone).tz(moment.tz.guess()).format('DD MMM HH:mm')}
                        </small>
                    </div>
                    <div className="row mb-1 body">
                        <div className="col-4">
                            <div className="team text-left">
                                <div className={`mr-auto flag-icon flag-icon-${team.flagIcon}`} />
                                <small className="name team-name font-italic">
                                    {countries.getName(team.flagIcon, localeTo(i18n.language, 'i18n'))}
                                </small>
                            </div>
                        </div>
                        <div className="col-2 d-flex">
                            <div className="score score-team align-self-center mx-auto">
                                {scores ? scores.team : '_'}
                            </div>
                        </div>
                        <div className="col-2 d-flex">
                            <div className="score score-against align-self-center mx-auto">
                                {scores ? scores.against : '_'}
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="against text-right">
                                <div className={`ml-auto flag-icon flag-icon-${against.flagIcon}`} />
                                <small className="name against-name font-italic">
                                    {countries.getName(against.flagIcon, localeTo(i18n.language, 'i18n'))}
                                </small>
                            </div>
                        </div>
                    </div>
                    <small className="location">
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> {stadium} - {city}
                    </small>
                </a>
            );
        });
    }

    render() {
        const { matches, t } = this.props;
        return matches.length > 0 && (
            <div className="calendar-list">
                <FloatingActionButton
                    fa={faCrosshairs}
                    className="btn-complementary"
                    onClick={() => this.scrollTo(undefined, 'smooth')}
                />
                <div className="list-group mb-3">{this.renderMatches()}</div>
                <p className="mb-3 text-center">{t('component:CalendarList.endOfList')}</p>
            </div>
        );
    }
}

CalendarList.propTypes = {
    // game: PropTypes.shape({
    //     _id: PropTypes.string.isRequired,
    //     name: PropTypes.string.isRequired,
    //     users: PropTypes.arrayOf(PropTypes.object).isRequired,
    //     teams: PropTypes.arrayOf(PropTypes.object).isRequired,
    // }),
    i18n: PropTypes.shape({ language: PropTypes.string }).isRequired,
    // isFetching: PropTypes.bool.isRequired,
    matches: PropTypes.arrayOf(PropTypes.shape({
        against: PropTypes.shape({
            flagIcon: PropTypes.string,
            id: PropTypes.string.isRequired,
            nbChampion: PropTypes.number,
            rank: PropTypes.number,
        }).isRequired,
        city: PropTypes.string,
        stadium: PropTypes.string,
        datetime: PropTypes.string.isRequired,
        group: PropTypes.object,
        scores: PropTypes.shape({
            against: PropTypes.number.isRequired,
            team: PropTypes.number.isRequired,
        }),
        team: PropTypes.shape({
            flagIcon: PropTypes.string,
            id: PropTypes.string.isRequired,
            nbChampion: PropTypes.number,
            rank: PropTypes.number,
        }).isRequired,
        timezone: PropTypes.string.isRequired,
    })),
    // receivedAt: PropTypes.number,
    scrollTo: PropTypes.number,
    t: PropTypes.func.isRequired,
    // userId: PropTypes.string,
};

CalendarList.defaultProps = {
    // games: [],
    matches: [],
    // onRefresh: null,
    // receivedAt: null,
    scrollTo: null,
    // userId: null,
};

export default translate()(CalendarList);
