import { normalize } from 'normalizr';
import { receiveEntities } from '../entities';
import { gameSchema } from '../../schemas/game';

export const REQUEST_CREATE_GAME = 'REQUEST_CREATE_GAME';
export const SUCCESS_CREATE_GAME = 'SUCCESS_CREATE_GAME';
export const FAIL_CREATE_GAME = 'FAIL_CREATE_GAME';

export function successCreateGame(response, scope) {
    return (dispatch) => {
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
