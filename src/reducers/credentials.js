import { createReducer } from './utilities';
import { RESET_CREDENTIALS, SIGN_OUT, SUCCESS_REGISTER, SUCCESS_SIGN_IN } from '../actions/authentication';
import { SUCCESS_FETCH_PROFILE, SUCCESS_RESET_PASSWORD, SUCCESS_UPDATE_PROFILE } from '../actions/entities/user';

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

function updateToken(state, { response }) {
    return {
        ...state,
        token: response.token,
    };
}

export default createReducer(initialCredentialsState, {
    [SIGN_OUT]: resetCredentials,
    [RESET_CREDENTIALS]: resetCredentials,
    [SUCCESS_SIGN_IN]: updateCredentials,
    [SUCCESS_REGISTER]: updateCredentials,
    [SUCCESS_FETCH_PROFILE]: updateProfile,
    [SUCCESS_UPDATE_PROFILE]: updateProfile,
    [SUCCESS_RESET_PASSWORD]: updateToken,
});
