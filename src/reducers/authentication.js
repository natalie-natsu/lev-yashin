import { createReducer } from './utilities';
import {
    FAIL_SIGN_IN, REQUEST_SIGN_IN, SIGN_OUT, SUCCESS_SIGN_IN,
    FAIL_REGISTER, REQUEST_REGISTER, SUCCESS_REGISTER,
} from '../actions/authentication';

const initialAuthenticationState = {
    actionDetails: {},
    authenticatedAt: null,
    errors: null,
    isAuthenticated: false,
    isSigningIn: false,
    isRegistering: false,
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

function requestRegister(state, { payload, type }) {
    return {
        ...initialAuthenticationState,
        actionDetails: { payload, type },
        isRegistering: true,
    };
}

function successRegister(state, { authenticatedAt, payload, type }) {
    return {
        ...state,
        actionDetails: { payload, type },
        authenticatedAt,
        errors: null,
        isAuthenticated: true,
        isRegistering: false,
        success: true,
    };
}

function failRegister(state, { errors }) {
    return {
        ...state,
        isRegistering: false,
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

    [REQUEST_REGISTER]: requestRegister,
    [SUCCESS_REGISTER]: successRegister,
    [FAIL_REGISTER]: failRegister,

    [SIGN_OUT]: resetAuthentication,
});
