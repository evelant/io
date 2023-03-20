"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fiberRefGetAndUpdateSome = exports.fiberRefGetAndUpdate = exports.fiberRefGetAndSet = exports.fiberRefGet = exports.fiberRefDelete = exports.fiberIdWith = exports.fiberId = exports.failSync = exports.failCauseSync = exports.failCause = exports.fail = exports.exitZipWith = exports.exitZipRight = exports.exitZipParRight = exports.exitZipParLeft = exports.exitZipPar = exports.exitZipLeft = exports.exitZip = exports.exitUnit = exports.exitUnannotate = exports.exitSucceed = exports.exitMatchEffect = exports.exitMatch = exports.exitMapErrorCause = exports.exitMapError = exports.exitMapBoth = exports.exitMap = exports.exitIsSuccess = exports.exitIsInterrupted = exports.exitIsFailure = exports.exitIsExit = exports.exitInterrupt = exports.exitGetOrElse = exports.exitFromOption = exports.exitFromEither = exports.exitForEachEffect = exports.exitFlatten = exports.exitFlatMapEffect = exports.exitFlatMap = exports.exitFailCause = exports.exitFail = exports.exitExists = exports.exitDie = exports.exitCollectAllPar = exports.exitCollectAll = exports.exitCauseOption = exports.exitAsUnit = exports.exitAs = exports.exit = exports.either = exports.done = exports.dieSync = exports.die = exports.deferredUnsafeMake = exports.deferredUnsafeDone = exports.deferredSync = exports.deferredSucceed = exports.deferredPoll = exports.deferredMakeAs = exports.deferredMake = exports.deferredIsDone = exports.deferredInterruptWith = exports.deferredInterrupt = exports.deferredFailSync = exports.deferredFailCauseSync = exports.deferredFailCause = exports.deferredFail = exports.deferredDone = exports.deferredDieSync = exports.deferredDie = exports.deferredCompleteWith = exports.deferredComplete = exports.deferredAwait = exports.currentTags = exports.currentScheduler = exports.currentParallelism = exports.currentLogSpan = exports.currentLogLevel = exports.currentLogAnnotations = exports.currentContext = exports.contramapContext = exports.contextWithEffect = exports.context = exports.checkInterruptible = exports.catchSome = exports.catchAllCause = exports.catchAll = exports.attemptOrElse = exports.asyncInterruptEither = exports.asyncInterrupt = exports.async = exports.asUnit = exports.as = exports.acquireUseRelease = exports.ScopeTypeId = exports.RevertFlags = exports.FiberRefTypeId = exports.EffectTypeId = exports.EffectErrorTypeId = exports.CloseableScopeTypeId = void 0;
exports.zipWith = exports.zipRight = exports.zipLeft = exports.zipFlatten = exports.zip = exports.yieldNow = exports.withRuntimeFlags = exports.withParallelismUnbounded = exports.withParallelism = exports.withFiberRuntime = exports.whileLoop = exports.whenEffect = exports.updateRuntimeFlags = exports.unit = exports.uninterruptibleMask = exports.uninterruptible = exports.unified = exports.transplant = exports.tap = exports.tags = exports.sync = exports.suspend = exports.succeed = exports.serviceWithEffect = exports.serviceWith = exports.service = exports.scopeFork = exports.scopeClose = exports.scopeAddFinalizerExit = exports.scopeAddFinalizer = exports.runtimeFlags = exports.releaseMapReplace = exports.releaseMapRemove = exports.releaseMapRelease = exports.releaseMapMake = exports.releaseMapGet = exports.releaseMapAddIfOpen = exports.releaseMapAdd = exports.provideContext = exports.partitionMap = exports.orElse = exports.orDieWith = exports.orDie = exports.onInterrupt = exports.onExit = exports.onError = exports.never = exports.matchEffect = exports.matchCauseEffect = exports.matchCause = exports.mapError = exports.map = exports.makeEffectError = exports.logLevelWarning = exports.logLevelTrace = exports.logLevelNone = exports.logLevelInfo = exports.logLevelFatal = exports.logLevelError = exports.logLevelDebug = exports.logLevelAll = exports.isEffectError = exports.isEffect = exports.intoDeferred = exports.interruptibleMask = exports.interruptible = exports.interruptedCause = exports.interruptWith = exports.interruptFiber = exports.interruptAsFiber = exports.interrupt = exports.ifEffect = exports.fromOption = exports.fromEither = exports.forkScopeOverride = exports.forEachDiscard = exports.forEach = exports.flip = exports.flatten = exports.flatMap = exports.fiberRefUpdateSomeAndGet = exports.fiberRefUpdateSome = exports.fiberRefUpdateAndGet = exports.fiberRefUpdate = exports.fiberRefUnsafeMakeRuntimeFlags = exports.fiberRefUnsafeMakePatch = exports.fiberRefUnsafeMakeHashSet = exports.fiberRefUnsafeMakeContext = exports.fiberRefUnsafeMake = exports.fiberRefSet = exports.fiberRefReset = exports.fiberRefModifySome = exports.fiberRefModify = exports.fiberRefLocallyWith = exports.fiberRefLocally = exports.fiberRefGetWith = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var Differ = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Differ"));
var ContextPatch = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Differ/ContextPatch"));
var HashSetPatch = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Differ/HashSetPatch"));
var Either = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var HashMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashMap"));
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
var MutableRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableRef"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var FiberId = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Fiber/Id"));
var RuntimeFlagsPatch = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Fiber/Runtime/Flags/Patch"));
var internalCause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/cause"));
var deferred = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/deferred"));
var DeferredOpCodes = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/opCodes/deferred"));
var OpCodes = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/opCodes/effect"));
var _runtimeFlags = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/runtimeFlags"));
var scheduler = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Scheduler"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a, _b, _c;
// -----------------------------------------------------------------------------
// Effect
// -----------------------------------------------------------------------------
/** @internal */
const EffectErrorSymbolKey = "@effect/io/Effect/Error";
/** @internal */
const EffectErrorTypeId = /*#__PURE__*/Symbol.for(EffectErrorSymbolKey);
/** @internal */
exports.EffectErrorTypeId = EffectErrorTypeId;
const isEffectError = u => typeof u === "object" && u != null && EffectErrorTypeId in u;
/** @internal */
exports.isEffectError = isEffectError;
const makeEffectError = cause => ({
  [EffectErrorTypeId]: EffectErrorTypeId,
  _tag: "EffectError",
  cause
});
/** @internal */
exports.makeEffectError = makeEffectError;
const EffectTypeId = /*#__PURE__*/Symbol.for("@effect/io/Effect");
/** @internal */
exports.EffectTypeId = EffectTypeId;
class RevertFlags {
  constructor(patch) {
    this.patch = patch;
    this._tag = OpCodes.OP_REVERT_FLAGS;
  }
}
/** @internal */
exports.RevertFlags = RevertFlags;
class EffectPrimitive {
  constructor(_tag) {
    this._tag = _tag;
    this.i0 = undefined;
    this.i1 = undefined;
    this.i2 = undefined;
    this.trace = undefined;
    this[_a] = effectVariance;
  }
  [(_a = EffectTypeId, Equal.symbol)](that) {
    return this === that;
  }
  [Hash.symbol]() {
    return Hash.random(this);
  }
  traced(trace) {
    if (trace) {
      const effect = new EffectPrimitive(OpCodes.OP_TRACED);
      effect.i0 = this;
      effect.trace = trace;
      return effect;
    }
    return this;
  }
}
/** @internal */
class EffectPrimitiveFailure {
  constructor(_tag) {
    this._tag = _tag;
    this.i0 = undefined;
    this.i1 = undefined;
    this.i2 = undefined;
    this.trace = undefined;
    this[_b] = effectVariance;
  }
  [(_b = EffectTypeId, Equal.symbol)](that) {
    return this === that;
  }
  [Hash.symbol]() {
    return Hash.random(this);
  }
  get cause() {
    return this.i0;
  }
  traced(trace) {
    if (trace) {
      const effect = new EffectPrimitive(OpCodes.OP_TRACED);
      effect.i0 = this;
      effect.trace = trace;
      return effect;
    }
    return this;
  }
}
/** @internal */
class EffectPrimitiveSuccess {
  constructor(_tag) {
    this._tag = _tag;
    this.i0 = undefined;
    this.i1 = undefined;
    this.i2 = undefined;
    this.trace = undefined;
    this[_c] = effectVariance;
  }
  [(_c = EffectTypeId, Equal.symbol)](that) {
    return this === that;
  }
  [Hash.symbol]() {
    return Hash.random(this);
  }
  get value() {
    return this.i0;
  }
  traced(trace) {
    if (trace) {
      const effect = new EffectPrimitive(OpCodes.OP_TRACED);
      effect.i0 = this;
      effect.trace = trace;
      return effect;
    }
    return this;
  }
}
/** @internal */
const effectVariance = {
  _R: _ => _,
  _E: _ => _,
  _A: _ => _
};
/** @internal */
const isEffect = u => typeof u === "object" && u != null && EffectTypeId in u;
/* @internal */
exports.isEffect = isEffect;
const acquireUseRelease = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restoreTracing) => (acquire, use, release) => uninterruptibleMask(restore => flatMap(a => flatMap(exit => matchCauseEffect(cause => {
  switch (exit._tag) {
    case OpCodes.OP_FAILURE:
      {
        return failCause(internalCause.parallel(exit.i0, cause));
      }
    case OpCodes.OP_SUCCESS:
      {
        return failCause(cause);
      }
  }
}, () => exit)(suspend(() => restoreTracing(release)(a, exit))))(exit(suspend(() => restore(restoreTracing(use)(a))))))(acquire)).traced(trace));
/* @internal */
exports.acquireUseRelease = acquireUseRelease;
const as = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => flatMap(() => succeed(value))(self).traced(trace));
/* @internal */
exports.as = as;
const asUnit = /*#__PURE__*/Debug.methodWithTrace(trace => self => as(void 0)(self).traced(trace));
/* @internal */
exports.asUnit = asUnit;
const async = /*#__PURE__*/Debug.methodWithTrace(trace => (register, blockingOn = FiberId.none) => {
  const effect = new EffectPrimitive(OpCodes.OP_ASYNC);
  effect.i0 = register;
  effect.i1 = blockingOn;
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.async = async;
const asyncInterruptEither = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (register, blockingOn = FiberId.none) => suspend(() => {
  let cancelerRef = unit();
  return onInterrupt(() => cancelerRef)(async(resume => {
    const result = restore(register)(resume);
    if (Either.isRight(result)) {
      resume(result.right);
    } else {
      cancelerRef = result.left;
    }
  }, blockingOn));
}).traced(trace));
/* @internal */
exports.asyncInterruptEither = asyncInterruptEither;
const asyncInterrupt = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (register, blockingOn = FiberId.none) => suspend(() => {
  let cancelerRef = unit();
  return onInterrupt(() => cancelerRef)(async(resume => {
    cancelerRef = restore(register)(resume);
  }, blockingOn));
}).traced(trace));
/* @internal */
exports.asyncInterrupt = asyncInterrupt;
const catchAllCause = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => {
  const effect = new EffectPrimitive(OpCodes.OP_ON_FAILURE);
  effect.i0 = self;
  effect.i1 = restore(f);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.catchAllCause = catchAllCause;
const catchAll = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => matchEffect(restore(f), succeed)(self).traced(trace));
/**
 * @macro identity
 * @internal
 */
