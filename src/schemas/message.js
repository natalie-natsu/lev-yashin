import { schema } from 'normalizr';
import { userSchema } from './user';
import { gameSchema } from './game';

export const messageSchema = new schema.Entity('messages', {
    gameId: gameSchema,
    userId: userSchema,
}, { idAttribute: '_id' });

export const messageListSchema = [messageSchema];
