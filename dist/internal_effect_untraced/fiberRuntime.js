"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withRuntimeFlagsScoped = exports.withEarlyRelease = exports.withConfigProviderScoped = exports.withClockScoped = exports.validateFirstPar = exports.validateAllParDiscard = exports.validateAllPar = exports.using = exports.unsome = exports.unsafeMakeChildFiber = exports.unsafeFork = exports.taggedScopedWithLabels = exports.taggedScopedWithLabelSet = exports.taggedScoped = exports.someWith = exports.some = exports.sequentialFinalizers = exports.scopedEffect = exports.scopeWith = exports.scopeUse = exports.scopeTag = exports.scopeMake = exports.scopeExtend = exports.scope = exports.runtimeFiberVariance = exports.releaseMapReleaseAll = exports.reduceAllPar = exports.raceAll = exports.partitionPar = exports.parallelFinalizers = exports.onDoneCause = exports.onDone = exports.mergeAllPar = exports.logFmtLogger = exports.forkWithErrorHandler = exports.forkDaemon = exports.forkAllDiscard = exports.fork = exports.forEachParWithIndex = exports.forEachParDiscard = exports.forEachPar = exports.forEachExec = exports.filterPar = exports.filterNotPar = exports.fiberScoped = exports.fiberRefUnsafeMakeSupervisor = exports.fiberRefMakeWith = exports.fiberRefMakeRuntimeFlags = exports.fiberRefMakeContext = exports.fiberRefMake = exports.fiberRefLocallyScopedWith = exports.fiberRefLocallyScoped = exports.fiberJoinAll = exports.fiberInterruptFork = exports.fiberCollectAll = exports.fiberAwaitAll = exports.existsPar = exports.defaultLogger = exports.daemonChildren = exports.currentSupervisor = exports.currentRuntimeFlags = exports.currentMinimumLogLevel = exports.currentLoggers = exports.collectPar = exports.collectAllWithPar = exports.collectAllSuccessesPar = exports.collectAllParDiscard = exports.collectAllPar = exports.collect = exports.allPar = exports.addFinalizer = exports.acquireRelease = exports.FiberRuntime = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
var MutableQueue = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableQueue"));
var MRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableRef"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var Deferred = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Deferred"));
var ExecutionStrategy = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/ExecutionStrategy"));
var FiberId = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Fiber/Id"));
var RuntimeFlagsPatch = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Fiber/Runtime/Flags/Patch"));
var FiberStatus = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Fiber/Status"));
var internalCause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/cause"));
var clock = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/clock"));
var _configProvider = /*#__PURE__*/require("@effect/io/internal_effect_untraced/configProvider");
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var defaultServices = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/defaultServices"));
var internalFiber = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiber"));
var FiberMessage = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberMessage"));
var fiberRefs = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRefs"));
var fiberScope = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberScope"));
var internalLogger = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/logger"));
var metric = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric"));
var metricBoundaries = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric/boundaries"));
var metricLabel = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric/label"));
var OpCodes = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/opCodes/effect"));
var _runtimeFlags = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/runtimeFlags"));
var supervisor = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/supervisor"));
var SupervisorPatch = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/supervisor/patch"));
var LogLevel = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Logger/Level"));
var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Ref"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a, _b;
const fibersStarted = /*#__PURE__*/metric.counter("effect_fiber_started");
const fiberSuccesses = /*#__PURE__*/metric.counter("effect_fiber_successes");
const fiberFailures = /*#__PURE__*/metric.counter("effect_fiber_failures");
const fiberLifetimes = /*#__PURE__*/metric.histogram("effect_fiber_lifetimes", /*#__PURE__*/metricBoundaries.exponential(1.0, 2.0, 100));
/** @internal */
const EvaluationSignalContinue = "Continue";
/** @internal */
const EvaluationSignalDone = "Done";
/** @internal */
const EvaluationSignalYieldNow = "Yield";
/** @internal */
const runtimeFiberVariance = {
  _E: _ => _,
  _A: _ => _
};
exports.runtimeFiberVariance = runtimeFiberVariance;
const absurd = _ => {
  throw new Error(`BUG: FiberRuntime - ${JSON.stringify(_)} - please report an issue at https://github.com/Effect-TS/io/issues`);
};
const contOpSuccess = {
  [OpCodes.OP_ON_SUCCESS]: (_, cont, value) => {
    return cont.i1(value);
  },
  [OpCodes.OP_ON_SUCCESS_AND_FAILURE]: (_, cont, value) => {
    return cont.i2(value);
  },
  [OpCodes.OP_REVERT_FLAGS]: (self, cont, value) => {
    self.patchRuntimeFlags(self._runtimeFlags, cont.patch);
    if (_runtimeFlags.interruptible(self._runtimeFlags) && self.isInterrupted()) {
      return core.exitFailCause(self.getInterruptedCause());
    } else {
      return core.exitSucceed(value);
    }
  },
  [OpCodes.OP_WHILE]: (self, cont, value) => {
    cont.i2(value);
    if (cont.i0()) {
      self.pushStack(cont);
      return cont.i1();
    } else {
      return core.unit();
    }
  }
};
const drainQueueWhileRunningTable = {
  [FiberMessage.OP_INTERRUPT_SIGNAL]: (self, runtimeFlags, cur, message) => {
    self.processNewInterruptSignal(message.cause);
    return _runtimeFlags.interruptible(runtimeFlags) ? core.exitFailCause(message.cause) : cur;
  },
  [FiberMessage.OP_RESUME]: (_self, _runtimeFlags, _cur, _message) => {
    throw new Error("It is illegal to have multiple concurrent run loops in a single fiber");
  },
  [FiberMessage.OP_STATEFUL]: (self, runtimeFlags, cur, message) => {
    message.onFiber(self, FiberStatus.running(runtimeFlags));
    return cur;
  },
  [FiberMessage.OP_YIELD_NOW]: (_self, _runtimeFlags, cur, _message) => {
    return core.flatMap(() => cur)(core.yieldNow());
  }
};
/** @internal */
class FiberRuntime {
  constructor(fiberId, fiberRefs0, runtimeFlags0) {
    this[_a] = internalFiber.fiberVariance;
    this[_b] = runtimeFiberVariance;
    this._queue = MutableQueue.unbounded();
    this._children = null;
    this._observers = new Array();
    this._running = false;
    this._stack = [];
    this._asyncInterruptor = null;
    this._asyncBlockingOn = null;
    this._exitValue = null;
    this._traceStack = [];
    this.run = () => {
      this.drainQueueOnCurrentThread();
    };
    this._runtimeFlags = runtimeFlags0;
    this._fiberId = fiberId;
    this._fiberRefs = fiberRefs0;
    if (_runtimeFlags.runtimeMetrics(runtimeFlags0)) {
      const tags = this.getFiberRef(core.currentTags);
      fibersStarted.unsafeUpdate(1, tags);
    }
  }
  /**
   * The identity of the fiber.
   */
  id() {
    return this._fiberId;
  }
  /**
   * Begins execution of the effect associated with this fiber on in the
   * background. This can be called to "kick off" execution of a fiber after
   * it has been created.
   */
  resume(effect) {
    this.tell(FiberMessage.resume(effect));
  }
  /**
   * The status of the fiber.
   */
  status() {
    return this.ask((_, status) => status);
  }
  /**
   * Gets the fiber runtime flags.
   */
  runtimeFlags() {
    return this.ask((state, status) => {
      if (FiberStatus.isDone(status)) {
        return state._runtimeFlags;
      }
      return status.runtimeFlags;
    });
  }
  /**
   * Returns the current `FiberScope` for the fiber.
   */
  scope() {
    return fiberScope.unsafeMake(this);
  }
  /**
   * Retrieves the immediate children of the fiber.
   */
  children() {
    return this.ask(fiber => Chunk.fromIterable(fiber.getChildren()));
  }
  /**
   * Gets the fiber's set of children.
   */
  getChildren() {
    if (this._children === null) {
      this._children = new Set();
    }
    return this._children;
  }
  /**
   * Retrieves the current supervisor the fiber uses for supervising effects.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getSupervisor() {
    return this.getFiberRef(currentSupervisor);
  }
  /**
   * Retrieves the interrupted cause of the fiber, which will be `Cause.empty`
   * if the fiber has not been interrupted.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getInterruptedCause() {
    return this.getFiberRef(core.interruptedCause);
  }
  /**
   * Retrieves the whole set of fiber refs.
   */
  fiberRefs() {
    return this.ask(fiber => fiber.unsafeGetFiberRefs());
  }
  /**
   * Returns an effect that will contain information computed from the fiber
   * state and status while running on the fiber.
   *
   * This allows the outside world to interact safely with mutable fiber state
   * without locks or immutable data.
   */
  ask(f) {
    return Debug.untraced(() => core.suspend(() => {
      const deferred = core.deferredUnsafeMake(this._fiberId);
      this.tell(FiberMessage.stateful((fiber, status) => {
        core.deferredUnsafeDone(deferred, core.sync(() => f(fiber, status)));
      }));
      return core.deferredAwait(deferred);
    }));
  }
  /**
   * Adds a message to be processed by the fiber on the fiber.
   */
  tell(message) {
    MutableQueue.offer(message)(this._queue);
    if (!this._running) {
      this._running = true;
      this.drainQueueLaterOnExecutor();
    }
  }
  await() {
    return Debug.untraced(() => core.asyncInterrupt(resume => {
      const cb = exit => resume(core.succeed(exit));
      this.tell(FiberMessage.stateful((fiber, _) => {
        if (fiber._exitValue !== null) {
          cb(this._exitValue);
        } else {
          fiber.unsafeAddObserver(cb);
        }
      }));
      return core.sync(() => this.tell(FiberMessage.stateful((fiber, _) => {
        fiber.unsafeRemoveObserver(cb);
      })));
    }, this.id()));
  }
  inheritAll() {
    return Debug.untraced(() => core.withFiberRuntime((parentFiber, parentStatus) => {
      const parentFiberId = parentFiber.id();
      const parentFiberRefs = parentFiber.unsafeGetFiberRefs();
      const parentRuntimeFlags = parentStatus.runtimeFlags;
      const childFiberRefs = this.unsafeGetFiberRefs();
      const updatedFiberRefs = fiberRefs.joinAs(parentFiberRefs, parentFiberId, childFiberRefs);
      parentFiber.setFiberRefs(updatedFiberRefs);
      const updatedRuntimeFlags = parentFiber.getFiberRef(currentRuntimeFlags);
      const patch = RuntimeFlagsPatch.exclude(_runtimeFlags.WindDown)(
      // Do not inherit WindDown or Interruption!
      RuntimeFlagsPatch.exclude(_runtimeFlags.Interruption)(_runtimeFlags.diff(parentRuntimeFlags, updatedRuntimeFlags)));
      return core.updateRuntimeFlags(patch);
    }));
  }
  /**
   * Tentatively observes the fiber, but returns immediately if it is not
   * already done.
   */
  poll() {
    return Debug.untraced(() => core.sync(() => Option.fromNullable(this._exitValue)));
  }
  /**
   * Unsafely observes the fiber, but returns immediately if it is not
   * already done.
   */
  unsafePoll() {
    return this._exitValue;
  }
  /**
   * In the background, interrupts the fiber as if interrupted from the specified fiber.
   */
  interruptAsFork(fiberId) {
    return Debug.untraced(() => core.sync(() => this.tell(FiberMessage.interruptSignal(internalCause.interrupt(fiberId)))));
  }
  /**
   * Adds an observer to the list of observers.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeAddObserver(observer) {
    if (this._exitValue !== null) {
      observer(this._exitValue);
    } else {
      this._observers.push(observer);
    }
  }
  /**
   * Removes the specified observer from the list of observers that will be
   * notified when the fiber exits.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeRemoveObserver(observer) {
    this._observers = this._observers.filter(o => o !== observer);
  }
  /**
   * Retrieves all fiber refs of the fiber.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  unsafeGetFiberRefs() {
    this.setFiberRef(currentRuntimeFlags, this._runtimeFlags);
    return this._fiberRefs;
  }
  /**
   * Deletes the specified fiber ref.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeDeleteFiberRef(fiberRef) {
    this._fiberRefs = fiberRefs.delete_(this._fiberRefs, fiberRef);
  }
  /**
   * Retrieves the state of the fiber ref, or else its initial value.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getFiberRef(fiberRef) {
    return fiberRefs.getOrDefault(this._fiberRefs, fiberRef);
  }
  /**
   * Sets the fiber ref to the specified value.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRef(fiberRef, value) {
    this._fiberRefs = fiberRefs.updatedAs(this._fiberRefs, this._fiberId, fiberRef, value);
  }
  /**
   * Wholesale replaces all fiber refs of this fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRefs(fiberRefs) {
    this._fiberRefs = fiberRefs;
  }
  /**
   * Adds a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addChild(child) {
    this.getChildren().add(child);
  }
  /**
   * Removes a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  removeChild(child) {
    this.getChildren().delete(child);
  }
  /**
   * On the current thread, executes all messages in the fiber's inbox. This
   * method may return before all work is done, in the event the fiber executes
   * an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueOnCurrentThread() {
    let recurse = true;
    while (recurse) {
      let evaluationSignal = EvaluationSignalContinue;
      const prev = globalThis[internalFiber.currentFiberURI];
      globalThis[internalFiber.currentFiberURI] = this;
      try {
        while (evaluationSignal === EvaluationSignalContinue) {
          evaluationSignal = MutableQueue.isEmpty(this._queue) ? EvaluationSignalDone : this.evaluateMessageWhileSuspended(MutableQueue.poll(null)(this._queue));
        }
      } finally {
        this._running = false;
        globalThis[internalFiber.currentFiberURI] = prev;
      }
      // Maybe someone added something to the queue between us checking, and us
      // giving up the drain. If so, we need to restart the draining, but only
      // if we beat everyone else to the restart:
      if (!MutableQueue.isEmpty(this._queue) && !this._running) {
        this._running = true;
        if (evaluationSignal === EvaluationSignalYieldNow) {
          this.drainQueueLaterOnExecutor();
          recurse = false;
        } else {
          recurse = true;
        }
      } else {
        recurse = false;
      }
    }
  }
  /**
   * Schedules the execution of all messages in the fiber's inbox.
   *
   * This method will return immediately after the scheduling
   * operation is completed, but potentially before such messages have been
   * executed.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueLaterOnExecutor() {
    this.getFiberRef(core.currentScheduler).scheduleTask(this.run);
  }
  /**
   * Drains the fiber's message queue while the fiber is actively running,
   * returning the next effect to execute, which may be the input effect if no
   * additional effect needs to be executed.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueWhileRunning(runtimeFlags, cur0) {
    let cur = cur0;
    while (!MutableQueue.isEmpty(this._queue)) {
      const message = MutableQueue.poll(void 0)(this._queue);
      // @ts-expect-error
      cur = drainQueueWhileRunningTable[message._tag](this, runtimeFlags, cur, message);
    }
    return cur;
  }
  /**
   * Determines if the fiber is interrupted.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  isInterrupted() {
    return !internalCause.isEmpty(this.getFiberRef(core.interruptedCause));
  }
  /**
   * Adds an interruptor to the set of interruptors that are interrupting this
   * fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addInterruptedCause(cause) {
    const oldSC = this.getFiberRef(core.interruptedCause);
    this.setFiberRef(core.interruptedCause, internalCause.sequential(oldSC, cause));
  }
  /**
   * Processes a new incoming interrupt signal.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  processNewInterruptSignal(cause) {
    this.addInterruptedCause(cause);
    this.sendInterruptSignalToAllChildren();
  }
  /**
   * Interrupts all children of the current fiber, returning an effect that will
   * await the exit of the children. This method will return null if the fiber
   * has no children.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  sendInterruptSignalToAllChildren() {
    if (this._children === null || this._children.size === 0) {
      return false;
    }
    let told = false;
    for (const child of this._children) {
      child.tell(FiberMessage.interruptSignal(internalCause.interrupt(this.id())));
      told = true;
    }
    return told;
  }
  /**
   * Interrupts all children of the current fiber, returning an effect that will
   * await the exit of the children. This method will return null if the fiber
   * has no children.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  interruptAllChildren() {
    if (this.sendInterruptSignalToAllChildren()) {
      const it = this._children.values();
      this._children = null;
      let isDone = false;
      const body = () => {
        const next = it.next();
        if (!next.done) {
          return core.asUnit(next.value.await());
        } else {
          return core.sync(() => {
            isDone = true;
          });
        }
      };
      return core.whileLoop(() => !isDone, () => body(), () => {
        //
      });
    }
    return null;
  }
  reportExitValue(exit) {
    if (_runtimeFlags.runtimeMetrics(this._runtimeFlags)) {
      const tags = this.getFiberRef(core.currentTags);
      switch (exit._tag) {
        case OpCodes.OP_SUCCESS:
          {
            fiberSuccesses.unsafeUpdate(1, tags);
            break;
          }
        case OpCodes.OP_FAILURE:
          {
            fiberFailures.unsafeUpdate(1, tags);
            break;
          }
      }
    }
  }
  setExitValue(exit) {
    this._exitValue = exit;
    if (_runtimeFlags.runtimeMetrics(this._runtimeFlags)) {
      const tags = this.getFiberRef(core.currentTags);
      const startTimeMillis = this.id().startTimeMillis;
      const endTimeMillis = new Date().getTime();
      fiberLifetimes.unsafeUpdate((endTimeMillis - startTimeMillis) / 1000.0, tags);
    }
    this.reportExitValue(exit);
    for (let i = this._observers.length - 1; i >= 0; i--) {
      this._observers[i](exit);
    }
  }
  getLoggers() {
    return this.getFiberRef(currentLoggers);
  }
  log(message, cause, overrideLogLevel) {
    const logLevel = Option.isSome(overrideLogLevel) ? overrideLogLevel.value : this.getFiberRef(core.currentLogLevel);
    const spans = this.getFiberRef(core.currentLogSpan);
    const annotations = this.getFiberRef(core.currentLogAnnotations);
    const loggers = this.getLoggers();
    const contextMap = this.unsafeGetFiberRefs();
    HashSet.forEach(logger => {
      logger.log(this.id(), logLevel, message, cause, contextMap, spans, annotations);
    })(loggers);
  }
  /**
   * Evaluates a single message on the current thread, while the fiber is
   * suspended. This method should only be called while evaluation of the
   * fiber's effect is suspended due to an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateMessageWhileSuspended(message) {
    switch (message._tag) {
      case FiberMessage.OP_YIELD_NOW:
        {
          return EvaluationSignalYieldNow;
        }
      case FiberMessage.OP_INTERRUPT_SIGNAL:
        {
          this.processNewInterruptSignal(message.cause);
          if (this._asyncInterruptor !== null) {
            this._asyncInterruptor(core.exitFailCause(message.cause));
            this._asyncInterruptor = null;
          }
          return EvaluationSignalContinue;
        }
      case FiberMessage.OP_RESUME:
        {
          this._asyncInterruptor = null;
          this._asyncBlockingOn = null;
          this.evaluateEffect(message.effect);
          return EvaluationSignalContinue;
        }
      case FiberMessage.OP_STATEFUL:
        {
          message.onFiber(this, this._exitValue !== null ? FiberStatus.done : FiberStatus.suspended(this._runtimeFlags, this._asyncBlockingOn));
          return EvaluationSignalContinue;
        }
      default:
        {
          return absurd(message);
        }
    }
  }
  /**
   * Evaluates an effect until completion, potentially asynchronously.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateEffect(effect0) {
    this.getSupervisor().onResume(this);
    try {
      let effect = _runtimeFlags.interruptible(this._runtimeFlags) && this.isInterrupted() ? core.exitFailCause(this.getInterruptedCause()) : effect0;
      while (effect !== null) {
        try {
          const exit = this.runLoop(effect);
          this._runtimeFlags = _runtimeFlags.enable(_runtimeFlags.WindDown)(this._runtimeFlags);
          const interruption = this.interruptAllChildren();
          if (interruption !== null) {
            effect = Debug.untraced(() => core.flatMap(interruption, () => exit));
          } else {
            if (MutableQueue.isEmpty(this._queue)) {
              // No more messages to process, so we will allow the fiber to end life:
              this.setExitValue(exit);
            } else {
              // There are messages, possibly added by the final op executed by
              // the fiber. To be safe, we should execute those now before we
              // allow the fiber to end life:
              this.tell(FiberMessage.resume(exit));
            }
            effect = null;
          }
        } catch (e) {
          if (core.isEffect(e)) {
            if (e._tag === OpCodes.OP_YIELD) {
              if (_runtimeFlags.cooperativeYielding(this._runtimeFlags)) {
                this.tell(FiberMessage.yieldNow());
                this.tell(FiberMessage.resume(core.exitUnit()));
                effect = null;
              } else {
                effect = core.exitUnit();
              }
            } else if (e._tag === OpCodes.OP_ASYNC) {
              // Terminate this evaluation, async resumption will continue evaluation:
              effect = null;
            }
          } else {
            throw e;
          }
        }
      }
    } finally {
      this.getSupervisor().onSuspend(this);
    }
  }
  /**
   * Begins execution of the effect associated with this fiber on the current
   * thread. This can be called to "kick off" execution of a fiber after it has
   * been created, in hopes that the effect can be executed synchronously.
   *
   * This is not the normal way of starting a fiber, but it is useful when the
   * express goal of executing the fiber is to synchronously produce its exit.
   */
  start(effect) {
    if (!this._running) {
      this._running = true;
      const prev = globalThis[internalFiber.currentFiberURI];
      globalThis[internalFiber.currentFiberURI] = this;
      try {
        this.evaluateEffect(effect);
      } finally {
        this._running = false;
        globalThis[internalFiber.currentFiberURI] = prev;
        // Because we're special casing `start`, we have to be responsible
        // for spinning up the fiber if there were new messages added to
        // the queue between the completion of the effect and the transition
        // to the not running state.
        if (!MutableQueue.isEmpty(this._queue)) {
          this.drainQueueLaterOnExecutor();
        }
      }
    } else {
      this.tell(FiberMessage.resume(effect));
    }
  }
  /**
   * Begins execution of the effect associated with this fiber on in the
   * background, and on the correct thread pool. This can be called to "kick
   * off" execution of a fiber after it has been created, in hopes that the
   * effect can be executed synchronously.
   */
  startFork(effect) {
    this.tell(FiberMessage.resume(effect));
  }
  /**
   * Takes the current runtime flags, patches them to return the new runtime
   * flags, and then makes any changes necessary to fiber state based on the
   * specified patch.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  patchRuntimeFlags(oldRuntimeFlags, patch) {
    const newRuntimeFlags = _runtimeFlags.patch(oldRuntimeFlags, patch);
    globalThis[internalFiber.currentFiberURI] = this;
    this._runtimeFlags = newRuntimeFlags;
    return newRuntimeFlags;
  }
  /**
   * Initiates an asynchronous operation, by building a callback that will
   * resume execution, and then feeding that callback to the registration
   * function, handling error cases and repeated resumptions appropriately.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  initiateAsync(runtimeFlags, asyncRegister) {
    let alreadyCalled = false;
    const callback = effect => {
      if (!alreadyCalled) {
        alreadyCalled = true;
        this.tell(FiberMessage.resume(effect));
      }
    };
    if (_runtimeFlags.interruptible(runtimeFlags)) {
      this._asyncInterruptor = callback;
    }
    try {
      asyncRegister(callback);
    } catch (e) {
      callback(core.failCause(internalCause.die(e)));
    }
  }
  pushStack(cont) {
    this._stack.push(cont);
    if ("trace" in cont && cont.trace) {
      this._traceStack.push(cont.trace);
    }
  }
  popStack() {
    const item = this._stack.pop();
    if (item) {
      if ("trace" in item && item.trace) {
        this._traceStack.pop();
      }
      return item;
    }
    return;
  }
  getNextSuccessCont() {
    let frame = this.popStack();
    while (frame) {
      if (frame._tag !== OpCodes.OP_ON_FAILURE && frame._tag !== OpCodes.OP_TRACED) {
        return frame;
      }
      frame = this.popStack();
    }
  }
  getNextFailCont() {
    let frame = this.popStack();
    while (frame) {
      if (frame._tag !== OpCodes.OP_ON_SUCCESS && frame._tag !== OpCodes.OP_WHILE && frame._tag !== OpCodes.OP_TRACED) {
        return frame;
      }
      frame = this.popStack();
    }
  }
  [(_a = internalFiber.FiberTypeId, _b = internalFiber.RuntimeFiberTypeId, OpCodes.OP_SYNC)](op) {
    const value = op.i0();
    const cont = this.getNextSuccessCont();
    if (cont !== undefined) {
      if (!(cont._tag in contOpSuccess)) {
        // @ts-expect-error
        absurd(cont);
      }
      // @ts-expect-error
      return contOpSuccess[cont._tag](this, cont, value);
    } else {
      throw core.exitSucceed(value);
    }
  }
  [OpCodes.OP_SUCCESS](op) {
    const oldCur = op;
    const cont = this.getNextSuccessCont();
    if (cont !== undefined) {
      if (!(cont._tag in contOpSuccess)) {
        // @ts-expect-error
        absurd(cont);
      }
      // @ts-expect-error
      return contOpSuccess[cont._tag](this, cont, oldCur.i0);
    } else {
      throw oldCur;
    }
  }
  [OpCodes.OP_FAILURE](op) {
    let cause = op.i0;
    if (internalCause.isAnnotatedType(cause) && internalCause.isStackAnnotation(cause.annotation)) {
      const stack = cause.annotation.stack;
      const currentStack = this.stackToLines();
      cause = internalCause.annotated(cause.cause, new internalCause.StackAnnotation(Chunk.take(Debug.runtimeDebug.traceStackLimit)(Chunk.dedupeAdjacent(stack.length === 0 ? currentStack : currentStack.length === 0 ? stack : Chunk.unsafeLast(stack) === Chunk.unsafeLast(currentStack) ? stack : Chunk.concat(currentStack)(stack))), cause.annotation.seq));
    } else {
      cause = internalCause.annotated(op.i0, new internalCause.StackAnnotation(this.stackToLines(), MRef.getAndIncrement(internalCause.globalErrorSeq)));
    }
    const cont = this.getNextFailCont();
    if (cont !== undefined) {
      switch (cont._tag) {
        case OpCodes.OP_ON_FAILURE:
        case OpCodes.OP_ON_SUCCESS_AND_FAILURE:
          {
            if (!(_runtimeFlags.interruptible(this._runtimeFlags) && this.isInterrupted())) {
              return cont.i1(cause);
            } else {
              return core.exitFailCause(internalCause.stripFailures(cause));
            }
          }
        case OpCodes.OP_REVERT_FLAGS:
          {
            this.patchRuntimeFlags(this._runtimeFlags, cont.patch);
            if (_runtimeFlags.interruptible(this._runtimeFlags) && this.isInterrupted()) {
              return core.exitFailCause(internalCause.sequential(cause, this.getInterruptedCause()));
            } else {
              return core.exitFailCause(cause);
            }
          }
        default:
          {
            absurd(cont);
          }
      }
    } else {
      throw core.exitFailCause(cause);
    }
  }
  [OpCodes.OP_WITH_RUNTIME](op) {
    return op.i0(this, FiberStatus.running(this._runtimeFlags));
  }
  [OpCodes.OP_UPDATE_RUNTIME_FLAGS](op) {
    if (op.i1 === undefined) {
      this.patchRuntimeFlags(this._runtimeFlags, op.i0);
      return core.exitUnit();
    } else {
      const updateFlags = op.i0;
      const oldRuntimeFlags = this._runtimeFlags;
      const newRuntimeFlags = _runtimeFlags.patch(oldRuntimeFlags, updateFlags);
      if (newRuntimeFlags === oldRuntimeFlags) {
        // No change, short circuit
        return op.i1(oldRuntimeFlags);
      } else {
        // One more chance to short circuit: if we're immediately going
        // to interrupt. Interruption will cause immediate reversion of
        // the flag, so as long as we "peek ahead", there's no need to
        // set them to begin with.
        if (_runtimeFlags.interruptible(newRuntimeFlags) && this.isInterrupted()) {
          return core.exitFailCause(this.getInterruptedCause());
        } else {
          // Impossible to short circuit, so record the changes
          this.patchRuntimeFlags(this._runtimeFlags, updateFlags);
          // Since we updated the flags, we need to revert them
          const revertFlags = _runtimeFlags.diff(newRuntimeFlags, oldRuntimeFlags);
          this.pushStack(new core.RevertFlags(revertFlags));
          return op.i1(oldRuntimeFlags);
        }
      }
    }
  }
  [OpCodes.OP_ON_SUCCESS](op) {
    this.pushStack(op);
    return op.i0;
  }
  [OpCodes.OP_TRACED](op) {
    this.pushStack(op);
    return op.i0;
  }
  [OpCodes.OP_ON_FAILURE](op) {
    this.pushStack(op);
    return op.i0;
  }
  [OpCodes.OP_ON_SUCCESS_AND_FAILURE](op) {
    this.pushStack(op);
    return op.i0;
  }
  [OpCodes.OP_ASYNC](op) {
    this._asyncBlockingOn = op.i1;
    this.initiateAsync(this._runtimeFlags, op.i0);
    throw op;
  }
  [OpCodes.OP_YIELD](op) {
    throw op;
  }
  [OpCodes.OP_WHILE](op) {
    const check = op.i0;
    const body = op.i1;
    if (check()) {
      this.pushStack(op);
      return body();
    } else {
      return core.exitUnit();
    }
  }
  [OpCodes.OP_COMMIT](op) {
    return op.commit();
  }
  /**
   * The main run-loop for evaluating effects.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  runLoop(effect0) {
    let cur = effect0;
    let ops = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (_runtimeFlags.opSupervision(this._runtimeFlags)) {
        this.getSupervisor().onEffect(this, cur);
      }
      cur = this.drainQueueWhileRunning(this._runtimeFlags, cur);
      ops += 1;
      if (ops >= 2048) {
        ops = 0;
        const oldCur = cur;
        cur = core.flatMap(() => oldCur)(core.yieldNow());
      }
      try {
        if (!(cur._tag in this)) {
          // @ts-expect-error
          absurd(cur);
        }
        // @ts-expect-error
        cur = this[cur._tag](cur);
      } catch (e) {
        if (core.isEffect(e)) {
          if (e._tag === OpCodes.OP_YIELD || e._tag === OpCodes.OP_ASYNC) {
            throw e;
          }
          if (e._tag === OpCodes.OP_SUCCESS || e._tag === OpCodes.OP_FAILURE) {
            return e;
          }
        } else {
          if (core.isEffectError(e)) {
            cur = core.exitFailCause(e.cause);
          } else if (internalCause.isInterruptedException(e)) {
            cur = core.exitFailCause(internalCause.sequential(internalCause.die(e), internalCause.interrupt(FiberId.none)));
          } else {
            cur = core.exitFailCause(internalCause.die(e));
          }
        }
      }
    }
  }
  stackToLines() {
    if (this._traceStack.length === 0) {
      return Chunk.empty();
    }
    const lines = [];
    let current = this._traceStack.length - 1;
    while (current >= 0 && lines.length < Debug.runtimeDebug.traceStackLimit) {
      const value = this._traceStack[current];
      lines.push(value);
      current = current - 1;
    }
    return Chunk.unsafeFromArray(lines);
  }
}
// circular with Logger
/** @internal */
exports.FiberRuntime = FiberRuntime;
const currentMinimumLogLevel = /*#__PURE__*/core.fiberRefUnsafeMake( /*#__PURE__*/LogLevel.fromLiteral(Debug.runtimeDebug.minumumLogLevel));
/** @internal */
exports.currentMinimumLogLevel = currentMinimumLogLevel;
const defaultLogger = /*#__PURE__*/internalLogger.makeLogger((fiberId, logLevel, message, cause, context, spans, annotations) => {
  const formatted = internalLogger.stringLogger.log(fiberId, logLevel, message, cause, context, spans, annotations);
  const filter = fiberRefs.getOrDefault(context, currentMinimumLogLevel);
  if (LogLevel.greaterThanEqual(filter)(logLevel)) {
    globalThis.console.log(formatted);
  }
});
/** @internal */
exports.defaultLogger = defaultLogger;
const logFmtLogger = /*#__PURE__*/internalLogger.makeLogger((fiberId, logLevel, message, cause, context, spans, annotations) => {
  const formatted = internalLogger.logfmtLogger.log(fiberId, logLevel, message, cause, context, spans, annotations);
  const filter = fiberRefs.getOrDefault(context, currentMinimumLogLevel);
  if (LogLevel.greaterThanEqual(filter)(logLevel)) {
    globalThis.console.log(formatted);
  }
});
/** @internal */
exports.logFmtLogger = logFmtLogger;
const currentLoggers = /*#__PURE__*/core.fiberRefUnsafeMakeHashSet( /*#__PURE__*/HashSet.make(defaultLogger));
// circular with Effect
/* @internal */
exports.currentLoggers = currentLoggers;
const acquireRelease = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (acquire, release) => core.uninterruptible(core.tap(acquire, a => addFinalizer(exit => restore(release)(a, exit)))).traced(trace));
/* @internal */
exports.acquireRelease = acquireRelease;
const addFinalizer = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => finalizer => core.flatMap(core.context(), context => core.flatMap(scope(), scope => core.scopeAddFinalizerExit(scope, exit => core.asUnit(core.provideContext(context)(restore(finalizer)(exit)))))).traced(trace));
/* @internal */
exports.addFinalizer = addFinalizer;
const collect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.map(Chunk.compact)(core.forEach(elements, a => unsome(restore(f)(a)))).traced(trace));
/* @internal */
exports.collect = collect;
const collectPar = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.map(Chunk.compact)(forEachPar(elements, a => unsome(restore(f)(a)))).traced(trace));
/* @internal */
exports.collectPar = collectPar;
const collectAllPar = /*#__PURE__*/Debug.methodWithTrace(trace => effects => forEachPar(effects, _Function.identity).traced(trace));
/* @internal */
exports.collectAllPar = collectAllPar;
const collectAllParDiscard = /*#__PURE__*/Debug.methodWithTrace(trace => effects => forEachParDiscard(effects, _Function.identity).traced(trace));
/* @internal */
exports.collectAllParDiscard = collectAllParDiscard;
const collectAllSuccessesPar = /*#__PURE__*/Debug.methodWithTrace(trace => elements => collectAllWithPar(Array.from(elements).map(core.exit), exit => core.exitIsSuccess(exit) ? Option.some(exit.i0) : Option.none()).traced(trace));
/* @internal */
exports.collectAllSuccessesPar = collectAllSuccessesPar;
const collectAllWithPar = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, pf) => core.map(collectAllPar(elements), Chunk.filterMap(restore(pf))).traced(trace));
/* @internal */
exports.collectAllWithPar = collectAllWithPar;
const daemonChildren = /*#__PURE__*/Debug.methodWithTrace(trace => self => {
  const forkScope = core.fiberRefLocally(core.forkScopeOverride, Option.some(fiberScope.globalScope));
  return forkScope(self).traced(trace);
});
/** @internal */
exports.daemonChildren = daemonChildren;
const _existsParFound = /*#__PURE__*/Symbol("@effect/io/Effect/existsPar/found");
/* @internal */
const existsPar = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.matchEffect(forEachPar(elements, a => core.ifEffect(restore(f)(a), core.fail(_existsParFound), core.unit())), e => e === _existsParFound ? core.succeed(true) : core.fail(e), () => core.succeed(false)).traced(trace));
/* @internal */
exports.existsPar = existsPar;
const filterPar = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.map(Chunk.compact)(forEachPar(elements, a => core.map(restore(f)(a), b => b ? Option.some(a) : Option.none()))).traced(trace));
/* @internal */
exports.filterPar = filterPar;
const filterNotPar = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => filterPar(elements, a => core.map(restore(f)(a), b => !b)).traced(trace));
/* @internal */
exports.filterNotPar = filterNotPar;
const forEachExec = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (elements, f, strategy) => core.suspend(() => ExecutionStrategy.match(() => core.forEach(restore(f))(elements), () => core.withParallelismUnbounded(forEachPar(restore(f))(elements)), parallelism => core.withParallelism(parallelism)(forEachPar(restore(f))(elements)))(strategy)).traced(trace));
/* @internal */
exports.forEachExec = forEachExec;
const forEachPar = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.fiberRefGetWith(core.currentParallelism, o => o._tag === "None" ? forEachParUnbounded(self, restore(f)) : forEachParN(self, o.value, f)).traced(trace));
/* @internal */
exports.forEachPar = forEachPar;
const forEachParDiscard = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.fiberRefGetWith(core.currentParallelism, o => o._tag === "None" ? forEachParUnboundedDiscard(self, restore(f)) : forEachParNDiscard(self, o.value, f)).traced(trace));
/* @internal */
exports.forEachParDiscard = forEachParDiscard;
const forEachParUnbounded = (self, f) => core.suspend(() => {
  const as = Array.from(self).map((v, i) => [v, i]);
  const array = new Array(as.length);
  const fn = ([a, i]) => core.flatMap(f(a), b => core.sync(() => array[i] = b));
  return core.zipRight(forEachParUnboundedDiscard(as, fn), core.succeed(Chunk.unsafeFromArray(array)));
});
/* @internal */
const forEachParUnboundedDiscard = (self, f) => core.suspend(() => {
  const as = Array.from(self);
  const size = as.length;
  if (size === 0) {
    return core.unit();
  } else if (size === 1) {
    return core.asUnit(f(as[0]));
  }
  return core.uninterruptibleMask(restore => {
    const deferred = core.deferredUnsafeMake(FiberId.none);
    let ref = 0;
    const process = core.transplant(graft => core.forEach(as, a => forkDaemon(graft(core.matchCauseEffect(cause => core.zipRight(core.deferredFail(deferred, void 0), core.failCause(cause)), () => {
      if (ref + 1 === size) {
        core.deferredUnsafeDone(deferred, core.unit());
      } else {
        ref = ref + 1;
      }
      return core.unit();
    })(restore(core.suspend(() => f(a))))))));
    return core.flatMap(process, fibers => core.matchCauseEffect(restore(core.deferredAwait(deferred)), cause => core.flatMap(forEachParUnbounded(fibers, core.interruptFiber), exits => {
      const exit = core.exitCollectAllPar(exits);
      if (exit._tag === "Some" && core.exitIsFailure(exit.value)) {
        return core.failCause(internalCause.parallel(internalCause.stripFailures(cause), exit.value.i0));
      } else {
        return core.failCause(internalCause.stripFailures(cause));
      }
    }), () => core.forEachDiscard(fibers, f => f.inheritAll())));
  });
});
/* @internal */
const forEachParN = (self, n, f) => core.suspend(() => {
  const as = Array.from(self).map((v, i) => [v, i]);
  const array = new Array(as.length);
  const fn = ([a, i]) => core.map(f(a), b => array[i] = b);
  return core.zipRight(forEachParNDiscard(as, n, fn), core.succeed(Chunk.unsafeFromArray(array)));
});
/* @internal */
const forEachParNDiscard = (self, n, f) => core.suspend(() => {
  const iterator = self[Symbol.iterator]();
  const worker = core.flatMap(core.sync(() => iterator.next()), next => next.done ? core.unit() : core.flatMap(core.asUnit(f(next.value)), () => worker));
  const effects = [];
  for (let i = 0; i < n; i++) {
    effects.push(worker);
  }
  return forEachParUnboundedDiscard(effects, _Function.identity);
});
/* @internal */
const forEachParWithIndex = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.suspend(() => core.flatMap(core.sync(() => []), array => core.map(forEachParDiscard(Array.from(elements).map((a, i) => [a, i]), ([a, i]) => core.flatMap(core.suspend(() => restore(f)(a, i)), b => core.sync(() => {
  array[i] = b;
}))), () => Chunk.unsafeFromArray(array)))).traced(trace));
/* @internal */
exports.forEachParWithIndex = forEachParWithIndex;
const fork = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.withFiberRuntime((state, status) => core.succeed(unsafeFork(self, state, status.runtimeFlags))).traced(trace));
/* @internal */
exports.fork = fork;
const forkAllDiscard = /*#__PURE__*/Debug.methodWithTrace(trace => effects => core.forEachDiscard(effects, fork).traced(trace));
/* @internal */
exports.forkAllDiscard = forkAllDiscard;
const forkDaemon = /*#__PURE__*/Debug.methodWithTrace(trace => self => forkWithScopeOverride(self, fiberScope.globalScope).traced(trace));
/* @internal */
exports.forkDaemon = forkDaemon;
const forkWithErrorHandler = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, handler) => fork(core.onError(self, cause => {
  const either = internalCause.failureOrCause(cause);
  switch (either._tag) {
    case "Left":
      {
        return restore(handler)(either.left);
      }
    case "Right":
      {
        return core.failCause(either.right);
      }
  }
})).traced(trace));
/** @internal */
exports.forkWithErrorHandler = forkWithErrorHandler;
const unsafeFork = (effect, parentFiber, parentRuntimeFlags, overrideScope = null) => {
  const childFiber = unsafeMakeChildFiber(effect, parentFiber, parentRuntimeFlags, overrideScope);
  childFiber.resume(effect);
  return childFiber;
};
/** @internal */
exports.unsafeFork = unsafeFork;
const unsafeMakeChildFiber = (effect, parentFiber, parentRuntimeFlags, overrideScope = null) => {
  const childId = FiberId.unsafeMake();
  const parentFiberRefs = parentFiber.unsafeGetFiberRefs();
  const childFiberRefs = fiberRefs.forkAs(parentFiberRefs, childId);
  const childFiber = new FiberRuntime(childId, childFiberRefs, parentRuntimeFlags);
  const childContext = fiberRefs.getOrDefault(childFiberRefs, core.currentContext);
  const supervisor = childFiber.getSupervisor();
  supervisor.onStart(childContext, effect, Option.some(parentFiber), childFiber);
  childFiber.unsafeAddObserver(exit => supervisor.onEnd(exit, childFiber));
  const parentScope = overrideScope !== null ? overrideScope : Option.getOrElse(() => parentFiber.scope())(parentFiber.getFiberRef(core.forkScopeOverride));
  parentScope.add(parentRuntimeFlags, childFiber);
  return childFiber;
};
/* @internal */
exports.unsafeMakeChildFiber = unsafeMakeChildFiber;
const forkWithScopeOverride = (self, scopeOverride) => core.withFiberRuntime((parentFiber, parentStatus) => core.succeed(unsafeFork(self, parentFiber, parentStatus.runtimeFlags, scopeOverride)));
/* @internal */
const mergeAllPar = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (elements, zero, f) => core.flatMap(Ref.make(zero), acc => core.flatMap(forEachParDiscard(elements, core.flatMap(a => Ref.update(acc, b => restore(f)(b, a)))), () => Ref.get(acc))).traced(trace));
/* @internal */
exports.mergeAllPar = mergeAllPar;
const onDone = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restoreTrace) => (self, onError, onSuccess) => core.uninterruptibleMask(restore => core.asUnit(forkDaemon(core.matchEffect(restore(self), e => restore(restoreTrace(onError)(e)), a => restore(restoreTrace(onSuccess)(a))))).traced(trace)));
/* @internal */
exports.onDone = onDone;
const onDoneCause = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restoreTrace) => (self, onCause, onSuccess) => core.uninterruptibleMask(restore => core.asUnit(forkDaemon(core.matchCauseEffect(restore(self), c => restore(restoreTrace(onCause)(c)), a => restore(restoreTrace(onSuccess)(a)))))).traced(trace));
/* @internal */
exports.onDoneCause = onDoneCause;
const partitionPar = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.map(chunk => core.partitionMap(chunk, _Function.identity))(forEachPar(elements, a => core.either(restore(f)(a)))).traced(trace));
/* @internal */
exports.partitionPar = partitionPar;
const raceAll = /*#__PURE__*/Debug.methodWithTrace(trace => all => {
  const list = Chunk.fromIterable(all);
  if (!Chunk.isNonEmpty(list)) {
    return core.dieSync(() => internalCause.IllegalArgumentException(`Received an empty collection of effects`));
  }
  const self = Chunk.headNonEmpty(list);
  const effects = Chunk.tailNonEmpty(list);
  const inheritAll = res => core.as(res[0])(internalFiber.inheritAll(res[1]));
  return core.flatMap(done => core.flatMap(fails => core.uninterruptibleMask(restore => core.flatMap(head => core.flatMap(fibers => core.onInterrupt(() => Chunk.reduce(core.unit(), (effect, fiber) => core.zipLeft(core.interruptFiber(fiber))(effect))(fibers))(restore(core.flatMap(inheritAll)(Deferred.await(done)))))(core.tap(fibers => Chunk.reduce(core.unit(), (effect, fiber) => core.zipRight(core.asUnit(fork(core.flatMap(raceAllArbiter(fibers, fiber, done, fails))(internalFiber._await(fiber)))))(effect))(fibers))(core.map(tail => Chunk.prepend(head)(tail))(core.forEach(effect => fork(core.interruptible(effect)))(effects)))))(fork(core.interruptible(self)))))(Ref.make(effects.length)))(core.deferredMake()).traced(trace);
});
/* @internal */
exports.raceAll = raceAll;
const raceAllArbiter = (fibers, winner, deferred, fails) => exit => core.exitMatchEffect(cause => core.flatten(Ref.modify(fails, fails => [fails === 0 ? core.asUnit(core.deferredFailCause(deferred, cause)) : core.unit(), fails - 1])), value => core.flatMap(set => set ? Chunk.reduce(core.unit(), (effect, fiber) => fiber === winner ? effect : core.zipLeft(core.interruptFiber(fiber))(effect))(fibers) : core.unit())(core.deferredSucceed(deferred, [value, winner])))(exit);
/* @internal */
const reduceAllPar = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (elements, zero, f) => core.suspend(() => core.map(option => {
  switch (option._tag) {
    case "None":
      {
        throw new Error("BUG: Effect.reduceAllPar - please report an issue at https://github.com/Effect-TS/io/issues");
      }
    case "Some":
      {
        return option.value;
      }
  }
})(mergeAllPar([zero, ...Array.from(elements)], Option.none(), (acc, elem) => {
  switch (acc._tag) {
    case "None":
      {
        return Option.some(elem);
      }
    case "Some":
      {
        return Option.some(restore(f)(acc.value, elem));
      }
  }
}))).traced(trace));
/* @internal */
exports.reduceAllPar = reduceAllPar;
const parallelFinalizers = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.flatMap(scope(), outerScope => core.flatMap(scopeMake(ExecutionStrategy.parallel), innerScope => core.zipRight(scopeExtend(innerScope)(self))(outerScope.addFinalizer(exit => innerScope.close(exit))))).traced(trace));
/* @internal */
exports.parallelFinalizers = parallelFinalizers;
const scope = /*#__PURE__*/Debug.methodWithTrace(trace => () => core.service(scopeTag).traced(trace));
/* @internal */
exports.scope = scope;
const scopeWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.serviceWithEffect(scopeTag, restore(f)).traced(trace));
/* @internal */
exports.scopeWith = scopeWith;
const scopedEffect = /*#__PURE__*/Debug.methodWithTrace(trace => effect => core.flatMap(scopeMake(), scope => scopeUse(scope)(effect)).traced(trace));
/* @internal */
exports.scopedEffect = scopedEffect;
const sequentialFinalizers = /*#__PURE__*/Debug.methodWithTrace(trace => self => scopeWith(scope => core.flatMap(scope => scopeExtend(scope)(self))(core.scopeFork(scope, ExecutionStrategy.sequential))).traced(trace));
/* @internal */
exports.sequentialFinalizers = sequentialFinalizers;
const some = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.matchEffect(self, e => core.fail(Option.some(e)), option => {
  switch (option._tag) {
    case "None":
      {
        return core.fail(Option.none());
      }
    case "Some":
      {
        return core.succeed(option.value);
      }
  }
}).traced(trace));
/* @internal */
exports.some = some;
const someWith = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.suspend(() => unsome(restore(f)(some(self)))).traced(trace));
/* @internal */
exports.someWith = someWith;
const allPar = /*#__PURE__*/Debug.methodWithTrace(trace => function () {
  if (arguments.length === 1) {
    if (core.isEffect(arguments[0])) {
      return core.map(arguments[0], x => [x]);
    } else if (Array.isArray(arguments[0])) {
      return core.map(collectAllPar(arguments[0]), Chunk.toReadonlyArray).traced(trace);
    } else {
      return core.map(values => {
        const res = {};
        for (const [k, v] of values) {
          ;
          res[k] = v;
        }
        return res;
      })(forEachPar(Object.entries(arguments[0]), ([_, e]) => core.map(e, a => [_, a]))).traced(trace);
    }
  }
  return core.map(collectAllPar(arguments), Chunk.toReadonlyArray).traced(trace);
});
/* @internal */
exports.allPar = allPar;
const taggedScoped = /*#__PURE__*/Debug.methodWithTrace(trace => (key, value) => taggedScopedWithLabels([metricLabel.make(key, value)]).traced(trace));
/* @internal */
exports.taggedScoped = taggedScoped;
const taggedScopedWithLabels = /*#__PURE__*/Debug.methodWithTrace(trace => labels => taggedScopedWithLabelSet(HashSet.fromIterable(labels)).traced(trace));
/* @internal */
exports.taggedScopedWithLabels = taggedScopedWithLabels;
const taggedScopedWithLabelSet = /*#__PURE__*/Debug.methodWithTrace(trace => labels => fiberRefLocallyScopedWith(core.currentTags, set => HashSet.union(labels)(set)).traced(trace));
/* @internal */
exports.taggedScopedWithLabelSet = taggedScopedWithLabelSet;
const using = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, use) => core.acquireUseRelease(scopeMake(), scope => core.flatMap(restore(use))(scopeExtend(scope)(self)), (scope, exit) => core.scopeClose(scope, exit)).traced(trace));
/* @internal */
exports.using = using;
const unsome = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.matchEffect(self, option => {
  switch (option._tag) {
    case "None":
      {
        return core.succeed(Option.none());
      }
    case "Some":
      {
        return core.fail(option.value);
      }
  }
}, a => core.succeed(Option.some(a))).traced(trace));
/* @internal */
exports.unsome = unsome;
const validateAllPar = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.flatMap(partitionPar(elements, restore(f)), ([es, bs]) => Chunk.isEmpty(es) ? core.succeed(bs) : core.fail(es)).traced(trace));
/* @internal */
exports.validateAllPar = validateAllPar;
const validateAllParDiscard = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.flatMap(partitionPar(elements, restore(f)), ([es, _]) => Chunk.isEmpty(es) ? core.unit() : core.fail(es)).traced(trace));
/* @internal */
exports.validateAllParDiscard = validateAllParDiscard;
const validateFirstPar = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.flip(forEachPar(elements, a => core.flip(restore(f)(a)))).traced(trace));
/* @internal */
exports.validateFirstPar = validateFirstPar;
const withClockScoped = /*#__PURE__*/Debug.methodWithTrace(trace => value => fiberRefLocallyScopedWith(defaultServices.currentServices, Context.add(clock.clockTag, value)).traced(trace));
/* @internal */
exports.withClockScoped = withClockScoped;
const withConfigProviderScoped = /*#__PURE__*/Debug.methodWithTrace(trace => value => fiberRefLocallyScopedWith(defaultServices.currentServices, Context.add(_configProvider.configProviderTag, value)).traced(trace));
/* @internal */
exports.withConfigProviderScoped = withConfigProviderScoped;
const withEarlyRelease = /*#__PURE__*/Debug.methodWithTrace(trace => self => scopeWith(parent => core.flatMap(core.scopeFork(parent, ExecutionStrategy.sequential), child => core.map(value => [core.fiberIdWith(fiberId => core.scopeClose(child, core.exitInterrupt(fiberId))), value])(scopeExtend(child)(self)))).traced(trace));
/* @internal */
exports.withEarlyRelease = withEarlyRelease;
const withRuntimeFlagsScoped = /*#__PURE__*/Debug.methodWithTrace(trace => update => {
  if (update === RuntimeFlagsPatch.empty) {
    return core.unit();
  }
  return core.uninterruptible(core.flatMap(runtimeFlags => {
    const updatedRuntimeFlags = _runtimeFlags.patch(runtimeFlags, update);
    const revertRuntimeFlags = _runtimeFlags.diff(updatedRuntimeFlags, runtimeFlags);
    return core.asUnit(core.zipRight(addFinalizer(() => core.updateRuntimeFlags(revertRuntimeFlags)))(core.updateRuntimeFlags(update)));
  })(core.runtimeFlags())).traced(trace);
});
// circular with ReleaseMap
/* @internal */
exports.withRuntimeFlagsScoped = withRuntimeFlagsScoped;
const releaseMapReleaseAll = (strategy, exit) => self => core.suspend(() => {
  switch (self.state._tag) {
    case "Exited":
      {
        return core.unit();
      }
    case "Running":
      {
        const finalizersMap = self.state.finalizers;
        const update = self.state.update;
        const finalizers = Array.from(finalizersMap.keys()).sort((a, b) => b - a).map(key => finalizersMap.get(key));
        self.state = {
          _tag: "Exited",
          nextKey: self.state.nextKey,
          exit,
          update
        };
        return ExecutionStrategy.isSequential(strategy) ? core.flatMap(results => Option.getOrElse(() => core.exitUnit())(Option.map(core.exitAsUnit)(core.exitCollectAll(results))))(core.forEach(fin => core.exit(update(fin)(exit)))(finalizers)) : ExecutionStrategy.isParallel(strategy) ? core.flatMap(results => Option.getOrElse(() => core.exitUnit())(Option.map(core.exitAsUnit)(core.exitCollectAllPar(results))))(forEachPar(fin => core.exit(update(fin)(exit)))(finalizers)) : core.withParallelism(strategy.parallelism)(core.flatMap(results => Option.getOrElse(() => core.exitUnit())(Option.map(core.exitAsUnit)(core.exitCollectAllPar(results))))(forEachPar(fin => core.exit(update(fin)(exit)))(finalizers)));
      }
  }
});
// circular with Scope
/** @internal */
exports.releaseMapReleaseAll = releaseMapReleaseAll;
const scopeTag = /*#__PURE__*/Context.Tag();
/* @internal */
exports.scopeTag = scopeTag;
const scopeMake = /*#__PURE__*/Debug.methodWithTrace(trace => (strategy = ExecutionStrategy.sequential) => core.map(core.releaseMapMake(), rm => ({
  [core.ScopeTypeId]: core.ScopeTypeId,
  [core.CloseableScopeTypeId]: core.CloseableScopeTypeId,
  fork: strategy => Debug.bodyWithTrace(trace => core.uninterruptible(core.flatMap(scope => core.as(scope)(core.tap(fin => core.scopeAddFinalizerExit(scope, fin))(core.releaseMapAdd(exit => core.scopeClose(scope, exit))(rm))))(scopeMake(strategy))).traced(trace)),
  close: exit => Debug.bodyWithTrace(trace => core.asUnit(releaseMapReleaseAll(strategy, exit)(rm)).traced(trace)),
  addFinalizer: fin => Debug.bodyWithTrace(trace => core.asUnit(core.releaseMapAdd(fin)(rm)).traced(trace))
})).traced(trace));
/* @internal */
exports.scopeMake = scopeMake;
const scopeExtend = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, scope) => core.contramapContext(effect,
// @ts-expect-error
Context.merge(Context.make(scopeTag, scope))).traced(trace));
/* @internal */
exports.scopeExtend = scopeExtend;
const scopeUse = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, scope) => core.onExit(exit => scope.close(exit))(scopeExtend(scope)(effect)).traced(trace));
// circular with Supervisor
/** @internal */
exports.scopeUse = scopeUse;
const fiberRefUnsafeMakeSupervisor = initial => core.fiberRefUnsafeMakePatch(initial, SupervisorPatch.differ, SupervisorPatch.empty);
// circular with FiberRef
/* @internal */
exports.fiberRefUnsafeMakeSupervisor = fiberRefUnsafeMakeSupervisor;
const fiberRefLocallyScoped = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => core.asUnit(acquireRelease(core.flatMap(oldValue => core.as(oldValue)(core.fiberRefSet(self, value)))(core.fiberRefGet(self)), oldValue => core.fiberRefSet(self, oldValue))).traced(trace));
/* @internal */
exports.fiberRefLocallyScoped = fiberRefLocallyScoped;
const fiberRefLocallyScopedWith = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.fiberRefGetWith(self, a => fiberRefLocallyScoped(self, restore(f)(a))).traced(trace));
/* @internal */
exports.fiberRefLocallyScopedWith = fiberRefLocallyScopedWith;
const fiberRefMake = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (initial, fork = _Function.identity, join = (_, a) => a) => fiberRefMakeWith(() => core.fiberRefUnsafeMake(initial, restore(fork), restore(join))).traced(trace));
/* @internal */
exports.fiberRefMake = fiberRefMake;
const fiberRefMakeWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => ref => acquireRelease(core.tap(core.sync(restore(ref)), ref => core.fiberRefUpdate(ref, _Function.identity)), fiberRef => core.fiberRefDelete(fiberRef)).traced(trace));
/* @internal */
exports.fiberRefMakeWith = fiberRefMakeWith;
const fiberRefMakeContext = /*#__PURE__*/Debug.methodWithTrace(trace => initial => fiberRefMakeWith(() => core.fiberRefUnsafeMakeContext(initial)).traced(trace));
/* @internal */
exports.fiberRefMakeContext = fiberRefMakeContext;
const fiberRefMakeRuntimeFlags = /*#__PURE__*/Debug.methodWithTrace(trace => initial => fiberRefMakeWith(() => core.fiberRefUnsafeMakeRuntimeFlags(initial)).traced(trace));
/** @internal */
exports.fiberRefMakeRuntimeFlags = fiberRefMakeRuntimeFlags;
const currentRuntimeFlags = /*#__PURE__*/core.fiberRefUnsafeMakeRuntimeFlags(_runtimeFlags.none);
/** @internal */
exports.currentRuntimeFlags = currentRuntimeFlags;
const currentSupervisor = /*#__PURE__*/fiberRefUnsafeMakeSupervisor(supervisor.none);
// circular with Fiber
/* @internal */
exports.currentSupervisor = currentSupervisor;
const fiberAwaitAll = /*#__PURE__*/Debug.methodWithTrace(trace => fibers => core.asUnit(internalFiber._await(fiberCollectAll(fibers))).traced(trace));
/** @internal */
exports.fiberAwaitAll = fiberAwaitAll;
const fiberCollectAll = fibers => ({
  [internalFiber.FiberTypeId]: internalFiber.fiberVariance,
  id: () => Array.from(fibers).reduce((id, fiber) => FiberId.combine(id, fiber.id()), FiberId.none),
  await: Debug.methodWithTrace(trace => () => core.exit(forEachPar(fibers, fiber => core.flatten(fiber.await()))).traced(trace)),
  children: Debug.methodWithTrace(trace => () => core.map(forEachPar(fibers, fiber => fiber.children()), Chunk.flatten).traced(trace)),
  inheritAll: Debug.methodWithTrace(trace => () => core.forEachDiscard(fibers, fiber => fiber.inheritAll()).traced(trace)),
  poll: Debug.methodWithTrace(trace => () => core.map(core.forEach(fibers, fiber => fiber.poll()), Chunk.reduceRight(Option.some(core.exitSucceed(Chunk.empty())), (optionB, optionA) => {
    switch (optionA._tag) {
      case "None":
        {
          return Option.none();
        }
      case "Some":
        {
          switch (optionB._tag) {
            case "None":
              {
                return Option.none();
              }
            case "Some":
              {
                return Option.some(core.exitZipWith(optionB.value, (a, chunk) => Chunk.prepend(a)(chunk), internalCause.parallel)(optionA.value));
              }
          }
        }
    }
  })).traced(trace)),
  interruptAsFork: Debug.methodWithTrace(trace => fiberId => core.forEachDiscard(fibers, fiber => fiber.interruptAsFork(fiberId)).traced(trace))
});
/* @internal */
exports.fiberCollectAll = fiberCollectAll;
const fiberInterruptFork = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.asUnit(forkDaemon(core.interruptFiber(self))).traced(trace));
/* @internal */
exports.fiberInterruptFork = fiberInterruptFork;
const fiberJoinAll = /*#__PURE__*/Debug.methodWithTrace(trace => fibers => core.asUnit(internalFiber.join(fiberCollectAll(fibers))).traced(trace));
/* @internal */
exports.fiberJoinAll = fiberJoinAll;
const fiberScoped = /*#__PURE__*/Debug.methodWithTrace(trace => self => acquireRelease(core.succeed(self), core.interruptFiber).traced(trace));
exports.fiberScoped = fiberScoped;
//# sourceMappingURL=fiberRuntime.js.map