import { schema } from 'normalizr';

export const teamSchema = new schema.Entity('teams');
export const teamListSchema = [teamSchema];
