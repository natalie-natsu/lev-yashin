import { schema } from 'normalizr';

export const groupSchema = new schema.Entity('groups');
export const groupListSchema = [groupSchema];
