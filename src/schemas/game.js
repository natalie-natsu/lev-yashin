import { schema } from 'normalizr';
import { userListSchema } from './user';

export const gameSchema = new schema.Entity('games', {
    draftOrder: userListSchema,
    users: userListSchema,
    // kickedUsers: userListSchema,
    bannedUsers: userListSchema,
    readyUsers: userListSchema,
}, { idAttribute: '_id' });

export const gameListSchema = [gameSchema];
