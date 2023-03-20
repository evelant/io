"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWithPar = exports.zipWithFiber = exports.zipRightFiber = exports.zipParRight = exports.zipParLeft = exports.zipPar = exports.zipLeftFiber = exports.zipFiber = exports.validateWithPar = exports.validatePar = exports.updateSomeAndGetEffectSynchronized = exports.unsafeMakeSynchronized = exports.unsafeMakeSemaphore = exports.timeoutTo = exports.timeoutFailCause = exports.timeoutFail = exports.timeout = exports.synchronizedVariance = exports.supervised = exports.scheduleForked = exports.raceWith = exports.raceFirst = exports.raceFibersWith = exports.raceEither = exports.raceAwait = exports.race = exports.memoizeFunction = exports.makeSynchronized = exports.makeSemaphore = exports.fromFiberEffect = exports.fromFiber = exports.forkScoped = exports.forkIn = exports.forkAll = exports.ensuringChildren = exports.ensuringChild = exports.ensuring = exports.disconnect = exports.cachedInvalidate = exports.cached = exports.awaitAllChildren = exports.acquireReleaseInterruptible = exports.SynchronizedTypeId = void 0;
var Either = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var Hash = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Hash"));
var MutableHashMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableHashMap"));
var MutableRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableRef"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var ExecutionStrategy = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/ExecutionStrategy"));
var Exit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Exit"));
var FiberId = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Fiber/Id"));
var internalCause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/cause"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var effect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/effect"));
var internalFiber = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiber"));
var fiberRuntime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRuntime"));
var OpCodes = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/opCodes/effect"));
var internalRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/ref"));
var _schedule = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/schedule"));
var supervisor = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/supervisor"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a, _b, _c;
/** @internal */
class Semaphore {
  constructor(permits) {
    this.permits = permits;
    this.waiters = new Array();
    this.taken = 0;
    this.take = n => Debug.bodyWithTrace(trace => core.asyncInterruptEither(resume => {
      if (this.free < n) {
        const observer = () => {
          if (this.free >= n) {
            const observerIndex = this.waiters.findIndex(cb => cb === observer);
            if (observerIndex !== -1) {
              this.waiters.splice(observerIndex, 1);
            }
            this.taken += n;
            resume(core.succeed(n));
          }
        };
        this.waiters.push(observer);
        return Either.left(core.sync(() => {
          const observerIndex = this.waiters.findIndex(cb => cb === observer);
          if (observerIndex !== -1) {
            this.waiters.splice(observerIndex, 1);
          }
        }));
      }
      this.taken += n;
      return Either.right(core.succeed(n));
    }).traced(trace));
    this.release = n => Debug.bodyWithTrace(trace => core.withFiberRuntime(fiber => {
      this.taken -= n;
      fiber.getFiberRef(core.currentScheduler).scheduleTask(() => {
        this.waiters.forEach(wake => wake());
      });
      return core.unit();
    }).traced(trace));
    this.withPermits = n => Debug.bodyWithTrace(trace => self => Debug.untraced(() => core.uninterruptibleMask(restore => core.flatMap(restore(this.take(n)), permits => ensuring(restore(self), this.release(permits))))).traced(trace));
  }
  get free() {
    return this.permits - this.taken;
  }
}
/** @internal */
const unsafeMakeSemaphore = leases => {
  return new Semaphore(leases);
};
/** @internal */
exports.unsafeMakeSemaphore = unsafeMakeSemaphore;
const makeSemaphore = /*#__PURE__*/Debug.methodWithTrace(trace => permits => core.sync(() => unsafeMakeSemaphore(permits)).traced(trace));
/** @internal */
exports.makeSemaphore = makeSemaphore;
const acquireReleaseInterruptible = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (acquire, release) => ensuring(acquire, fiberRuntime.addFinalizer(restore(release))).traced(trace));
/** @internal */
exports.acquireReleaseInterruptible = acquireReleaseInterruptible;
const awaitAllChildren = /*#__PURE__*/Debug.methodWithTrace(trace => self => ensuringChildren(self, fiberRuntime.fiberAwaitAll).traced(trace));
/** @internal */
exports.awaitAllChildren = awaitAllChildren;
const cached = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, timeToLive) => core.map(cachedInvalidate(self, timeToLive), tuple => tuple[0]).traced(trace));
/** @internal */
exports.cached = cached;
const cachedInvalidate = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, timeToLive) => core.flatMap(core.context(), env => core.map(makeSynchronized(Option.none()), cache => [core.provideContext(getCachedValue(self, timeToLive, cache), env), invalidateCache(cache)])).traced(trace));
/** @internal */
exports.cachedInvalidate = cachedInvalidate;
const computeCachedValue = (self, timeToLive, start) => core.map(deferred => Option.some([start + timeToLive.millis, deferred]))(core.tap(deferred => core.intoDeferred(self, deferred))(core.deferredMake()));
/** @internal */
const getCachedValue = (self, timeToLive, cache) => core.uninterruptibleMask(restore => core.flatMap(option => Option.isNone(option) ? effect.dieMessage("BUG: Effect.cachedInvalidate - please report an issue at https://github.com/Effect-TS/io/issues") : restore(core.deferredAwait(option.value[1])))(core.flatMap(time => updateSomeAndGetEffectSynchronized(cache, option => {
  switch (option._tag) {
    case "None":
      {
        return Option.some(computeCachedValue(self, timeToLive, time));
      }
    case "Some":
      {
        const [end] = option.value;
        return end - time <= 0 ? Option.some(computeCachedValue(self, timeToLive, time)) : Option.none();
      }
  }
}))(effect.clockWith(clock => clock.currentTimeMillis()))));
/** @internal */
const invalidateCache = cache => internalRef.set(cache, Option.none());
/** @internal */
const disconnect = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.uninterruptibleMask(restore => core.fiberIdWith(fiberId => core.flatMap(fiberRuntime.forkDaemon(restore(self)), fiber => core.onInterrupt(() => internalFiber.interruptAsFork(fiberId)(fiber))(restore(internalFiber.join(fiber)))))).traced(trace));
/** @internal */
exports.disconnect = disconnect;
const ensuring = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, finalizer) => core.uninterruptibleMask(restore => core.matchCauseEffect(restore(self), cause1 => core.matchCauseEffect(finalizer, cause2 => core.failCause(internalCause.sequential(cause1, cause2)), () => core.failCause(cause1)), a => core.as(finalizer, a))).traced(trace));
/** @internal */
exports.ensuring = ensuring;
const ensuringChild = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => ensuringChildren(self, children => restore(f)(fiberRuntime.fiberCollectAll(children))).traced(trace));
/** @internal */
exports.ensuringChild = ensuringChild;
const ensuringChildren = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, children) => core.flatMap(supervisor.track(), supervisor => ensuring(core.flatMap(supervisor.value(), restore(children)))(supervised(supervisor)(self))).traced(trace));
/** @internal */
exports.ensuringChildren = ensuringChildren;
const forkAll = /*#__PURE__*/Debug.methodWithTrace(trace => effects => core.map(core.forEach(effects, fiberRuntime.fork), fiberRuntime.fiberCollectAll).traced(trace));
/** @internal */
exports.forkAll = forkAll;
const forkIn = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, scope) => core.uninterruptibleMask(restore => core.flatMap(scope.fork(ExecutionStrategy.sequential), child => core.tap(fiber => child.addFinalizer(() => core.fiberIdWith(fiberId => Equal.equals(fiberId, fiber.id()) ? core.unit() : core.asUnit(core.interruptFiber(fiber)))))(fiberRuntime.forkDaemon(core.onExit(exit => child.close(exit))(restore(self)))))).traced(trace));
/** @internal */
exports.forkIn = forkIn;
const forkScoped = /*#__PURE__*/Debug.methodWithTrace(trace => self => fiberRuntime.scopeWith(scope => forkIn(self, scope)).traced(trace));
/** @internal */
exports.forkScoped = forkScoped;
const fromFiber = /*#__PURE__*/Debug.methodWithTrace(trace => fiber => internalFiber.join(fiber).traced(trace));
/** @internal */
exports.fromFiber = fromFiber;
const fromFiberEffect = /*#__PURE__*/Debug.methodWithTrace(trace => fiber => core.suspend(() => core.flatMap(fiber, internalFiber.join)).traced(trace));
exports.fromFiberEffect = fromFiberEffect;
const memoKeySymbol = /*#__PURE__*/Symbol.for("@effect/io/Effect/memoizeFunction.key");
class Key {
  constructor(a, eq) {
    this.a = a;
    this.eq = eq;
    this[_a] = memoKeySymbol;
  }
  [(_a = memoKeySymbol, Equal.symbol)](that) {
    if (typeof that === "object" && that !== null && memoKeySymbol in that) {
      if (this.eq) {
        return this.eq(this.a, that.a);
      } else {
        return Equal.equals(this.a, that.a);
      }
    }
    return false;
  }
  [Hash.symbol]() {
    return this.eq ? 0 : Hash.hash(this.a);
  }
}
/** @internal */
const memoizeFunction = /*#__PURE__*/Debug.methodWithTrace(trace => (f, eq) => {
  return core.map(ref => a => core.flatMap(([patch, b]) => core.as(b)(effect.patchFiberRefs(patch)))(core.flatMap(core.deferredAwait)(ref.modifyEffect(map => {
    const result = MutableHashMap.get(new Key(a, eq))(map);
    if (Option.isNone(result)) {
      return core.map(deferred => [deferred, MutableHashMap.set(new Key(a, eq), deferred)(map)])(core.tap(deferred => fiberRuntime.fork(core.intoDeferred(deferred)(effect.diffFiberRefs(f(a)))))(core.deferredMake()));
    }
    return core.succeed([result.value, map]);
  }))))(core.flatMap(makeSynchronized)(core.sync(() => MutableHashMap.empty()))).traced(trace);
});
/** @internal */
exports.memoizeFunction = memoizeFunction;
const race = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => core.checkInterruptible(isInterruptible => raceAwait(raceDisconnect(that, isInterruptible))(raceDisconnect(self, isInterruptible))).traced(trace));
/** @internal */
exports.race = race;
const raceDisconnect = (self, isInterruptible) => isInterruptible ? disconnect(self) : core.interruptible(disconnect(core.uninterruptible(self)));
/** @internal */
const raceAwait = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => core.fiberIdWith(parentFiberId => raceWith(that, (exit, right) => core.exitMatchEffect(cause => effect.mapErrorCause(cause2 => internalCause.parallel(cause, cause2))(internalFiber.join(right)), value => core.as(value)(core.interruptAsFiber(parentFiberId)(right)))(exit), (exit, left) => core.exitMatchEffect(cause => effect.mapErrorCause(cause2 => internalCause.parallel(cause2, cause))(internalFiber.join(left)), value => core.as(value)(core.interruptAsFiber(parentFiberId)(left)))(exit))(self)).traced(trace));
/** @internal */
exports.raceAwait = raceAwait;
const raceEither = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => race(core.map(self, Either.left), core.map(that, Either.right)).traced(trace));
/** @internal */
exports.raceEither = raceEither;
const raceFirst = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => (effect => core.flatten(effect))(race(core.exit(that))(core.exit(self))).traced(trace));
/** @internal */
exports.raceFirst = raceFirst;
const raceFibersWith = /*#__PURE__*/Debug.dualWithTrace(4, (trace, restore) => (self, that, selfWins, thatWins) => core.withFiberRuntime((parentFiber, parentStatus) => {
  const parentRuntimeFlags = parentStatus.runtimeFlags;
  const raceIndicator = MutableRef.make(true);
  const leftFiber = fiberRuntime.unsafeMakeChildFiber(self, parentFiber, parentRuntimeFlags);
  const rightFiber = fiberRuntime.unsafeMakeChildFiber(that, parentFiber, parentRuntimeFlags);
  leftFiber.startFork(self);
  rightFiber.startFork(that);
  leftFiber.setFiberRef(core.forkScopeOverride, Option.some(parentFiber.scope()));
  rightFiber.setFiberRef(core.forkScopeOverride, Option.some(parentFiber.scope()));
  return core.async(cb => {
    leftFiber.unsafeAddObserver(() => completeRace(leftFiber, rightFiber, restore(selfWins), raceIndicator, cb));
    rightFiber.unsafeAddObserver(() => completeRace(rightFiber, leftFiber, restore(thatWins), raceIndicator, cb));
  }, FiberId.combine(rightFiber.id())(leftFiber.id()));
}).traced(trace));
/** @internal */
exports.raceFibersWith = raceFibersWith;
const completeRace = (winner, loser, cont, ab, cb) => {
  if (MutableRef.compareAndSet(true, false)(ab)) {
    cb(cont(winner, loser));
  }
};
/** @internal */
const raceWith = /*#__PURE__*/Debug.dualWithTrace(4, (trace, restore) => (self, that, leftDone, rightDone) => raceFibersWith(self, that, (winner, loser) => core.flatMap(winner.await(), exit => {
  switch (exit._tag) {
    case OpCodes.OP_SUCCESS:
      {
        return core.flatMap(winner.inheritAll(), () => restore(leftDone)(exit, loser));
      }
    case OpCodes.OP_FAILURE:
      {
        return restore(leftDone)(exit, loser);
      }
  }
}), (winner, loser) => core.flatMap(winner.await(), exit => {
  switch (exit._tag) {
    case OpCodes.OP_SUCCESS:
      {
        return core.flatMap(winner.inheritAll(), () => restore(rightDone)(exit, loser));
      }
    case OpCodes.OP_FAILURE:
      {
        return restore(rightDone)(exit, loser);
      }
  }
})).traced(trace));
/** @internal */
exports.raceWith = raceWith;
const scheduleForked = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, schedule) => forkScoped(_schedule.schedule_Effect(schedule)(self)).traced(trace));
/** @internal */
exports.scheduleForked = scheduleForked;
const supervised = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, supervisor) => {
  const supervise = core.fiberRefLocallyWith(fiberRuntime.currentSupervisor, s => s.zip(supervisor));
  return supervise(self).traced(trace);
});
/** @internal */
exports.supervised = supervised;
const timeout = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, duration) => timeoutTo(self, Option.none(), Option.some, duration).traced(trace));
/** @internal */
exports.timeout = timeout;
const timeoutFail = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, evaluate, duration) => core.flatten(timeoutTo(self, core.failSync(restore(evaluate)), core.succeed, duration)).traced(trace));
/** @internal */
exports.timeoutFail = timeoutFail;
const timeoutFailCause = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, evaluate, duration) => core.flatten(timeoutTo(self, core.failCauseSync(restore(evaluate)), core.succeed, duration)).traced(trace));
/** @internal */
exports.timeoutFailCause = timeoutFailCause;
const timeoutTo = /*#__PURE__*/Debug.dualWithTrace(4, (trace, restore) => (self, def, f, duration) => raceFirst(core.map(self, restore(f)), core.interruptible(core.as(def)(effect.sleep(duration)))).traced(trace));
/** @internal */
exports.timeoutTo = timeoutTo;
const validatePar = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => validateWithPar(self, that, (a, b) => [a, b]).traced(trace));
/** @internal */
exports.validatePar = validatePar;
const validateWithPar = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, that, f) => core.flatten(zipWithPar(core.exit(self), core.exit(that), (ea, eb) => core.exitZipWith(eb, restore(f), (ca, cb) => internalCause.parallel(ca, cb))(ea))).traced(trace));
/** @internal */
exports.validateWithPar = validateWithPar;
const zipPar = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => zipWithPar(self, that, (a, b) => [a, b]).traced(trace));
/** @internal */
exports.zipPar = zipPar;
const zipParLeft = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => zipWithPar(self, that, (a, _) => a).traced(trace));
/** @internal */
exports.zipParLeft = zipParLeft;
const zipParRight = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => zipWithPar(self, that, (_, b) => b).traced(trace));
/** @internal */
exports.zipParRight = zipParRight;
const zipWithPar = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restoreTrace) => (self, that, f) => core.uninterruptibleMask(restore => core.transplant(graft => {
  const deferred = core.deferredUnsafeMake(FiberId.none);
  const ref = MutableRef.make(false);
  return core.flatMap(([left, right]) => core.matchCauseEffect(cause => core.zipRight(core.flatMap(([left, right]) => core.exitMatch(causes => core.failCause(internalCause.parallel(internalCause.stripFailures(cause), causes)), () => core.failCause(internalCause.stripFailures(cause)))(core.exitZipWith(right, f, internalCause.parallel)(left)))(core.zip(internalFiber._await(right))(internalFiber._await(left))))(core.zipRight(fiberRuntime.fiberInterruptFork(right))(fiberRuntime.fiberInterruptFork(left))), () => core.zipWith(internalFiber.join(left), internalFiber.join(right), restoreTrace(f)))(restore(core.deferredAwait(deferred))))(core.zip(forkZipWithPar(that, graft, restore, deferred, ref))(forkZipWithPar(self, graft, restore, deferred, ref)));
})).traced(trace));
/** @internal */
exports.zipWithPar = zipWithPar;
const forkZipWithPar = (self, graft, restore, deferred, ref) => fiberRuntime.forkDaemon(core.matchCauseEffect(graft(restore(self)), cause => core.zipRight(core.deferredFail(deferred, void 0), core.failCause(cause)), value => {
  const flag = MutableRef.get(ref);
  if (flag) {
    core.deferredUnsafeDone(deferred, core.unit());
    return core.succeed(value);
  }
  MutableRef.set(true)(ref);
  return core.succeed(value);
}));
// circular with Synchronized
/** @internal */
const SynchronizedSymbolKey = "@effect/io/Ref/Synchronized";
/** @internal */
const SynchronizedTypeId = /*#__PURE__*/Symbol.for(SynchronizedSymbolKey);
/** @internal */
exports.SynchronizedTypeId = SynchronizedTypeId;
const synchronizedVariance = {
  _A: _ => _
};
/** @internal */
exports.synchronizedVariance = synchronizedVariance;
class SynchronizedImpl {
  constructor(ref, withLock) {
    this.ref = ref;
    this.withLock = withLock;
    this[_b] = synchronizedVariance;
    this[_c] = internalRef.refVariance;
  }
  modify(f) {
    return Debug.bodyWithTrace((trace, restore) => this.modifyEffect(a => core.succeed(restore(f)(a))).traced(trace));
  }
  modifyEffect(f) {
    return Debug.bodyWithTrace((trace, restore) => this.withLock(core.flatMap(([b, a]) => core.as(internalRef.set(this.ref, a), b))(core.flatMap(internalRef.get(this.ref), restore(f)))).traced(trace));
  }
}
_b = SynchronizedTypeId, _c = internalRef.RefTypeId;
/** @internal */
const makeSynchronized = /*#__PURE__*/Debug.methodWithTrace(trace => value => core.sync(() => unsafeMakeSynchronized(value)).traced(trace));
/** @internal */
exports.makeSynchronized = makeSynchronized;
const unsafeMakeSynchronized = value => {
  const ref = internalRef.unsafeMake(value);
  const sem = unsafeMakeSemaphore(1);
  return new SynchronizedImpl(ref, sem.withPermits(1));
};
/** @internal */
exports.unsafeMakeSynchronized = unsafeMakeSynchronized;
const updateSomeAndGetEffectSynchronized = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => self.modifyEffect(value => {
  const result = restore(pf)(value);
  switch (result._tag) {
    case "None":
      {
        return core.succeed([value, value]);
      }
    case "Some":
      {
        return core.map(result.value, a => [a, a]);
      }
  }
}).traced(trace));
// circular with Fiber
/** @internal */
exports.updateSomeAndGetEffectSynchronized = updateSomeAndGetEffectSynchronized;
const zipFiber = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => zipWithFiber(self, that, (a, b) => [a, b]));
/** @internal */
exports.zipFiber = zipFiber;
const zipLeftFiber = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => zipWithFiber(self, that, (a, _) => a));
/** @internal */
exports.zipLeftFiber = zipLeftFiber;
const zipRightFiber = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => zipWithFiber(self, that, (_, b) => b));
/** @internal */
exports.zipRightFiber = zipRightFiber;
const zipWithFiber = /*#__PURE__*/Debug.untracedDual(3, restore => (self, that, f) => ({
  [internalFiber.FiberTypeId]: internalFiber.fiberVariance,
  id: () => FiberId.getOrElse(that.id())(self.id()),
  await: Debug.methodWithTrace(trace => () => core.exit(zipWithPar(core.flatten(that.await()), restore(f))(core.flatten(self.await()))).traced(trace)),
  children: Debug.methodWithTrace(trace => () => self.children().traced(trace)),
  inheritAll: Debug.methodWithTrace(trace => () => core.zipRight(that.inheritAll(), self.inheritAll()).traced(trace)),
  poll: Debug.methodWithTrace(trace => () => core.zipWith(self.poll(), that.poll(), (optionA, optionB) => Option.flatMap(exitA => Option.map(exitB => Exit.zipWith(exitB, restore(f), internalCause.parallel)(exitA))(optionB))(optionA)).traced(trace)),
  interruptAsFork: Debug.methodWithTrace(trace => id => core.zipRight(self.interruptAsFork(id), that.interruptAsFork(id)).traced(trace))
}));
exports.zipWithFiber = zipWithFiber;
//# sourceMappingURL=circular.js.map