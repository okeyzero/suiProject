var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _requestId, _disconnects, _webSocket, _connectionPromise, _subscriptions, _pendingRequests, _setupWebSocket, setupWebSocket_fn, _reconnect, reconnect_fn;
import { JsonRpcError } from "./errors.js";
function getWebsocketUrl(httpUrl) {
  const url = new URL(httpUrl);
  url.protocol = url.protocol.replace("http", "ws");
  return url.toString();
}
const DEFAULT_CLIENT_OPTIONS = {
  // We fudge the typing because we also check for undefined in the constructor:
  WebSocketConstructor: typeof WebSocket !== "undefined" ? WebSocket : void 0,
  callTimeout: 3e4,
  reconnectTimeout: 3e3,
  maxReconnects: 5
};
class WebsocketClient {
  constructor(endpoint, options = {}) {
    __privateAdd(this, _setupWebSocket);
    __privateAdd(this, _reconnect);
    __privateAdd(this, _requestId, 0);
    __privateAdd(this, _disconnects, 0);
    __privateAdd(this, _webSocket, null);
    __privateAdd(this, _connectionPromise, null);
    __privateAdd(this, _subscriptions, /* @__PURE__ */ new Set());
    __privateAdd(this, _pendingRequests, /* @__PURE__ */ new Map());
    this.endpoint = endpoint;
    this.options = { ...DEFAULT_CLIENT_OPTIONS, ...options };
    if (!this.options.WebSocketConstructor) {
      throw new Error("Missing WebSocket constructor");
    }
    if (this.endpoint.startsWith("http")) {
      this.endpoint = getWebsocketUrl(this.endpoint);
    }
  }
  async makeRequest(method, params) {
    const webSocket = await __privateMethod(this, _setupWebSocket, setupWebSocket_fn).call(this);
    return new Promise((resolve, reject) => {
      __privateSet(this, _requestId, __privateGet(this, _requestId) + 1);
      __privateGet(this, _pendingRequests).set(__privateGet(this, _requestId), {
        resolve,
        reject,
        timeout: setTimeout(() => {
          __privateGet(this, _pendingRequests).delete(__privateGet(this, _requestId));
          reject(new Error(`Request timeout: ${method}`));
        }, this.options.callTimeout)
      });
      webSocket.send(JSON.stringify({ jsonrpc: "2.0", id: __privateGet(this, _requestId), method, params }));
    }).then(({ error, result }) => {
      if (error) {
        throw new JsonRpcError(error.message, error.code);
      }
      return result;
    });
  }
  async subscribe(input) {
    const subscription = new RpcSubscription(input);
    __privateGet(this, _subscriptions).add(subscription);
    await subscription.subscribe(this);
    return () => subscription.unsubscribe(this);
  }
}
_requestId = new WeakMap();
_disconnects = new WeakMap();
_webSocket = new WeakMap();
_connectionPromise = new WeakMap();
_subscriptions = new WeakMap();
_pendingRequests = new WeakMap();
_setupWebSocket = new WeakSet();
setupWebSocket_fn = function() {
  if (__privateGet(this, _connectionPromise)) {
    return __privateGet(this, _connectionPromise);
  }
  __privateSet(this, _connectionPromise, new Promise((resolve) => {
    __privateGet(this, _webSocket)?.close();
    __privateSet(this, _webSocket, new this.options.WebSocketConstructor(this.endpoint));
    __privateGet(this, _webSocket).addEventListener("open", () => {
      __privateSet(this, _disconnects, 0);
      resolve(__privateGet(this, _webSocket));
    });
    __privateGet(this, _webSocket).addEventListener("close", () => {
      __privateWrapper(this, _disconnects)._++;
      if (__privateGet(this, _disconnects) <= this.options.maxReconnects) {
        setTimeout(() => {
          __privateMethod(this, _reconnect, reconnect_fn).call(this);
        }, this.options.reconnectTimeout);
      }
    });
    __privateGet(this, _webSocket).addEventListener("message", ({ data }) => {
      let json;
      try {
        json = JSON.parse(data);
      } catch (error) {
        console.error(new Error(`Failed to parse RPC message: ${data}`, { cause: error }));
        return;
      }
      if ("id" in json && json.id != null && __privateGet(this, _pendingRequests).has(json.id)) {
        const { resolve: resolve2, timeout } = __privateGet(this, _pendingRequests).get(json.id);
        clearTimeout(timeout);
        resolve2(json);
      } else if ("params" in json) {
        const { params } = json;
        __privateGet(this, _subscriptions).forEach((subscription) => {
          if (subscription.subscriptionId === params.subscription) {
            if (params.subscription === subscription.subscriptionId) {
              subscription.onMessage(params.result);
            }
          }
        });
      }
    });
  }));
  return __privateGet(this, _connectionPromise);
};
_reconnect = new WeakSet();
reconnect_fn = async function() {
  __privateGet(this, _webSocket)?.close();
  __privateSet(this, _connectionPromise, null);
  return Promise.allSettled(
    [...__privateGet(this, _subscriptions)].map((subscription) => subscription.subscribe(this))
  );
};
class RpcSubscription {
  constructor(input) {
    this.subscriptionId = null;
    this.subscribed = false;
    this.input = input;
  }
  onMessage(message) {
    if (this.subscribed) {
      this.input.onMessage(message);
    }
  }
  async unsubscribe(client) {
    const { subscriptionId } = this;
    this.subscribed = false;
    if (subscriptionId == null)
      return false;
    this.subscriptionId = null;
    return client.makeRequest(this.input.unsubscribe, [subscriptionId]);
  }
  async subscribe(client) {
    this.subscriptionId = null;
    this.subscribed = true;
    const newSubscriptionId = await client.makeRequest(
      this.input.method,
      this.input.params
    );
    if (this.subscribed) {
      this.subscriptionId = newSubscriptionId;
    }
  }
}
export {
  DEFAULT_CLIENT_OPTIONS,
  WebsocketClient
};
//# sourceMappingURL=rpc-websocket-client.js.map
