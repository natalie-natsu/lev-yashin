import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment-timezone';
import { translate } from 'react-i18next';

import { routes } from '../../../helpers/routes';
import './CalendarList.scss';

class CalendarList extends React.Component {
    componentDidUpdate(prevProps) {
        const { scrollTo } = this.props;
        const el = this[`match-${scrollTo}`];
        if (el && prevProps.scrollTo !== scrollTo) { el.scrollIntoView({ behavior: 'smooth' }); }
    }

    renderMatches() {
        const { matches, scrollTo, t } = this.props;
        const listGroupItemClass = 'list-group-item list-group-item-action flex-column align-items-start';

        return matches.map((match) => {
            const { against, city, datetime, group, id, stadium, team, timezone } = match;
            return (
                <a
                    id={id}
                    key={id}
                    ref={(el) => { this[`match-${id}`] = el; }}
                    href={routes.calendar.match.replace(':id', id)}
                    className={classNames(listGroupItemClass, {
                        'list-group-item-complementary': scrollTo && id === scrollTo + 1,
                        'list-group-item-secondary': scrollTo && id <= scrollTo,
                    })}
                >
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">
                            {group && (<span className="btn btn-sm btn-outline-dark mr-2 mr-sm-3">{group.id}</span>)}
                            {team ? team.id : t('undefined')}-{against ? against.id : t('undefined')}
                        </h5>
                        <small>
                            {moment.tz(datetime, timezone).tz(moment.tz.guess()).format('DD MMM HH:mm')}
                        </small>
                    </div>
                    <p className="mb-1">Drapeaux + noms + rank + score</p>
                    <small>{stadium} - {city}</small>
                </a>
            );
        });
    }

    render() {
        return (
            <div className="calendar-list">
                <div className="calendar-list-body">
                    <div className="list-group">{this.renderMatches()}</div>
                </div>
            </div>
        );
    }
}

CalendarList.propTypes = {
    // games: PropTypes.arrayOf(PropTypes.shape({
    //     _id: PropTypes.string.isRequired,
    //     name: PropTypes.string.isRequired,
    //     users: PropTypes.arrayOf(PropTypes.object).isRequired,
    //     teams: PropTypes.arrayOf(PropTypes.object).isRequired,
    // })),
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
        team: PropTypes.shape({
            flagIcon: PropTypes.string,
            id: PropTypes.string.isRequired,
            nbChampion: PropTypes.number,
            rank: PropTypes.number,
        }).isRequired,
        timezone: PropTypes.string.isRequired,
    })),
    // onRefresh: PropTypes.func,
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
