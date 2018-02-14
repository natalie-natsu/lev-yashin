import React from 'react';
import PropTypes from 'prop-types';
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

        // Refresh calendar data every minutes
        // Todo refresh only if there is a live
        const intervalId = setInterval(() => this.fetchCalendar(), 60 * 1000);
        this.state = { intervalId };
    }

    componentDidMount() {
        this.fetchCalendar();
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    fetchCalendar(e) {
        if (e) { e.preventDefault(); }

        const { calendar, dispatch } = this.props;
        if (!calendar.isFetching) {
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
