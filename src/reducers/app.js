import { createReducer } from './utilities';
import {
    scope,
    RESET_APP,
    SET_APP_LOCALE,
    VALIDATE_FIRST_VISIT,
} from '../actions/app';

const initialAppPropertiesState = {
    firstVisit: false,
    locale: 'en',
};

function resetApp() {
    return initialAppPropertiesState;
}

function setAppLocale(state, action) {
    return {
        ...state,
        locale: action.locale,
    };
}

function validateFistVisit(state) {
    return {
        ...state,
        firstVisit: true,
    };
}

export default createReducer(initialAppPropertiesState, {
    [RESET_APP]: resetApp,
    [SET_APP_LOCALE]: setAppLocale,
    [VALIDATE_FIRST_VISIT]: validateFistVisit,
}, scope);
