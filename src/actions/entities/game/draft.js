import { normalize } from 'normalizr';

import { getEndpoint, getHeaders } from '../../../helpers/endpoint';
import { gameSchema } from '../../../schemas/game';
import { receiveEntities } from '../../entities';

export const REQUEST_SELECT_DRAFT_TEAM = 'REQUEST_SELECT_DRAFT_TEAM';
export const SUCCESS_SELECT_DRAFT_TEAM = 'SUCCESS_SELECT_DRAFT_TEAM';
export const FAIL_SELECT_DRAFT_TEAM = 'FAIL_SELECT_DRAFT_TEAM';

export const selectDraftTeam = (payload, scope, then) => (dispatch, getState) => {
    dispatch({ type: REQUEST_SELECT_DRAFT_TEAM, payload, scope });

    fetch(getEndpoint('selectDraftTeam', payload), {
        method: 'POST',
        headers: getHeaders(getState().credentials),
        body: JSON.stringify({ teamId: payload.teamId }),
    })
        .then(response => response.json())
        .then(response => then(response))
        .catch(error => dispatch({ type: FAIL_SELECT_DRAFT_TEAM, error, payload, scope }));
};

export function successSelectDraftTeam(response, scope, then) {
    return (dispatch) => {
        const normalized = normalize(response, gameSchema);
        dispatch(receiveEntities(normalized.entities));

        dispatch({
            type: SUCCESS_SELECT_DRAFT_TEAM,
            receivedAt: Date.now(),
            response,
            scope,
            then,
        });
    };
}

export function failSelectDraftTeam(response, scope, then) {
    return {
        type: FAIL_SELECT_DRAFT_TEAM,
        receivedAt: Date.now(),
        error: response,
        scope,
        then,
    };
}
