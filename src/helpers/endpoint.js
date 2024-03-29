const endpoints = {
    // Auth
    register: () => '/user/register',
    signIn: () => '/user/sign-in',
    // Profile
    fetchProfile: () => '/user/profile',
    updateProfile: () => '/user/profile',
    resetPassword: () => '/user/reset-password',
    // Game
    createGame: () => '/games',
    updateGame: ({ id }) => `/games/${id}`,
    fetchGame: ({ id }) => `/games/${id}`,
    joinGame: ({ id }) => `/games/${id}/join`,
    readyGame: ({ id }) => `/games/${id}/ready`,
    kickGameUser: ({ id }) => `/games/${id}/kick`,
    banGameUser: ({ id }) => `/games/${id}/ban`,
    startGame: ({ id }) => `/games/${id}/start`,
    // Game Draft
    selectDraftTeam: ({ id }) => `/draft/${id}/choose-team`,
    // Messages
    fetchMessages: ({ id, skip = 0, limit = 50 }) => `/games/${id}/messages/${skip}/${limit}`,
    sendMessage: ({ id }) => `/games/${id}/messages`,
    // FIFA
    fetchMatch: ({ id }) => `/fifa/matches/${id}`,
    fetchMatches: () => '/fifa/matches',
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
