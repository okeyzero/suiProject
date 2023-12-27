import { bcs } from "@mysten/bcs";
const zkLoginSignature = bcs.struct("ZkLoginSignature", {
  inputs: bcs.struct("ZkLoginSignatureInputs", {
    proofPoints: bcs.struct("ZkLoginSignatureInputsProofPoints", {
      a: bcs.vector(bcs.string()),
      b: bcs.vector(bcs.vector(bcs.string())),
      c: bcs.vector(bcs.string())
    }),
    issBase64Details: bcs.struct("ZkLoginSignatureInputsClaim", {
      value: bcs.string(),
      indexMod4: bcs.u8()
    }),
    headerBase64: bcs.string(),
    addressSeed: bcs.string()
  }),
  maxEpoch: bcs.u64(),
  userSignature: bcs.vector(bcs.u8())
});
export {
  zkLoginSignature
};
//# sourceMappingURL=bcs.js.map
