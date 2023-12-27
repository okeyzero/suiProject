import type { TypeName } from '@mysten/bcs';
export declare const ARGUMENT_INNER = "Argument";
export declare const VECTOR = "vector";
export declare const OPTION = "Option";
export declare const CALL_ARG = "CallArg";
export declare const TYPE_TAG = "TypeTag";
export declare const OBJECT_ARG = "ObjectArg";
export declare const PROGRAMMABLE_TX_BLOCK = "ProgrammableTransaction";
export declare const PROGRAMMABLE_CALL_INNER = "ProgrammableMoveCall";
export declare const TRANSACTION_INNER = "Transaction";
export declare const COMPRESSED_SIGNATURE = "CompressedSignature";
export declare const PUBLIC_KEY = "PublicKey";
export declare const MULTISIG_PUBLIC_KEY = "MultiSigPublicKey";
export declare const MULTISIG_PK_MAP = "MultiSigPkMap";
export declare const MULTISIG = "MultiSig";
export declare const ENUM_KIND = "EnumKind";
/** Wrapper around transaction Enum to support `kind` matching in TS */
export declare const TRANSACTION: TypeName;
/** Wrapper around Argument Enum to support `kind` matching in TS */
export declare const ARGUMENT: TypeName;
/** Custom serializer for decoding package, module, function easier */
export declare const PROGRAMMABLE_CALL = "ProgrammableMoveCall";
/** Transaction types */
export type Option<T> = {
    some: T;
} | {
    none: true;
};
