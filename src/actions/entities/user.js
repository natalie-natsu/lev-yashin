import { normalize } from 'normalizr';
import { receiveEntities } from '../entities';
import { userSchema, userListSchema } from '../../schemas/user';

import { getEndpoint, getHeaders } from '../../helpers/endpoint';

export const REQUEST_USERS = 'REQUEST_USERS';
export const SUCCESS_FETCH_USERS = 'SUCCESS_FETCH_USERS';
export const FAIL_FETCH_USERS = 'FAIL_FETCH_USERS';

export const fetchUsers = (payload, scope) => (dispatch, getState) => {
    dispatch({ type: REQUEST_USERS, payload, scope });

    fetch(getEndpoint('fetchUsers'), {
        method: 'GET',
        headers: getHeaders(getState().authentication),
        body: JSON.stringify(payload),
    })
        .then(response => response.json()).then((data) => {
            if (data.error) dispatch({ type: FAIL_FETCH_USERS });
            else dispatch(successFetchUsers(data, payload, scope));
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

export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const SUCCESS_FETCH_PROFILE = 'SUCCESS_FETCH_PROFILE';
export const FAIL_FETCH_PROFILE = 'FAIL_FETCH_PROFILE';

/**
 * Fetch current user profile with the context token
 * @param payload
 * @param scope
 * @return {function(*)}
 */
export const fetchProfile = (payload, scope) => (dispatch, getState) => {
    dispatch({ type: REQUEST_PROFILE, payload, scope });

    fetch(getEndpoint('fetchProfile'), {
        method: 'GET',
        headers: getHeaders(getState().authentication),
    })
        .then(response => response.json()).then((data) => {
            if (data.error) dispatch({ type: FAIL_FETCH_PROFILE });
            else dispatch(successFetchProfile(data, payload, scope));
        });
};

function successFetchProfile(data, payload, scope) {
    return (dispatch) => {
        const normalized = normalize(data, userSchema);

        dispatch(receiveEntities(normalized.entities));
        dispatch({
            type: SUCCESS_FETCH_PROFILE,
            receivedAt: Date.now(),
            user: data,
            payload,
            scope,
        });
    };
}
