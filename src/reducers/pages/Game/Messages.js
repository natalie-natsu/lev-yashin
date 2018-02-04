import { createReducer } from '../../utilities/index';
import { routes } from '../../../helpers/routes';
import {
    FAIL_FETCH_MESSAGES, FAIL_SUBSCRIBE_MESSAGES, FAIL_SEND_MESSAGE,
    REQUEST_FETCH_MESSAGES, REQUEST_SUBSCRIBE_MESSAGES, REQUEST_SEND_MESSAGE,
    SUCCESS_FETCH_MESSAGES, SUCCESS_SUBSCRIBE_MESSAGES, SUCCESS_SEND_MESSAGE,
    REFRESH_MESSAGES,
} from '../../../actions/entities/messages';

const initialMessagesState = {
    error: false,
    ids: [],
    isFetching: false,
    isSending: false,
    lastResponse: null,
    limit: 50,
    needRefresh: false,
    skip: 0,
    totalMessages: false,
    updatedAt: null,
};

function refreshMessages(state) {
    return {
        ...state,
        needRefresh: true,
    };
}

function requestFetchMessages(state) {
    return {
        ...state,
        isFetching: true,
        needRefresh: false,
    };
}

function successFetchMessages(state, { ids, limit, response, skip, totalMessages }) {
    return {
        ...state,
        error: null,
        ids: Array.from(new Set(state.ids.concat(ids))),
        isFetching: false,
        lastResponse: response,
        limit,
        needRefresh: false,
        skip,
        totalMessages,
        updatedAt: Date.now(),
    };
}

function failFetchMessages(state, { response }) {
    return {
        ...state,
        error: true,
        isFetching: false,
        lastResponse: response,
        needRefresh: false,
        updatedAt: Date.now(),
    };
}

function requestSendMessage(state) {
    return {
        ...state,
        isSending: true,
    };
}

function successSendMessage(state, { ids, response }) {
    return {
        ...state,
        error: null,
        ids: Array.from(new Set(state.ids.concat(ids))),
        isSending: false,
        lastResponse: response,
    };
}

function failSendMessage(state, { response }) {
    return {
        ...state,
        error: true,
        isSending: false,
        lastResponse: response,
    };
}

export default createReducer(initialMessagesState, {
    [REFRESH_MESSAGES]: refreshMessages,
    [REQUEST_FETCH_MESSAGES]: requestFetchMessages,
    [REQUEST_SUBSCRIBE_MESSAGES]: requestFetchMessages,
    [SUCCESS_FETCH_MESSAGES]: successFetchMessages,
    [SUCCESS_SUBSCRIBE_MESSAGES]: successFetchMessages,
    [FAIL_FETCH_MESSAGES]: failFetchMessages,
    [FAIL_SUBSCRIBE_MESSAGES]: failFetchMessages,

    [REQUEST_SEND_MESSAGE]: requestSendMessage,
    [SUCCESS_SEND_MESSAGE]: successSendMessage,
    [FAIL_SEND_MESSAGE]: failSendMessage,
}, routes.game.messages);
