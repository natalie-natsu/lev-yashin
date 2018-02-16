// eslint-disable-next-line import/prefer-default-export
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
        read: '/g/:id',
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
