import React from 'react';
import { persistStore } from 'redux-persist';
import { toast } from 'react-toastify';
import store from '../index';
import { fetchProfile } from './entities/user';
import { getName } from '../helpers/user';
import ToastSignOutSuccess from '../components/Toast/SignOut/Success';

export const REQUEST_SIGN_IN = 'REQUEST_SIGN_IN';
export const SUCCESS_SIGN_IN = 'SUCCESS_SIGN_IN';
export const FAIL_SIGN_IN = 'FAIL_SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export function requestSignIn() {
    return { type: REQUEST_SIGN_IN };
}

export function successSignIn(_id, token) {
    return (dispatch) => {
        dispatch({
            type: SUCCESS_SIGN_IN,
            authenticatedAt: Date.now(),
            _id,
            token,
        });
    };
}

export function failSignIn() {
    return { type: FAIL_SIGN_IN };
}

export function signOut() {
    return (dispatch, getState) => {
        const { email, userName, firstName, lastName } = getState().credentials.profile;
        const name = getName(email, userName, firstName, lastName);

        persistStore(store).purge(['credentials', 'profile']);
        toast(<ToastSignOutSuccess name={name} />, { position: toast.POSITION.BOTTOM_RIGHT });
        dispatch({ type: SIGN_OUT });
    };
}

export function fetchProfileIfNeeded(scope) {
    return (dispatch, getState) => {
        const { isFetching, needRefresh } = getState().profile;
        const data = getState().credentials.profile;

        if (!isFetching && (needRefresh || !data)) { dispatch(fetchProfile(scope)); }
    };
}
