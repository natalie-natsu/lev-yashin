// eslint-disable-next-line import/prefer-default-export
export const routes = {
    auth: {
        exact: '/auth',
        forgotPassword: '/auth/forgot-password',
        register: '/auth/register',
        signIn: '/auth/sign-in',
    },
    game: {
        create: '/game/create',
        read: id => `/game/${id}`,
    },
    home: '/',
    me: {
        exact: '/me',
        resetPassword: '/me/reset-password',
        update: '/me/update',
    },
    notAllowed: '/notAllowed',
};
