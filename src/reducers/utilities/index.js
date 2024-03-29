function reducerShouldListen(action, scope) {
    return !scope || action.scope === scope;
}

export function createReducer(initialState, handlers, scope = undefined) {
    return function reducer(state = initialState, action) {
        if (reducerShouldListen(action, scope) && handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }
        return state;
    };
}

export function removeObjectInState(state, object) {
    if (!state || !state[object.id]) { return state; }

    const newState = state;
    newState.splice(object.id, 1);

    return newState;
}

export function updateObjectInState(state, object) {
    const item = state[object.id];
    if (!item) { return {}; }

    // Preventing ID modification
    // Be sure that entities don't need id modifications like message entities
    // object.changes.id = object.id;

    return { [object.changes.id || object.id]: { ...item, ...object.changes } };
}
