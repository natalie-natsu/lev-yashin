export const scope = "APP";

export const RESET_APP = 'RESET_APP';
export const SET_APP_LOCALE = 'SET_APP_LOCALE';
export const SET_APP_TITLE = 'SET_APP_TITLE';
export const VALIDATE_FIRST_VISIT = 'VALIDATE_FIRST_VISIT';

export const resetApp = () => {
    return {
        type: RESET_APP,
        scope
    };
};

export const setAppLocale = locale => {
    return {
        type: SET_APP_LOCALE,
        locale,
        scope
    };
};

export const setAppTitle = title => {
    return {
        type: SET_APP_TITLE,
        title,
        scope
    };
};

export const validateFirstVisit = () => {
    return {
        type: VALIDATE_FIRST_VISIT,
        scope
    };
};
