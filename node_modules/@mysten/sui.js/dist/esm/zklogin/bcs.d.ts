import type { InferBcsInput } from '@mysten/bcs';
export declare const zkLoginSignature: import("@mysten/bcs").BcsType<{
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
}, {
    inputs: {
        proofPoints: {
            a: Iterable<string> & {
                length: number;
            };
            b: Iterable<Iterable<string> & {
                length: number;
            }> & {
                length: number;
            };
            c: Iterable<string> & {
                length: number;
            };
        };
        issBase64Details: {
            value: string;
            indexMod4: number;
        };
        headerBase64: string;
        addressSeed: string;
    };
    maxEpoch: string | number | bigint;
    userSignature: Iterable<number> & {
        length: number;
    };
}>;
export type ZkLoginSignature = InferBcsInput<typeof zkLoginSignature>;
export type ZkLoginSignatureInputs = ZkLoginSignature['inputs'];
