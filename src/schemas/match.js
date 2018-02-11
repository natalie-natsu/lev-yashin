import { schema } from 'normalizr';

export const matchSchema = new schema.Entity('matches');
export const matchListSchema = [matchSchema];
