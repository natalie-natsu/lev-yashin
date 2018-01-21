import { combineReducers } from 'redux';

import Game from './pages/Game';
import GameLobby from './pages/GameLobby';
import Home from './pages/Home';
import Me from './pages/Me';
import Register from './pages/Auth/Register';

export default combineReducers({
    Game,
    GameLobby,
    Home,
    Me,
    Register,
});
