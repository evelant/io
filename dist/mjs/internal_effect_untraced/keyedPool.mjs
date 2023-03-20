var _a, _b, _c;
import * as Duration from "@effect/data/Duration";
import * as Equal from "@effect/data/Equal";
import * as Hash from "@effect/data/Hash";
import * as HashMap from "@effect/data/HashMap";
import * as MutableRef from "@effect/data/MutableRef";
import * as Option from "@effect/data/Option";
import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as effect from "@effect/io/internal_effect_untraced/effect";
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime";
import * as pool from "@effect/io/internal_effect_untraced/pool";
/** @internal */
const KeyedPoolSymbolKey = "@effect/io/KeyedPool";
/** @internal */
export const KeyedPoolTypeId = /*#__PURE__*/Symbol.for(KeyedPoolSymbolKey);
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
export const makeSized = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (get, size) => makeWith(restore(get), () => size, () => size, () => Option.none()).traced(trace));
/** @internal */
export const makeSizedWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (get, size) => makeWith(restore(get), restore(size), restore(size), () => Option.none()).traced(trace));
/** @internal */
export const makeSizedWithTTL = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (get, min, max, timeToLive) => makeWith(restore(get), restore(min), restore(max), () => Option.some(timeToLive)).traced(trace));
/** @internal */
export const makeSizedWithTTLBy = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (get, min, max, timeToLive) => makeWith(restore(get), restore(min), restore(max), key => Option.some(restore(timeToLive)(key))).traced(trace));
/** @internal */
export const get = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, key) => self.get(key).traced(trace));
/** @internal */
export const invalidate = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, item) => self.invalidate(item).traced(trace));
//# sourceMappingURL=keyedPool.mjs.map