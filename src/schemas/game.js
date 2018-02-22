import { schema } from 'normalizr';
import { userListSchema } from './user';

export const gameSchema = new schema.Entity('games', {
    // bannedUsers: userListSchema,
    draftOrder: userListSchema,
    // kickedUsers: userListSchema,
    users: userListSchema,
}, { idAttribute: '_id' });
export const gameListSchema = [gameSchema];
