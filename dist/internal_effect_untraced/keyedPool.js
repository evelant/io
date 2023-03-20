"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSizedWithTTLBy = exports.makeSizedWithTTL = exports.makeSizedWith = exports.makeSized = exports.invalidate = exports.get = exports.KeyedPoolTypeId = void 0;
var Duration = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Duration"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var HashMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashMap"));
var MutableRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableRef"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var effect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/effect"));
var fiberRuntime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRuntime"));
var pool = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/pool"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a, _b, _c;
/** @internal */
const KeyedPoolSymbolKey = "@effect/io/KeyedPool";
/** @internal */
const KeyedPoolTypeId = /*#__PURE__*/Symbol.for(KeyedPoolSymbolKey);
exports.KeyedPoolTypeId = KeyedPoolTypeId;
const KeyedPoolMapValueSymbol = /*#__PURE__*/Symbol.for("@effect/io/KeyedPool/MapValue");
const keyedPoolVariance = {
  _K: _ => _,
  _E: _ => _,
  _A: _ => _
};
class KeyedPoolImpl {
  constructor(getOrCreatePool, activePools) {
    this.getOrCreatePool = getOrCreatePool;
    this.activePools = activePools;
    this[_a] = keyedPoolVariance;
  }
  get(key) {
    return Debug.bodyWithTrace(trace => core.flatMap(this.getOrCreatePool(key), pool.get).traced(trace));
  }
  invalidate(item) {
    return Debug.bodyWithTrace(trace => core.flatMap(this.activePools(), core.forEachDiscard(pool => pool.invalidate(item))).traced(trace));
  }
}
_a = KeyedPoolTypeId;
class Complete {
  constructor(pool) {
    this.pool = pool;
    this._tag = "Complete";
    this[_b] = KeyedPoolMapValueSymbol;
  }
  [(_b = KeyedPoolMapValueSymbol, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.pool))(Hash.string("@effect/io/KeyedPool/Complete"));
  }
  [Equal.symbol](u) {
    return isComplete(u) && Equal.equals(this.pool, u.pool);
  }
}
const isComplete = u => typeof u === "object" && u != null && KeyedPoolMapValueSymbol in u && "_tag" in u && u["_tag"] === "Complete";
class Pending {
  constructor(deferred) {
    this.deferred = deferred;
    this._tag = "Pending";
    this[_c] = KeyedPoolMapValueSymbol;
  }
  [(_c = KeyedPoolMapValueSymbol, Hash.symbol)]() {
    return Hash.combine(Hash.hash(this.deferred))(Hash.string("@effect/io/KeyedPool/Pending"));
  }
  [Equal.symbol](u) {
    return isPending(u) && Equal.equals(this.deferred, u.deferred);
  }
}
const isPending = u => typeof u === "object" && u != null && KeyedPoolMapValueSymbol in u && "_tag" in u && u["_tag"] === "Pending";
const makeWith = /*#__PURE__*/Debug.methodWithTrace(trace => (get, min, max, timeToLive) => core.map(([context, fiberId, map, scope]) => {
  const getOrCreatePool = key => core.suspend(() => {
    let value = Option.getOrUndefined(HashMap.get(MutableRef.get(map), key));
    if (value === undefined) {
      return core.uninterruptibleMask(restore => {
        const deferred = core.deferredUnsafeMake(fiberId);
        value = new Pending(deferred);
        let previous = undefined;
        if (HashMap.has(MutableRef.get(map), key)) {
          previous = Option.getOrUndefined(HashMap.get(MutableRef.get(map), key));
        } else {
          MutableRef.update(map, HashMap.set(key, value));
        }
        if (previous === undefined) {
          return core.matchCauseEffect(cause => {
            const current = Option.getOrUndefined(HashMap.get(MutableRef.get(map), key));
            if (Equal.equals(current, value)) {
              MutableRef.update(map, HashMap.remove(key));
            }
            return core.zipRight(core.deferredFailCause(deferred, cause), core.failCause(cause));
          }, pool => {
            MutableRef.update(map, HashMap.set(key, new Complete(pool)));
            return core.as(core.deferredSucceed(deferred, pool), pool);
          })(restore(fiberRuntime.scopeExtend(pool.makeWithTTL(core.provideContext(get(key), context), min(key), max(key), Option.getOrElse(timeToLive(key), () => Duration.infinity)), scope)));
        }
        switch (previous._tag) {
          case "Complete":
            {
              return core.succeed(previous.pool);
            }
          case "Pending":
            {
              return restore(core.deferredAwait(previous.deferred));
            }
        }
      });
    }
    switch (value._tag) {
      case "Complete":
        {
          return core.succeed(value.pool);
        }
      case "Pending":
        {
          return core.deferredAwait(value.deferred);
        }
    }
  });
  const activePools = () => core.suspend(() => core.forEach(Array.from(HashMap.values(MutableRef.get(map))), value => {
    switch (value._tag) {
      case "Complete":
        {
          return core.succeed(value.pool);
        }
      case "Pending":
        {
          return core.deferredAwait(value.deferred);
        }
    }
  }));
  return new KeyedPoolImpl(getOrCreatePool, activePools);
})(effect.all(core.context(), core.fiberId(), core.sync(() => MutableRef.make(HashMap.empty())), fiberRuntime.scopeMake())).traced(trace));
/** @internal */
const makeSized = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (get, size) => makeWith(restore(get), () => size, () => size, () => Option.none()).traced(trace));
/** @internal */
exports.makeSized = makeSized;
const makeSizedWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (get, size) => makeWith(restore(get), restore(size), restore(size), () => Option.none()).traced(trace));
/** @internal */
exports.makeSizedWith = makeSizedWith;
const makeSizedWithTTL = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (get, min, max, timeToLive) => makeWith(restore(get), restore(min), restore(max), () => Option.some(timeToLive)).traced(trace));
/** @internal */
exports.makeSizedWithTTL = makeSizedWithTTL;
const makeSizedWithTTLBy = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (get, min, max, timeToLive) => makeWith(restore(get), restore(min), restore(max), key => Option.some(restore(timeToLive)(key))).traced(trace));
/** @internal */
exports.makeSizedWithTTLBy = makeSizedWithTTLBy;
const get = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, key) => self.get(key).traced(trace));
/** @internal */
exports.get = get;
const invalidate = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, item) => self.invalidate(item).traced(trace));
exports.invalidate = invalidate;
//# sourceMappingURL=keyedPool.js.map