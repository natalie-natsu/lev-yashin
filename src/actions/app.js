export const scope = 'APP';

export const RESET_APP = 'RESET_APP';
export const SET_APP_LOCALE = 'SET_APP_LOCALE';
export const VALIDATE_FIRST_VISIT = 'VALIDATE_FIRST_VISIT';

export const resetApp = () => ({
    type: RESET_APP,
    scope,
});

export const setAppLocale = locale => ({
    type: SET_APP_LOCALE,
    locale,
    scope,
});

export const validateFirstVisit = () => ({
    type: VALIDATE_FIRST_VISIT,
    scope,
});
