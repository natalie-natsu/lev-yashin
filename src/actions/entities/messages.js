import { normalize } from 'normalizr';
import { receiveEntities } from '../entities';
import { messageListSchema } from '../../schemas/message';

import { getEndpoint, getHeaders } from '../../helpers/endpoint';
import { client } from '../../helpers/nes';

export function normalizeResponseUserAsEntity(user) {
    return { _id: user._id, profile: { userName: user.userName, picture: user.picture } };
}

export function normalizeMessageEntities(response) {
    const collection = response;
    collection.map((doc, i) => {
        collection[i].user = normalizeResponseUserAsEntity(doc.user);
        return doc;
    });

    return normalize(collection, messageListSchema);
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
    }).then(response => response.json()).then(response => then(response));
};

export function successFetchMessages(response, scope, { limit, skip }) {
    return (dispatch) => {
        const normalized = normalizeMessageEntities(response.messages);
        dispatch(updateMessageEntities(response, normalized));
        dispatch({
            type: SUCCESS_FETCH_MESSAGES,
            receivedAt: Date.now(),
            ids: normalized.result,
            totalMessages: response.totalMessages,
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
        error: response.error,
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
        const normalized = normalizeMessageEntities([response]);
        dispatch(updateMessageEntities([response], normalized));
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
        error: response.error,
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
    }).then(response => response.json()).then(response => then(response));
};

export function successSendMessage(response, scope, then) {
    return (dispatch) => {
        const normalized = normalizeMessageEntities([response]);
        dispatch(updateMessageEntities([response], normalized));
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
        error: response.error,
        scope,
        then,
    };
}
