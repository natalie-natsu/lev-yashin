import { schema } from 'normalizr';
import { teamSchema } from './team';
import { groupSchema } from './group';

export const matchCalendarSchema = new schema.Entity('matches', {
    against: teamSchema,
    team: teamSchema,
    group: groupSchema,
});

export const calendarSchema = [matchCalendarSchema];
