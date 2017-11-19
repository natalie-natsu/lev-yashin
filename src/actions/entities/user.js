import { normalize } from 'normalizr';
import { receiveEntities } from '../entities';
import { userSchema, userListSchema } from '../../schemas/user';

import { getEndpoint, getHeaders } from '../../helpers/endpoint';

export const REQUEST_FETCH_USERS = 'REQUEST_FETCH_USERS';
export const SUCCESS_FETCH_USERS = 'SUCCESS_FETCH_USERS';
export const FAIL_FETCH_USERS = 'FAIL_FETCH_USERS';

export const fetchUsers = (payload, scope) => (dispatch, getState) => {
    dispatch({ type: REQUEST_FETCH_USERS, payload, scope });

    fetch(getEndpoint('fetchUsers'), {
        method: 'GET',
        headers: getHeaders(getState().authentication),
        body: JSON.stringify(payload),
    })
        .then(response => response.json()).then((response) => {
            if (response.error) dispatch(failFetchUsers(response, payload, scope));
            else successFetchUsers(response, payload, scope);
        });
};

function successFetchUsers(response, payload, scope) {
    return (dispatch) => {
        const normalized = normalize(response.data.users, userListSchema);

        dispatch(receiveEntities(normalized.entities));
        dispatch({
            type: SUCCESS_FETCH_USERS,
            receivedAt: Date.now(),
            ids: normalized.result,
            payload,
            scope,
        });
    };
}

function failFetchUsers(response, payload, scope) {
    return {
        type: FAIL_FETCH_USERS,
        receivedAt: Date.now(),
        error: response.error,
        payload,
        scope,
    };
}

export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const SUCCESS_FETCH_PROFILE = 'SUCCESS_FETCH_PROFILE';
export const FAIL_FETCH_PROFILE = 'FAIL_FETCH_PROFILE';

/**
 * Fetch current user profile with the context token
 * @param payload
 * @param scope
 */
export const fetchProfile = (payload, scope) => (dispatch, getState) => {
    dispatch({ type: REQUEST_PROFILE, payload, scope });

    fetch(getEndpoint('fetchProfile'), {
        method: 'GET',
        headers: getHeaders(getState().authentication),
    })
        .then(response => response.json()).then((response) => {
            if (response.error) dispatch(failFetchProfile(response, payload, scope));
            else successFetchProfile(response, payload, scope);
        });
};

function successFetchProfile(response, payload, scope) {
    return (dispatch) => {
        const normalized = normalize(response, userSchema);

        dispatch(receiveEntities(normalized.entities));
        dispatch({
            type: SUCCESS_FETCH_PROFILE,
            receivedAt: Date.now(),
            user: response,
            payload,
            scope,
        });
    };
}

function failFetchProfile(response, payload, scope) {
    return {
        type: FAIL_FETCH_PROFILE,
        receivedAt: Date.now(),
        error: response.error,
        payload,
        scope,
    };
}
