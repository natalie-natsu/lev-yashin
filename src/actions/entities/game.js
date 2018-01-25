import { normalize } from 'normalizr';
import { receiveEntities } from '../entities';
import { gameSchema } from '../../schemas/game';

import { getEndpoint, getHeaders } from '../../helpers/endpoint';

function normalizeResponseUsersAsEntity(users) {
    return users.map(user => ({
        _id: user._id,
        profile: { userName: user.userName, picture: user.picture },
    }));
}

export const REFRESH_GAME = 'REFRESH_GAME';
export const REQUEST_FETCH_GAME = 'REQUEST_FETCH_GAME';
export const SUCCESS_FETCH_GAME = 'SUCCESS_FETCH_GAME';
export const FAIL_FETCH_GAME = 'FAIL_FETCH_GAME';

export const fetchGame = (payload, scope, onSuccess, onFailure) => (dispatch, getState) => {
    dispatch({ type: REQUEST_FETCH_GAME, payload, scope });

    fetch(getEndpoint('fetchGame', payload), {
        method: 'GET',
        headers: getHeaders(getState().credentials),
    })
        .then(response => response.json()).then((response) => {
            if (response.error) {
                dispatch(failFetchGame(response, scope));
                if (onFailure) { onFailure(response); }
            } else {
                dispatch(successFetchGame(response, scope));
                if (onSuccess) { onSuccess(response); }
            }
        });
};

function successFetchGame(response, scope) {
    return (dispatch) => {
        response.users = normalizeResponseUsersAsEntity(response.users);

        const normalized = normalize(response, gameSchema);
        dispatch(receiveEntities(normalized.entities));

        dispatch({
            type: SUCCESS_FETCH_GAME,
            receivedAt: Date.now(),
            response,
            scope,
        });
    };
}

function failFetchGame(response, scope) {
    return {
        type: FAIL_FETCH_GAME,
        receivedAt: Date.now(),
        error: response.error,
        scope,
    };
}

export function updateGameEntity(response) {
    return (dispatch) => {
        response.users = normalizeResponseUsersAsEntity(response.users);

        const normalized = normalize(response, gameSchema);
        dispatch(receiveEntities(normalized.entities));
    };
}

export const REQUEST_CREATE_GAME = 'REQUEST_CREATE_GAME';
export const SUCCESS_CREATE_GAME = 'SUCCESS_CREATE_GAME';
export const FAIL_CREATE_GAME = 'FAIL_CREATE_GAME';

export function successCreateGame(response, scope) {
    return (dispatch) => {
        response.users = normalizeResponseUsersAsEntity(response.users);

        const normalized = normalize(response, gameSchema);
        dispatch(receiveEntities(normalized.entities));
        dispatch({
            type: SUCCESS_CREATE_GAME,
            receivedAt: Date.now(),
            response,
            scope,
        });
    };
}

export function failCreateGame(response, scope) {
    return {
        type: FAIL_CREATE_GAME,
        receivedAt: Date.now(),
        error: response.error,
        scope,
    };
}

export const REQUEST_KICK_USER = 'REQUEST_KICK_USER';
export const SUCCESS_KICK_USER = 'SUCCESS_KICK_USER';
export const FAIL_KICK_USER = 'FAIL_KICK_USER';

export const kickUser = (payload, scope, onSuccess, onFailure) => (dispatch, getState) => {
    dispatch({ type: REQUEST_KICK_USER, payload, scope });

    fetch(getEndpoint('kickGameUser', payload), {
        method: 'POST',
        headers: getHeaders(getState().credentials),
        body: JSON.stringify({ userId: payload.userId }),
    })
        .then(response => response.json()).then((response) => {
            if (response.error) {
                dispatch(failKickUser(response, scope));
                if (onFailure) { onFailure(response); }
            } else {
                dispatch(successKickUser(response, scope));
                if (onSuccess) { onSuccess(response); }
            }
        });
};

function successKickUser(response, scope) {
    return (dispatch) => {
        response.users = normalizeResponseUsersAsEntity(response.users);

        const normalized = normalize(response, gameSchema);
        dispatch(receiveEntities(normalized.entities));

        dispatch({
            type: SUCCESS_KICK_USER,
            receivedAt: Date.now(),
            response,
            scope,
        });
    };
}

function failKickUser(response, scope) {
    return {
        type: FAIL_KICK_USER,
        receivedAt: Date.now(),
        error: response.error,
        scope,
    };
}

export const REQUEST_BAN_USER = 'REQUEST_BAN_USER';
export const SUCCESS_BAN_USER = 'SUCCESS_BAN_USER';
export const FAIL_BAN_USER = 'FAIL_BAN_USER';

export const banUser = (payload, scope, onSuccess, onFailure) => (dispatch, getState) => {
    dispatch({ type: REQUEST_BAN_USER, payload, scope });

    fetch(getEndpoint('banGameUser', payload), {
        method: 'POST',
        headers: getHeaders(getState().credentials),
        body: JSON.stringify({ userId: payload.userId, isBanned: payload.isBanned }),
    })
        .then(response => response.json()).then((response) => {
            if (response.error) {
                dispatch(failBanUser(response, scope));
                if (onFailure) { onFailure(response); }
            } else {
                dispatch(successBanUser(response, scope));
                if (onSuccess) { onSuccess(response); }
            }
        });
};

function successBanUser(response, scope) {
    return (dispatch) => {
        response.users = normalizeResponseUsersAsEntity(response.users);

        const normalized = normalize(response, gameSchema);
        dispatch(receiveEntities(normalized.entities));

        dispatch({
            type: SUCCESS_BAN_USER,
            receivedAt: Date.now(),
            response,
            scope,
        });
    };
}

function failBanUser(response, scope) {
    return {
        type: FAIL_BAN_USER,
        receivedAt: Date.now(),
        error: response.error,
        scope,
    };
}
