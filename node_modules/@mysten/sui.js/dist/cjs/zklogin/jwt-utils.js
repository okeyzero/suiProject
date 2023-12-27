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
var jwt_utils_exports = {};
__export(jwt_utils_exports, {
  extractClaimValue: () => extractClaimValue
});
module.exports = __toCommonJS(jwt_utils_exports);
function base64UrlCharTo6Bits(base64UrlChar) {
  if (base64UrlChar.length !== 1) {
    throw new Error("Invalid base64Url character: " + base64UrlChar);
  }
  const base64UrlCharacterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  const index = base64UrlCharacterSet.indexOf(base64UrlChar);
  if (index === -1) {
    throw new Error("Invalid base64Url character: " + base64UrlChar);
  }
  const binaryString = index.toString(2).padStart(6, "0");
  const bits = Array.from(binaryString).map(Number);
  return bits;
}
function base64UrlStringToBitVector(base64UrlString) {
  let bitVector = [];
  for (let i = 0; i < base64UrlString.length; i++) {
    const base64UrlChar = base64UrlString.charAt(i);
    const bits = base64UrlCharTo6Bits(base64UrlChar);
    bitVector = bitVector.concat(bits);
  }
  return bitVector;
}
function decodeBase64URL(s, i) {
  if (s.length < 2) {
    throw new Error(`Input (s = ${s}) is not tightly packed because s.length < 2`);
  }
  let bits = base64UrlStringToBitVector(s);
  const firstCharOffset = i % 4;
  if (firstCharOffset === 0) {
  } else if (firstCharOffset === 1) {
    bits = bits.slice(2);
  } else if (firstCharOffset === 2) {
    bits = bits.slice(4);
  } else {
    throw new Error(`Input (s = ${s}) is not tightly packed because i%4 = 3 (i = ${i}))`);
  }
  const lastCharOffset = (i + s.length - 1) % 4;
  if (lastCharOffset === 3) {
  } else if (lastCharOffset === 2) {
    bits = bits.slice(0, bits.length - 2);
  } else if (lastCharOffset === 1) {
    bits = bits.slice(0, bits.length - 4);
  } else {
    throw new Error(
      `Input (s = ${s}) is not tightly packed because (i + s.length - 1)%4 = 0 (i = ${i}))`
    );
  }
  if (bits.length % 8 !== 0) {
    throw new Error(`We should never reach here...`);
  }
  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  let currentByteIndex = 0;
  for (let i2 = 0; i2 < bits.length; i2 += 8) {
    const bitChunk = bits.slice(i2, i2 + 8);
    const byte = parseInt(bitChunk.join(""), 2);
    bytes[currentByteIndex++] = byte;
  }
  return new TextDecoder().decode(bytes);
}
function verifyExtendedClaim(claim) {
  if (!(claim.slice(-1) === "}" || claim.slice(-1) === ",")) {
    throw new Error("Invalid claim");
  }
  const json = JSON.parse("{" + claim.slice(0, -1) + "}");
  if (Object.keys(json).length !== 1) {
    throw new Error("Invalid claim");
  }
  const key = Object.keys(json)[0];
  return [key, json[key]];
}
function extractClaimValue(claim, claimName) {
  const extendedClaim = decodeBase64URL(claim.value, claim.indexMod4);
  const [name, value] = verifyExtendedClaim(extendedClaim);
  if (name !== claimName) {
    throw new Error(`Invalid field name: found ${name} expected ${claimName}`);
  }
  return value;
}
//# sourceMappingURL=jwt-utils.js.map
