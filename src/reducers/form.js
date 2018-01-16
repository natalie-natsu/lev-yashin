import { map } from 'lodash';
import { reducer as formReducer } from 'redux-form';
import { SIGN_OUT, SUCCESS_REGISTER, SUCCESS_SIGN_IN } from '../actions/authentication';
import { SUCCESS_RESET_PASSWORD, SUCCESS_UPDATE_PROFILE } from '../actions/entities/user';

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
    'update-profile-form': (state, action) => {
        const newState = state;
        switch (action.type) {
        case '@@redux-form/UNREGISTER_FIELD':
        case SUCCESS_UPDATE_PROFILE:
            map(state.fields, (field, key) => { newState.fields[key].touched = false; return field; });
            return {
                ...newState,
                anyTouched: false,
            };
        default: return state;
        }
    },
    'reset-password-form': (state, action) => {
        switch (action.type) {
        case SUCCESS_RESET_PASSWORD: return undefined;
        default: return state;
        }
    },
});
