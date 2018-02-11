import { schema } from 'normalizr';
import { teamSchema } from './team';
import { groupSchema } from './group';

// eslint-disable-next-line import/prefer-default-export
export const calendarSchema = [new schema.Entity('matches', {
    against: teamSchema,
    team: teamSchema,
    group: groupSchema,
})];
