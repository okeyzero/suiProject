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
var normalized_exports = {};
__export(normalized_exports, {
  MoveCallMetric: () => MoveCallMetric,
  MoveCallMetrics: () => MoveCallMetrics,
  SuiMoveAbilitySet: () => SuiMoveAbilitySet,
  SuiMoveFunctionArgType: () => SuiMoveFunctionArgType,
  SuiMoveFunctionArgTypes: () => SuiMoveFunctionArgTypes,
  SuiMoveModuleId: () => SuiMoveModuleId,
  SuiMoveNormalizedField: () => SuiMoveNormalizedField,
  SuiMoveNormalizedFunction: () => SuiMoveNormalizedFunction,
  SuiMoveNormalizedModule: () => SuiMoveNormalizedModule,
  SuiMoveNormalizedModules: () => SuiMoveNormalizedModules,
  SuiMoveNormalizedStruct: () => SuiMoveNormalizedStruct,
  SuiMoveNormalizedStructType: () => SuiMoveNormalizedStructType,
  SuiMoveNormalizedType: () => SuiMoveNormalizedType,
  SuiMoveNormalizedTypeParameterType: () => SuiMoveNormalizedTypeParameterType,
  SuiMoveStructTypeParameter: () => SuiMoveStructTypeParameter,
  SuiMoveVisibility: () => SuiMoveVisibility,
  extractMutableReference: () => extractMutableReference,
  extractReference: () => extractReference,
  extractStructTag: () => extractStructTag
});
module.exports = __toCommonJS(normalized_exports);
var import_superstruct = require("superstruct");
const SuiMoveFunctionArgType = (0, import_superstruct.union)([(0, import_superstruct.string)(), (0, import_superstruct.object)({ Object: (0, import_superstruct.string)() })]);
const SuiMoveFunctionArgTypes = (0, import_superstruct.array)(SuiMoveFunctionArgType);
const SuiMoveModuleId = (0, import_superstruct.object)({
  address: (0, import_superstruct.string)(),
  name: (0, import_superstruct.string)()
});
const SuiMoveVisibility = (0, import_superstruct.union)([(0, import_superstruct.literal)("Private"), (0, import_superstruct.literal)("Public"), (0, import_superstruct.literal)("Friend")]);
const SuiMoveAbilitySet = (0, import_superstruct.object)({
  abilities: (0, import_superstruct.array)((0, import_superstruct.string)())
});
const SuiMoveStructTypeParameter = (0, import_superstruct.object)({
  constraints: SuiMoveAbilitySet,
  isPhantom: (0, import_superstruct.boolean)()
});
const SuiMoveNormalizedTypeParameterType = (0, import_superstruct.object)({
  TypeParameter: (0, import_superstruct.number)()
});
const MoveCallMetric = (0, import_superstruct.tuple)([
  (0, import_superstruct.object)({
    module: (0, import_superstruct.string)(),
    package: (0, import_superstruct.string)(),
    function: (0, import_superstruct.string)()
  }),
  (0, import_superstruct.string)()
]);
const MoveCallMetrics = (0, import_superstruct.object)({
  rank3Days: (0, import_superstruct.array)(MoveCallMetric),
  rank7Days: (0, import_superstruct.array)(MoveCallMetric),
  rank30Days: (0, import_superstruct.array)(MoveCallMetric)
});
function isSuiMoveNormalizedType(value) {
  if (!value)
    return false;
  if (typeof value === "string")
    return true;
  if ((0, import_superstruct.is)(value, SuiMoveNormalizedTypeParameterType))
    return true;
  if (isSuiMoveNormalizedStructType(value))
    return true;
  if (typeof value !== "object")
    return false;
  const valueProperties = value;
  if ((0, import_superstruct.is)(valueProperties.Reference, SuiMoveNormalizedType))
    return true;
  if ((0, import_superstruct.is)(valueProperties.MutableReference, SuiMoveNormalizedType))
    return true;
  if ((0, import_superstruct.is)(valueProperties.Vector, SuiMoveNormalizedType))
    return true;
  return false;
}
const SuiMoveNormalizedType = (0, import_superstruct.define)(
  "SuiMoveNormalizedType",
  isSuiMoveNormalizedType
);
function isSuiMoveNormalizedStructType(value) {
  if (!value || typeof value !== "object")
    return false;
  const valueProperties = value;
  if (!valueProperties.Struct || typeof valueProperties.Struct !== "object")
    return false;
  const structProperties = valueProperties.Struct;
  if (typeof structProperties.address !== "string" || typeof structProperties.module !== "string" || typeof structProperties.name !== "string" || !Array.isArray(structProperties.typeArguments) || !structProperties.typeArguments.every((value2) => isSuiMoveNormalizedType(value2))) {
    return false;
  }
  return true;
}
const SuiMoveNormalizedStructType = (0, import_superstruct.define)(
  "SuiMoveNormalizedStructType",
  isSuiMoveNormalizedStructType
);
const SuiMoveNormalizedFunction = (0, import_superstruct.object)({
  visibility: SuiMoveVisibility,
  isEntry: (0, import_superstruct.boolean)(),
  typeParameters: (0, import_superstruct.array)(SuiMoveAbilitySet),
  parameters: (0, import_superstruct.array)(SuiMoveNormalizedType),
  return: (0, import_superstruct.array)(SuiMoveNormalizedType)
});
const SuiMoveNormalizedField = (0, import_superstruct.object)({
  name: (0, import_superstruct.string)(),
  type: SuiMoveNormalizedType
});
const SuiMoveNormalizedStruct = (0, import_superstruct.object)({
  abilities: SuiMoveAbilitySet,
  typeParameters: (0, import_superstruct.array)(SuiMoveStructTypeParameter),
  fields: (0, import_superstruct.array)(SuiMoveNormalizedField)
});
const SuiMoveNormalizedModule = (0, import_superstruct.object)({
  fileFormatVersion: (0, import_superstruct.number)(),
  address: (0, import_superstruct.string)(),
  name: (0, import_superstruct.string)(),
  friends: (0, import_superstruct.array)(SuiMoveModuleId),
  structs: (0, import_superstruct.record)((0, import_superstruct.string)(), SuiMoveNormalizedStruct),
  exposedFunctions: (0, import_superstruct.record)((0, import_superstruct.string)(), SuiMoveNormalizedFunction)
});
const SuiMoveNormalizedModules = (0, import_superstruct.record)((0, import_superstruct.string)(), SuiMoveNormalizedModule);
function extractMutableReference(normalizedType) {
  return typeof normalizedType === "object" && "MutableReference" in normalizedType ? normalizedType.MutableReference : void 0;
}
function extractReference(normalizedType) {
  return typeof normalizedType === "object" && "Reference" in normalizedType ? normalizedType.Reference : void 0;
}
function extractStructTag(normalizedType) {
  if (typeof normalizedType === "object" && "Struct" in normalizedType) {
    return normalizedType;
  }
  const ref = extractReference(normalizedType);
  const mutRef = extractMutableReference(normalizedType);
  if (typeof ref === "object" && "Struct" in ref) {
    return ref;
  }
  if (typeof mutRef === "object" && "Struct" in mutRef) {
    return mutRef;
  }
  return void 0;
}
//# sourceMappingURL=normalized.js.map
