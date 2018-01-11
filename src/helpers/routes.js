// eslint-disable-next-line import/prefer-default-export
export const routes = {
    home: '/',
    auth: {
        exact: '/auth',
        forgotPassword: '/auth/forgot-password',
        register: '/auth/register',
        signIn: '/auth/sign-in',
    },
    me: {
        exact: '/me',
        resetPassword: '/me/reset-password',
        update: '/me/update',
    },
    notAllowed: '/notAllowed',
};
