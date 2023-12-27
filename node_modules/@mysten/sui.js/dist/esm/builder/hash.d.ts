/**
 * Generates a Blake2b hash of typed data as a base64 string.
 *
 * @param typeTag type tag (e.g. TransactionData, SenderSignedData)
 * @param data data to hash
 */
export declare function hashTypedData(typeTag: string, data: Uint8Array): Uint8Array;
