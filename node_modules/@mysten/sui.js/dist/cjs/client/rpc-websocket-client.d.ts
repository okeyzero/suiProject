type SubscriptionRequest<T = any> = {
    method: string;
    unsubscribe: string;
    params: any[];
    onMessage: (event: T) => void;
};
/**
 * Configuration options for the websocket connection
 */
export type WebsocketClientOptions = {
    /**
     * Custom WebSocket class to use. Defaults to the global WebSocket class, if available.
     */
    WebSocketConstructor?: typeof WebSocket;
    /**
     * Milliseconds before timing out while calling an RPC method
     */
    callTimeout?: number;
    /**
     * Milliseconds between attempts to connect
     */
    reconnectTimeout?: number;
    /**
     * Maximum number of times to try connecting before giving up
     */
    maxReconnects?: number;
};
export declare const DEFAULT_CLIENT_OPTIONS: {
    WebSocketConstructor: {
        new (url: string | URL, protocols?: string | string[] | undefined): WebSocket;
        prototype: WebSocket;
        readonly CONNECTING: 0;
        readonly OPEN: 1;
        readonly CLOSING: 2;
        readonly CLOSED: 3;
    };
    callTimeout: number;
    reconnectTimeout: number;
    maxReconnects: number;
};
export declare class WebsocketClient {
    #private;
    endpoint: string;
    options: Required<WebsocketClientOptions>;
    constructor(endpoint: string, options?: WebsocketClientOptions);
    makeRequest<T>(method: string, params: any[]): Promise<T>;
    subscribe<T>(input: SubscriptionRequest<T>): Promise<() => Promise<unknown>>;
}
export {};
