import type { WebsocketClientOptions } from './rpc-websocket-client.js';
/**
 * An object defining headers to be passed to the RPC server
 */
export type HttpHeaders = {
    [header: string]: string;
};
interface SuiHTTPTransportOptions {
    fetch?: typeof fetch;
    WebSocketConstructor?: typeof WebSocket;
    url: string;
    rpc?: {
        headers?: HttpHeaders;
        url?: string;
    };
    websocket?: WebsocketClientOptions & {
        url?: string;
    };
}
export interface SuiTransportRequestOptions {
    method: string;
    params: unknown[];
}
export interface SuiTransportSubscribeOptions<T> {
    method: string;
    unsubscribe: string;
    params: unknown[];
    onMessage: (event: T) => void;
}
export interface SuiTransport {
    request<T = unknown>(input: SuiTransportRequestOptions): Promise<T>;
    subscribe<T = unknown>(input: SuiTransportSubscribeOptions<T>): Promise<() => Promise<boolean>>;
}
export declare class SuiHTTPTransport implements SuiTransport {
    #private;
    constructor(options: SuiHTTPTransportOptions);
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
    request<T>(input: SuiTransportRequestOptions): Promise<T>;
    subscribe<T>(input: SuiTransportSubscribeOptions<T>): Promise<() => Promise<boolean>>;
}
export {};
