import { createReducer } from '../utilities';
import { routes } from '../../helpers/routes';
import {
    FAIL_FETCH_GAME, FAIL_SUBSCRIBE_GAME, REFRESH_GAME,
    REQUEST_FETCH_GAME, REQUEST_SUBSCRIBE_GAME,
    SUCCESS_FETCH_GAME, SUCCESS_SUBSCRIBE_GAME,
} from '../../actions/entities/game';

const initialGameState = {
    error: false,
    isFetching: false,
    needRefresh: false,
    lastResponse: null,
    updatedAt: null,
};

function refreshGame(state) {
    return {
        ...state,
        needRefresh: true,
    };
}

function requestFetchGame(state) {
    return {
        ...state,
        isFetching: true,
        needRefresh: false,
    };
}

function successFetchGame(state, { response }) {
    return {
        ...state,
        error: null,
        isFetching: false,
        lastResponse: response,
        needRefresh: false,
        updatedAt: Date.now(),
    };
}

function failFetchGame(state, { response }) {
    return {
        ...state,
        error: true,
        isFetching: false,
        lastResponse: response,
        needRefresh: false,
        updatedAt: Date.now(),
    };
}

export default createReducer(initialGameState, {
    [REFRESH_GAME]: refreshGame,
    [REQUEST_FETCH_GAME]: requestFetchGame,
    [REQUEST_SUBSCRIBE_GAME]: requestFetchGame,
    [SUCCESS_FETCH_GAME]: successFetchGame,
    [SUCCESS_SUBSCRIBE_GAME]: successFetchGame,
    [FAIL_FETCH_GAME]: failFetchGame,
    [FAIL_SUBSCRIBE_GAME]: failFetchGame,
}, routes.game.read);
