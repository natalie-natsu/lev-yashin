import { createReducer } from './utilities';
import { SIGN_OUT, SUCCESS_SIGN_IN } from '../actions/authentication';
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

function updateCrendentials(state, { _id, authenticatedAt, token }) {
    return {
        ...state,
        _id,
        authenticatedAt,
        token,
    };
}


function updateProfile(state, { data }) {
    return {
        ...state,
        profile: data,
    };
}

export default createReducer(initialCredentialsState, {
    [SIGN_OUT]: resetCredentials,
    [SUCCESS_SIGN_IN]: updateCrendentials,
    [SUCCESS_FETCH_PROFILE]: updateProfile,
});
