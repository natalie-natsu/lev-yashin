const endpoints = {
    // http://localhost:8000/documentation#!/user/postUserProfile
    fetchProfile: () => '/user/profile',
    // http://localhost:8000/documentation#!/user/postUserSignin
    signIn: () => '/user/sign-in',
};

export const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const getEndpoint = (key, params) => {
    if (endpoints[key]) { return process.env.API_PATH + endpoints[key](params); }

    // eslint-disable-next-line no-console
    console.error(`"${key}" is not a valid endpoint.`);
    return null;
};

export const getHeaders = (credentials) => {
    if (credentials && credentials.token) { headers.Authorization = `Bearer ${credentials.token}`; }

    return headers;
};
