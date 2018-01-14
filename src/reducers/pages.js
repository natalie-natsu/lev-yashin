import { combineReducers } from 'redux';

import Home from './pages/Home';
import Me from './pages/Me';
import Register from './pages/Auth/Register';

export default combineReducers({
    Home,
    Me,
    Register,
});
