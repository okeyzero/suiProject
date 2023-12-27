import { PublicKey } from '../../cryptography/publickey.js';
import type { PublicKeyInitData } from '../../cryptography/publickey.js';
import type { SerializedSignature } from '../../cryptography/signature.js';
/**
 * A Secp256k1 public key
 */
export declare class Secp256k1PublicKey extends PublicKey {
    static SIZE: number;
    private data;
    /**
     * Create a new Secp256k1PublicKey object
     * @param value secp256k1 public key as buffer or base-64 encoded string
     */
    constructor(value: PublicKeyInitData);
    /**
     * Checks if two Secp256k1 public keys are equal
     */
    equals(publicKey: Secp256k1PublicKey): boolean;
    /**
     * Return the byte array representation of the Secp256k1 public key
     */
    toRawBytes(): Uint8Array;
    /**
     * Return the Sui address associated with this Secp256k1 public key
     */
    flag(): number;
    /**
     * Verifies that the signature is valid for for the provided message
     */
    verify(message: Uint8Array, signature: Uint8Array | SerializedSignature): Promise<boolean>;
}
