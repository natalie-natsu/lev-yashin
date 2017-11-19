// import merge from "lodash/merge";
import map from 'lodash/merge';

import { createReducer, removeObjectInState, updateObjectInState } from './utilities';
import { RECEIVE_ENTITIES, REMOVE_ENTITIES, RESET_ENTITIES, UPDATE_ENTITIES } from '../actions/entities';

// It's easier to let initialState as an empty object,
// but it's way more rigorous to add all entities of the app.
const initialEntitiesState = {
    users: null,
};

function receiveEntities(state, action) {
    const { entities } = action;
    // return entities ? merge({}, state, { ...state.entities, ...entities }) : state;

    let newState = state;
    map(entities, (entity, entityName) => {
        newState = {
            ...state,
            [entityName]: {
                ...state[entityName],
                ...entity,
            },
        };
    });

    return newState;
}

function removeEntities(state, action) {
    const newState = state;

    action.entities.map((entity) => {
        newState[action.entityType] = removeObjectInState(state[action.entityType], entity);
        return true;
    });

    return newState;
}

function resetEntities() {
    return initialEntitiesState;
}

function updateEntities(state, action) {
    const newState = state;

    action.entities.map((entity) => {
        newState[action.entityType] = {
            ...state[action.entityType],
            ...updateObjectInState(state[action.entityType], entity),
        };
        return true;
    });

    return newState;
}

export default createReducer(initialEntitiesState, {
    [RECEIVE_ENTITIES]: receiveEntities,
    [REMOVE_ENTITIES]: removeEntities,
    [RESET_ENTITIES]: resetEntities,
    [UPDATE_ENTITIES]: updateEntities,
});
