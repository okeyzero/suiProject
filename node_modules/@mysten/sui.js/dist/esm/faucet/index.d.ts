export declare class FaucetRateLimitError extends Error {
}
type FaucetCoinInfo = {
    amount: number;
    id: string;
    transferTxDigest: string;
};
type FaucetResponse = {
    transferredGasObjects: FaucetCoinInfo[];
    error?: string | null;
};
type BatchFaucetResponse = {
    task?: string | null;
    error?: string | null;
};
type BatchSendStatusType = {
    status: 'INPROGRESS' | 'SUCCEEDED' | 'DISCARDED';
    transferred_gas_objects: {
        sent: FaucetCoinInfo[];
    };
};
type BatchStatusFaucetResponse = {
    status: BatchSendStatusType;
    error?: string | null;
};
export declare function requestSuiFromFaucetV0(input: {
    host: string;
    recipient: string;
    headers?: HeadersInit;
}): Promise<FaucetResponse>;
export declare function requestSuiFromFaucetV1(input: {
    host: string;
    recipient: string;
    headers?: HeadersInit;
}): Promise<BatchFaucetResponse>;
export declare function getFaucetRequestStatus(input: {
    host: string;
    taskId: string;
    headers?: HeadersInit;
}): Promise<BatchStatusFaucetResponse>;
export declare function getFaucetHost(network: 'testnet' | 'devnet' | 'localnet'): "https://faucet.testnet.sui.io" | "https://faucet.devnet.sui.io" | "http://127.0.0.1:9123";
export {};
