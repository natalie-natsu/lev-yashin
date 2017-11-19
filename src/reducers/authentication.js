import { createReducer } from './utilities';
import { REQUEST_SIGN_IN, SUCCESS_SIGN_IN, FAIL_SIGN_IN, SIGN_OUT } from '../actions/authentication';
import { SUCCESS_FETCH_PROFILE } from '../actions/entities/user';

const initialAuthenticationState = {
    authenticatedAt: null,
    isAuthenticated: false,
    isLoaded: false,
    isSigningIn: false,
    token: null,
    user: null,
    userId: null,
};

function requestSignIn() {
    return {
        ...initialAuthenticationState,
        isSigningIn: true,
    };
}

function successSignIn(state, action) {
    const { authenticatedAt, token, userId } = action;
    return {
        ...state,
        authenticatedAt,
        isAuthenticated: true,
        isSigningIn: false,
        token,
        userId,
    };
}

function failSignIn(state, action) {
    return {
        ...state,
        isSigningIn: false,
        errors: action.errors,
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

export default createReducer(initialAuthenticationState, {
    [REQUEST_SIGN_IN]: requestSignIn,
    [SUCCESS_SIGN_IN]: successSignIn,
    [FAIL_SIGN_IN]: failSignIn,
    [SIGN_OUT]: resetAuthentication,
    [SUCCESS_FETCH_PROFILE]: successFetchProfile,
});
