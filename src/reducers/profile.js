import { createReducer } from './utilities';
import { SIGN_OUT } from '../actions/authentication';
import { FAIL_FETCH_PROFILE, REQUEST_FETCH_PROFILE, SUCCESS_FETCH_PROFILE } from '../actions/entities/user';

const initialProfileState = {
    errors: null,
    isFetching: false,
    needRefresh: false,
    success: false,
};

function resetProfile() {
    return initialProfileState;
}

function requestFetchProfile(state) {
    return {
        ...state,
        isFetching: true,
        needRefresh: false,
    };
}

function successFetchProfile(state) {
    return {
        ...state,
        errors: null,
        isFetching: false,
        needRefresh: false,
        success: true,
    };
}

function failFetchProfile(state, { errors }) {
    return {
        ...state,
        errors,
        isFetching: false,
        needRefresh: false,
        success: false,
    };
}

export default createReducer(initialProfileState, {
    [SIGN_OUT]: resetProfile,
    [REQUEST_FETCH_PROFILE]: requestFetchProfile,
    [SUCCESS_FETCH_PROFILE]: successFetchProfile,
    [FAIL_FETCH_PROFILE]: failFetchProfile,
});
