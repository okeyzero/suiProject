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
  zkLoginSignature: () => zkLoginSignature
});
module.exports = __toCommonJS(bcs_exports);
var import_bcs = require("@mysten/bcs");
const zkLoginSignature = import_bcs.bcs.struct("ZkLoginSignature", {
  inputs: import_bcs.bcs.struct("ZkLoginSignatureInputs", {
    proofPoints: import_bcs.bcs.struct("ZkLoginSignatureInputsProofPoints", {
      a: import_bcs.bcs.vector(import_bcs.bcs.string()),
      b: import_bcs.bcs.vector(import_bcs.bcs.vector(import_bcs.bcs.string())),
      c: import_bcs.bcs.vector(import_bcs.bcs.string())
    }),
    issBase64Details: import_bcs.bcs.struct("ZkLoginSignatureInputsClaim", {
      value: import_bcs.bcs.string(),
      indexMod4: import_bcs.bcs.u8()
    }),
    headerBase64: import_bcs.bcs.string(),
    addressSeed: import_bcs.bcs.string()
  }),
  maxEpoch: import_bcs.bcs.u64(),
  userSignature: import_bcs.bcs.vector(import_bcs.bcs.u8())
});
//# sourceMappingURL=bcs.js.map
