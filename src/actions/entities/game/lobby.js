import { getEndpoint, getHeaders } from '../../../helpers/endpoint';

export const REQUEST_JOIN_GAME = 'REQUEST_JOIN_GAME';
export const SUCCESS_JOIN_GAME = 'SUCCESS_JOIN_GAME';
export const FAIL_JOIN_GAME = 'FAIL_JOIN_GAME';

export const joinGame = (payload, scope, onSuccess, onFailure) => (dispatch, getState) => {
    dispatch({ type: REQUEST_JOIN_GAME, payload, scope });

    fetch(getEndpoint('joinGame', payload), {
        method: 'POST',
        headers: getHeaders(getState().credentials),
    })
        .then(response => response.json()).then((response) => {
            if (response.error) {
                dispatch(failJoinGame(response, scope));
                if (onFailure) { onFailure(response); }
            } else {
                dispatch(successJoinGame(response, scope));
                if (onSuccess) { onSuccess(response); }
            }
        });
};

function successJoinGame(response, scope) {
    return (dispatch) => {
        dispatch({
            type: SUCCESS_JOIN_GAME,
            receivedAt: Date.now(),
            response,
            scope,
        });
    };
}

function failJoinGame(response, scope) {
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

export const readyGame = (payload, scope, onSuccess, onFailure) => (dispatch, getState) => {
    dispatch({ type: REQUEST_READY_GAME, payload, scope });

    fetch(getEndpoint('readyGame', payload), {
        method: 'POST',
        headers: getHeaders(getState().credentials),
        body: JSON.stringify({ isReady: payload.isReady }),
    })
        .then(response => response.json()).then((response) => {
            if (response.error) {
                dispatch(failReadyGame(response, scope));
                if (onFailure) { onFailure(response); }
            } else {
                dispatch(successReadyGame(response, scope));
                if (onSuccess) { onSuccess(response); }
            }
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
