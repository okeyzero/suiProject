"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var bcs_exports = {};
__export(bcs_exports, {
  ARGUMENT: () => ARGUMENT,
  ARGUMENT_INNER: () => ARGUMENT_INNER,
  CALL_ARG: () => CALL_ARG,
  COMPRESSED_SIGNATURE: () => COMPRESSED_SIGNATURE,
  ENUM_KIND: () => ENUM_KIND,
  MULTISIG: () => MULTISIG,
  MULTISIG_PK_MAP: () => MULTISIG_PK_MAP,
  MULTISIG_PUBLIC_KEY: () => MULTISIG_PUBLIC_KEY,
  OBJECT_ARG: () => OBJECT_ARG,
  OPTION: () => OPTION,
  PROGRAMMABLE_CALL: () => PROGRAMMABLE_CALL,
  PROGRAMMABLE_CALL_INNER: () => PROGRAMMABLE_CALL_INNER,
  PROGRAMMABLE_TX_BLOCK: () => PROGRAMMABLE_TX_BLOCK,
  PUBLIC_KEY: () => PUBLIC_KEY,
  TRANSACTION: () => TRANSACTION,
  TRANSACTION_INNER: () => TRANSACTION_INNER,
  TYPE_TAG: () => TYPE_TAG,
  VECTOR: () => VECTOR
});
module.exports = __toCommonJS(bcs_exports);
const ARGUMENT_INNER = "Argument";
const VECTOR = "vector";
const OPTION = "Option";
const CALL_ARG = "CallArg";
const TYPE_TAG = "TypeTag";
const OBJECT_ARG = "ObjectArg";
const PROGRAMMABLE_TX_BLOCK = "ProgrammableTransaction";
const PROGRAMMABLE_CALL_INNER = "ProgrammableMoveCall";
const TRANSACTION_INNER = "Transaction";
const COMPRESSED_SIGNATURE = "CompressedSignature";
const PUBLIC_KEY = "PublicKey";
const MULTISIG_PUBLIC_KEY = "MultiSigPublicKey";
const MULTISIG_PK_MAP = "MultiSigPkMap";
const MULTISIG = "MultiSig";
const ENUM_KIND = "EnumKind";
const TRANSACTION = TRANSACTION_INNER;
const ARGUMENT = ARGUMENT_INNER;
const PROGRAMMABLE_CALL = "ProgrammableMoveCall";
//# sourceMappingURL=bcs.js.map
