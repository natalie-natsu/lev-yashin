import { combineReducers } from 'redux';
import { reducer as burgerMenu } from 'redux-burger-menu';
import { reducer as formReducer } from 'redux-form';
import { SUCCESS_SIGN_IN } from '../actions/authentication';

import app from './app';
import authentication from './authentication';
import components from './components';
import credentials from './credentials';
import entities from './entities';
import profile from './profile';

export default combineReducers({
    app,
    authentication,
    burgerMenu,
    components,
    credentials,
    entities,
    profile,
    form: formReducer.plugin({
        'sign-in-form': (state, action) => {
            switch (action.type) {
            case SUCCESS_SIGN_IN: return undefined;
            default: return state;
            }
        },
    }),
});
