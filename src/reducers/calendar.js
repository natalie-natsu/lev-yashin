import { createReducer } from './utilities';
import { FAIL_FETCH_CALENDAR, REQUEST_FETCH_CALENDAR, SUCCESS_FETCH_CALENDAR } from '../actions/entities/match';

const initialCalendarState = {
    matches: [],
    isFetching: false,
    needRefresh: false,
    receivedAt: null,
};

function failFetchCalendar(state) {
    return {
        ...state,
        isFetching: false,
        needRefresh: false,
    };
}

function requestFetchCalendar(state) {
    return {
        ...state,
        isFetching: true,
        needRefresh: false,
    };
}

function successFetchCalendar(state, actions) {
    return {
        ...state,
        matches: actions.ids,
        isFetching: false,
        needRefresh: false,
        receivedAt: Date.now(),
    };
}

export default createReducer(initialCalendarState, {
    [FAIL_FETCH_CALENDAR]: failFetchCalendar,
    [REQUEST_FETCH_CALENDAR]: requestFetchCalendar,
    [SUCCESS_FETCH_CALENDAR]: successFetchCalendar,
});
