var AppId = /* @__PURE__ */ ((AppId2) => {
  AppId2[AppId2["Sui"] = 0] = "Sui";
  return AppId2;
})(AppId || {});
var IntentVersion = /* @__PURE__ */ ((IntentVersion2) => {
  IntentVersion2[IntentVersion2["V0"] = 0] = "V0";
  return IntentVersion2;
})(IntentVersion || {});
var IntentScope = /* @__PURE__ */ ((IntentScope2) => {
  IntentScope2[IntentScope2["TransactionData"] = 0] = "TransactionData";
  IntentScope2[IntentScope2["TransactionEffects"] = 1] = "TransactionEffects";
  IntentScope2[IntentScope2["CheckpointSummary"] = 2] = "CheckpointSummary";
  IntentScope2[IntentScope2["PersonalMessage"] = 3] = "PersonalMessage";
  return IntentScope2;
})(IntentScope || {});
function intentWithScope(scope) {
  return [scope, 0 /* V0 */, 0 /* Sui */];
}
function messageWithIntent(scope, message) {
  const intent = intentWithScope(scope);
  const intentMessage = new Uint8Array(intent.length + message.length);
  intentMessage.set(intent);
  intentMessage.set(message, intent.length);
  return intentMessage;
}
export {
  AppId,
  IntentScope,
  IntentVersion,
  messageWithIntent
};
//# sourceMappingURL=intent.js.map
