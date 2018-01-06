import { createReducer } from './utilities';
import { FAIL_SIGN_IN, REQUEST_SIGN_IN, SIGN_OUT, SUCCESS_SIGN_IN } from '../actions/authentication';

const initialAuthenticationState = {
    actionDetails: {},
    authenticatedAt: null,
    errors: null,
    isAuthenticated: false,
    isSigningIn: false,
    success: false,
};

function requestSignIn(state, { payload, type }) {
    return {
        ...initialAuthenticationState,
        actionDetails: { payload, type },
        isSigningIn: true,
    };
}

function successSignIn(state, { authenticatedAt, payload, type }) {
    return {
        ...state,
        actionDetails: { payload, type },
        authenticatedAt,
        errors: null,
        isAuthenticated: true,
        isSigningIn: false,
        success: true,
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

export default createReducer(initialAuthenticationState, {
    [REQUEST_SIGN_IN]: requestSignIn,
    [SUCCESS_SIGN_IN]: successSignIn,
    [FAIL_SIGN_IN]: failSignIn,
    [SIGN_OUT]: resetAuthentication,
});
