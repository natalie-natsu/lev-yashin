// eslint-disable-next-line import/prefer-default-export
export const routes = {
    auth: {
        exact: '/auth',
        forgotPassword: '/auth/forgot-password',
        register: '/auth/register',
        signIn: '/auth/sign-in',
    },
    calendar: {
        exact: '/calendar',
        match: '/calendar/match/:id',
    },
    game: {
        create: '/g/create',
        read: '/g/:id',
        messages: '/g/:id/messages',
    },
    home: '/',
    me: {
        exact: '/me',
        resetPassword: '/me/reset-password',
        update: '/me/update',
    },
    notAllowed: '/notAllowed',
};
