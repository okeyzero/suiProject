export declare class SuiHTTPTransportError extends Error {
}
export declare class JsonRpcError extends SuiHTTPTransportError {
    code: number;
    type: string;
    constructor(message: string, code: number);
}
export declare class SuiHTTPStatusError extends SuiHTTPTransportError {
    status: number;
    statusText: string;
    constructor(message: string, status: number, statusText: string);
}
