import { createReducer } from '../utilities';
import { SIGN_OUT, SUCCESS_SIGN_IN } from '../../actions/authentication';
import {
    FAIL_FETCH_PROFILE, REFRESH_PROFILE,
    REQUEST_FETCH_PROFILE, SUCCESS_FETCH_PROFILE,
} from '../../actions/entities/user';
import { routes } from '../../helpers/routes';

const initialMeState = {
    error: false,
    isFetching: false,
    needRefresh: false,
    lastResponse: null,
    updatedAt: null,
};

function refreshProfile(state) {
    return {
        ...state,
        needRefresh: true,
    };
}

function requestFetchProfile(state) {
    return {
        ...state,
        isFetching: true,
        needRefresh: false,
    };
}

function successFetchProfile(state, { response }) {
    return {
        ...state,
        error: null,
        isFetching: false,
        lastResponse: response,
        needRefresh: false,
        updatedAt: Date.now(),
    };
}

function failFetchProfile(state, { response }) {
    return {
        ...state,
        error: true,
        isFetching: false,
        lastResponse: response,
        needRefresh: false,
        updatedAt: Date.now(),
    };
}

function profileWasUpdated(state) {
    return {
        ...state,
        needRefresh: false,
        updatedAt: Date.now(),
    };
}

function resetState() { return initialMeState; }
export default createReducer(initialMeState, {
    [REFRESH_PROFILE]: refreshProfile,
    [REQUEST_FETCH_PROFILE]: requestFetchProfile,
    [SUCCESS_FETCH_PROFILE]: successFetchProfile,
    [FAIL_FETCH_PROFILE]: failFetchProfile,

    [SIGN_OUT]: resetState,
    [SUCCESS_SIGN_IN]: profileWasUpdated,
}, routes.me);
