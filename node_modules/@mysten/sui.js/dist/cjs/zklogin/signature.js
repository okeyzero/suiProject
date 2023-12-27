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
var signature_exports = {};
__export(signature_exports, {
  getZkLoginSignature: () => getZkLoginSignature,
  parseZkLoginSignature: () => parseZkLoginSignature
});
module.exports = __toCommonJS(signature_exports);
var import_bcs = require("@mysten/bcs");
var import_signature_scheme = require("../cryptography/signature-scheme.js");
var import_bcs2 = require("./bcs.js");
function getZkLoginSignatureBytes({ inputs, maxEpoch, userSignature }) {
  return import_bcs2.zkLoginSignature.serialize(
    {
      inputs,
      maxEpoch,
      userSignature: typeof userSignature === "string" ? (0, import_bcs.fromB64)(userSignature) : userSignature
    },
    { maxSize: 2048 }
  ).toBytes();
}
function getZkLoginSignature({ inputs, maxEpoch, userSignature }) {
  const bytes = getZkLoginSignatureBytes({ inputs, maxEpoch, userSignature });
  const signatureBytes = new Uint8Array(bytes.length + 1);
  signatureBytes.set([import_signature_scheme.SIGNATURE_SCHEME_TO_FLAG.ZkLogin]);
  signatureBytes.set(bytes, 1);
  return (0, import_bcs.toB64)(signatureBytes);
}
function parseZkLoginSignature(signature) {
  return import_bcs2.zkLoginSignature.parse(typeof signature === "string" ? (0, import_bcs.fromB64)(signature) : signature);
}
//# sourceMappingURL=signature.js.map
