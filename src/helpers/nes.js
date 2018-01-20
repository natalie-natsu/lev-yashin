import { Client } from 'nes';

export const getHeaders = (credentials) => {
    const headers = {};
    if (credentials && credentials.token) { headers.authorization = `Bearer ${credentials.token}`; }
    return headers;
};

export const client = new Client(process.env.WS_PATH);

export async function wsConnect(headers) {
    await client.connect({ auth: { headers } });
}
export function wsDisconnect() {
    client.disconnect();
}
