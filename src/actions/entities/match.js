import { normalize } from 'normalizr';
import { receiveEntities } from '../entities';
import { matchListSchema, matchSchema } from '../../schemas/match';
import { calendarSchema } from '../../schemas/calendar';

import { getEndpoint, getHeaders } from '../../helpers/endpoint';

export const REQUEST_FETCH_MATCH = 'REQUEST_FETCH_MATCH';
export const SUCCESS_FETCH_MATCH = 'SUCCESS_FETCH_MATCH';
export const FAIL_FETCH_MATCH = 'FAIL_FETCH_MATCH';

export const fetchMatch = (payload, scope, then = () => false) => (dispatch, getState) => {
    dispatch({ type: REQUEST_FETCH_MATCH, payload, scope });

    fetch(getEndpoint('fetchMatch', payload), {
        method: 'GET',
        headers: getHeaders(getState().credentials),
    })
        .then(response => response.json())
        .then(response => then(response))
        .catch(error => dispatch({ type: FAIL_FETCH_MATCH, error, payload, scope }));
};

export function successFetchMatch(response, scope, then) {
    return (dispatch) => {
        const normalized = normalize(response, matchSchema);
        dispatch(receiveEntities(normalized.entities));
        dispatch({
            type: SUCCESS_FETCH_MATCH,
            receivedAt: Date.now(),
            id: normalized.result,
            scope,
            then,
        });
    };
}

export function failFetchMatch(response, scope, then) {
    return {
        type: FAIL_FETCH_MATCH,
        receivedAt: Date.now(),
        error: response,
        scope,
        then,
    };
}

export const REQUEST_FETCH_MATCHES = 'REQUEST_FETCH_MATCHES';
export const SUCCESS_FETCH_MATCHES = 'SUCCESS_FETCH_MATCHES';
export const FAIL_FETCH_MATCHES = 'FAIL_FETCH_MATCHES';

export const fetchMatches = (payload, scope, then = () => false) => (dispatch, getState) => {
    dispatch({ type: REQUEST_FETCH_MATCHES, payload, scope });

    fetch(getEndpoint('fetchMatches', payload), {
        method: 'GET',
        headers: getHeaders(getState().credentials),
    })
        .then(response => response.json())
        .then(response => then(response))
        .catch(error => dispatch({ type: FAIL_FETCH_MATCHES, error, payload, scope }));
};

export function successFetchMatches(response, scope, then) {
    return (dispatch) => {
        const normalized = normalize(response, matchListSchema);
        dispatch(receiveEntities(normalized.entities));
        dispatch({
            type: SUCCESS_FETCH_MATCHES,
            receivedAt: Date.now(),
            ids: normalized.result,
            scope,
            then,
        });
    };
}

export function failFetchMatches(response, scope, then) {
    return {
        type: FAIL_FETCH_MATCHES,
        receivedAt: Date.now(),
        error: response,
        scope,
        then,
    };
}

export const REQUEST_FETCH_CALENDAR = 'REQUEST_FETCH_CALENDAR';
export const SUCCESS_FETCH_CALENDAR = 'SUCCESS_FETCH_CALENDAR';
export const FAIL_FETCH_CALENDAR = 'FAIL_FETCH_CALENDAR';

export const fetchCalendar = (payload, scope, then = () => false) => (dispatch, getState) => {
    dispatch({ type: REQUEST_FETCH_CALENDAR, payload, scope });

    fetch(getEndpoint('fetchCalendar', payload), {
        method: 'GET',
        headers: getHeaders(getState().credentials),
    })
        .then(response => response.json())
        .then(response => then(response))
        .catch(error => dispatch({ type: FAIL_FETCH_CALENDAR, error, payload, scope }));
};

export function successFetchCalendar(response, scope, then) {
    return (dispatch) => {
        const normalized = normalize(response, calendarSchema);
        dispatch(receiveEntities(normalized.entities));
        dispatch({
            type: SUCCESS_FETCH_CALENDAR,
            receivedAt: Date.now(),
            ids: normalized.result,
            scope,
            then,
        });
    };
}

export function failFetchCalendar(response, scope, then) {
    return {
        type: FAIL_FETCH_CALENDAR,
        receivedAt: Date.now(),
        error: response,
        scope,
        then,
    };
}
