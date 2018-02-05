import { normalize } from 'normalizr';

import { getEndpoint, getHeaders } from '../../../helpers/endpoint';
import { gameSchema } from '../../../schemas/game';
import { receiveEntities } from '../../entities';
import { normalizeResponseUsersAsEntity } from '../game';

export const REQUEST_JOIN_GAME = 'REQUEST_JOIN_GAME';
export const SUCCESS_JOIN_GAME = 'SUCCESS_JOIN_GAME';
export const FAIL_JOIN_GAME = 'FAIL_JOIN_GAME';

export const joinGame = (payload, scope) => (dispatch, getState) => {
    dispatch({ type: REQUEST_JOIN_GAME, payload, scope });

    fetch(getEndpoint('joinGame', payload), {
        method: 'POST',
        headers: getHeaders(getState().credentials),
    })
        .then(response => response.json()).then((response) => {
            if (response.error) dispatch(failJoinGame(response, scope));
            else dispatch(successJoinGame(response, scope));
        });
};

export function successJoinGame(response, scope) {
    return (dispatch) => {
        dispatch({
            type: SUCCESS_JOIN_GAME,
            receivedAt: Date.now(),
            response,
            scope,
        });
    };
}

export function failJoinGame(response, scope) {
    return {
        type: FAIL_JOIN_GAME,
        receivedAt: Date.now(),
        error: response.error,
        scope,
    };
}

export const REQUEST_READY_GAME = 'REQUEST_READY_GAME';
export const SUCCESS_READY_GAME = 'SUCCESS_READY_GAME';
export const FAIL_READY_GAME = 'FAIL_READY_GAME';

export const readyGame = (payload, scope) => (dispatch, getState) => {
    dispatch({ type: REQUEST_READY_GAME, payload, scope });

    fetch(getEndpoint('readyGame', payload), {
        method: 'POST',
        headers: getHeaders(getState().credentials),
        body: JSON.stringify({ isReady: payload.isReady }),
    })
        .then(response => response.json()).then((response) => {
            if (response.error) dispatch(failReadyGame(response, scope));
            else dispatch(successReadyGame(response, scope));
        });
};

function successReadyGame(response, scope) {
    return (dispatch) => {
        dispatch({
            type: SUCCESS_READY_GAME,
            receivedAt: Date.now(),
            response,
            scope,
        });
    };
}

function failReadyGame(response, scope) {
    return {
        type: FAIL_READY_GAME,
        receivedAt: Date.now(),
        error: response.error,
        scope,
    };
}

export const REQUEST_KICK_USER = 'REQUEST_KICK_USER';
export const SUCCESS_KICK_USER = 'SUCCESS_KICK_USER';
export const FAIL_KICK_USER = 'FAIL_KICK_USER';

export const kickUser = (payload, scope, then) => (dispatch, getState) => {
    dispatch({ type: REQUEST_KICK_USER, payload, scope });

    fetch(getEndpoint('kickGameUser', payload), {
        method: 'POST',
        headers: getHeaders(getState().credentials),
        body: JSON.stringify({ userId: payload.userId }),
    }).then(response => response.json()).then(response => then(response));
};

export function successKickUser(response, scope, then) {
    return (dispatch) => {
        response.users = normalizeResponseUsersAsEntity(response.users);

        const normalized = normalize(response, gameSchema);
        dispatch(receiveEntities(normalized.entities));

        dispatch({
            type: SUCCESS_KICK_USER,
            receivedAt: Date.now(),
            response,
            scope,
            then,
        });
    };
}

export function failKickUser(response, scope, then) {
    return {
        type: FAIL_KICK_USER,
        receivedAt: Date.now(),
        error: response.error,
        scope,
        then,
    };
}

export const REQUEST_BAN_USER = 'REQUEST_BAN_USER';
export const SUCCESS_BAN_USER = 'SUCCESS_BAN_USER';
export const FAIL_BAN_USER = 'FAIL_BAN_USER';

export const banUser = (payload, scope, then) => (dispatch, getState) => {
    dispatch({ type: REQUEST_BAN_USER, payload, scope });

    fetch(getEndpoint('banGameUser', payload), {
        method: 'POST',
        headers: getHeaders(getState().credentials),
        body: JSON.stringify({ userId: payload.userId, isBanned: payload.isBanned }),
    }).then(response => response.json()).then(response => then(response));
};

export function successBanUser(response, scope, then) {
    return (dispatch) => {
        response.users = normalizeResponseUsersAsEntity(response.users);

        const normalized = normalize(response, gameSchema);
        dispatch(receiveEntities(normalized.entities));

        dispatch({
            type: SUCCESS_BAN_USER,
            receivedAt: Date.now(),
            response,
            scope,
            then,
        });
    };
}

export function failBanUser(response, scope, then) {
    return {
        type: FAIL_BAN_USER,
        receivedAt: Date.now(),
        error: response.error,
        scope,
        then,
    };
}

export const REQUEST_START_GAME = 'REQUEST_START_GAME';
export const SUCCESS_START_GAME = 'SUCCESS_START_GAME';
export const FAIL_START_GAME = 'FAIL_START_GAME';

export const startGame = (payload, scope, then) => (dispatch, getState) => {
    dispatch({ type: REQUEST_START_GAME, payload, scope });

    fetch(getEndpoint('startGame', payload), {
        method: 'POST',
        headers: getHeaders(getState().credentials),
    }).then(response => response.json()).then(response => then(response));
};

export function successStartGame(response, scope, then) {
    return (dispatch) => {
        response.users = normalizeResponseUsersAsEntity(response.users);

        const normalized = normalize(response, gameSchema);
        dispatch(receiveEntities(normalized.entities));

        dispatch({
            type: SUCCESS_START_GAME,
            receivedAt: Date.now(),
            response,
            scope,
            then,
        });
    };
}

export function failStartGame(response, scope, then) {
    return {
        type: FAIL_START_GAME,
        receivedAt: Date.now(),
        error: response.error,
        scope,
        then,
    };
}
