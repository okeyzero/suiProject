export declare const SIGNATURE_SCHEME_TO_FLAG: {
    readonly ED25519: 0;
    readonly Secp256k1: 1;
    readonly Secp256r1: 2;
    readonly MultiSig: 3;
    readonly ZkLogin: 5;
};
export declare const SIGNATURE_SCHEME_TO_SIZE: {
    ED25519: number;
    Secp256k1: number;
    Secp256r1: number;
};
export declare const SIGNATURE_FLAG_TO_SCHEME: {
    readonly 0: "ED25519";
    readonly 1: "Secp256k1";
    readonly 2: "Secp256r1";
    readonly 3: "MultiSig";
    readonly 5: "ZkLogin";
};
export type SignatureScheme = 'ED25519' | 'Secp256k1' | 'Secp256r1' | 'MultiSig' | 'ZkLogin';
export type SignatureFlag = keyof typeof SIGNATURE_FLAG_TO_SCHEME;
