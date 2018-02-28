import { normalize } from 'normalizr';
import { receiveEntities } from '../entities';
import { matchListSchema, matchSchema } from '../../schemas/match';
import { teamListSchema } from '../../schemas/team';
import { groupListSchema, groupSchema } from '../../schemas/group';

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
        const normalized = normalize(response, {
            group: groupSchema,
            match: matchSchema,
            teams: teamListSchema,
        });
        dispatch(receiveEntities(normalized.entities));
        dispatch({
            type: SUCCESS_FETCH_MATCH,
            receivedAt: Date.now(),
            id: normalized.result.match,
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
        const normalized = normalize(response, {
            groups: groupListSchema,
            matches: matchListSchema,
            teams: teamListSchema,
        });
        dispatch(receiveEntities(normalized.entities));
        dispatch({
            type: SUCCESS_FETCH_MATCHES,
            receivedAt: Date.now(),
            ids: normalized.result.matches,
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
