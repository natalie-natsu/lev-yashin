import { toast } from 'react-toastify';
import { resetCredentials } from '../actions/authentication';

/**
 * Handle errors in a global way
 */
export default store => next => (action) => {
    if (action.error) {
        switch (action.error.message) {
        case 'Bad token':
            store.dispatch(resetCredentials());
            toast.error('Your token was invalid, please try to log in again', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            break;
        default:
            break;
        }
    }

    return next(action);
};
