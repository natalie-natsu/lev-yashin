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

export const REFRESH_PROFILE = 'REFRESH_PROFILE';
export const REQUEST_FETCH_PROFILE = 'REQUEST_FETCH_PROFILE';
export const SUCCESS_FETCH_PROFILE = 'SUCCESS_FETCH_PROFILE';
export const FAIL_FETCH_PROFILE = 'FAIL_FETCH_PROFILE';

export function refreshProfile(scope) {
    return {
        type: REFRESH_PROFILE,
        scope,
    };
}

export const fetchProfile = scope => (dispatch, getState) => {
    dispatch({ type: REQUEST_FETCH_PROFILE, scope });

    fetch(getEndpoint('fetchProfile'), {
        method: 'GET',
        headers: getHeaders(getState().credentials),
    })
        .then(response => response.json()).then((response) => {
            if (response.error) dispatch(failFetchProfile(response, scope));
            else dispatch(successFetchProfile(response, scope));
        });
};

function successFetchProfile(response, scope) {
    return (dispatch, getState) => {
        const normalized = normalize({ ...response, _id: getState().credentials._id }, userSchema);

        dispatch(receiveEntities(normalized.entities));
        dispatch({
            type: SUCCESS_FETCH_PROFILE,
            receivedAt: Date.now(),
            response,
            scope,
        });
    };
}

function failFetchProfile(response, scope) {
    return {
        type: FAIL_FETCH_PROFILE,
        receivedAt: Date.now(),
        error: response.error,
        scope,
    };
}

export const REQUEST_UPDATE_PROFILE = 'REQUEST_UPDATE_PROFILE';
export const SUCCESS_UPDATE_PROFILE = 'SUCCESS_UPDATE_PROFILE';
export const FAIL_UPDATE_PROFILE = 'FAIL_UPDATE_PROFILE';

export function successUpdateProfile(response, scope) {
    return (dispatch, getState) => {
        const normalized = normalize({ ...response, _id: getState().credentials._id }, userSchema);

        dispatch(receiveEntities(normalized.entities));
        dispatch({
            type: SUCCESS_UPDATE_PROFILE,
            receivedAt: Date.now(),
            response,
            scope,
        });
    };
}

export function failUpdateProfile(response, scope) {
    return {
        type: FAIL_UPDATE_PROFILE,
        receivedAt: Date.now(),
        error: response.error,
        scope,
    };
}

export const REQUEST_RESET_PASSWORD = 'REQUEST_RESET_PASSWORD';
export const SUCCESS_RESET_PASSWORD = 'SUCCESS_RESET_PASSWORD';
export const FAIL_RESET_PASSWORD = 'FAIL_RESET_PASSWORD';

export function successResetPassword(response, scope) {
    return {
        type: SUCCESS_RESET_PASSWORD,
        receivedAt: Date.now(),
        response,
        scope,
    };
}

export function failResetPassword(response, scope) {
    return {
        type: FAIL_RESET_PASSWORD,
        receivedAt: Date.now(),
        error: response.error,
        scope,
    };
}
