import { Client } from 'nes';

export const getHeaders = (credentials) => {
    const headers = {};
    if (credentials && credentials.token) { headers.authorization = `Bearer ${credentials.token}`; }
    return headers;
};

export const client = new Client(process.env.WS_PATH);

export function wsConnect(headers) {
    client.connect({ auth: { headers } })
        .catch((error) => {
            // TODO handle error
            // eslint-disable-next-line no-console
            console.error(error);
        });
}
export function wsDisconnect() {
    client.disconnect();
}
