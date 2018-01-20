import React from 'react';
import { persistStore } from 'redux-persist';
import { toast } from 'react-toastify';
import store from '../index';
import { getName } from '../helpers/user';
import { getHeaders, wsConnect, wsDisconnect } from '../helpers/nes';
import ToastSignOutSuccess from '../components/Toast/SignOut/Success';

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

export function successRegister(json, scope) {
    const { _id, profile, token } = json;
    return (dispatch) => {
        dispatch({
            type: SUCCESS_REGISTER,
            authenticatedAt: Date.now(),
            _id,
            profile,
            token,
            scope,
        });
    };
}

export function failRegister() {
    return { type: FAIL_REGISTER };
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
