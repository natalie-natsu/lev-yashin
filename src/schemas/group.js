import { schema } from 'normalizr';
import { teamListSchema } from './team';

export const groupSchema = new schema.Entity('groups', {
    teams: teamListSchema,
});

export const groupListSchema = [groupSchema];
