import type { SerializedSignature } from './index.js';
import { IntentScope } from './intent.js';
/**
 * Value to be converted into public key.
 */
export type PublicKeyInitData = string | Uint8Array | Iterable<number>;
export declare function bytesEqual(a: Uint8Array, b: Uint8Array): boolean;
/**
 * A public key
 */
export declare abstract class PublicKey {
    /**
     * Checks if two public keys are equal
     */
    equals(publicKey: PublicKey): boolean;
    /**
     * Return the base-64 representation of the public key
     */
    toBase64(): string;
    toString(): never;
    /**
     * Return the Sui representation of the public key encoded in
     * base-64. A Sui public key is formed by the concatenation
     * of the scheme flag with the raw bytes of the public key
     */
    toSuiPublicKey(): string;
    verifyWithIntent(bytes: Uint8Array, signature: Uint8Array | SerializedSignature, intent: IntentScope): Promise<boolean>;
    /**
     * Verifies that the signature is valid for for the provided PersonalMessage
     */
    verifyPersonalMessage(message: Uint8Array, signature: Uint8Array | SerializedSignature): Promise<boolean>;
    /**
     * Verifies that the signature is valid for for the provided TransactionBlock
     */
    verifyTransactionBlock(transactionBlock: Uint8Array, signature: Uint8Array | SerializedSignature): Promise<boolean>;
    /**
     * Returns the bytes representation of the public key
     * prefixed with the signature scheme flag
     */
    toSuiBytes(): Uint8Array;
    /**
     * Return the Sui address associated with this Ed25519 public key
     */
    toSuiAddress(): string;
    /**
     * Return the byte array representation of the public key
     */
    abstract toRawBytes(): Uint8Array;
    /**
     * Return signature scheme flag of the public key
     */
    abstract flag(): number;
    /**
     * Verifies that the signature is valid for for the provided message
     */
    abstract verify(data: Uint8Array, signature: Uint8Array | SerializedSignature): Promise<boolean>;
}
