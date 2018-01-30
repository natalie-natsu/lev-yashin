import { schema } from 'normalizr';
import { userSchema } from './user';

export const messageSchema = new schema.Entity('messages', { user: userSchema }, { idAttribute: '_id' });
export const messageListSchema = [messageSchema];
