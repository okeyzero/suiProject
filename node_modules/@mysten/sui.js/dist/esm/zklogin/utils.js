import { hexToBytes } from "@noble/hashes/utils";
function findFirstNonZeroIndex(bytes) {
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] !== 0) {
      return i;
    }
  }
  return -1;
}
function toPaddedBigEndianBytes(num, width) {
  const hex = num.toString(16);
  return hexToBytes(hex.padStart(width * 2, "0").slice(-width * 2));
}
function toBigEndianBytes(num, width) {
  const bytes = toPaddedBigEndianBytes(num, width);
  const firstNonZeroIndex = findFirstNonZeroIndex(bytes);
  if (firstNonZeroIndex === -1) {
    return new Uint8Array([0]);
  }
  return bytes.slice(firstNonZeroIndex);
}
export {
  toBigEndianBytes,
  toPaddedBigEndianBytes
};
//# sourceMappingURL=utils.js.map
