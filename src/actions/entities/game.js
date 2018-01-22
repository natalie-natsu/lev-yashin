import { normalize } from 'normalizr';
import { receiveEntities } from '../entities';
import { gameSchema } from '../../schemas/game';

import { getEndpoint, getHeaders } from '../../helpers/endpoint';

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
        response.users = response.users.map(user => ({
            _id: user._id,
            profile: { userName: user.userName, picture: user.picture },
        }));

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
        response.users = response.users.map(user => ({
            _id: user._id,
            profile: { userName: user.userName, picture: user.picture },
        }));

        const normalized = normalize(response, gameSchema);
        dispatch(receiveEntities(normalized.entities));
    };
}

export const REQUEST_CREATE_GAME = 'REQUEST_CREATE_GAME';
export const SUCCESS_CREATE_GAME = 'SUCCESS_CREATE_GAME';
export const FAIL_CREATE_GAME = 'FAIL_CREATE_GAME';

export function successCreateGame(response, scope) {
    return (dispatch) => {
        response.users = response.users.map(user => ({
            _id: user._id,
            profile: { userName: user.userName, picture: user.picture },
        }));

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
