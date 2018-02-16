import React from 'react';
import { some } from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/fontawesome-free-solid';

import { failFetchCalendar, fetchCalendar, successFetchCalendar } from '../../actions/entities/match';
import { calendarSchema } from '../../schemas/calendar';
import { routes } from '../../helpers/routes';

import './Calendar.scss';
import SideAction from '../../components/MainHeader/SideAction';
import Title from '../../components/MainHeader/Title';
import CalendarList from '../../components/Calendar/List';

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        // Refresh calendar data every minutes if there is a live
        const intervalId = setInterval(() => this.fetchCalendar(null, true), 60 * 1000);
        this.state = { intervalId };
    }

    componentDidMount() {
        if (this.props.calendar.matches.length < 1) { this.fetchCalendar(); }
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    fetchCalendar(e, liveRequired = false) {
        if (e) { e.preventDefault(); }

        const { calendar, dispatch } = this.props;

        // TODO: test deeply
        const live = some(calendar.matches, (match) => {
            // 1. Getting match datetime and timezone
            let datetime = moment.tz(match.datetime, match.timezone);
            // 2. Converting to user's timezone
            datetime = datetime.tz(moment.tz.guess());
            // 3. Compare actual user's time to match the match time
            const range = moment().range(datetime.format(), datetime.add(1, 'h').add(50, 'm').format());
            return match.live || range.contains(moment.tz(Date.now(), match.timezone));
        });

        if (!calendar.isFetching || !liveRequired || (liveRequired && live)) {
            const scope = routes.calendar;
            dispatch(fetchCalendar({}, scope, (response) => {
                if (response.error) dispatch(failFetchCalendar(response, scope));
                else dispatch(successFetchCalendar(response, scope));
            }));
        }
    }

    render() {
        const { calendar, t } = this.props;
        return (
            <div id="calendar">
                <Title>{t('page:Calendar.title')}</Title>
                <SideAction>
                    <div className="btn-side-action mx-2 mx-sm-3">
                        <button
                            type="button"
                            className="btn"
                            disabled={calendar.isFetching}
                            onClick={e => this.fetchCalendar(e)}
                            onKeyPress={e => this.fetchCalendar(e)}
                        >
                            <FontAwesomeIcon icon={faSync} spin={calendar.isFetching} />
                        </button>
                    </div>
                </SideAction>
                <div className="container">
                    <CalendarList {...calendar} />
                </div>
            </div>
        );
    }
}

Calendar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    calendar: PropTypes.shape({
        matches: PropTypes.arrayOf(PropTypes.object),
        isFetching: PropTypes.bool,
        needRefresh: PropTypes.bool,
        receivedAt: PropTypes.number,
    }).isRequired,
    match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
    t: PropTypes.func.isRequired,
};

export default translate(['common', 'page'])(connect(
    state => ({
        credentials: state.credentials,
        calendar: {
            ...state.calendar,
            matches: denormalize(state.calendar.matches, calendarSchema, state.entities),
        },
    }),
    dispatch => ({ dispatch }),
)(Calendar));
