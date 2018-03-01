import { schema } from 'normalizr';
import { teamSchema } from './team';
import { groupSchema } from './group';

export const matchSchema = new schema.Entity('matches', {
    against: teamSchema,
    team: teamSchema,
    group: groupSchema,
});

export const matchListSchema = [matchSchema];
