import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filter, last } from 'lodash';
import { denormalize } from 'normalizr';
import { translate } from 'react-i18next';

import { failFetchCalendar, fetchCalendar, successFetchCalendar } from '../../actions/entities/match';
import { calendarSchema } from '../../schemas/calendar';
import { routes } from '../../helpers/routes';

import SideAction from '../../components/MainHeader/SideAction';
import Title from '../../components/MainHeader/Title';
import CalendarList from '../../components/Calendar/List';

class Calendar extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        const scope = routes.calendar;
        dispatch(fetchCalendar({}, scope, (response) => {
            if (response.error) dispatch(failFetchCalendar(response, scope));
            else dispatch(successFetchCalendar(response, scope));
        }));
    }

    getScrollTo() {
        const lastMatchWithScores = last(filter(this.props.calendar.matches, match => match.scores));
        return lastMatchWithScores && lastMatchWithScores.id;
    }

    render() {
        const { calendar, t } = this.props;
        return (
            <div id="calendar">
                <Title>{t('page:Calendar.title')}</Title>
                <SideAction><div className="mx-2 mx-sm-3">toto</div></SideAction>
                <div className="container">
                    <CalendarList {...calendar} scrollTo={this.getScrollTo()} />
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
