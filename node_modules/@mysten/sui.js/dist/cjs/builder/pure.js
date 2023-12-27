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
var pure_exports = {};
__export(pure_exports, {
  createPure: () => createPure
});
module.exports = __toCommonJS(pure_exports);
var import_bcs = require("../bcs/index.js");
function createPure(makePure) {
  function pure(value, type) {
    return makePure(value, type);
  }
  pure.u8 = (value) => makePure(import_bcs.bcs.U8.serialize(value));
  pure.u16 = (value) => makePure(import_bcs.bcs.U16.serialize(value));
  pure.u32 = (value) => makePure(import_bcs.bcs.U32.serialize(value));
  pure.u64 = (value) => makePure(import_bcs.bcs.U64.serialize(value));
  pure.u128 = (value) => makePure(import_bcs.bcs.U128.serialize(value));
  pure.u256 = (value) => makePure(import_bcs.bcs.U256.serialize(value));
  pure.bool = (value) => makePure(import_bcs.bcs.Bool.serialize(value));
  pure.string = (value) => makePure(import_bcs.bcs.String.serialize(value));
  pure.address = (value) => makePure(import_bcs.bcs.Address.serialize(value));
  pure.id = pure.address;
  return pure;
}
//# sourceMappingURL=pure.js.map
