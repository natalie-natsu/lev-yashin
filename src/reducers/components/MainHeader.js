import { createReducer } from '../utilities';
import { scope, UPDATE_SIDE_ACTION } from '../../actions/components/MainHeader';

const initialMainHeaderState = { sideAction: false };

function setSideAction(state, action) {
    return {
        ...state,
        sideAction: action.sideAction,
    };
}

export default createReducer(initialMainHeaderState, {
    [UPDATE_SIDE_ACTION]: setSideAction,
}, scope);
