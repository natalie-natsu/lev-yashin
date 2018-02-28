import { createReducer } from './utilities/index';
import { FAIL_FETCH_MATCHES, REQUEST_FETCH_MATCHES, SUCCESS_FETCH_MATCHES } from '../actions/entities/match';

const initialFIFAState = {
    matches: [],
    isFetching: false,
    needRefresh: false,
    receivedAt: null,
};

function failFetchMatches(state) {
    return {
        ...state,
        isFetching: false,
        needRefresh: false,
    };
}

function requestFetchMatches(state) {
    return {
        ...state,
        isFetching: true,
        needRefresh: false,
    };
}

function successFetchMatches(state, actions) {
    return {
        ...state,
        matches: actions.ids,
        isFetching: false,
        needRefresh: false,
        receivedAt: Date.now(),
    };
}

export default createReducer(initialFIFAState, {
    [FAIL_FETCH_MATCHES]: failFetchMatches,
    [REQUEST_FETCH_MATCHES]: requestFetchMatches,
    [SUCCESS_FETCH_MATCHES]: successFetchMatches,
});
