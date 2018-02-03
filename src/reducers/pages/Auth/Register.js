import React from 'react';
import { toast } from 'react-toastify';
import { createReducer } from '../../utilities';

import { SUCCESS_REGISTER } from '../../../actions/authentication';
import Success from '../../../components/Toast/Register/Success';

const initialHomeState = { hasRegistered: false };

function notifyFetchProfileSuccess(state, { profile }) {
    toast(<Success email={profile.email} picture={profile.picture} {...profile} />, {
        position: toast.POSITION.BOTTOM_RIGHT,
    });
    return { ...state, hasRegistered: true };
}

export default createReducer(initialHomeState, {
    [SUCCESS_REGISTER]: notifyFetchProfileSuccess,
});
