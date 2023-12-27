import type { PublicKey, SerializedSignature, SignatureScheme } from '../cryptography/index.js';
export declare function verifySignature(bytes: Uint8Array, signature: SerializedSignature): Promise<PublicKey>;
export declare function verifyPersonalMessage(message: Uint8Array, signature: SerializedSignature): Promise<PublicKey>;
export declare function verifyTransactionBlock(transactionBlock: Uint8Array, signature: SerializedSignature): Promise<PublicKey>;
export declare function publicKeyFromRawBytes(signatureScheme: SignatureScheme, bytes: Uint8Array): PublicKey;
