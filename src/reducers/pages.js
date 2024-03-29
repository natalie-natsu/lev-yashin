import { combineReducers } from 'redux';

import Calendar from './pages/Calendar';
import Game from './pages/Game';
import GameLobby from './pages/Game/Lobby';
import GameMessages from './pages/Game/Messages';
import Home from './pages/Home';
import Match from './pages/Match';
import Me from './pages/Me';
import Register from './pages/Auth/Register';

export default combineReducers({
    Calendar,
    Game,
    GameLobby,
    GameMessages,
    Home,
    Match,
    Me,
    Register,
});
