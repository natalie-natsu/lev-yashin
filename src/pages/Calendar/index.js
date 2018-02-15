import React from 'react';
import { some } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Route } from 'react-router-dom';
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
import CalendarModal from '../../components/Calendar/Modal';

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
        const live = some(calendar.matches, match => match.live);

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
                    <Route path={routes.calendar.match} component={CalendarModal} />
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
