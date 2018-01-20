import { combineReducers } from 'redux';

import Game from './pages/Game';
import Home from './pages/Home';
import Me from './pages/Me';
import Register from './pages/Auth/Register';

export default combineReducers({
    Game,
    Home,
    Me,
    Register,
});
