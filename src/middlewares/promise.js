/**
 * Lets you dispatch promises in addition to actions.
 * If the promise is resolved, its result will be dispatched as an action.
 * The promise is returned from `dispatch` so the caller may handle rejection.
 */
export const vanillaPromise = store => next => (action) => {
    if (typeof action.then !== 'function') {
        return next(action);
    }

    return Promise.resolve(action).then(store.dispatch);
};

/**
 * Lets you dispatch special actions with a { promise } field.
 *
 * This middleware will turn them into a single action at the beginning,
 * and a single success (or failure) action when the `promise` resolves.
 *
 * For convenience, `dispatch` will return the promise so the caller can wait.
 */
export const readyStatePromise = () => next => (action) => {
    if (!action.promise) {
        return next(action);
    }

    function makeAction(ready, data) {
        const newAction = Object.assign({}, action, { ready }, data);
        delete newAction.promise;
        return newAction;
    }

    next(makeAction(false));
    return action.promise.then(
        result => next(makeAction(true, { result })),
        error => next(makeAction(true, { error })),
    );
};
