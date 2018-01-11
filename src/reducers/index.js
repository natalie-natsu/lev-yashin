import { combineReducers } from 'redux';
import { reducer as burgerMenu } from 'redux-burger-menu';
import { reducer as formReducer } from 'redux-form';
import { SIGN_OUT, SUCCESS_SIGN_IN } from '../actions/authentication';

import app from './app';
import authentication from './authentication';
import credentials from './credentials';
import entities from './entities';
import pages from './pages';

export default combineReducers({
    app,
    authentication,
    burgerMenu,
    credentials,
    entities,
    pages,
    form: formReducer.plugin({
        'sign-in-form': (state, action) => {
            switch (action.type) {
            case SIGN_OUT:
            case SUCCESS_SIGN_IN: return undefined;
            default: return state;
            }
        },
    }),
});
