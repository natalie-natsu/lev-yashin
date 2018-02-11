import { combineReducers } from 'redux';
import { reducer as burgerMenu } from 'redux-burger-menu';

import app from './app';
import authentication from './authentication';
import calendar from './calendar';
import credentials from './credentials';
import entities from './entities';
import form from './form';
import pages from './pages';

export default combineReducers({
    app,
    authentication,
    burgerMenu,
    calendar,
    credentials,
    entities,
    pages,
    form,
});
