import React from 'react';
import { toast } from 'react-toastify';
import { createReducer } from '../utilities';
import scopes from '../../scopes';

import { SUCCESS_FETCH_PROFILE } from '../../actions/entities/user';
import Success from '../../components/Toast/FetchProfile/Success';

const initialHomeState = { toasted: false };

function notifyFetchProfileSuccess(state, { data }) {
    toast(<Success email={data.email} picture={data.picture} {...data} />, {
        position: toast.POSITION.BOTTOM_RIGHT,
    });
    return { ...state, toasted: true };
}

export default createReducer(initialHomeState, {
    [SUCCESS_FETCH_PROFILE]: notifyFetchProfileSuccess,
}, scopes.pages.Home);
