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
var Transactions_exports = {};
__export(Transactions_exports, {
  MakeMoveVecTransaction: () => MakeMoveVecTransaction,
  MergeCoinsTransaction: () => MergeCoinsTransaction,
  MoveCallTransaction: () => MoveCallTransaction,
  PublishTransaction: () => PublishTransaction,
  SplitCoinsTransaction: () => SplitCoinsTransaction,
  TransactionArgument: () => TransactionArgument,
  TransactionBlockInput: () => TransactionBlockInput,
  TransactionType: () => TransactionType,
  Transactions: () => Transactions,
  TransferObjectsTransaction: () => TransferObjectsTransaction,
  UpgradePolicy: () => UpgradePolicy,
  UpgradeTransaction: () => UpgradeTransaction,
  getTransactionType: () => getTransactionType
});
module.exports = __toCommonJS(Transactions_exports);
var import_bcs = require("@mysten/bcs");
var import_superstruct = require("superstruct");
var import_bcs2 = require("../bcs/index.js");
var import_type_tag_serializer = require("../bcs/type-tag-serializer.js");
var import_sui_types = require("../utils/sui-types.js");
var import_Inputs = require("./Inputs.js");
var import_utils = require("./utils.js");
const option = (some) => (0, import_superstruct.union)([(0, import_superstruct.object)({ None: (0, import_superstruct.union)([(0, import_superstruct.literal)(true), (0, import_superstruct.literal)(null)]) }), (0, import_superstruct.object)({ Some: some })]);
const TransactionBlockInput = (0, import_superstruct.union)([
  (0, import_superstruct.object)({
    kind: (0, import_superstruct.literal)("Input"),
    index: (0, import_superstruct.integer)(),
    value: (0, import_superstruct.optional)((0, import_superstruct.any)()),
    type: (0, import_superstruct.optional)((0, import_superstruct.literal)("object"))
  }),
  (0, import_superstruct.object)({
    kind: (0, import_superstruct.literal)("Input"),
    index: (0, import_superstruct.integer)(),
    value: (0, import_superstruct.optional)((0, import_superstruct.any)()),
    type: (0, import_superstruct.literal)("pure")
  })
]);
const TransactionArgumentTypes = [
  TransactionBlockInput,
  (0, import_superstruct.object)({ kind: (0, import_superstruct.literal)("GasCoin") }),
  (0, import_superstruct.object)({ kind: (0, import_superstruct.literal)("Result"), index: (0, import_superstruct.integer)() }),
  (0, import_superstruct.object)({
    kind: (0, import_superstruct.literal)("NestedResult"),
    index: (0, import_superstruct.integer)(),
    resultIndex: (0, import_superstruct.integer)()
  })
];
const TransactionArgument = (0, import_superstruct.union)([...TransactionArgumentTypes]);
const MoveCallTransaction = (0, import_superstruct.object)({
  kind: (0, import_superstruct.literal)("MoveCall"),
  target: (0, import_superstruct.define)("target", (0, import_superstruct.string)().validator),
  typeArguments: (0, import_superstruct.array)((0, import_superstruct.string)()),
  arguments: (0, import_superstruct.array)(TransactionArgument)
});
const TransferObjectsTransaction = (0, import_superstruct.object)({
  kind: (0, import_superstruct.literal)("TransferObjects"),
  objects: (0, import_superstruct.array)(TransactionArgument),
  address: TransactionArgument
});
const SplitCoinsTransaction = (0, import_superstruct.object)({
  kind: (0, import_superstruct.literal)("SplitCoins"),
  coin: TransactionArgument,
  amounts: (0, import_superstruct.array)(TransactionArgument)
});
const MergeCoinsTransaction = (0, import_superstruct.object)({
  kind: (0, import_superstruct.literal)("MergeCoins"),
  destination: TransactionArgument,
  sources: (0, import_superstruct.array)(TransactionArgument)
});
const MakeMoveVecTransaction = (0, import_superstruct.object)({
  kind: (0, import_superstruct.literal)("MakeMoveVec"),
  // TODO: ideally we should use `TypeTag` instead of `record()` here,
  // but TypeTag is recursively defined and it's tricky to define a
  // recursive struct in superstruct
  type: (0, import_superstruct.optional)(option((0, import_superstruct.record)((0, import_superstruct.string)(), (0, import_superstruct.unknown)()))),
  objects: (0, import_superstruct.array)(TransactionArgument)
});
const PublishTransaction = (0, import_superstruct.object)({
  kind: (0, import_superstruct.literal)("Publish"),
  modules: (0, import_superstruct.array)((0, import_superstruct.array)((0, import_superstruct.integer)())),
  dependencies: (0, import_superstruct.array)((0, import_superstruct.string)())
});
var UpgradePolicy = /* @__PURE__ */ ((UpgradePolicy2) => {
  UpgradePolicy2[UpgradePolicy2["COMPATIBLE"] = 0] = "COMPATIBLE";
  UpgradePolicy2[UpgradePolicy2["ADDITIVE"] = 128] = "ADDITIVE";
  UpgradePolicy2[UpgradePolicy2["DEP_ONLY"] = 192] = "DEP_ONLY";
  return UpgradePolicy2;
})(UpgradePolicy || {});
const UpgradeTransaction = (0, import_superstruct.object)({
  kind: (0, import_superstruct.literal)("Upgrade"),
  modules: (0, import_superstruct.array)((0, import_superstruct.array)((0, import_superstruct.integer)())),
  dependencies: (0, import_superstruct.array)((0, import_superstruct.string)()),
  packageId: (0, import_superstruct.string)(),
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
const TransactionType = (0, import_superstruct.union)([...TransactionTypes]);
function getTransactionType(data) {
  (0, import_superstruct.assert)(data, TransactionType);
  return TransactionTypes.find((schema) => (0, import_superstruct.is)(data, schema));
}
const Transactions = {
  MoveCall(input) {
    return (0, import_utils.create)(
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
      address.value = import_Inputs.Inputs.Pure(import_bcs2.bcs.Address.serialize(address.value));
    }
    return (0, import_utils.create)({ kind: "TransferObjects", objects, address }, TransferObjectsTransaction);
  },
  SplitCoins(coin, amounts) {
    amounts.forEach((input) => {
      if (input.kind === "Input" && input.type === "pure" && typeof input.value !== "object") {
        input.value = import_Inputs.Inputs.Pure(import_bcs2.bcs.U64.serialize(input.value));
      }
    });
    return (0, import_utils.create)(
      {
        kind: "SplitCoins",
        coin,
        amounts
      },
      SplitCoinsTransaction
    );
  },
  MergeCoins(destination, sources) {
    return (0, import_utils.create)({ kind: "MergeCoins", destination, sources }, MergeCoinsTransaction);
  },
  Publish({
    modules,
    dependencies
  }) {
    return (0, import_utils.create)(
      {
        kind: "Publish",
        modules: modules.map(
          (module2) => typeof module2 === "string" ? Array.from((0, import_bcs.fromB64)(module2)) : module2
        ),
        dependencies: dependencies.map((dep) => (0, import_sui_types.normalizeSuiObjectId)(dep))
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
    return (0, import_utils.create)(
      {
        kind: "Upgrade",
        modules: modules.map(
          (module2) => typeof module2 === "string" ? Array.from((0, import_bcs.fromB64)(module2)) : module2
        ),
        dependencies: dependencies.map((dep) => (0, import_sui_types.normalizeSuiObjectId)(dep)),
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
    return (0, import_utils.create)(
      {
        kind: "MakeMoveVec",
        type: type ? { Some: import_type_tag_serializer.TypeTagSerializer.parseFromStr(type) } : { None: null },
        objects
      },
      MakeMoveVecTransaction
    );
  }
};
//# sourceMappingURL=Transactions.js.map
