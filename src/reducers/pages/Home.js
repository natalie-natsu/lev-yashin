import React from 'react';
import { toast } from 'react-toastify';
import { createReducer } from '../utilities';
import scopes from '../../scopes';

import { SUCCESS_SIGN_IN } from '../../actions/authentication';
import Success from '../../components/Toast/SignIn/Success';

const initialHomeState = { hasSignedIn: false };

function notifyFetchProfileSuccess(state, { profile }) {
    toast(<Success email={profile.email} picture={profile.picture} {...profile} />, {
        position: toast.POSITION.BOTTOM_RIGHT,
    });
    return { ...state, hasSignedIn: true };
}

export default createReducer(initialHomeState, {
    [SUCCESS_SIGN_IN]: notifyFetchProfileSuccess,
}, scopes.pages.Home);
