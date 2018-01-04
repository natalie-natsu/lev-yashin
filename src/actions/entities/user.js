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
        headers: getHeaders(getState().credentials),
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

export const REQUEST_FETCH_PROFILE = 'REQUEST_FETCH_PROFILE';
export const SUCCESS_FETCH_PROFILE = 'SUCCESS_FETCH_PROFILE';
export const FAIL_FETCH_PROFILE = 'FAIL_FETCH_PROFILE';

/**
 * Fetch current user profile with the context token
 * @param payload
 */
export const fetchProfile = payload => (dispatch, getState) => {
    dispatch({ type: REQUEST_FETCH_PROFILE, payload });

    fetch(getEndpoint('fetchProfile'), {
        method: 'GET',
        headers: getHeaders(getState().credentials),
    })
        .then(response => response.json()).then((response) => {
            if (response.error) dispatch(failFetchProfile(response, payload));
            else dispatch(successFetchProfile(response, payload));
        });
};

function successFetchProfile(response, payload) {
    return (dispatch, getState) => {
        const normalized = normalize({ ...response, _id: getState().credentials._id }, userSchema);

        dispatch(receiveEntities(normalized.entities));
        dispatch({
            type: SUCCESS_FETCH_PROFILE,
            receivedAt: Date.now(),
            data: response,
            payload,
        });
    };
}

function failFetchProfile(response, payload) {
    return {
        type: FAIL_FETCH_PROFILE,
        receivedAt: Date.now(),
        error: response.error,
        payload,
    };
}
