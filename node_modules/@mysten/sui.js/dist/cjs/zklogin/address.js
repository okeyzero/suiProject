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
var address_exports = {};
__export(address_exports, {
  computeZkLoginAddressFromSeed: () => computeZkLoginAddressFromSeed
});
module.exports = __toCommonJS(address_exports);
var import_blake2b = require("@noble/hashes/blake2b");
var import_utils = require("@noble/hashes/utils");
var import_signature_scheme = require("../cryptography/signature-scheme.js");
var import_utils2 = require("../utils/index.js");
var import_utils3 = require("./utils.js");
function computeZkLoginAddressFromSeed(addressSeed, iss) {
  const addressSeedBytesBigEndian = (0, import_utils3.toBigEndianBytes)(addressSeed, 32);
  if (iss === "accounts.google.com") {
    iss = "https://accounts.google.com";
  }
  const addressParamBytes = new TextEncoder().encode(iss);
  const tmp = new Uint8Array(2 + addressSeedBytesBigEndian.length + addressParamBytes.length);
  tmp.set([import_signature_scheme.SIGNATURE_SCHEME_TO_FLAG.ZkLogin]);
  tmp.set([addressParamBytes.length], 1);
  tmp.set(addressParamBytes, 2);
  tmp.set(addressSeedBytesBigEndian, 2 + addressParamBytes.length);
  return (0, import_utils2.normalizeSuiAddress)(
    (0, import_utils.bytesToHex)((0, import_blake2b.blake2b)(tmp, { dkLen: 32 })).slice(0, import_utils2.SUI_ADDRESS_LENGTH * 2)
  );
}
//# sourceMappingURL=address.js.map
