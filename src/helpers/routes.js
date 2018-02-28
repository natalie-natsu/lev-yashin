import { some } from 'lodash';
import { t } from 'i18next';
import { matchPath } from 'react-router-dom';

export const routes = {
    auth: {
        exact: '/auth',
        forgotPassword: '/auth/forgot-password',
        register: '/auth/register',
        signIn: '/auth/sign-in',
    },
    calendar: '/calendar',
    game: {
        create: '/g/create',
        read: '/g/:id/:step?',
        lobby: '/g/:id/lobby',
        draft: '/g/:id/draft',
        onGoing: '/g/:id/onGoing',
        messages: '/g/:id/messages',
    },
    home: '/',
    match: '/match/:id',
    me: {
        exact: '/me',
        resetPassword: '/me/reset-password',
        update: '/me/update',
    },
    notAllowed: '/notAllowed',
};

export const routeKeys = {
    [routes.auth.forgotPassword]: 'auth.forgotPassword',
    [routes.auth.register]: 'auth.register',
    [routes.auth.signIn]: 'auth.signIn',
    [routes.calendar]: 'calendar',
    [routes.game.create]: 'game.create',
    [routes.game.lobby]: 'game.lobby',
    [routes.game.draft]: 'game.draft',
    [routes.game.onGoing]: 'game.onGoing',
    [routes.game.messages]: 'game.messages',
    [routes.home]: 'home',
    [routes.match]: 'match',
    [routes.me.exact]: 'me.exact',
    [routes.me.resetPassword]: 'me.resetPassword',
    [routes.me.update]: 'me.update',
    [routes.notAllowed]: 'notAllowed',
};

export const getRouteI18nKey = (pathname) => {
    let routeKey = false;

    some(routeKeys, (i18nKey, path) => {
        if (matchPath(pathname, { path, exact: true })) { routeKey = i18nKey; }
        return routeKey;
    });

    return routeKey;
};

export function getRouteName(pathname) {
    const key = getRouteI18nKey(pathname);
    return key && t(`route:${key}.name`) !== '' && `route:${key}.name`;
}

export function getRouteDesc(pathname) {
    const key = getRouteI18nKey(pathname);
    return key && t(`route:${key}.description`) !== '' && `route:${key}.description`;
}
