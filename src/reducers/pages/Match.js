import { createReducer } from '../utilities';
import { FAIL_FETCH_MATCH, REQUEST_FETCH_MATCH, SUCCESS_FETCH_MATCH } from '../../actions/entities/match';

const initialMatchState = {
    id: null,
    isFetching: false,
    needRefresh: false,
    receivedAt: null,
};

function failFetchMatch(state) {
    return {
        ...state,
        isFetching: false,
        needRefresh: false,
    };
}

function requestFetchMatch(state) {
    return {
        ...state,
        isFetching: true,
        needRefresh: false,
    };
}

function successFetchMatch(state, actions) {
    return {
        ...state,
        id: actions.id,
        isFetching: false,
        needRefresh: false,
        receivedAt: Date.now(),
    };
}

export default createReducer(initialMatchState, {
    [FAIL_FETCH_MATCH]: failFetchMatch,
    [REQUEST_FETCH_MATCH]: requestFetchMatch,
    [SUCCESS_FETCH_MATCH]: successFetchMatch,
});
