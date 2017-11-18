import { createSelector } from "reselect";
import { pickFromEntities } from "./utilities";

/**
 * Memoize selector with reselect
 * ------------------------------
 * Selecting entities in the all app
 * In your component just import the file and use like bellow.
 *
 * @param entities
 * @param ids
 * @param isObject
 */

const isObject = (entities, ids, isObject = false) => isObject ;
const getIds = (entities, ids = []) => ids ;
const getAll = (entities = {}) => entities;

const selectEntities = createSelector(
    [ getAll, getIds, isObject ],
    (all, ids, isObject) => pickFromEntities(all, ids, isObject)
);

// THIS IS JUST AN EXAMPLE TO REPRODUCE IN YOUR COMPONENT
export const mapStateToPropsExample = state => {
    // If you want to select a user.
    const entities = state.entities.users;
    const id = state.app.pages.home.user.id;
    return { user: { entity: selectEntities(entities, [id]) } };
};

export default selectEntities
