const endpoints = {
    /**
     * Fetch profile of current user
     * @Method: GET @Params: none
     * @return: Object
     */
    fetchProfile: () => `/user`,
    /**
     * Sign in user
     * @Method: POST @Body: String email, String password
     * @return: Object { "token" , "userId" }
     */
    signIn: () => `/user/signIn`
};

export let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const getEndpoint = (key, params) => {
    if (!endpoints[key])
        console.error(`"${key}" is not a valid endpoint.`);
    else
        return process.env.API_PATH + endpoints[key](params);
};

export const getHeaders = authentication => {
    if (authentication && authentication.token)
        headers['Authorization']  = authentication.token;

    return headers;
};