exports.catchAll = catchAll;
const unified = f => (...args) => f(...args);
/* @internal */
exports.unified = unified;
const catchSome = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => matchCauseEffect(unified(cause => {
  const either = internalCause.failureOrCause(cause);
  switch (either._tag) {
    case "Left":
      {
        return Option.getOrElse(() => failCause(cause))(restore(pf)(either.left));
      }
    case "Right":
      {
        return failCause(either.right);
      }
  }
}), succeed)(self).traced(trace));
/* @internal */
exports.catchSome = catchSome;
const checkInterruptible = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => withFiberRuntime((_, status) => restore(f)(_runtimeFlags.interruption(status.runtimeFlags))).traced(trace));
/* @internal */
exports.checkInterruptible = checkInterruptible;
const die = /*#__PURE__*/Debug.methodWithTrace(trace => defect => failCause(internalCause.die(defect)).traced(trace));
/* @internal */
exports.die = die;
const dieSync = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => failCauseSync(() => internalCause.die(restore(evaluate)())).traced(trace));
/* @internal */
exports.dieSync = dieSync;
const done = /*#__PURE__*/Debug.methodWithTrace(trace => exit => suspend(() => exit).traced(trace));
/* @internal */
exports.done = done;
const either = /*#__PURE__*/Debug.methodWithTrace(trace => self => matchEffect(e => succeed(Either.left(e)), a => succeed(Either.right(a)))(self).traced(trace));
/* @internal */
exports.either = either;
const context = /*#__PURE__*/Debug.methodWithTrace(trace => () => suspend(() => fiberRefGet(currentContext)).traced(trace));
/* @internal */
exports.context = context;
const contextWithEffect = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => flatMap(restore(f))(context()).traced(trace));
/* @internal */
exports.contextWithEffect = contextWithEffect;
const exit = /*#__PURE__*/Debug.methodWithTrace(trace => self => matchCause(failCause, succeed)(self).traced(trace));
/* @internal */
exports.exit = exit;
const fail = /*#__PURE__*/Debug.methodWithTrace(trace => error => failCause(internalCause.fail(error)).traced(trace));
/* @internal */
exports.fail = fail;
const failSync = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => failCauseSync(() => internalCause.fail(restore(evaluate)())).traced(trace));
/* @internal */
exports.failSync = failSync;
const failCause = /*#__PURE__*/Debug.methodWithTrace(trace => cause => {
  const effect = new EffectPrimitiveFailure(OpCodes.OP_FAILURE);
  effect.i0 = cause;
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.failCause = failCause;
const failCauseSync = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => flatMap(sync(restore(evaluate)), failCause).traced(trace));
/* @internal */
exports.failCauseSync = failCauseSync;
const fiberId = /*#__PURE__*/Debug.methodWithTrace(trace => () => withFiberRuntime(state => succeed(state.id())).traced(trace));
/* @internal */
exports.fiberId = fiberId;
const fiberIdWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => withFiberRuntime(state => restore(f)(state.id())).traced(trace));
/* @internal */
exports.fiberIdWith = fiberIdWith;
const flatMap = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => {
  const effect = new EffectPrimitive(OpCodes.OP_ON_SUCCESS);
  effect.i0 = self;
  effect.i1 = restore(f);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.flatMap = flatMap;
const flatten = /*#__PURE__*/Debug.methodWithTrace(trace => self => flatMap(self, _Function.identity).traced(trace));
/* @internal */
exports.flatten = flatten;
const flip = /*#__PURE__*/Debug.methodWithTrace(trace => self => matchEffect(succeed, fail)(self).traced(trace));
/* @internal */
exports.flip = flip;
const matchCause = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, onFailure, onSuccess) => matchCauseEffect(cause => succeed(restore(onFailure)(cause)), a => succeed(restore(onSuccess)(a)))(self).traced(trace));
/* @internal */
exports.matchCause = matchCause;
const matchCauseEffect = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, onFailure, onSuccess) => {
  const effect = new EffectPrimitive(OpCodes.OP_ON_SUCCESS_AND_FAILURE);
  effect.i0 = self;
  effect.i1 = restore(onFailure);
  effect.i2 = restore(onSuccess);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.matchCauseEffect = matchCauseEffect;
const matchEffect = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, onFailure, onSuccess) => matchCauseEffect(self, cause => {
  const failures = internalCause.failures(cause);
  const defects = internalCause.defects(cause);
  if (defects.length > 0) {
    return failCause(internalCause.electFailures(cause));
  }
  if (failures.length > 0) {
    return restore(onFailure)(Chunk.unsafeHead(failures));
  }
  return failCause(cause);
}, onSuccess).traced(trace));
/* @internal */
exports.matchEffect = matchEffect;
const forEach = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => suspend(() => {
  const arr = Array.from(self);
  const ret = new Array(arr.length);
  let i = 0;
  return as(Chunk.unsafeFromArray(ret))(whileLoop(() => i < arr.length, () => restore(f)(arr[i]), b => {
    ret[i++] = b;
  }));
}).traced(trace));
/* @internal */
exports.forEach = forEach;
const forEachDiscard = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => suspend(() => {
  const arr = Array.from(self);
  let i = 0;
  return whileLoop(() => i < arr.length, () => restore(f)(arr[i++]), () => {
    //
  });
}).traced(trace));
/* @internal */
exports.forEachDiscard = forEachDiscard;
const fromOption = /*#__PURE__*/Debug.methodWithTrace(trace => option => {
  switch (option._tag) {
    case "None":
      {
        return fail(Option.none()).traced(trace);
      }
    case "Some":
      {
        return succeed(option.value).traced(trace);
      }
  }
});
/* @internal */
exports.fromOption = fromOption;
const fromEither = /*#__PURE__*/Debug.methodWithTrace(trace => either => {
  switch (either._tag) {
    case "Left":
      {
        return fail(either.left).traced(trace);
      }
    case "Right":
      {
        return succeed(either.right).traced(trace);
      }
  }
});
/* @internal */
exports.fromEither = fromEither;
const ifEffect = /*#__PURE__*/Debug.dualWithTrace(3, trace => (self, onTrue, onFalse) => flatMap(unified(b => b ? onTrue : onFalse))(self).traced(trace));
/* @internal */
exports.ifEffect = ifEffect;
const interrupt = /*#__PURE__*/Debug.methodWithTrace(trace => () => flatMap(fiberId => interruptWith(fiberId))(fiberId()).traced(trace));
/* @internal */
exports.interrupt = interrupt;
const interruptWith = /*#__PURE__*/Debug.methodWithTrace(trace => fiberId => failCause(internalCause.interrupt(fiberId)).traced(trace));
/* @internal */
exports.interruptWith = interruptWith;
const interruptible = /*#__PURE__*/Debug.methodWithTrace(trace => self => {
  const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = RuntimeFlagsPatch.enable(_runtimeFlags.Interruption);
  effect.i1 = () => self;
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.interruptible = interruptible;
const interruptibleMask = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => {
  const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = RuntimeFlagsPatch.enable(_runtimeFlags.Interruption);
  effect.i1 = oldFlags => _runtimeFlags.interruption(oldFlags) ? restore(f)(interruptible) : restore(f)(uninterruptible);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.interruptibleMask = interruptibleMask;
const intoDeferred = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, deferred) => uninterruptibleMask(restore => flatMap(exit => deferredDone(deferred, exit))(exit(restore(self)))).traced(trace));
/* @internal */
exports.intoDeferred = intoDeferred;
const map = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => flatMap(a => sync(() => restore(f)(a)))(self).traced(trace));
/* @internal */
exports.map = map;
const mapError = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => matchCauseEffect(self, cause => {
  const either = internalCause.failureOrCause(cause);
  switch (either._tag) {
    case "Left":
      {
        return failSync(() => restore(f)(either.left));
      }
    case "Right":
      {
        return failCause(either.right);
      }
  }
}, succeed).traced(trace));
/* @internal */
exports.mapError = mapError;
const never = /*#__PURE__*/Debug.methodWithTrace(trace => () => asyncInterruptEither(() => {
  const interval = setInterval(() => {
    //
  }, 2 ** 31 - 1);
  return Either.left(sync(() => clearInterval(interval)));
}).traced(trace));
/* @internal */
exports.never = never;
const onError = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, cleanup) => onExit(self, unified(exit => exitIsSuccess(exit) ? unit() : restore(cleanup)(exit.i0))).traced(trace));
/* @internal */
exports.onError = onError;
const onExit = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restoreTrace) => (self, cleanup) => uninterruptibleMask(restore => matchCauseEffect(restore(self), cause1 => {
  const result = exitFailCause(cause1);
  return matchCauseEffect(cause2 => exitFailCause(internalCause.sequential(cause1, cause2)), () => result)(restoreTrace(cleanup)(result));
}, success => {
  const result = exitSucceed(success);
  return zipRight(result)(restoreTrace(cleanup)(result));
})).traced(trace));
/* @internal */
exports.onExit = onExit;
const onInterrupt = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, cleanup) => onExit(self, exitMatch(cause => internalCause.isInterruptedOnly(cause) ? asUnit(restore(cleanup)(internalCause.interruptors(cause))) : unit(), () => unit())).traced(trace));
/* @internal */
exports.onInterrupt = onInterrupt;
const orElse = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, that) => attemptOrElse(restore(that), succeed)(self).traced(trace));
/* @internal */
exports.orElse = orElse;
const orDie = /*#__PURE__*/Debug.methodWithTrace(trace => self => orDieWith(self, _Function.identity).traced(trace));
/* @internal */
exports.orDie = orDie;
const orDieWith = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => matchEffect(e => die(restore(f)(e)), succeed)(self).traced(trace));
/* @internal */
exports.orDieWith = orDieWith;
const partitionMap = (elements, f) => Array.from(elements).reduceRight(([lefts, rights], current) => {
  const either = f(current);
  switch (either._tag) {
    case "Left":
      {
        return [Chunk.prepend(either.left)(lefts), rights];
      }
    case "Right":
      {
        return [lefts, Chunk.prepend(either.right)(rights)];
      }
  }
}, [Chunk.empty(), Chunk.empty()]);
/* @internal */
exports.partitionMap = partitionMap;
const provideContext = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, context) => fiberRefLocally(currentContext, context)(self).traced(trace));
/* @internal */
exports.provideContext = provideContext;
const contramapContext = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => contextWithEffect(context => provideContext(restore(f)(context))(self)).traced(trace));
/* @internal */
exports.contramapContext = contramapContext;
const runtimeFlags = /*#__PURE__*/Debug.methodWithTrace(trace => () => withFiberRuntime((_, status) => succeed(status.runtimeFlags)).traced(trace));
/* @internal */
exports.runtimeFlags = runtimeFlags;
const service = /*#__PURE__*/Debug.methodWithTrace(trace => tag => serviceWithEffect(tag, succeed).traced(trace));
/* @internal */
exports.service = service;
const serviceWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (tag, f) => serviceWithEffect(tag, a => sync(() => restore(f)(a))).traced(trace));
/* @internal */
exports.serviceWith = serviceWith;
const serviceWithEffect = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (tag, f) => suspend(() => flatMap(env => restore(f)(Context.unsafeGet(tag)(env)))(fiberRefGet(currentContext))).traced(trace));
/* @internal */
exports.serviceWithEffect = serviceWithEffect;
const succeed = /*#__PURE__*/Debug.methodWithTrace(trace => value => {
  const effect = new EffectPrimitiveSuccess(OpCodes.OP_SUCCESS);
  effect.i0 = value;
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.succeed = succeed;
const suspend = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => effect => flatMap(_Function.identity)(sync(restore(effect))).traced(trace));
/* @internal */
exports.suspend = suspend;
const sync = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => {
  const effect = new EffectPrimitive(OpCodes.OP_SYNC);
  effect.i0 = restore(evaluate);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.sync = sync;
const tags = /*#__PURE__*/Debug.methodWithTrace(trace => () => fiberRefGet(currentTags).traced(trace));
/* @internal */
exports.tags = tags;
const tap = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => flatMap(a => as(a)(restore(f)(a)))(self).traced(trace));
/* @internal */
exports.tap = tap;
const transplant = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => withFiberRuntime(state => {
  const scopeOverride = state.getFiberRef(forkScopeOverride);
  const scope = Option.getOrElse(() => state.scope())(scopeOverride);
  return restore(f)(fiberRefLocally(forkScopeOverride, Option.some(scope)));
}).traced(trace));
/* @internal */
exports.transplant = transplant;
const attemptOrElse = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, that, onSuccess) => matchCauseEffect(self, cause => {
  const defects = internalCause.defects(cause);
  if (defects.length > 0) {
    return failCause(Option.getOrThrow(internalCause.keepDefectsAndElectFailures(cause)));
  }
  return restore(that)();
}, restore(onSuccess)).traced(trace));
/* @internal */
exports.attemptOrElse = attemptOrElse;
const uninterruptible = /*#__PURE__*/Debug.methodWithTrace(trace => self => {
  const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = RuntimeFlagsPatch.disable(_runtimeFlags.Interruption);
  effect.i1 = () => self;
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.uninterruptible = uninterruptible;
const uninterruptibleMask = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => {
  const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = RuntimeFlagsPatch.disable(_runtimeFlags.Interruption);
  effect.i1 = oldFlags => _runtimeFlags.interruption(oldFlags) ? restore(f)(interruptible) : restore(f)(uninterruptible);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.uninterruptibleMask = uninterruptibleMask;
const unit = /*#__PURE__*/Debug.methodWithTrace(trace => _ => succeed(void 0).traced(trace));
/* @internal */
exports.unit = unit;
const updateRuntimeFlags = /*#__PURE__*/Debug.methodWithTrace(trace => patch => {
  const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = patch;
  effect.i1 = void 0;
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.updateRuntimeFlags = updateRuntimeFlags;
const whenEffect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, predicate) => flatMap(b => {
  if (b) {
    return map(Option.some)(self);
  }
  return succeed(Option.none());
})(predicate).traced(trace));
/* @internal */
exports.whenEffect = whenEffect;
const whileLoop = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (check, body, process) => {
  const effect = new EffectPrimitive(OpCodes.OP_WHILE);
  effect.i0 = restore(check);
  effect.i1 = restore(body);
  effect.i2 = restore(process);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.whileLoop = whileLoop;
const withFiberRuntime = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => withRuntime => {
  const effect = new EffectPrimitive(OpCodes.OP_WITH_RUNTIME);
  effect.i0 = restore(withRuntime);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.withFiberRuntime = withFiberRuntime;
const withParallelism = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, parallelism) => suspend(() => fiberRefLocally(currentParallelism, Option.some(parallelism))(self)).traced(trace));
/* @internal */
exports.withParallelism = withParallelism;
const withParallelismUnbounded = /*#__PURE__*/Debug.methodWithTrace(trace => self => suspend(() => fiberRefLocally(currentParallelism, Option.none())(self)).traced(trace));
/* @internal */
exports.withParallelismUnbounded = withParallelismUnbounded;
const withRuntimeFlags = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, update) => {
  const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = update;
  effect.i1 = () => self;
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.withRuntimeFlags = withRuntimeFlags;
const yieldNow = /*#__PURE__*/Debug.methodWithTrace(trace => () => {
  const effect = new EffectPrimitive(OpCodes.OP_YIELD);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
exports.yieldNow = yieldNow;
const zip = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => flatMap(self, a => map(that, b => [a, b])).traced(trace));
/* @internal */
exports.zip = zip;
const zipFlatten = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => flatMap(self, a => map(that, b => [...a, b])).traced(trace));
/* @internal */
exports.zipFlatten = zipFlatten;
const zipLeft = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => flatMap(self, a => as(that, a)).traced(trace));
/* @internal */
exports.zipLeft = zipLeft;
const zipRight = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => flatMap(self, () => that).traced(trace));
/* @internal */
exports.zipRight = zipRight;
const zipWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, that, f) => flatMap(self, a => map(that, b => restore(f)(a, b))).traced(trace));
// -----------------------------------------------------------------------------
// Fiber
// -----------------------------------------------------------------------------
/* @internal */
exports.zipWith = zipWith;
const interruptFiber = /*#__PURE__*/Debug.methodWithTrace(trace => self => flatMap(fiberId => interruptAsFiber(fiberId)(self))(fiberId()).traced(trace));
/* @internal */
exports.interruptFiber = interruptFiber;
const interruptAsFiber = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, fiberId) => flatMap(() => self.await())(self.interruptAsFork(fiberId)).traced(trace));
// -----------------------------------------------------------------------------
// LogLevel
// -----------------------------------------------------------------------------
/** @internal */
exports.interruptAsFiber = interruptAsFiber;
const logLevelAll = {
  _tag: "All",
  syslog: 0,
  label: "ALL",
  ordinal: Number.MIN_SAFE_INTEGER
};
/** @internal */
exports.logLevelAll = logLevelAll;
const logLevelFatal = {
  _tag: "Fatal",
  syslog: 2,
  label: "FATAL",
  ordinal: 50000
};
/** @internal */
exports.logLevelFatal = logLevelFatal;
const logLevelError = {
  _tag: "Error",
  syslog: 3,
  label: "ERROR",
  ordinal: 40000
};
/** @internal */
exports.logLevelError = logLevelError;
const logLevelWarning = {
  _tag: "Warning",
  syslog: 4,
  label: "WARN",
  ordinal: 30000
};
/** @internal */
exports.logLevelWarning = logLevelWarning;
const logLevelInfo = {
  _tag: "Info",
  syslog: 6,
  label: "INFO",
  ordinal: 20000
};
/** @internal */
exports.logLevelInfo = logLevelInfo;
const logLevelDebug = {
  _tag: "Debug",
  syslog: 7,
  label: "DEBUG",
  ordinal: 10000
};
/** @internal */
exports.logLevelDebug = logLevelDebug;
const logLevelTrace = {
  _tag: "Trace",
  syslog: 7,
  label: "TRACE",
  ordinal: 0
};
/** @internal */
exports.logLevelTrace = logLevelTrace;
const logLevelNone = {
  _tag: "None",
  syslog: 7,
  label: "OFF",
  ordinal: Number.MAX_SAFE_INTEGER
};
// -----------------------------------------------------------------------------
// FiberRef
// -----------------------------------------------------------------------------
/** @internal */
exports.logLevelNone = logLevelNone;
const FiberRefSymbolKey = "@effect/io/FiberRef";
/** @internal */
const FiberRefTypeId = /*#__PURE__*/Symbol.for(FiberRefSymbolKey);
/** @internal */
exports.FiberRefTypeId = FiberRefTypeId;
const fiberRefVariance = {
  _A: _ => _
};
/* @internal */
const fiberRefGet = /*#__PURE__*/Debug.methodWithTrace(trace => self => fiberRefModify(self, a => [a, a]).traced(trace));
/* @internal */
exports.fiberRefGet = fiberRefGet;
const fiberRefGetAndSet = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => fiberRefModify(self, v => [v, value]).traced(trace));
/* @internal */
exports.fiberRefGetAndSet = fiberRefGetAndSet;
const fiberRefGetAndUpdate = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => fiberRefModify(self, v => [v, restore(f)(v)]).traced(trace));
/* @internal */
exports.fiberRefGetAndUpdate = fiberRefGetAndUpdate;
const fiberRefGetAndUpdateSome = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => fiberRefModify(self, v => [v, Option.getOrElse(restore(pf)(v), () => v)]).traced(trace));
/* @internal */
exports.fiberRefGetAndUpdateSome = fiberRefGetAndUpdateSome;
const fiberRefGetWith = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => flatMap(fiberRefGet(self), restore(f)).traced(trace));
/* @internal */
exports.fiberRefGetWith = fiberRefGetWith;
const fiberRefSet = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => fiberRefModify(self, () => [void 0, value]).traced(trace));
/* @internal */
exports.fiberRefSet = fiberRefSet;
const fiberRefDelete = /*#__PURE__*/Debug.methodWithTrace(trace => self => withFiberRuntime(state => {
  state.unsafeDeleteFiberRef(self);
  return unit();
}).traced(trace));
/* @internal */
exports.fiberRefDelete = fiberRefDelete;
const fiberRefReset = /*#__PURE__*/Debug.methodWithTrace(trace => self => fiberRefSet(self, self.initial).traced(trace));
/* @internal */
exports.fiberRefReset = fiberRefReset;
const fiberRefModify = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => withFiberRuntime(state => {
  const [b, a] = restore(f)(state.getFiberRef(self));
  state.setFiberRef(self, a);
  return succeed(b);
}).traced(trace));
/* @internal */
exports.fiberRefModify = fiberRefModify;
const fiberRefModifySome = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (self, def, f) => fiberRefModify(self, v => Option.getOrElse(restore(f)(v), () => [def, v])).traced(trace));
/* @internal */
exports.fiberRefModifySome = fiberRefModifySome;
const fiberRefUpdate = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => fiberRefModify(self, v => [void 0, restore(f)(v)]).traced(trace));
/* @internal */
exports.fiberRefUpdate = fiberRefUpdate;
const fiberRefUpdateSome = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => fiberRefModify(self, v => [void 0, Option.getOrElse(restore(pf)(v), () => v)]).traced(trace));
/* @internal */
exports.fiberRefUpdateSome = fiberRefUpdateSome;
const fiberRefUpdateAndGet = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => fiberRefModify(self, v => {
  const result = restore(f)(v);
  return [result, result];
}).traced(trace));
/* @internal */
exports.fiberRefUpdateAndGet = fiberRefUpdateAndGet;
const fiberRefUpdateSomeAndGet = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => fiberRefModify(self, v => {
  const result = Option.getOrElse(() => v)(restore(pf)(v));
  return [result, result];
}).traced(trace));
/* @internal */
exports.fiberRefUpdateSomeAndGet = fiberRefUpdateSomeAndGet;
const fiberRefLocally = /*#__PURE__*/Debug.dualWithTrace(3, trace => (use, self, value) => acquireUseRelease(zipLeft(fiberRefGet(self), fiberRefSet(self, value)), () => use, oldValue => fiberRefSet(self, oldValue)).traced(trace));
/* @internal */
exports.fiberRefLocally = fiberRefLocally;
const fiberRefLocallyWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (use, self, f) => fiberRefGetWith(self, a => fiberRefLocally(self, restore(f)(a))(use)).traced(trace));
/** @internal */
exports.fiberRefLocallyWith = fiberRefLocallyWith;
const fiberRefUnsafeMake = (initial, fork = _Function.identity, join = (_, a) => a) => fiberRefUnsafeMakePatch(initial, Differ.update(), fork, join);
/** @internal */
exports.fiberRefUnsafeMake = fiberRefUnsafeMake;
const fiberRefUnsafeMakeHashSet = initial => fiberRefUnsafeMakePatch(initial, Differ.hashSet(), HashSetPatch.empty());
/** @internal */
exports.fiberRefUnsafeMakeHashSet = fiberRefUnsafeMakeHashSet;
const fiberRefUnsafeMakeContext = initial => fiberRefUnsafeMakePatch(initial, Differ.environment(), ContextPatch.empty());
/** @internal */
exports.fiberRefUnsafeMakeContext = fiberRefUnsafeMakeContext;
const fiberRefUnsafeMakePatch = (initial, differ, fork, join = (_, n) => n) => ({
  [FiberRefTypeId]: fiberRefVariance,
  initial,
  diff: (oldValue, newValue) => Differ.diff(oldValue, newValue)(differ),
  combine: (first, second) => Differ.combine(first, second)(differ),
  patch: patch => oldValue => Differ.patch(patch, oldValue)(differ),
  fork,
  join
});
/** @internal */
exports.fiberRefUnsafeMakePatch = fiberRefUnsafeMakePatch;
const fiberRefUnsafeMakeRuntimeFlags = initial => fiberRefUnsafeMakePatch(initial, _runtimeFlags.differ(), RuntimeFlagsPatch.empty);
/** @internal */
exports.fiberRefUnsafeMakeRuntimeFlags = fiberRefUnsafeMakeRuntimeFlags;
const currentContext = /*#__PURE__*/fiberRefUnsafeMakeContext( /*#__PURE__*/Context.empty());
/** @internal */
exports.currentContext = currentContext;
const currentLogAnnotations = /*#__PURE__*/fiberRefUnsafeMake( /*#__PURE__*/HashMap.empty());
/** @internal */
exports.currentLogAnnotations = currentLogAnnotations;
const currentLogLevel = /*#__PURE__*/fiberRefUnsafeMake(logLevelInfo);
/** @internal */
exports.currentLogLevel = currentLogLevel;
const currentLogSpan = /*#__PURE__*/fiberRefUnsafeMake( /*#__PURE__*/Chunk.empty());
/** @internal */
exports.currentLogSpan = currentLogSpan;
const currentScheduler = /*#__PURE__*/fiberRefUnsafeMake(scheduler.defaultScheduler);
/** @internal */
exports.currentScheduler = currentScheduler;
const currentParallelism = /*#__PURE__*/fiberRefUnsafeMake( /*#__PURE__*/Option.none());
/** @internal */
exports.currentParallelism = currentParallelism;
const currentTags = /*#__PURE__*/fiberRefUnsafeMakeHashSet( /*#__PURE__*/HashSet.empty());
/** @internal */
exports.currentTags = currentTags;
const forkScopeOverride = /*#__PURE__*/fiberRefUnsafeMake( /*#__PURE__*/Option.none(), () => Option.none(), (parent, _) => parent);
/** @internal */
exports.forkScopeOverride = forkScopeOverride;
const interruptedCause = /*#__PURE__*/fiberRefUnsafeMake(internalCause.empty, () => internalCause.empty, (parent, _) => parent);
// -----------------------------------------------------------------------------
// Scope
// -----------------------------------------------------------------------------
/** @internal */
exports.interruptedCause = interruptedCause;
const ScopeTypeId = /*#__PURE__*/Symbol.for("@effect/io/Scope");
/** @internal */
exports.ScopeTypeId = ScopeTypeId;
const CloseableScopeTypeId = /*#__PURE__*/Symbol.for("@effect/io/CloseableScope");
/* @internal */
exports.CloseableScopeTypeId = CloseableScopeTypeId;
const scopeAddFinalizer = /*#__PURE__*/Debug.methodWithTrace(trace => (self, finalizer) => self.addFinalizer(() => asUnit(finalizer)).traced(trace));
/* @internal */
exports.scopeAddFinalizer = scopeAddFinalizer;
const scopeAddFinalizerExit = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (self, finalizer) => self.addFinalizer(restore(finalizer)).traced(trace));
/* @internal */
exports.scopeAddFinalizerExit = scopeAddFinalizerExit;
const scopeClose = /*#__PURE__*/Debug.methodWithTrace(trace => (self, exit) => self.close(exit).traced(trace));
/* @internal */
exports.scopeClose = scopeClose;
const scopeFork = /*#__PURE__*/Debug.methodWithTrace(trace => (self, strategy) => self.fork(strategy).traced(trace));
/* @internal */
exports.scopeFork = scopeFork;
const releaseMapAdd = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, finalizer) => map(Option.match(() => () => unit(), key => exit => releaseMapRelease(key, exit)(self)))(releaseMapAddIfOpen(restore(finalizer))(self)).traced(trace));
/* @internal */
exports.releaseMapAdd = releaseMapAdd;
const releaseMapRelease = /*#__PURE__*/Debug.dualWithTrace(3, trace => (self, key, exit) => suspend(() => {
  switch (self.state._tag) {
    case "Exited":
      {
        return unit();
      }
    case "Running":
      {
        const finalizer = self.state.finalizers.get(key);
        self.state.finalizers.delete(key);
        if (finalizer != null) {
          return self.state.update(finalizer)(exit);
        }
        return unit();
      }
  }
}).traced(trace));
/* @internal */
exports.releaseMapRelease = releaseMapRelease;
const releaseMapAddIfOpen = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, finalizer) => suspend(() => {
  switch (self.state._tag) {
    case "Exited":
      {
        self.state.nextKey += 1;
        return as(Option.none())(restore(finalizer)(self.state.exit));
      }
    case "Running":
      {
        const key = self.state.nextKey;
        self.state.finalizers.set(key, finalizer);
        self.state.nextKey += 1;
        return succeed(Option.some(key));
      }
  }
}).traced(trace));
/* @internal */
exports.releaseMapAddIfOpen = releaseMapAddIfOpen;
const releaseMapGet = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, key) => sync(() => self.state._tag === "Running" ? Option.fromNullable(self.state.finalizers.get(key)) : Option.none()).traced(trace));
/* @internal */
exports.releaseMapGet = releaseMapGet;
const releaseMapReplace = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, key, finalizer) => suspend(() => {
  switch (self.state._tag) {
    case "Exited":
      {
        return as(Option.none())(restore(finalizer)(self.state.exit));
      }
    case "Running":
      {
        const fin = Option.fromNullable(self.state.finalizers.get(key));
        self.state.finalizers.set(key, restore(finalizer));
        return succeed(fin);
      }
  }
}).traced(trace));
/* @internal */
exports.releaseMapReplace = releaseMapReplace;
const releaseMapRemove = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, key) => sync(() => {
  if (self.state._tag === "Exited") {
    return Option.none();
  }
  const fin = Option.fromNullable(self.state.finalizers.get(key));
  self.state.finalizers.delete(key);
  return fin;
}).traced(trace));
/* @internal */
exports.releaseMapRemove = releaseMapRemove;
const releaseMapMake = /*#__PURE__*/Debug.methodWithTrace(trace => () => sync(() => ({
  state: {
    _tag: "Running",
    nextKey: 0,
    finalizers: new Map(),
    update: _Function.identity
  }
})).traced(trace));
// -----------------------------------------------------------------------------
// Exit
// -----------------------------------------------------------------------------
/** @internal */
exports.releaseMapMake = releaseMapMake;
const exitIsExit = u => isEffect(u) && "_tag" in u && (u._tag === "Success" || u._tag === "Failure");
/** @internal */
exports.exitIsExit = exitIsExit;
const exitIsFailure = self => self._tag === "Failure";
/** @internal */
exports.exitIsFailure = exitIsFailure;
const exitIsSuccess = self => self._tag === "Success";
/** @internal */
exports.exitIsSuccess = exitIsSuccess;
const exitIsInterrupted = self => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE:
      {
        return internalCause.isInterrupted(self.i0);
      }
    case OpCodes.OP_SUCCESS:
      {
        return false;
      }
  }
};
/** @internal */
exports.exitIsInterrupted = exitIsInterrupted;
const exitAs = /*#__PURE__*/(0, _Function.dual)(2, (self, value) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE:
      {
        return self;
      }
    case OpCodes.OP_SUCCESS:
      {
        return exitSucceed(value);
      }
  }
});
/** @internal */
exports.exitAs = exitAs;
const exitAsUnit = self => exitAs(self, void 0);
/** @internal */
exports.exitAsUnit = exitAsUnit;
const exitCauseOption = self => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE:
      {
        return Option.some(self.i0);
      }
    case OpCodes.OP_SUCCESS:
      {
        return Option.none();
      }
  }
};
/** @internal */
exports.exitCauseOption = exitCauseOption;
const exitCollectAll = exits => exitCollectAllInternal(exits, internalCause.sequential);
/** @internal */
exports.exitCollectAll = exitCollectAll;
const exitCollectAllPar = exits => exitCollectAllInternal(exits, internalCause.parallel);
/** @internal */
exports.exitCollectAllPar = exitCollectAllPar;
const exitDie = defect => exitFailCause(internalCause.die(defect));
/** @internal */
exports.exitDie = exitDie;
const exitExists = /*#__PURE__*/(0, _Function.dual)(2, (self, predicate) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE:
      {
        return false;
      }
    case OpCodes.OP_SUCCESS:
      {
        return predicate(self.i0);
      }
  }
});
/** @internal */
exports.exitExists = exitExists;
const exitFail = error => exitFailCause(internalCause.fail(error));
/** @internal */
exports.exitFail = exitFail;
const exitFailCause = cause => {
  const effect = new EffectPrimitiveFailure(OpCodes.OP_FAILURE);
  effect.i0 = cause;
  return effect;
};
/** @internal */
exports.exitFailCause = exitFailCause;
const exitFlatMap = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE:
      {
        return self;
      }
    case OpCodes.OP_SUCCESS:
      {
        return f(self.i0);
      }
  }
});
/** @internal */
exports.exitFlatMap = exitFlatMap;
const exitFlatMapEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE:
      {
        return succeed(self).traced(trace);
      }
    case OpCodes.OP_SUCCESS:
      {
        return restore(f)(self.i0).traced(trace);
      }
  }
});
/** @internal */
exports.exitFlatMapEffect = exitFlatMapEffect;
const exitFlatten = self => exitFlatMap(_Function.identity)(self);
/** @internal */
exports.exitFlatten = exitFlatten;
const exitForEachEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE:
      {
        return succeed(exitFailCause(self.i0)).traced(trace);
      }
    case OpCodes.OP_SUCCESS:
      {
        return exit(restore(f)(self.i0)).traced(trace);
      }
  }
});
/** @internal */
exports.exitForEachEffect = exitForEachEffect;
const exitFromEither = either => {
  switch (either._tag) {
    case "Left":
      {
        return exitFail(either.left);
      }
    case "Right":
      {
        return exitSucceed(either.right);
      }
  }
};
/** @internal */
exports.exitFromEither = exitFromEither;
const exitFromOption = option => {
  switch (option._tag) {
    case "None":
      {
        return exitFail(void 0);
      }
    case "Some":
      {
        return exitSucceed(option.value);
      }
  }
};
/** @internal */
exports.exitFromOption = exitFromOption;
const exitGetOrElse = /*#__PURE__*/(0, _Function.dual)(2, (self, orElse) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE:
      {
        return orElse(self.i0);
      }
    case OpCodes.OP_SUCCESS:
      {
        return self.i0;
      }
  }
});
/** @internal */
exports.exitGetOrElse = exitGetOrElse;
const exitInterrupt = fiberId => exitFailCause(internalCause.interrupt(fiberId));
/** @internal */
exports.exitInterrupt = exitInterrupt;
const exitMap = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE:
      {
        return self;
      }
    case OpCodes.OP_SUCCESS:
      {
        return exitSucceed(f(self.i0));
      }
  }
});
/** @internal */
exports.exitMap = exitMap;
const exitMapBoth = /*#__PURE__*/(0, _Function.dual)(3, (self, onFailure, onSuccess) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE:
      {
        return exitFailCause(internalCause.map(onFailure)(self.i0));
      }
    case OpCodes.OP_SUCCESS:
      {
        return exitSucceed(onSuccess(self.i0));
      }
  }
});
/** @internal */
exports.exitMapBoth = exitMapBoth;
const exitMapError = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE:
      {
        return exitFailCause(internalCause.map(f)(self.i0));
      }
    case OpCodes.OP_SUCCESS:
      {
        return self;
      }
  }
});
/** @internal */
exports.exitMapError = exitMapError;
const exitMapErrorCause = /*#__PURE__*/(0, _Function.dual)(2, (self, f) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE:
      {
        return exitFailCause(f(self.i0));
      }
    case OpCodes.OP_SUCCESS:
      {
        return self;
      }
  }
});
/** @internal */
exports.exitMapErrorCause = exitMapErrorCause;
const exitMatch = /*#__PURE__*/(0, _Function.dual)(3, (self, onFailure, onSuccess) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE:
      {
        return onFailure(self.i0);
      }
    case OpCodes.OP_SUCCESS:
      {
        return onSuccess(self.i0);
      }
  }
});
/** @internal */
exports.exitMatch = exitMatch;
const exitMatchEffect = /*#__PURE__*/(0, _Function.dual)(3, (self, onFailure, onSuccess) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE:
      {
        return onFailure(self.i0);
      }
    case OpCodes.OP_SUCCESS:
      {
        return onSuccess(self.i0);
      }
  }
});
/** @internal */
exports.exitMatchEffect = exitMatchEffect;
const exitSucceed = value => {
  const effect = new EffectPrimitiveSuccess(OpCodes.OP_SUCCESS);
  effect.i0 = value;
  return effect;
};
/** @internal */
exports.exitSucceed = exitSucceed;
const exitUnannotate = exit => exitIsSuccess(exit) ? exit : exitFailCause(internalCause.unannotate(exit.i0));
/** @internal */
exports.exitUnannotate = exitUnannotate;
const exitUnit = () => exitSucceed(void 0);
/** @internal */
exports.exitUnit = exitUnit;
const exitZip = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => exitZipWith(self, that, (a, a2) => [a, a2], internalCause.sequential));
/** @internal */
exports.exitZip = exitZip;
const exitZipLeft = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => exitZipWith(self, that, (a, _) => a, internalCause.sequential));
/** @internal */
exports.exitZipLeft = exitZipLeft;
const exitZipRight = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => exitZipWith(self, that, (_, a2) => a2, internalCause.sequential));
/** @internal */
exports.exitZipRight = exitZipRight;
const exitZipPar = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => exitZipWith(self, that, (a, a2) => [a, a2], internalCause.parallel));
/** @internal */
exports.exitZipPar = exitZipPar;
const exitZipParLeft = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => exitZipWith(self, that, (a, _) => a, internalCause.parallel));
/** @internal */
exports.exitZipParLeft = exitZipParLeft;
const exitZipParRight = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => exitZipWith(self, that, (_, a2) => a2, internalCause.parallel));
/** @internal */
exports.exitZipParRight = exitZipParRight;
const exitZipWith = /*#__PURE__*/(0, _Function.dual)(4, (self, that, f, g) => {
  switch (self._tag) {
    case OpCodes.OP_FAILURE:
      {
        switch (that._tag) {
          case OpCodes.OP_SUCCESS:
            {
              return self;
            }
          case OpCodes.OP_FAILURE:
            {
              return exitFailCause(g(self.i0, that.i0));
            }
        }
      }
    case OpCodes.OP_SUCCESS:
      {
        switch (that._tag) {
          case OpCodes.OP_SUCCESS:
            {
              return exitSucceed(f(self.i0, that.i0));
            }
          case OpCodes.OP_FAILURE:
            {
              return that;
            }
        }
      }
  }
});
exports.exitZipWith = exitZipWith;
const exitCollectAllInternal = (exits, combineCauses) => {
  const list = Chunk.fromIterable(exits);
  if (!Chunk.isNonEmpty(list)) {
    return Option.none();
  }
  return Option.some(exitMap(Chunk.reverse)(Chunk.reduce(exitMap(Chunk.of)(Chunk.headNonEmpty(list)), (accumulator, current) => exitZipWith(current, (list, value) => Chunk.prepend(value)(list), combineCauses)(accumulator))(Chunk.tailNonEmpty(list))));
};
// -----------------------------------------------------------------------------
// Deferred
// -----------------------------------------------------------------------------
/** @internal */
const deferredUnsafeMake = fiberId => ({
  [deferred.DeferredTypeId]: deferred.deferredVariance,
  state: MutableRef.make(deferred.pending([])),
  blockingOn: fiberId
});
/* @internal */
exports.deferredUnsafeMake = deferredUnsafeMake;
const deferredMake = /*#__PURE__*/Debug.methodWithTrace(trace => () => flatMap(id => deferredMakeAs(id))(fiberId()).traced(trace));
/* @internal */
exports.deferredMake = deferredMake;
const deferredMakeAs = /*#__PURE__*/Debug.methodWithTrace(trace => fiberId => sync(() => deferredUnsafeMake(fiberId)).traced(trace));
/* @internal */
exports.deferredMakeAs = deferredMakeAs;
const deferredAwait = /*#__PURE__*/Debug.methodWithTrace(trace => self => asyncInterruptEither(k => {
  const state = MutableRef.get(self.state);
  switch (state._tag) {
    case DeferredOpCodes.OP_STATE_DONE:
      {
        return Either.right(state.effect);
      }
    case DeferredOpCodes.OP_STATE_PENDING:
      {
        MutableRef.set(deferred.pending([k, ...state.joiners]))(self.state);
        return Either.left(deferredInterruptJoiner(self, k));
      }
  }
}, self.blockingOn).traced(trace));
/* @internal */
exports.deferredAwait = deferredAwait;
const deferredComplete = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, effect) => intoDeferred(effect, self).traced(trace));
/* @internal */
exports.deferredComplete = deferredComplete;
const deferredCompleteWith = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, effect) => sync(() => {
  const state = MutableRef.get(self.state);
  switch (state._tag) {
    case DeferredOpCodes.OP_STATE_DONE:
      {
        return false;
      }
    case DeferredOpCodes.OP_STATE_PENDING:
      {
        MutableRef.set(deferred.done(effect))(self.state);
        for (let i = 0; i < state.joiners.length; i++) {
          state.joiners[i](effect);
        }
        return true;
      }
  }
}).traced(trace));
/* @internal */
exports.deferredCompleteWith = deferredCompleteWith;
const deferredDone = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, exit) => deferredCompleteWith(self, done(exit)).traced(trace));
/* @internal */
exports.deferredDone = deferredDone;
const deferredFail = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, error) => deferredCompleteWith(self, fail(error)).traced(trace));
/* @internal */
exports.deferredFail = deferredFail;
const deferredFailSync = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, evaluate) => deferredCompleteWith(self, failSync(restore(evaluate))).traced(trace));
/* @internal */
exports.deferredFailSync = deferredFailSync;
const deferredFailCause = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, cause) => deferredCompleteWith(self, failCause(cause)).traced(trace));
/* @internal */
exports.deferredFailCause = deferredFailCause;
const deferredFailCauseSync = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, evaluate) => deferredCompleteWith(self, failCauseSync(restore(evaluate))).traced(trace));
/* @internal */
exports.deferredFailCauseSync = deferredFailCauseSync;
const deferredDie = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, defect) => deferredCompleteWith(self, die(defect)).traced(trace));
/* @internal */
exports.deferredDie = deferredDie;
const deferredDieSync = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, evaluate) => deferredCompleteWith(self, dieSync(restore(evaluate))).traced(trace));
/* @internal */
exports.deferredDieSync = deferredDieSync;
const deferredInterrupt = /*#__PURE__*/Debug.methodWithTrace(trace => self => flatMap(fiberId => deferredCompleteWith(self, interruptWith(fiberId)))(fiberId()).traced(trace));
/* @internal */
exports.deferredInterrupt = deferredInterrupt;
const deferredInterruptWith = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, fiberId) => deferredCompleteWith(self, interruptWith(fiberId)).traced(trace));
/* @internal */
exports.deferredInterruptWith = deferredInterruptWith;
const deferredIsDone = /*#__PURE__*/Debug.methodWithTrace(trace => self => sync(() => MutableRef.get(self.state)._tag === DeferredOpCodes.OP_STATE_DONE).traced(trace));
/* @internal */
exports.deferredIsDone = deferredIsDone;
const deferredPoll = /*#__PURE__*/Debug.methodWithTrace(trace => self => sync(() => {
  const state = MutableRef.get(self.state);
  switch (state._tag) {
    case DeferredOpCodes.OP_STATE_DONE:
      {
        return Option.some(state.effect);
      }
    case DeferredOpCodes.OP_STATE_PENDING:
      {
        return Option.none();
      }
  }
}).traced(trace));
/* @internal */
exports.deferredPoll = deferredPoll;
const deferredSucceed = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => deferredCompleteWith(self, succeed(value)).traced(trace));
/* @internal */
exports.deferredSucceed = deferredSucceed;
const deferredSync = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, evaluate) => deferredCompleteWith(self, sync(restore(evaluate))).traced(trace));
/** @internal */
exports.deferredSync = deferredSync;
const deferredUnsafeDone = (self, effect) => {
  const state = MutableRef.get(self.state);
  if (state._tag === DeferredOpCodes.OP_STATE_PENDING) {
    MutableRef.set(deferred.done(effect))(self.state);
    for (let i = state.joiners.length - 1; i >= 0; i--) {
      state.joiners[i](effect);
    }
  }
};
exports.deferredUnsafeDone = deferredUnsafeDone;
const deferredInterruptJoiner = (self, joiner) => sync(() => {
  const state = MutableRef.get(self.state);
  if (state._tag === DeferredOpCodes.OP_STATE_PENDING) {
    MutableRef.set(deferred.pending(state.joiners.filter(j => j !== joiner)))(self.state);
  }
});
//# sourceMappingURL=core.js.map