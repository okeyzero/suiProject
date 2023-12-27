import { fromB64, toB64 } from "@mysten/bcs";
import { SIGNATURE_SCHEME_TO_FLAG } from "../cryptography/signature-scheme.js";
import { zkLoginSignature } from "./bcs.js";
function getZkLoginSignatureBytes({ inputs, maxEpoch, userSignature }) {
  return zkLoginSignature.serialize(
    {
      inputs,
      maxEpoch,
      userSignature: typeof userSignature === "string" ? fromB64(userSignature) : userSignature
    },
    { maxSize: 2048 }
  ).toBytes();
}
function getZkLoginSignature({ inputs, maxEpoch, userSignature }) {
  const bytes = getZkLoginSignatureBytes({ inputs, maxEpoch, userSignature });
  const signatureBytes = new Uint8Array(bytes.length + 1);
  signatureBytes.set([SIGNATURE_SCHEME_TO_FLAG.ZkLogin]);
  signatureBytes.set(bytes, 1);
  return toB64(signatureBytes);
}
function parseZkLoginSignature(signature) {
  return zkLoginSignature.parse(typeof signature === "string" ? fromB64(signature) : signature);
}
export {
  getZkLoginSignature,
  parseZkLoginSignature
};
//# sourceMappingURL=signature.js.map
