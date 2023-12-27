const CODE_TO_ERROR_TYPE = {
  "-32700": "ParseError",
  "-32600": "InvalidRequest",
  "-32601": "MethodNotFound",
  "-32602": "InvalidParams",
  "-32603": "InternalError"
};
class SuiHTTPTransportError extends Error {
}
class JsonRpcError extends SuiHTTPTransportError {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.type = CODE_TO_ERROR_TYPE[code] ?? "ServerError";
  }
}
class SuiHTTPStatusError extends SuiHTTPTransportError {
  constructor(message, status, statusText) {
    super(message);
    this.status = status;
    this.statusText = statusText;
  }
}
export {
  JsonRpcError,
  SuiHTTPStatusError,
  SuiHTTPTransportError
};
//# sourceMappingURL=errors.js.map
