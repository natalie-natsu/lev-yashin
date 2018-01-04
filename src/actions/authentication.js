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
        const { isFetching, needRefresh } = getState().profile;
        const data = getState().credentials.profile;

        if (!isFetching && (needRefresh || !data)) { dispatch(fetchProfile()); }
    };
}
