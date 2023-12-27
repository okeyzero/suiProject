import type { SerializedSignature } from '../cryptography/signature.js';
/**
 * Serializes a transaction to a string that can be signed by a `Signer`.
 */
export interface Signer {
    getAddress(): Promise<string>;
    /**
     * Returns the signature for the data and the public key of the signer
     */
    signData(data: Uint8Array): Promise<SerializedSignature>;
}
