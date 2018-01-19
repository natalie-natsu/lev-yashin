import { schema } from 'normalizr';

export const userSchema = new schema.Entity('users', {}, { idAttribute: '_id' });
export const userListSchema = [userSchema];
