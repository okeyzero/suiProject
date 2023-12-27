import { bcs } from "../bcs/index.js";
function createPure(makePure) {
  function pure(value, type) {
    return makePure(value, type);
  }
  pure.u8 = (value) => makePure(bcs.U8.serialize(value));
  pure.u16 = (value) => makePure(bcs.U16.serialize(value));
  pure.u32 = (value) => makePure(bcs.U32.serialize(value));
  pure.u64 = (value) => makePure(bcs.U64.serialize(value));
  pure.u128 = (value) => makePure(bcs.U128.serialize(value));
  pure.u256 = (value) => makePure(bcs.U256.serialize(value));
  pure.bool = (value) => makePure(bcs.Bool.serialize(value));
  pure.string = (value) => makePure(bcs.String.serialize(value));
  pure.address = (value) => makePure(bcs.Address.serialize(value));
  pure.id = pure.address;
  return pure;
}
export {
  createPure
};
//# sourceMappingURL=pure.js.map
