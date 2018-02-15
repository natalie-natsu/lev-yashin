import { normalize } from 'normalizr';
import { receiveEntities } from '../entities';
import { gameSchema } from '../../schemas/game';

import { getEndpoint, getHeaders } from '../../helpers/endpoint';
import { client } from '../../helpers/nes';

export function updateGameEntity(response) {
    return (dispatch) => {
        const normalized = normalize(response, gameSchema);
        dispatch(receiveEntities(normalized.entities));
    };
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
        dispatch(updateGameEntity(response));
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

export const REQUEST_SUBSCRIBE_GAME = 'REQUEST_SUBSCRIBE_GAME';
export const SUCCESS_SUBSCRIBE_GAME = 'SUCCESS_SUBSCRIBE_GAME';
export const FAIL_SUBSCRIBE_GAME = 'FAIL_SUBSCRIBE_GAME';

export const subscribeGame = (payload, scope, then) => (dispatch) => {
    dispatch({ type: REQUEST_SUBSCRIBE_GAME, payload, scope });
    client.subscribe(`/games/${payload.id}`, update => then(update));
};

export function successSubscribeGame(response, scope, then) {
    return (dispatch) => {
        dispatch(updateGameEntity(response));
        dispatch({
            type: SUCCESS_SUBSCRIBE_GAME,
            receivedAt: Date.now(),
            response,
            scope,
            then,
        });
    };
}

export function failSubscribeGame(response, scope, then) {
    return {
        type: FAIL_SUBSCRIBE_GAME,
        receivedAt: Date.now(),
        error: response.error,
        scope,
        then,
    };
}

export const REQUEST_CREATE_GAME = 'REQUEST_CREATE_GAME';
export const SUCCESS_CREATE_GAME = 'SUCCESS_CREATE_GAME';
export const FAIL_CREATE_GAME = 'FAIL_CREATE_GAME';

export function successCreateGame(response, scope, then) {
    return (dispatch) => {
        dispatch(updateGameEntity(response));
        dispatch({
            type: SUCCESS_CREATE_GAME,
            receivedAt: Date.now(),
            response,
            scope,
            then,
        });
    };
}

export function failCreateGame(response, scope, then) {
    return {
        type: FAIL_CREATE_GAME,
        receivedAt: Date.now(),
        error: response.error,
        scope,
        then,
    };
}

export const REQUEST_UPDATE_GAME = 'REQUEST_UPDATE_GAME';
export const SUCCESS_UPDATE_GAME = 'SUCCESS_UPDATE_GAME';
export const FAIL_UPDATE_GAME = 'FAIL_UPDATE_GAME';

export function successUpdateGame(response, scope, then) {
    return (dispatch) => {
        dispatch(updateGameEntity(response));
        dispatch({
            type: SUCCESS_UPDATE_GAME,
            receivedAt: Date.now(),
            response,
            scope,
            then,
        });
    };
}

export function failUpdateGame(response, scope, then) {
    return {
        type: FAIL_UPDATE_GAME,
        receivedAt: Date.now(),
        error: response.error,
        scope,
        then,
    };
}
