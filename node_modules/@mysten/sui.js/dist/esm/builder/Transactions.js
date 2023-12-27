import { fromB64 } from "@mysten/bcs";
import {
  any,
  array,
  assert,
  define,
  integer,
  is,
  literal,
  object,
  optional,
  record,
  string,
  union,
  unknown
} from "superstruct";
import { bcs } from "../bcs/index.js";
import { TypeTagSerializer } from "../bcs/type-tag-serializer.js";
import { normalizeSuiObjectId } from "../utils/sui-types.js";
import { Inputs } from "./Inputs.js";
import { create } from "./utils.js";
const option = (some) => union([object({ None: union([literal(true), literal(null)]) }), object({ Some: some })]);
const TransactionBlockInput = union([
  object({
    kind: literal("Input"),
    index: integer(),
    value: optional(any()),
    type: optional(literal("object"))
  }),
  object({
    kind: literal("Input"),
    index: integer(),
    value: optional(any()),
    type: literal("pure")
  })
]);
const TransactionArgumentTypes = [
  TransactionBlockInput,
  object({ kind: literal("GasCoin") }),
  object({ kind: literal("Result"), index: integer() }),
  object({
    kind: literal("NestedResult"),
    index: integer(),
    resultIndex: integer()
  })
];
const TransactionArgument = union([...TransactionArgumentTypes]);
const MoveCallTransaction = object({
  kind: literal("MoveCall"),
  target: define("target", string().validator),
  typeArguments: array(string()),
  arguments: array(TransactionArgument)
});
const TransferObjectsTransaction = object({
  kind: literal("TransferObjects"),
  objects: array(TransactionArgument),
  address: TransactionArgument
});
const SplitCoinsTransaction = object({
  kind: literal("SplitCoins"),
  coin: TransactionArgument,
  amounts: array(TransactionArgument)
});
const MergeCoinsTransaction = object({
  kind: literal("MergeCoins"),
  destination: TransactionArgument,
  sources: array(TransactionArgument)
});
const MakeMoveVecTransaction = object({
  kind: literal("MakeMoveVec"),
  // TODO: ideally we should use `TypeTag` instead of `record()` here,
  // but TypeTag is recursively defined and it's tricky to define a
  // recursive struct in superstruct
  type: optional(option(record(string(), unknown()))),
  objects: array(TransactionArgument)
});
const PublishTransaction = object({
  kind: literal("Publish"),
  modules: array(array(integer())),
  dependencies: array(string())
});
var UpgradePolicy = /* @__PURE__ */ ((UpgradePolicy2) => {
  UpgradePolicy2[UpgradePolicy2["COMPATIBLE"] = 0] = "COMPATIBLE";
  UpgradePolicy2[UpgradePolicy2["ADDITIVE"] = 128] = "ADDITIVE";
  UpgradePolicy2[UpgradePolicy2["DEP_ONLY"] = 192] = "DEP_ONLY";
  return UpgradePolicy2;
})(UpgradePolicy || {});
const UpgradeTransaction = object({
  kind: literal("Upgrade"),
  modules: array(array(integer())),
  dependencies: array(string()),
  packageId: string(),
  ticket: TransactionArgument
});
const TransactionTypes = [
  MoveCallTransaction,
  TransferObjectsTransaction,
  SplitCoinsTransaction,
  MergeCoinsTransaction,
  PublishTransaction,
  UpgradeTransaction,
  MakeMoveVecTransaction
];
const TransactionType = union([...TransactionTypes]);
function getTransactionType(data) {
  assert(data, TransactionType);
  return TransactionTypes.find((schema) => is(data, schema));
}
const Transactions = {
  MoveCall(input) {
    return create(
      {
        kind: "MoveCall",
        target: input.target,
        arguments: input.arguments ?? [],
        typeArguments: input.typeArguments ?? []
      },
      MoveCallTransaction
    );
  },
  TransferObjects(objects, address) {
    if (address.kind === "Input" && address.type === "pure" && typeof address.value !== "object") {
      address.value = Inputs.Pure(bcs.Address.serialize(address.value));
    }
    return create({ kind: "TransferObjects", objects, address }, TransferObjectsTransaction);
  },
  SplitCoins(coin, amounts) {
    amounts.forEach((input) => {
      if (input.kind === "Input" && input.type === "pure" && typeof input.value !== "object") {
        input.value = Inputs.Pure(bcs.U64.serialize(input.value));
      }
    });
    return create(
      {
        kind: "SplitCoins",
        coin,
        amounts
      },
      SplitCoinsTransaction
    );
  },
  MergeCoins(destination, sources) {
    return create({ kind: "MergeCoins", destination, sources }, MergeCoinsTransaction);
  },
  Publish({
    modules,
    dependencies
  }) {
    return create(
      {
        kind: "Publish",
        modules: modules.map(
          (module) => typeof module === "string" ? Array.from(fromB64(module)) : module
        ),
        dependencies: dependencies.map((dep) => normalizeSuiObjectId(dep))
      },
      PublishTransaction
    );
  },
  Upgrade({
    modules,
    dependencies,
    packageId,
    ticket
  }) {
    return create(
      {
        kind: "Upgrade",
        modules: modules.map(
          (module) => typeof module === "string" ? Array.from(fromB64(module)) : module
        ),
        dependencies: dependencies.map((dep) => normalizeSuiObjectId(dep)),
        packageId,
        ticket
      },
      UpgradeTransaction
    );
  },
  MakeMoveVec({
    type,
    objects
  }) {
    return create(
      {
        kind: "MakeMoveVec",
        type: type ? { Some: TypeTagSerializer.parseFromStr(type) } : { None: null },
        objects
      },
      MakeMoveVecTransaction
    );
  }
};
export {
  MakeMoveVecTransaction,
  MergeCoinsTransaction,
  MoveCallTransaction,
  PublishTransaction,
  SplitCoinsTransaction,
  TransactionArgument,
  TransactionBlockInput,
  TransactionType,
  Transactions,
  TransferObjectsTransaction,
  UpgradePolicy,
  UpgradeTransaction,
  getTransactionType
};
//# sourceMappingURL=Transactions.js.map
