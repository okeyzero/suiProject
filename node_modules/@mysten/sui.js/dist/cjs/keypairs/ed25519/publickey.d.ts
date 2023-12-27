import type { PublicKeyInitData } from '../../cryptography/publickey.js';
import { PublicKey } from '../../cryptography/publickey.js';
import type { SerializedSignature } from '../../cryptography/signature.js';
/**
 * An Ed25519 public key
 */
export declare class Ed25519PublicKey extends PublicKey {
    static SIZE: number;
    private data;
    /**
     * Create a new Ed25519PublicKey object
     * @param value ed25519 public key as buffer or base-64 encoded string
     */
    constructor(value: PublicKeyInitData);
    /**
     * Checks if two Ed25519 public keys are equal
     */
    equals(publicKey: Ed25519PublicKey): boolean;
    /**
     * Return the byte array representation of the Ed25519 public key
     */
    toRawBytes(): Uint8Array;
    /**
     * Return the Sui address associated with this Ed25519 public key
     */
    flag(): number;
    /**
     * Verifies that the signature is valid for for the provided message
     */
    verify(message: Uint8Array, signature: Uint8Array | SerializedSignature): Promise<boolean>;
}
