type Hex = string;
type Path = string;
type Keys = {
    key: Uint8Array;
    chainCode: Uint8Array;
};
export declare const pathRegex: RegExp;
export declare const replaceDerive: (val: string) => string;
export declare const getMasterKeyFromSeed: (seed: Hex) => Keys;
export declare const getPublicKey: (privateKey: Uint8Array, withZeroByte?: boolean) => Uint8Array;
export declare const isValidPath: (path: string) => boolean;
export declare const derivePath: (path: Path, seed: Hex, offset?: number) => Keys;
export {};
