import React from 'react';
import { persistStore } from 'redux-persist';
import { toast } from 'react-toastify';
import store from '../index';
import { getName } from '../helpers/user';
import { getHeaders, wsConnect, wsDisconnect } from '../helpers/nes';
import { headers, getEndpoint } from '../helpers/endpoint';
import ToastSignOutSuccess from '../components/Toast/SignOut/Success';
import { successFetchUser } from './entities/user';

/**
 * SIGN_IN
 */
export const REQUEST_SIGN_IN = 'REQUEST_SIGN_IN';
export const SUCCESS_SIGN_IN = 'SUCCESS_SIGN_IN';
export const FAIL_SIGN_IN = 'FAIL_SIGN_IN';

export function requestSignIn() {
    return { type: REQUEST_SIGN_IN };
}

export function successSignIn(json, scope) {
    const { _id, profile, token } = json;
    return (dispatch) => {
        wsConnect(getHeaders(json));
        dispatch(successFetchUser(json));
        dispatch({
            type: SUCCESS_SIGN_IN,
            authenticatedAt: Date.now(),
            _id,
            profile,
            token,
            scope,
        });
    };
}

export function failSignIn() {
    return { type: FAIL_SIGN_IN };
}

/**
* REGISTER
*/
export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const SUCCESS_REGISTER = 'SUCCESS_REGISTER';
export const FAIL_REGISTER = 'FAIL_REGISTER';

export function requestRegister() {
    return { type: REQUEST_REGISTER };
}

export const register = (payload, scope, then = () => false) => (dispatch) => {
    dispatch({ type: REQUEST_REGISTER, payload, scope });

    fetch(getEndpoint('register', payload), {
        method: 'POST',
        headers,
        body: JSON.stringify({ email: payload.email, password: payload.password }),
    }).then(response => response.json()).then(response => then(response));
};

export function successRegister(response, scope, then) {
    const { _id, profile, token } = response;
    return (dispatch) => {
        dispatch(successFetchUser(response));
        dispatch({
            type: SUCCESS_REGISTER,
            authenticatedAt: Date.now(),
            _id,
            profile,
            token,
            scope,
            then,
        });
    };
}

export function failRegister(response, scope, then) {
    return {
        type: FAIL_REGISTER,
        response,
        scope,
        then,
    };
}

/**
 * RESET CREDENTIALS
 */
export const RESET_CREDENTIALS = 'RESET_CREDENTIALS';

export function resetCredentials() {
    return (dispatch) => {
        wsDisconnect();
        persistStore(store).purge(['credentials', 'profile']);
        dispatch({ type: RESET_CREDENTIALS });
    };
}

/**
 * SIGN_OUT
 */
export const SIGN_OUT = 'SIGN_OUT';

export function signOut() {
    return (dispatch, getState) => {
        const name = getName(getState().credentials.profile);

        wsDisconnect();
        persistStore(store).purge(['credentials', 'profile']);
        toast(<ToastSignOutSuccess name={name} />, { position: toast.POSITION.BOTTOM_RIGHT });
        dispatch({ type: SIGN_OUT });
    };
}
