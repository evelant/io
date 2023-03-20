var _a, _b, _c;
import * as Chunk from "@effect/data/Chunk";
import * as Context from "@effect/data/Context";
import * as Differ from "@effect/data/Differ";
import * as ContextPatch from "@effect/data/Differ/ContextPatch";
import * as HashSetPatch from "@effect/data/Differ/HashSetPatch";
import * as Either from "@effect/data/Either";
import * as Equal from "@effect/data/Equal";
import { dual, identity } from "@effect/data/Function";
import * as Hash from "@effect/data/Hash";
import * as HashMap from "@effect/data/HashMap";
import * as HashSet from "@effect/data/HashSet";
import * as MutableRef from "@effect/data/MutableRef";
import * as Option from "@effect/data/Option";
import * as Debug from "@effect/io/Debug";
import * as FiberId from "@effect/io/Fiber/Id";
import * as RuntimeFlagsPatch from "@effect/io/Fiber/Runtime/Flags/Patch";
import * as internalCause from "@effect/io/internal_effect_untraced/cause";
import * as deferred from "@effect/io/internal_effect_untraced/deferred";
import * as DeferredOpCodes from "@effect/io/internal_effect_untraced/opCodes/deferred";
import * as OpCodes from "@effect/io/internal_effect_untraced/opCodes/effect";
import * as _runtimeFlags from "@effect/io/internal_effect_untraced/runtimeFlags";
import * as scheduler from "@effect/io/Scheduler";
// -----------------------------------------------------------------------------
// Effect
// -----------------------------------------------------------------------------
/** @internal */
const EffectErrorSymbolKey = "@effect/io/Effect/Error";
/** @internal */
export const EffectErrorTypeId = /*#__PURE__*/Symbol.for(EffectErrorSymbolKey);
/** @internal */
export const isEffectError = u => typeof u === "object" && u != null && EffectErrorTypeId in u;
/** @internal */
export const makeEffectError = cause => ({
  [EffectErrorTypeId]: EffectErrorTypeId,
  _tag: "EffectError",
  cause
});
/** @internal */
export const EffectTypeId = /*#__PURE__*/Symbol.for("@effect/io/Effect");
/** @internal */
export class RevertFlags {
  constructor(patch) {
    this.patch = patch;
    this._tag = OpCodes.OP_REVERT_FLAGS;
  }
}
/** @internal */
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
export const isEffect = u => typeof u === "object" && u != null && EffectTypeId in u;
/* @internal */
export const acquireUseRelease = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restoreTracing) => (acquire, use, release) => uninterruptibleMask(restore => flatMap(a => flatMap(exit => matchCauseEffect(cause => {
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
export const as = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => flatMap(() => succeed(value))(self).traced(trace));
/* @internal */
export const asUnit = /*#__PURE__*/Debug.methodWithTrace(trace => self => as(void 0)(self).traced(trace));
/* @internal */
export const async = /*#__PURE__*/Debug.methodWithTrace(trace => (register, blockingOn = FiberId.none) => {
  const effect = new EffectPrimitive(OpCodes.OP_ASYNC);
  effect.i0 = register;
  effect.i1 = blockingOn;
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
export const asyncInterruptEither = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (register, blockingOn = FiberId.none) => suspend(() => {
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
export const asyncInterrupt = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (register, blockingOn = FiberId.none) => suspend(() => {
  let cancelerRef = unit();
  return onInterrupt(() => cancelerRef)(async(resume => {
    cancelerRef = restore(register)(resume);
  }, blockingOn));
}).traced(trace));
/* @internal */
export const catchAllCause = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => {
  const effect = new EffectPrimitive(OpCodes.OP_ON_FAILURE);
  effect.i0 = self;
  effect.i1 = restore(f);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
export const catchAll = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => matchEffect(restore(f), succeed)(self).traced(trace));
/**
 * @macro identity
 * @internal
 */
export const unified = f => (...args) => f(...args);
/* @internal */
export const catchSome = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => matchCauseEffect(unified(cause => {
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
export const checkInterruptible = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => withFiberRuntime((_, status) => restore(f)(_runtimeFlags.interruption(status.runtimeFlags))).traced(trace));
/* @internal */
export const die = /*#__PURE__*/Debug.methodWithTrace(trace => defect => failCause(internalCause.die(defect)).traced(trace));
/* @internal */
export const dieSync = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => failCauseSync(() => internalCause.die(restore(evaluate)())).traced(trace));
/* @internal */
export const done = /*#__PURE__*/Debug.methodWithTrace(trace => exit => suspend(() => exit).traced(trace));
/* @internal */
export const either = /*#__PURE__*/Debug.methodWithTrace(trace => self => matchEffect(e => succeed(Either.left(e)), a => succeed(Either.right(a)))(self).traced(trace));
/* @internal */
export const context = /*#__PURE__*/Debug.methodWithTrace(trace => () => suspend(() => fiberRefGet(currentContext)).traced(trace));
/* @internal */
export const contextWithEffect = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => flatMap(restore(f))(context()).traced(trace));
/* @internal */
export const exit = /*#__PURE__*/Debug.methodWithTrace(trace => self => matchCause(failCause, succeed)(self).traced(trace));
/* @internal */
export const fail = /*#__PURE__*/Debug.methodWithTrace(trace => error => failCause(internalCause.fail(error)).traced(trace));
/* @internal */
export const failSync = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => failCauseSync(() => internalCause.fail(restore(evaluate)())).traced(trace));
/* @internal */
export const failCause = /*#__PURE__*/Debug.methodWithTrace(trace => cause => {
  const effect = new EffectPrimitiveFailure(OpCodes.OP_FAILURE);
  effect.i0 = cause;
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
export const failCauseSync = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => flatMap(sync(restore(evaluate)), failCause).traced(trace));
/* @internal */
export const fiberId = /*#__PURE__*/Debug.methodWithTrace(trace => () => withFiberRuntime(state => succeed(state.id())).traced(trace));
/* @internal */
export const fiberIdWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => withFiberRuntime(state => restore(f)(state.id())).traced(trace));
/* @internal */
export const flatMap = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => {
  const effect = new EffectPrimitive(OpCodes.OP_ON_SUCCESS);
  effect.i0 = self;
  effect.i1 = restore(f);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
export const flatten = /*#__PURE__*/Debug.methodWithTrace(trace => self => flatMap(self, identity).traced(trace));
/* @internal */
export const flip = /*#__PURE__*/Debug.methodWithTrace(trace => self => matchEffect(succeed, fail)(self).traced(trace));
/* @internal */
export const matchCause = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, onFailure, onSuccess) => matchCauseEffect(cause => succeed(restore(onFailure)(cause)), a => succeed(restore(onSuccess)(a)))(self).traced(trace));
/* @internal */
export const matchCauseEffect = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, onFailure, onSuccess) => {
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
export const matchEffect = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, onFailure, onSuccess) => matchCauseEffect(self, cause => {
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
export const forEach = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => suspend(() => {
  const arr = Array.from(self);
  const ret = new Array(arr.length);
  let i = 0;
  return as(Chunk.unsafeFromArray(ret))(whileLoop(() => i < arr.length, () => restore(f)(arr[i]), b => {
    ret[i++] = b;
  }));
}).traced(trace));
/* @internal */
export const forEachDiscard = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => suspend(() => {
  const arr = Array.from(self);
  let i = 0;
  return whileLoop(() => i < arr.length, () => restore(f)(arr[i++]), () => {
    //
  });
}).traced(trace));
/* @internal */
export const fromOption = /*#__PURE__*/Debug.methodWithTrace(trace => option => {
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
export const fromEither = /*#__PURE__*/Debug.methodWithTrace(trace => either => {
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
export const ifEffect = /*#__PURE__*/Debug.dualWithTrace(3, trace => (self, onTrue, onFalse) => flatMap(unified(b => b ? onTrue : onFalse))(self).traced(trace));
/* @internal */
export const interrupt = /*#__PURE__*/Debug.methodWithTrace(trace => () => flatMap(fiberId => interruptWith(fiberId))(fiberId()).traced(trace));
/* @internal */
export const interruptWith = /*#__PURE__*/Debug.methodWithTrace(trace => fiberId => failCause(internalCause.interrupt(fiberId)).traced(trace));
/* @internal */
export const interruptible = /*#__PURE__*/Debug.methodWithTrace(trace => self => {
  const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = RuntimeFlagsPatch.enable(_runtimeFlags.Interruption);
  effect.i1 = () => self;
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
export const interruptibleMask = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => {
  const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = RuntimeFlagsPatch.enable(_runtimeFlags.Interruption);
  effect.i1 = oldFlags => _runtimeFlags.interruption(oldFlags) ? restore(f)(interruptible) : restore(f)(uninterruptible);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
export const intoDeferred = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, deferred) => uninterruptibleMask(restore => flatMap(exit => deferredDone(deferred, exit))(exit(restore(self)))).traced(trace));
/* @internal */
export const map = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => flatMap(a => sync(() => restore(f)(a)))(self).traced(trace));
/* @internal */
export const mapError = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => matchCauseEffect(self, cause => {
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
export const never = /*#__PURE__*/Debug.methodWithTrace(trace => () => asyncInterruptEither(() => {
  const interval = setInterval(() => {
    //
  }, 2 ** 31 - 1);
  return Either.left(sync(() => clearInterval(interval)));
}).traced(trace));
/* @internal */
export const onError = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, cleanup) => onExit(self, unified(exit => exitIsSuccess(exit) ? unit() : restore(cleanup)(exit.i0))).traced(trace));
/* @internal */
export const onExit = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restoreTrace) => (self, cleanup) => uninterruptibleMask(restore => matchCauseEffect(restore(self), cause1 => {
  const result = exitFailCause(cause1);
  return matchCauseEffect(cause2 => exitFailCause(internalCause.sequential(cause1, cause2)), () => result)(restoreTrace(cleanup)(result));
}, success => {
  const result = exitSucceed(success);
  return zipRight(result)(restoreTrace(cleanup)(result));
})).traced(trace));
/* @internal */
export const onInterrupt = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, cleanup) => onExit(self, exitMatch(cause => internalCause.isInterruptedOnly(cause) ? asUnit(restore(cleanup)(internalCause.interruptors(cause))) : unit(), () => unit())).traced(trace));
/* @internal */
export const orElse = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, that) => attemptOrElse(restore(that), succeed)(self).traced(trace));
/* @internal */
export const orDie = /*#__PURE__*/Debug.methodWithTrace(trace => self => orDieWith(self, identity).traced(trace));
/* @internal */
export const orDieWith = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => matchEffect(e => die(restore(f)(e)), succeed)(self).traced(trace));
/* @internal */
export const partitionMap = (elements, f) => Array.from(elements).reduceRight(([lefts, rights], current) => {
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
export const provideContext = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, context) => fiberRefLocally(currentContext, context)(self).traced(trace));
/* @internal */
export const contramapContext = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => contextWithEffect(context => provideContext(restore(f)(context))(self)).traced(trace));
/* @internal */
export const runtimeFlags = /*#__PURE__*/Debug.methodWithTrace(trace => () => withFiberRuntime((_, status) => succeed(status.runtimeFlags)).traced(trace));
/* @internal */
export const service = /*#__PURE__*/Debug.methodWithTrace(trace => tag => serviceWithEffect(tag, succeed).traced(trace));
/* @internal */
export const serviceWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (tag, f) => serviceWithEffect(tag, a => sync(() => restore(f)(a))).traced(trace));
/* @internal */
export const serviceWithEffect = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (tag, f) => suspend(() => flatMap(env => restore(f)(Context.unsafeGet(tag)(env)))(fiberRefGet(currentContext))).traced(trace));
/* @internal */
export const succeed = /*#__PURE__*/Debug.methodWithTrace(trace => value => {
  const effect = new EffectPrimitiveSuccess(OpCodes.OP_SUCCESS);
  effect.i0 = value;
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
export const suspend = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => effect => flatMap(identity)(sync(restore(effect))).traced(trace));
/* @internal */
export const sync = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => {
  const effect = new EffectPrimitive(OpCodes.OP_SYNC);
  effect.i0 = restore(evaluate);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
export const tags = /*#__PURE__*/Debug.methodWithTrace(trace => () => fiberRefGet(currentTags).traced(trace));
/* @internal */
export const tap = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => flatMap(a => as(a)(restore(f)(a)))(self).traced(trace));
/* @internal */
export const transplant = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => withFiberRuntime(state => {
  const scopeOverride = state.getFiberRef(forkScopeOverride);
  const scope = Option.getOrElse(() => state.scope())(scopeOverride);
  return restore(f)(fiberRefLocally(forkScopeOverride, Option.some(scope)));
}).traced(trace));
/* @internal */
export const attemptOrElse = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, that, onSuccess) => matchCauseEffect(self, cause => {
  const defects = internalCause.defects(cause);
  if (defects.length > 0) {
    return failCause(Option.getOrThrow(internalCause.keepDefectsAndElectFailures(cause)));
  }
  return restore(that)();
}, restore(onSuccess)).traced(trace));
/* @internal */
export const uninterruptible = /*#__PURE__*/Debug.methodWithTrace(trace => self => {
  const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = RuntimeFlagsPatch.disable(_runtimeFlags.Interruption);
  effect.i1 = () => self;
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
export const uninterruptibleMask = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => {
  const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = RuntimeFlagsPatch.disable(_runtimeFlags.Interruption);
  effect.i1 = oldFlags => _runtimeFlags.interruption(oldFlags) ? restore(f)(interruptible) : restore(f)(uninterruptible);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
export const unit = /*#__PURE__*/Debug.methodWithTrace(trace => _ => succeed(void 0).traced(trace));
/* @internal */
export const updateRuntimeFlags = /*#__PURE__*/Debug.methodWithTrace(trace => patch => {
  const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = patch;
  effect.i1 = void 0;
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
export const whenEffect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, predicate) => flatMap(b => {
  if (b) {
    return map(Option.some)(self);
  }
  return succeed(Option.none());
})(predicate).traced(trace));
/* @internal */
export const whileLoop = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (check, body, process) => {
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
export const withFiberRuntime = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => withRuntime => {
  const effect = new EffectPrimitive(OpCodes.OP_WITH_RUNTIME);
  effect.i0 = restore(withRuntime);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
export const withParallelism = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, parallelism) => suspend(() => fiberRefLocally(currentParallelism, Option.some(parallelism))(self)).traced(trace));
/* @internal */
export const withParallelismUnbounded = /*#__PURE__*/Debug.methodWithTrace(trace => self => suspend(() => fiberRefLocally(currentParallelism, Option.none())(self)).traced(trace));
/* @internal */
export const withRuntimeFlags = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, update) => {
  const effect = new EffectPrimitive(OpCodes.OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = update;
  effect.i1 = () => self;
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
export const yieldNow = /*#__PURE__*/Debug.methodWithTrace(trace => () => {
  const effect = new EffectPrimitive(OpCodes.OP_YIELD);
  if (trace) {
    return effect.traced(trace);
  }
  return effect;
});
/* @internal */
export const zip = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => flatMap(self, a => map(that, b => [a, b])).traced(trace));
/* @internal */
export const zipFlatten = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => flatMap(self, a => map(that, b => [...a, b])).traced(trace));
/* @internal */
export const zipLeft = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => flatMap(self, a => as(that, a)).traced(trace));
/* @internal */
export const zipRight = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => flatMap(self, () => that).traced(trace));
/* @internal */
export const zipWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, that, f) => flatMap(self, a => map(that, b => restore(f)(a, b))).traced(trace));
// -----------------------------------------------------------------------------
// Fiber
// -----------------------------------------------------------------------------
/* @internal */
export const interruptFiber = /*#__PURE__*/Debug.methodWithTrace(trace => self => flatMap(fiberId => interruptAsFiber(fiberId)(self))(fiberId()).traced(trace));
/* @internal */
export const interruptAsFiber = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, fiberId) => flatMap(() => self.await())(self.interruptAsFork(fiberId)).traced(trace));
// -----------------------------------------------------------------------------
// LogLevel
// -----------------------------------------------------------------------------
/** @internal */
export const logLevelAll = {
  _tag: "All",
  syslog: 0,
  label: "ALL",
  ordinal: Number.MIN_SAFE_INTEGER
};
/** @internal */
export const logLevelFatal = {
  _tag: "Fatal",
  syslog: 2,
  label: "FATAL",
  ordinal: 50000
};
/** @internal */
export const logLevelError = {
  _tag: "Error",
  syslog: 3,
  label: "ERROR",
  ordinal: 40000
};
/** @internal */
export const logLevelWarning = {
  _tag: "Warning",
  syslog: 4,
  label: "WARN",
  ordinal: 30000
};
/** @internal */
export const logLevelInfo = {
  _tag: "Info",
  syslog: 6,
  label: "INFO",
  ordinal: 20000
};
/** @internal */
export const logLevelDebug = {
  _tag: "Debug",
  syslog: 7,
  label: "DEBUG",
  ordinal: 10000
};
/** @internal */
export const logLevelTrace = {
  _tag: "Trace",
  syslog: 7,
  label: "TRACE",
  ordinal: 0
};
/** @internal */
export const logLevelNone = {
  _tag: "None",
  syslog: 7,
  label: "OFF",
  ordinal: Number.MAX_SAFE_INTEGER
};
// -----------------------------------------------------------------------------
// FiberRef
// -----------------------------------------------------------------------------
/** @internal */
const FiberRefSymbolKey = "@effect/io/FiberRef";
/** @internal */
export const FiberRefTypeId = /*#__PURE__*/Symbol.for(FiberRefSymbolKey);
/** @internal */
const fiberRefVariance = {
  _A: _ => _
};
/* @internal */
export const fiberRefGet = /*#__PURE__*/Debug.methodWithTrace(trace => self => fiberRefModify(self, a => [a, a]).traced(trace));
/* @internal */
export const fiberRefGetAndSet = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => fiberRefModify(self, v => [v, value]).traced(trace));
/* @internal */
export const fiberRefGetAndUpdate = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => fiberRefModify(self, v => [v, restore(f)(v)]).traced(trace));
/* @internal */
export const fiberRefGetAndUpdateSome = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => fiberRefModify(self, v => [v, Option.getOrElse(restore(pf)(v), () => v)]).traced(trace));
/* @internal */
export const fiberRefGetWith = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => flatMap(fiberRefGet(self), restore(f)).traced(trace));
/* @internal */
export const fiberRefSet = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => fiberRefModify(self, () => [void 0, value]).traced(trace));
/* @internal */
export const fiberRefDelete = /*#__PURE__*/Debug.methodWithTrace(trace => self => withFiberRuntime(state => {
  state.unsafeDeleteFiberRef(self);
  return unit();
}).traced(trace));
/* @internal */
export const fiberRefReset = /*#__PURE__*/Debug.methodWithTrace(trace => self => fiberRefSet(self, self.initial).traced(trace));
/* @internal */
export const fiberRefModify = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => withFiberRuntime(state => {
  const [b, a] = restore(f)(state.getFiberRef(self));
  state.setFiberRef(self, a);
  return succeed(b);
}).traced(trace));
/* @internal */
export const fiberRefModifySome = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (self, def, f) => fiberRefModify(self, v => Option.getOrElse(restore(f)(v), () => [def, v])).traced(trace));
/* @internal */
export const fiberRefUpdate = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => fiberRefModify(self, v => [void 0, restore(f)(v)]).traced(trace));
/* @internal */
export const fiberRefUpdateSome = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => fiberRefModify(self, v => [void 0, Option.getOrElse(restore(pf)(v), () => v)]).traced(trace));
/* @internal */
export const fiberRefUpdateAndGet = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => fiberRefModify(self, v => {
  const result = restore(f)(v);
  return [result, result];
}).traced(trace));
/* @internal */
export const fiberRefUpdateSomeAndGet = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => fiberRefModify(self, v => {
  const result = Option.getOrElse(() => v)(restore(pf)(v));
  return [result, result];
}).traced(trace));
/* @internal */
export const fiberRefLocally = /*#__PURE__*/Debug.dualWithTrace(3, trace => (use, self, value) => acquireUseRelease(zipLeft(fiberRefGet(self), fiberRefSet(self, value)), () => use, oldValue => fiberRefSet(self, oldValue)).traced(trace));
/* @internal */
export const fiberRefLocallyWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (use, self, f) => fiberRefGetWith(self, a => fiberRefLocally(self, restore(f)(a))(use)).traced(trace));
/** @internal */
export const fiberRefUnsafeMake = (initial, fork = identity, join = (_, a) => a) => fiberRefUnsafeMakePatch(initial, Differ.update(), fork, join);
/** @internal */
export const fiberRefUnsafeMakeHashSet = initial => fiberRefUnsafeMakePatch(initial, Differ.hashSet(), HashSetPatch.empty());
/** @internal */
export const fiberRefUnsafeMakeContext = initial => fiberRefUnsafeMakePatch(initial, Differ.environment(), ContextPatch.empty());
/** @internal */
export const fiberRefUnsafeMakePatch = (initial, differ, fork, join = (_, n) => n) => ({
  [FiberRefTypeId]: fiberRefVariance,
  initial,
  diff: (oldValue, newValue) => Differ.diff(oldValue, newValue)(differ),
  combine: (first, second) => Differ.combine(first, second)(differ),
  patch: patch => oldValue => Differ.patch(patch, oldValue)(differ),
  fork,
  join
});
/** @internal */
export const fiberRefUnsafeMakeRuntimeFlags = initial => fiberRefUnsafeMakePatch(initial, _runtimeFlags.differ(), RuntimeFlagsPatch.empty);
/** @internal */
export const currentContext = /*#__PURE__*/fiberRefUnsafeMakeContext( /*#__PURE__*/Context.empty());
/** @internal */
export const currentLogAnnotations = /*#__PURE__*/fiberRefUnsafeMake( /*#__PURE__*/HashMap.empty());
/** @internal */
export const currentLogLevel = /*#__PURE__*/fiberRefUnsafeMake(logLevelInfo);
/** @internal */
export const currentLogSpan = /*#__PURE__*/fiberRefUnsafeMake( /*#__PURE__*/Chunk.empty());
/** @internal */
export const currentScheduler = /*#__PURE__*/fiberRefUnsafeMake(scheduler.defaultScheduler);
/** @internal */
export const currentParallelism = /*#__PURE__*/fiberRefUnsafeMake( /*#__PURE__*/Option.none());
/** @internal */
export const currentTags = /*#__PURE__*/fiberRefUnsafeMakeHashSet( /*#__PURE__*/HashSet.empty());
/** @internal */
export const forkScopeOverride = /*#__PURE__*/fiberRefUnsafeMake( /*#__PURE__*/Option.none(), () => Option.none(), (parent, _) => parent);
/** @internal */
export const interruptedCause = /*#__PURE__*/fiberRefUnsafeMake(internalCause.empty, () => internalCause.empty, (parent, _) => parent);
// -----------------------------------------------------------------------------
// Scope
// -----------------------------------------------------------------------------
/** @internal */
export const ScopeTypeId = /*#__PURE__*/Symbol.for("@effect/io/Scope");
/** @internal */
export const CloseableScopeTypeId = /*#__PURE__*/Symbol.for("@effect/io/CloseableScope");
/* @internal */
export const scopeAddFinalizer = /*#__PURE__*/Debug.methodWithTrace(trace => (self, finalizer) => self.addFinalizer(() => asUnit(finalizer)).traced(trace));
/* @internal */
export const scopeAddFinalizerExit = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (self, finalizer) => self.addFinalizer(restore(finalizer)).traced(trace));
/* @internal */
export const scopeClose = /*#__PURE__*/Debug.methodWithTrace(trace => (self, exit) => self.close(exit).traced(trace));
/* @internal */
export const scopeFork = /*#__PURE__*/Debug.methodWithTrace(trace => (self, strategy) => self.fork(strategy).traced(trace));
/* @internal */
export const releaseMapAdd = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, finalizer) => map(Option.match(() => () => unit(), key => exit => releaseMapRelease(key, exit)(self)))(releaseMapAddIfOpen(restore(finalizer))(self)).traced(trace));
/* @internal */
export const releaseMapRelease = /*#__PURE__*/Debug.dualWithTrace(3, trace => (self, key, exit) => suspend(() => {
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
export const releaseMapAddIfOpen = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, finalizer) => suspend(() => {
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
export const releaseMapGet = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, key) => sync(() => self.state._tag === "Running" ? Option.fromNullable(self.state.finalizers.get(key)) : Option.none()).traced(trace));
/* @internal */
export const releaseMapReplace = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, key, finalizer) => suspend(() => {
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
export const releaseMapRemove = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, key) => sync(() => {
  if (self.state._tag === "Exited") {
    return Option.none();
  }
  const fin = Option.fromNullable(self.state.finalizers.get(key));
  self.state.finalizers.delete(key);
  return fin;
}).traced(trace));
/* @internal */
export const releaseMapMake = /*#__PURE__*/Debug.methodWithTrace(trace => () => sync(() => ({
  state: {
    _tag: "Running",
    nextKey: 0,
    finalizers: new Map(),
    update: identity
  }
})).traced(trace));
// -----------------------------------------------------------------------------
// Exit
// -----------------------------------------------------------------------------
/** @internal */
export const exitIsExit = u => isEffect(u) && "_tag" in u && (u._tag === "Success" || u._tag === "Failure");
/** @internal */
export const exitIsFailure = self => self._tag === "Failure";
/** @internal */
export const exitIsSuccess = self => self._tag === "Success";
/** @internal */
export const exitIsInterrupted = self => {
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
export const exitAs = /*#__PURE__*/dual(2, (self, value) => {
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
export const exitAsUnit = self => exitAs(self, void 0);
/** @internal */
export const exitCauseOption = self => {
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
export const exitCollectAll = exits => exitCollectAllInternal(exits, internalCause.sequential);
/** @internal */
export const exitCollectAllPar = exits => exitCollectAllInternal(exits, internalCause.parallel);
/** @internal */
export const exitDie = defect => exitFailCause(internalCause.die(defect));
/** @internal */
export const exitExists = /*#__PURE__*/dual(2, (self, predicate) => {
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
export const exitFail = error => exitFailCause(internalCause.fail(error));
/** @internal */
export const exitFailCause = cause => {
  const effect = new EffectPrimitiveFailure(OpCodes.OP_FAILURE);
  effect.i0 = cause;
  return effect;
};
/** @internal */
export const exitFlatMap = /*#__PURE__*/dual(2, (self, f) => {
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
export const exitFlatMapEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => {
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
export const exitFlatten = self => exitFlatMap(identity)(self);
/** @internal */
export const exitForEachEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => {
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
export const exitFromEither = either => {
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
export const exitFromOption = option => {
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
export const exitGetOrElse = /*#__PURE__*/dual(2, (self, orElse) => {
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
export const exitInterrupt = fiberId => exitFailCause(internalCause.interrupt(fiberId));
/** @internal */
export const exitMap = /*#__PURE__*/dual(2, (self, f) => {
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
export const exitMapBoth = /*#__PURE__*/dual(3, (self, onFailure, onSuccess) => {
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
export const exitMapError = /*#__PURE__*/dual(2, (self, f) => {
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
export const exitMapErrorCause = /*#__PURE__*/dual(2, (self, f) => {
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
export const exitMatch = /*#__PURE__*/dual(3, (self, onFailure, onSuccess) => {
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
export const exitMatchEffect = /*#__PURE__*/dual(3, (self, onFailure, onSuccess) => {
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
export const exitSucceed = value => {
  const effect = new EffectPrimitiveSuccess(OpCodes.OP_SUCCESS);
  effect.i0 = value;
  return effect;
};
/** @internal */
export const exitUnannotate = exit => exitIsSuccess(exit) ? exit : exitFailCause(internalCause.unannotate(exit.i0));
/** @internal */
export const exitUnit = () => exitSucceed(void 0);
/** @internal */
export const exitZip = /*#__PURE__*/dual(2, (self, that) => exitZipWith(self, that, (a, a2) => [a, a2], internalCause.sequential));
/** @internal */
export const exitZipLeft = /*#__PURE__*/dual(2, (self, that) => exitZipWith(self, that, (a, _) => a, internalCause.sequential));
/** @internal */
export const exitZipRight = /*#__PURE__*/dual(2, (self, that) => exitZipWith(self, that, (_, a2) => a2, internalCause.sequential));
/** @internal */
export const exitZipPar = /*#__PURE__*/dual(2, (self, that) => exitZipWith(self, that, (a, a2) => [a, a2], internalCause.parallel));
/** @internal */
export const exitZipParLeft = /*#__PURE__*/dual(2, (self, that) => exitZipWith(self, that, (a, _) => a, internalCause.parallel));
/** @internal */
export const exitZipParRight = /*#__PURE__*/dual(2, (self, that) => exitZipWith(self, that, (_, a2) => a2, internalCause.parallel));
/** @internal */
export const exitZipWith = /*#__PURE__*/dual(4, (self, that, f, g) => {
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
export const deferredUnsafeMake = fiberId => ({
  [deferred.DeferredTypeId]: deferred.deferredVariance,
  state: MutableRef.make(deferred.pending([])),
  blockingOn: fiberId
});
/* @internal */
export const deferredMake = /*#__PURE__*/Debug.methodWithTrace(trace => () => flatMap(id => deferredMakeAs(id))(fiberId()).traced(trace));
/* @internal */
export const deferredMakeAs = /*#__PURE__*/Debug.methodWithTrace(trace => fiberId => sync(() => deferredUnsafeMake(fiberId)).traced(trace));
/* @internal */
export const deferredAwait = /*#__PURE__*/Debug.methodWithTrace(trace => self => asyncInterruptEither(k => {
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
export const deferredComplete = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, effect) => intoDeferred(effect, self).traced(trace));
/* @internal */
export const deferredCompleteWith = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, effect) => sync(() => {
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
export const deferredDone = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, exit) => deferredCompleteWith(self, done(exit)).traced(trace));
/* @internal */
export const deferredFail = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, error) => deferredCompleteWith(self, fail(error)).traced(trace));
/* @internal */
export const deferredFailSync = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, evaluate) => deferredCompleteWith(self, failSync(restore(evaluate))).traced(trace));
/* @internal */
export const deferredFailCause = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, cause) => deferredCompleteWith(self, failCause(cause)).traced(trace));
/* @internal */
export const deferredFailCauseSync = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, evaluate) => deferredCompleteWith(self, failCauseSync(restore(evaluate))).traced(trace));
/* @internal */
export const deferredDie = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, defect) => deferredCompleteWith(self, die(defect)).traced(trace));
/* @internal */
export const deferredDieSync = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, evaluate) => deferredCompleteWith(self, dieSync(restore(evaluate))).traced(trace));
/* @internal */
export const deferredInterrupt = /*#__PURE__*/Debug.methodWithTrace(trace => self => flatMap(fiberId => deferredCompleteWith(self, interruptWith(fiberId)))(fiberId()).traced(trace));
/* @internal */
export const deferredInterruptWith = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, fiberId) => deferredCompleteWith(self, interruptWith(fiberId)).traced(trace));
/* @internal */
export const deferredIsDone = /*#__PURE__*/Debug.methodWithTrace(trace => self => sync(() => MutableRef.get(self.state)._tag === DeferredOpCodes.OP_STATE_DONE).traced(trace));
/* @internal */
export const deferredPoll = /*#__PURE__*/Debug.methodWithTrace(trace => self => sync(() => {
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
export const deferredSucceed = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => deferredCompleteWith(self, succeed(value)).traced(trace));
/* @internal */
export const deferredSync = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, evaluate) => deferredCompleteWith(self, sync(restore(evaluate))).traced(trace));
/** @internal */
export const deferredUnsafeDone = (self, effect) => {
  const state = MutableRef.get(self.state);
  if (state._tag === DeferredOpCodes.OP_STATE_PENDING) {
    MutableRef.set(deferred.done(effect))(self.state);
    for (let i = state.joiners.length - 1; i >= 0; i--) {
      state.joiners[i](effect);
    }
  }
};
const deferredInterruptJoiner = (self, joiner) => sync(() => {
  const state = MutableRef.get(self.state);
  if (state._tag === DeferredOpCodes.OP_STATE_PENDING) {
    MutableRef.set(deferred.pending(state.joiners.filter(j => j !== joiner)))(self.state);
  }
});
//# sourceMappingURL=core.mjs.map