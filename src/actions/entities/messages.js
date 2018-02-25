import { normalize } from 'normalizr';
import { receiveEntities } from '../entities';
import { messageListSchema, messageSchema } from '../../schemas/message';

import { getEndpoint, getHeaders } from '../../helpers/endpoint';
import { client } from '../../helpers/nes';
import { userListSchema, userSchema } from '../../schemas/user';

export function normalizeMessageEntities(response) {
    return normalize(response, {
        messages: messageListSchema,
        users: userListSchema,
    });
}

export function updateMessageEntities(response, normalized = this.normalizeMessageEntities(response)) {
    return (dispatch) => {
        dispatch(receiveEntities(normalized.entities));
    };
}

export const REFRESH_MESSAGES = 'REFRESH_MESSAGES';
export const REQUEST_FETCH_MESSAGES = 'REQUEST_FETCH_MESSAGES';
export const SUCCESS_FETCH_MESSAGES = 'SUCCESS_FETCH_MESSAGES';
export const FAIL_FETCH_MESSAGES = 'FAIL_FETCH_MESSAGES';

export const fetchMessages = (payload, scope, then = () => false) => (dispatch, getState) => {
    dispatch({ type: REQUEST_FETCH_MESSAGES, payload, scope });

    fetch(getEndpoint('fetchMessages', payload), {
        method: 'GET',
        headers: getHeaders(getState().credentials),
    })
        .then(response => response.json())
        .then(response => then(response))
        .catch(error => dispatch({ type: FAIL_FETCH_MESSAGES, error, payload, scope }));
};

export function successFetchMessages(response, scope, { limit, skip }) {
    return (dispatch) => {
        const { totalMessages } = response;
        delete response.totalMessages;
        const normalized = normalizeMessageEntities(response);
        dispatch(updateMessageEntities(response, normalized));
        dispatch({
            type: SUCCESS_FETCH_MESSAGES,
            receivedAt: Date.now(),
            ids: normalized.result.messages,
            totalMessages,
            limit,
            response,
            scope,
            skip,
        });
    };
}

export function failFetchMessages(response, scope) {
    return {
        type: FAIL_FETCH_MESSAGES,
        receivedAt: Date.now(),
        error: response,
        scope,
    };
}

export const REQUEST_SUBSCRIBE_MESSAGES = 'REQUEST_SUBSCRIBE_MESSAGES';
export const SUCCESS_SUBSCRIBE_MESSAGES = 'SUCCESS_SUBSCRIBE_MESSAGES';
export const FAIL_SUBSCRIBE_MESSAGES = 'FAIL_SUBSCRIBE_MESSAGES';

export const subscribeMessages = (payload, scope, then = () => false) => (dispatch) => {
    dispatch({ type: REQUEST_SUBSCRIBE_MESSAGES, payload, scope });
    client.subscribe(`/games/${payload.id}/messages`, update => then(update));
};

export function successSubscribeMessages(response, scope, then) {
    return (dispatch, getState) => {
        const normalized = normalizeMessageEntities(response);
        dispatch(updateMessageEntities(response, normalized));
        dispatch({
            type: SUCCESS_SUBSCRIBE_MESSAGES,
            receivedAt: Date.now(),
            ids: normalized.result,
            totalMessages: getState().pages.GameMessages.totalMessages + 1,
            skip: getState().pages.GameMessages.skip + 1,
            response,
            scope,
            then,
        });
    };
}

export function failSubscribeMessages(response, scope, then) {
    return {
        type: FAIL_SUBSCRIBE_MESSAGES,
        receivedAt: Date.now(),
        error: response,
        scope,
        then,
    };
}

export const REQUEST_SEND_MESSAGE = 'REQUEST_SEND_MESSAGE';
export const SUCCESS_SEND_MESSAGE = 'SUCCESS_SEND_MESSAGE';
export const FAIL_SEND_MESSAGE = 'FAIL_SEND_MESSAGE';

export const sendMessage = (payload, scope, then = () => false) => (dispatch, getState) => {
    dispatch({ type: REQUEST_SEND_MESSAGE, payload, scope });

    fetch(getEndpoint('sendMessage', payload), {
        method: 'POST',
        headers: getHeaders(getState().credentials),
        body: JSON.stringify({ message: payload.message }),
    })
        .then(response => response.json())
        .then(response => then(response))
        .catch(error => dispatch({ type: FAIL_SEND_MESSAGE, error, payload, scope }));
};

export function successSendMessage(response, scope, then) {
    return (dispatch) => {
        const normalized = normalize(response, {
            message: messageSchema,
            user: userSchema,
        });

        dispatch(updateMessageEntities(response, normalized));
        dispatch({
            type: SUCCESS_SEND_MESSAGE,
            receivedAt: Date.now(),
            ids: normalized.result,
            response,
            scope,
            then,
        });
    };
}

export function failSendMessage(response, scope, then) {
    return {
        type: FAIL_SEND_MESSAGE,
        receivedAt: Date.now(),
        error: response,
        scope,
        then,
    };
}
