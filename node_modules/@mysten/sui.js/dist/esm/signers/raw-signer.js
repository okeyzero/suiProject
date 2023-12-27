import { blake2b } from "@noble/hashes/blake2b";
import { toSerializedSignature } from "../cryptography/signature.js";
import { SignerWithProvider } from "./signer-with-provider.js";
class RawSigner extends SignerWithProvider {
  constructor(keypair, client) {
    super(client);
    this.keypair = keypair;
  }
  async getAddress() {
    return this.keypair.getPublicKey().toSuiAddress();
  }
  async signData(data) {
    const pubkey = this.keypair.getPublicKey();
    const digest = blake2b(data, { dkLen: 32 });
    const signature = this.keypair.signData(digest);
    const signatureScheme = this.keypair.getKeyScheme();
    return toSerializedSignature({
      signatureScheme,
      signature,
      publicKey: pubkey
    });
  }
  connect(client) {
    return new RawSigner(this.keypair, client);
  }
}
export {
  RawSigner
};
//# sourceMappingURL=raw-signer.js.map
