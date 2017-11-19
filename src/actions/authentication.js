import { persistStore } from 'redux-persist';
import store from '../index';
import { fetchProfile } from './entities/user';

export const REQUEST_SIGN_IN = 'REQUEST_SIGN_IN';
export const SUCCESS_SIGN_IN = 'SUCCESS_SIGN_IN';
export const FAIL_SIGN_IN = 'FAIL_SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export function requestSignIn() {
    return {
        type: REQUEST_SIGN_IN,
    };
}

export function successSignIn(token, userId) {
    return (dispatch) => {
        dispatch({
            type: SUCCESS_SIGN_IN,
            authenticatedAt: Date.now(),
            token,
            userId,
        });
    };
}

export function failSignIn() {
    return {
        type: FAIL_SIGN_IN,
    };
}

export function signOut() {
    persistStore(store).purge(['authentication']);
    return {
        type: SIGN_OUT,
    };
}

export function fetchProfileIfNeeded() {
    return (dispatch, getState) => {
        const { isSigningIn, isLoaded, userId } = getState().authentication;

        if (!isSigningIn && userId && !isLoaded) { dispatch(fetchProfile()); }
    };
}
