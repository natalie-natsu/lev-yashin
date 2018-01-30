import { createReducer } from '../../utilities/index';
import { routes } from '../../../helpers/routes';
import {
    FAIL_JOIN_GAME, REQUEST_JOIN_GAME, SUCCESS_JOIN_GAME,
    FAIL_READY_GAME, REQUEST_READY_GAME, SUCCESS_READY_GAME,
} from '../../../actions/entities/game/lobby';

const initialLobbyState = {
    isGettingReady: false,
    isJoining: false,
};

function requestJoinGame(state) {
    return {
        ...state,
        isJoining: true,
    };
}

function successJoinGame(state) {
    return {
        ...state,
        isJoining: false,
    };
}

function failJoinGame(state) {
    return {
        ...state,
        isJoining: false,
    };
}

function requestReadyGame(state) {
    return {
        ...state,
        isGettingReady: true,
    };
}

function successReadyGame(state) {
    return {
        ...state,
        isGettingReady: false,
    };
}

function failReadyGame(state) {
    return {
        ...state,
        isGettingReady: false,
    };
}

export default createReducer(initialLobbyState, {
    [REQUEST_JOIN_GAME]: requestJoinGame,
    [SUCCESS_JOIN_GAME]: successJoinGame,
    [FAIL_JOIN_GAME]: failJoinGame,

    [REQUEST_READY_GAME]: requestReadyGame,
    [SUCCESS_READY_GAME]: successReadyGame,
    [FAIL_READY_GAME]: failReadyGame,
}, routes.game.read);
