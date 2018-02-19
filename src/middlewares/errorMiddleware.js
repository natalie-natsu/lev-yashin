import { resetCredentials } from '../actions/authentication';

/**
 * Handle errors in a global way
 */
export default store => next => (action) => {
    if (action.error) {
        switch (action.error.message) {
        case 'Bad token':
            store.dispatch(resetCredentials());
            break;
        default:
            break;
        }
    }

    return next(action);
};
