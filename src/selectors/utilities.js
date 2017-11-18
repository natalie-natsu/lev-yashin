import pick from 'lodash/pick';
import toArray from 'lodash/toArray';

export function pickFromEntities(all, ids, isObject) {
    const entities = pick(all, ids);
    return isObject ? entities : toArray(entities);
}
