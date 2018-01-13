import { combineReducers } from 'redux';
import { reducer as burgerMenu } from 'redux-burger-menu';

import app from './app';
import authentication from './authentication';
import credentials from './credentials';
import entities from './entities';
import form from './form';
import pages from './pages';

export default combineReducers({
    app,
    authentication,
    burgerMenu,
    credentials,
    entities,
    pages,
    form,
});
