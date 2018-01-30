import pick from 'lodash/pick';
import toArray from 'lodash/toArray';

// eslint-disable-next-line import/prefer-default-export
export function pickFromEntities(all, ids, isObject) {
    const entities = pick(all, ids);

    return isObject ? entities : toArray(entities);
}
