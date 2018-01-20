import { Client } from 'nes';

export const getHeaders = (credentials) => {
    const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };
    if (credentials && credentials.token) { headers.Authorization = `Bearer ${credentials.token}`; }
    return headers;
};

export const client = new Client('ws://localhost:3000');

export async function wsConnect(headers) {
    await client.connect({ auth: { headers } });
}
export function wsDisconnect() {
    client.disconnect();
}
