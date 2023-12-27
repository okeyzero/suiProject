import type { ZkLoginSignature } from './bcs.js';
interface ZkLoginSignatureExtended extends Omit<ZkLoginSignature, 'userSignature'> {
    userSignature: string | ZkLoginSignature['userSignature'];
}
export declare function getZkLoginSignature({ inputs, maxEpoch, userSignature }: ZkLoginSignatureExtended): string;
export declare function parseZkLoginSignature(signature: string | Uint8Array): {
    inputs: {
        proofPoints: {
            a: string[];
            b: string[][];
            c: string[];
        };
        issBase64Details: {
            value: string;
            indexMod4: number;
        };
        headerBase64: string;
        addressSeed: string;
    };
    maxEpoch: string;
    userSignature: number[];
};
export {};
