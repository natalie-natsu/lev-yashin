import { schema } from 'normalizr';
import { userListSchema } from './user';

export const gameSchema = new schema.Entity('games', { users: userListSchema }, { idAttribute: '_id' });
export const gameListSchema = [gameSchema];
