import { createReducer } from './utilities';
import { SIGN_OUT, SUCCESS_REGISTER, SUCCESS_SIGN_IN } from '../actions/authentication';
import { SUCCESS_FETCH_PROFILE } from '../actions/entities/user';

const initialCredentialsState = {
    _id: null,
    authenticatedAt: null,
    profile: null,
    token: null,
};

function resetCredentials() {
    return initialCredentialsState;
}

function updateCredentials(state, { _id, authenticatedAt, profile, token }) {
    return {
        ...state,
        _id,
        authenticatedAt,
        profile,
        token,
    };
}

function updateProfile(state, { response }) {
    return {
        ...state,
        profile: response,
    };
}

export default createReducer(initialCredentialsState, {
    [SIGN_OUT]: resetCredentials,
    [SUCCESS_SIGN_IN]: updateCredentials,
    [SUCCESS_REGISTER]: updateCredentials,
    [SUCCESS_FETCH_PROFILE]: updateProfile,
});
