export const scope = 'MAIN_HEADER';

export const UPDATE_SIDE_ACTION = 'UPDATE_SIDE_ACTION';

export const setSideAction = sideAction => ({
    type: UPDATE_SIDE_ACTION,
    sideAction,
    scope,
});
