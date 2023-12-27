/** Returns whether the tx digest is valid based on the serialization format */
export declare function isValidTransactionDigest(value: string): value is string;
export declare const SUI_ADDRESS_LENGTH = 32;
export declare function isValidSuiAddress(value: string): value is string;
export declare function isValidSuiObjectId(value: string): boolean;
type StructTag = {
    address: string;
    module: string;
    name: string;
    typeParams: (string | StructTag)[];
};
export declare function parseStructTag(type: string): StructTag;
export declare function normalizeStructTag(type: string | StructTag): string;
/**
 * Perform the following operations:
 * 1. Make the address lower case
 * 2. Prepend `0x` if the string does not start with `0x`.
 * 3. Add more zeros if the length of the address(excluding `0x`) is less than `SUI_ADDRESS_LENGTH`
 *
 * WARNING: if the address value itself starts with `0x`, e.g., `0x0x`, the default behavior
 * is to treat the first `0x` not as part of the address. The default behavior can be overridden by
 * setting `forceAdd0x` to true
 *
 */
export declare function normalizeSuiAddress(value: string, forceAdd0x?: boolean): string;
export declare function normalizeSuiObjectId(value: string, forceAdd0x?: boolean): string;
export {};
