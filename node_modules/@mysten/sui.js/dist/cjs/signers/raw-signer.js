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
var raw_signer_exports = {};
__export(raw_signer_exports, {
  RawSigner: () => RawSigner
});
module.exports = __toCommonJS(raw_signer_exports);
var import_blake2b = require("@noble/hashes/blake2b");
var import_signature = require("../cryptography/signature.js");
var import_signer_with_provider = require("./signer-with-provider.js");
class RawSigner extends import_signer_with_provider.SignerWithProvider {
  constructor(keypair, client) {
    super(client);
    this.keypair = keypair;
  }
  async getAddress() {
    return this.keypair.getPublicKey().toSuiAddress();
  }
  async signData(data) {
    const pubkey = this.keypair.getPublicKey();
    const digest = (0, import_blake2b.blake2b)(data, { dkLen: 32 });
    const signature = this.keypair.signData(digest);
    const signatureScheme = this.keypair.getKeyScheme();
    return (0, import_signature.toSerializedSignature)({
      signatureScheme,
      signature,
      publicKey: pubkey
    });
  }
  connect(client) {
    return new RawSigner(this.keypair, client);
  }
}
//# sourceMappingURL=raw-signer.js.map
