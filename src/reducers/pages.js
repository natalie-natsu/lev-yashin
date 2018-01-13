import { combineReducers } from 'redux';

import Home from './pages/Home';
import Register from './pages/Auth/Register';

export default combineReducers({
    Home,
    Register,
});
