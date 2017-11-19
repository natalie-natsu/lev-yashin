import { createReducer } from './utilities';
import { FAIL_SIGN_IN, REQUEST_SIGN_IN, SIGN_OUT, SUCCESS_SIGN_IN } from '../actions/authentication';
import { FAIL_FETCH_PROFILE, SUCCESS_FETCH_PROFILE } from '../actions/entities/user';

const initialAuthenticationState = {
    actionDetails: {},
    authenticatedAt: null,
    errors: null,
    isAuthenticated: false,
    isLoaded: false,
    isSigningIn: false,
    success: false,
    token: null,
    user: null,
    userId: null,
};

function requestSignIn(state, { payload, type }) {
    return {
        ...initialAuthenticationState,
        actionDetails: { payload, type },
        isSigningIn: true,
    };
}

function successSignIn(state, { authenticatedAt, payload, token, type, userId }) {
    return {
        ...state,
        actionDetails: { payload, type },
        authenticatedAt,
        errors: null,
        isAuthenticated: true,
        isSigningIn: false,
        success: true,
        token,
        userId,
    };
}

function failSignIn(state, { errors }) {
    return {
        ...state,
        isSigningIn: false,
        success: false,
        errors,
    };
}

function resetAuthentication() {
    return initialAuthenticationState;
}

function successFetchProfile(state, action) {
    return {
        ...state,
        isLoaded: true,
        user: action.user,
    };
}

function failFetchProfile(state, { errors }) {
    return {
        ...state,
        success: false,
        errors,
    };
}

export default createReducer(initialAuthenticationState, {
    [REQUEST_SIGN_IN]: requestSignIn,
    [SUCCESS_SIGN_IN]: successSignIn,
    [FAIL_SIGN_IN]: failSignIn,
    [SIGN_OUT]: resetAuthentication,
    [SUCCESS_FETCH_PROFILE]: successFetchProfile,
    [FAIL_FETCH_PROFILE]: failFetchProfile,
});
