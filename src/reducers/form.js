import { reducer as formReducer } from 'redux-form';
import { SIGN_OUT, SUCCESS_REGISTER, SUCCESS_SIGN_IN } from '../actions/authentication';

export default formReducer.plugin({
    'sign-in-form': (state, action) => {
        switch (action.type) {
        case SIGN_OUT:
        case SUCCESS_SIGN_IN: return undefined;
        default: return state;
        }
    },
    'register-form': (state, action) => {
        switch (action.type) {
        case SIGN_OUT:
        case SUCCESS_REGISTER: return undefined;
        default: return state;
        }
    },
});
