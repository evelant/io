"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fiberIdWith = exports.fiberId = exports.failSync = exports.failCauseSync = exports.failCause = exports.fail = exports.exit = exports.existsPar = exports.exists = exports.eventually = exports.ensuringChildren = exports.ensuringChild = exports.ensuring = exports.either = exports.dropWhile = exports.dropUntil = exports.done = exports.disconnect = exports.diffFiberRefs = exports.dieSync = exports.dieMessage = exports.die = exports.descriptorWith = exports.descriptor = exports.delay = exports.daemonChildren = exports.contramapContext = exports.continueOrFailEffect = exports.continueOrFail = exports.contextWithEffect = exports.contextWith = exports.context = exports.configProviderWith = exports.config = exports.cond = exports.collectWhile = exports.collectPar = exports.collectFirst = exports.collectAllWithPar = exports.collectAllWithEffect = exports.collectAllWith = exports.collectAllSuccessesPar = exports.collectAllSuccesses = exports.collectAllParDiscard = exports.collectAllPar = exports.collectAllDiscard = exports.collectAll = exports.collect = exports.clockWith = exports.clock = exports.checkInterruptible = exports.cause = exports.catchTags = exports.catchTag = exports.catchSomeDefect = exports.catchSomeCause = exports.catchSome = exports.catchAllDefect = exports.catchAllCause = exports.catchAll = exports.catch = exports.cachedInvalidate = exports.cached = exports.bindValue = exports.bind = exports.awaitAllChildren = exports.attemptSuspend = exports.attemptPromiseInterrupt = exports.attemptPromise = exports.attemptOrElse = exports.attemptCatchPromiseInterrupt = exports.attemptCatchPromise = exports.attemptCatch = exports.attempt = exports.asyncOption = exports.asyncInterruptEither = exports.asyncInterrupt = exports.asyncEffect = exports.async = exports.asUnit = exports.asSomeError = exports.asSome = exports.asRightError = exports.asRight = exports.asLeftError = exports.asLeft = exports.as = exports.allowInterrupt = exports.allPar = exports.all = exports.addFinalizer = exports.acquireUseRelease = exports.acquireReleaseInterruptible = exports.acquireRelease = exports.absorbWith = exports.absorb = exports.absolveWith = exports.absolve = exports.EffectTypeId = exports.Do = void 0;
exports.mergeAllPar = exports.mergeAll = exports.merge = exports.memoizeFunction = exports.memoize = exports.matchEffect = exports.matchCauseEffect = exports.matchCause = exports.match = exports.mapTryCatch = exports.mapErrorCause = exports.mapError = exports.mapBoth = exports.mapAccum = exports.map = exports.makeSemaphore = exports.loopDiscard = exports.loop = exports.logWarningCauseMessage = exports.logWarningCause = exports.logWarning = exports.logTraceCauseMessage = exports.logTraceCause = exports.logTrace = exports.logSpan = exports.logInfoCauseMessage = exports.logInfoCause = exports.logInfo = exports.logFatalCauseMessage = exports.logFatalCause = exports.logFatal = exports.logErrorCauseMessage = exports.logErrorCause = exports.logError = exports.logDebugCauseMessage = exports.logDebugCause = exports.logDebug = exports.logAnnotations = exports.logAnnotate = exports.log = exports.leftWith = exports.left = exports.iterate = exports.isSuccess = exports.isFailure = exports.isEffect = exports.intoDeferred = exports.interruptibleMask = exports.interruptible = exports.interruptWith = exports.interrupt = exports.inheritFiberRefs = exports.ignoreLogged = exports.ignore = exports.ifEffect = exports.head = exports.getOrFailWith = exports.getOrFailDiscard = exports.getOrFail = exports.getFiberRefs = exports.gen = exports.fromOption = exports.fromFiberEffect = exports.fromFiber = exports.fromEitherCause = exports.fromEither = exports.forkWithErrorHandler = exports.forkScoped = exports.forkIn = exports.forkDaemon = exports.forkAllDiscard = exports.forkAll = exports.fork = exports.forever = exports.forEachWithIndex = exports.forEachParWithIndex = exports.forEachParDiscard = exports.forEachPar = exports.forEachOption = exports.forEachExec = exports.forEachEffect = exports.forEachDiscard = exports.forEach = exports.forAll = exports.flipWith = exports.flip = exports.flattenErrorOption = exports.flatten = exports.flatMap = exports.firstSuccessOf = exports.find = exports.filterPar = exports.filterOrFail = exports.filterOrElseWith = exports.filterOrElse = exports.filterOrDieMessage = exports.filterOrDie = exports.filterNotPar = exports.filterNot = exports.filter = void 0;
exports.setConfigProvider = exports.serviceWithEffect = exports.serviceWith = exports.service = exports.sequentialFinalizers = exports.scoped = exports.scopeWith = exports.scope = exports.scheduleFrom = exports.scheduleForked = exports.schedule = exports.sandbox = exports.runtimeFlags = exports.runtime = exports.runSyncExitOrFiber = exports.runSyncExit = exports.runSyncEither = exports.runSync = exports.runPromiseExit = exports.runPromiseEither = exports.runPromise = exports.runFork = exports.runCallback = exports.rightWith = exports.right = exports.retryWhileEquals = exports.retryWhileEffect = exports.retryWhile = exports.retryUntilEquals = exports.retryUntilEffect = exports.retryUntil = exports.retryOrElseEither = exports.retryOrElse = exports.retryN = exports.retry = exports.resurrect = exports.replicateEffectDiscard = exports.replicateEffect = exports.replicate = exports.repeatWhileEquals = exports.repeatWhileEffect = exports.repeatWhile = exports.repeatUntilEquals = exports.repeatUntilEffect = exports.repeatUntil = exports.repeatOrElseEither = exports.repeatOrElse = exports.repeatN = exports.repeat = exports.rejectEffect = exports.reject = exports.refineTagOrDieWith = exports.refineTagOrDie = exports.refineOrDieWith = exports.refineOrDie = exports.reduceWhile = exports.reduceRight = exports.reduceAllPar = exports.reduceAll = exports.reduce = exports.randomWith = exports.random = exports.raceWith = exports.raceFirst = exports.raceFibersWith = exports.raceEither = exports.raceAwait = exports.raceAll = exports.race = exports.provideSomeLayer = exports.provideServiceEffect = exports.provideService = exports.provideLayer = exports.provideContext = exports.promiseInterrupt = exports.promise = exports.patchFiberRefs = exports.partitionPar = exports.partition = exports.parallelFinalizers = exports.parallelErrors = exports.orElseSucceed = exports.orElseOptional = exports.orElseFail = exports.orElseEither = exports.orElse = exports.orDieWith = exports.orDie = exports.option = exports.once = exports.onInterrupt = exports.onExit = exports.onError = exports.onDoneCause = exports.onDone = exports.noneOrFailWith = exports.noneOrFail = exports.none = exports.never = exports.negate = void 0;
exports.zipWithPar = exports.zipWith = exports.zipRight = exports.zipParRight = exports.zipParLeft = exports.zipPar = exports.zipLeft = exports.zip = exports.yieldNow = exports.withRuntimeFlagsScoped = exports.withRuntimeFlags = exports.withParallelismUnbounded = exports.withParallelism = exports.withMetric = exports.withEarlyRelease = exports.withConfigProviderScoped = exports.withConfigProvider = exports.withClockScoped = exports.withClock = exports.whileLoop = exports.whenRef = exports.whenFiberRef = exports.whenEffect = exports.whenCaseEffect = exports.whenCase = exports.when = exports.validateWithPar = exports.validateWith = exports.validatePar = exports.validateFirstPar = exports.validateFirst = exports.validateAllParDiscard = exports.validateAllPar = exports.validateAllDiscard = exports.validateAll = exports.validate = exports.using = exports.updateService = exports.updateRuntimeFlags = exports.updateFiberRefs = exports.unsome = exports.unsandbox = exports.unsafeMakeSemaphore = exports.unright = exports.unrefineWith = exports.unrefine = exports.unlessEffect = exports.unless = exports.unleft = exports.unit = exports.uninterruptibleMask = exports.uninterruptible = exports.unified = exports.unfold = exports.uncause = exports.transplant = exports.toLayerScopedDiscard = exports.toLayerScoped = exports.toLayerDiscard = exports.toLayerContext = exports.toLayer = exports.timeoutTo = exports.timeoutFailCause = exports.timeoutFail = exports.timeout = exports.timedWith = exports.timed = exports.tapSome = exports.tapErrorCause = exports.tapError = exports.tapEither = exports.tapDefect = exports.tapBoth = exports.tap = exports.takeWhile = exports.tags = exports.taggedWithLabels = exports.taggedWithLabelSet = exports.taggedScopedWithLabels = exports.taggedScopedWithLabelSet = exports.taggedScoped = exports.tagged = exports.sync = exports.suspend = exports.supervised = exports.summarized = exports.succeedSome = exports.succeedRight = exports.succeedNone = exports.succeedLeft = exports.succeed = exports.someWith = exports.someOrFailException = exports.someOrFail = exports.someOrElseEffect = exports.someOrElse = exports.some = exports.sleep = exports.setFiberRefs = void 0;
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var defaultServices = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/defaultServices"));
var effect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/effect"));
var circular = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/effect/circular"));
var fiberRuntime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRuntime"));
var layer = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/layer"));
var circularLayer = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/layer/circular"));
var _runtime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/runtime"));
var _schedule = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/schedule"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 * @category symbols
 */
const EffectTypeId = core.EffectTypeId;
/**
 * This function returns `true` if the specified value is an `Effect` value,
 * `false` otherwise.
 *
 * This function can be useful for checking the type of a value before
 * attempting to operate on it as an `Effect` value. For example, you could
 * use `isEffect` to check the type of a value before using it as an
 * argument to a function that expects an `Effect` value.
 *
 * @param u - The value to check for being an `Effect` value.
 *
 * @returns `true` if the specified value is an `Effect` value, `false`
 * otherwise.
 *
 * @since 1.0.0
 * @category refinements
 */
exports.EffectTypeId = EffectTypeId;
const isEffect = core.isEffect;
/**
 * This function adds a finalizer to the scope of the calling `Effect` value.
 * The finalizer is guaranteed to be run when the scope is closed, and it may
 * depend on the `Exit` value that the scope is closed with.
 *
 * @param finalizer - The finalizer to add to the scope of the calling
 * `Effect` value. This function must take an `Exit` value as its parameter,
 * and return a new `Effect` value.
 *
 * @returns A new `Effect` value that represents the addition of the finalizer
 * to the scope of the calling `Effect` value.
 *
 * @since 1.0.0
 * @category finalization
 */
exports.isEffect = isEffect;
const addFinalizer = fiberRuntime.addFinalizer;
/**
 * This function submerges the error case of an `Either` value into an
 * `Effect` value. It is the inverse operation of `either`.
 *
 * If the `Either` value is a `Right` value, then the `Effect` value will
 * succeed with the value contained in the `Right`. If the `Either` value
 * is a `Left` value, then the `Effect` value will fail with the error
 * contained in the `Left`.
 *
 * @param self - The `Effect` value that contains an `Either` value as its
 * result.
 *
 * @returns A new `Effect` value that has the same context as the original
 * `Effect` value, but has the error case of the `Either` value submerged
 * into it.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.addFinalizer = addFinalizer;
const absolve = effect.absolve;
/**
 * This function takes a mapping function f that maps over `Effect` value
 * and returns `Either` and returns a new function that submerges the error
 * case of an `Either` value into an `Effect` value.
 * It is the inverse operation of `either`.
 *
 * If the `Either` value is a `Right` value, then the `Effect` value will
 * succeed with the value contained in the `Right`. If the `Either` value
 * is a `Left` value, then the `Effect` value will fail with the error
 * contained in the `Left`.
 *
 * @param self - The `Effect` value that contains an `Either` value as its
 * result.
 *
 * @returns A new `Effect` value that has the same context as the original
 * `Effect` value, but has the error case of the `Either` value submerged
 * into it.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.absolve = absolve;
const absolveWith = effect.absolveWith;
/**
 * This function transforms an `Effect` value that may fail with a defect
 * into a new `Effect` value that may fail with an unknown error.
 *
 * The resulting `Effect` value will have the same context and success
 * type as the original `Effect` value, but it will have a more general
 * error type that allows it to fail with any type of error.
 *
 * @param self - The `Effect` value to transform.
 *
 * @returns A new `Effect` value that has the same context and success
 * type as the original `Effect` value, but a more general error type that
 * allows it to fail with any type of error.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.absolveWith = absolveWith;
const absorb = effect.absorb;
/**
 * This function takes a mapping function `f` and returns a new function
 * that transforms an `Effect` value that may fail with a defect into a new
 * `Effect` value that may fail with an unknown error.
 *
 * If the original `Effect` value fails with a known error, then the
 * mapping function `f` will be applied to the error to convert it to an
 * unknown structure.
 *
 * The resulting `Effect` value will have the same context and success
 * type as the original `Effect` value, but it will have a more general
 * error type that allows it to fail with any type of error.
 *
 * @param f - The mapping function to apply to known errors. This function
 * must take an error of type `E` and return an unknown structure.
 *
 * @returns A new function that transforms an `Effect` value that may fail
 * with a defect into a new `Effect` value that may fail with an unknown
 * error.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.absorb = absorb;
const absorbWith = effect.absorbWith;
/**
 * This function constructs a scoped resource from an `acquire` and `release`
 * `Effect` value.
 *
 * If the `acquire` `Effect` value successfully completes execution, then the
 * `release` `Effect` value will be added to the finalizers associated with the
 * scope of this `Effect` value, and it is guaranteed to be run when the scope
 * is closed.
 *
 * The `acquire` and `release` `Effect` values will be run uninterruptibly.
 * Additionally, the `release` `Effect` value may depend on the `Exit` value
 * specified when the scope is closed.
 *
 * @param acquire - The `Effect` value that acquires the resource.
 * @param release - The `Effect` value that releases the resource.
 *
 * @returns A new `Effect` value that represents the scoped resource.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.absorbWith = absorbWith;
const acquireRelease = fiberRuntime.acquireRelease;
/**
 * This function is a variant of `acquireRelease` that allows the `acquire`
 * `Effect` value to be interruptible.
 *
 * Since the `acquire` `Effect` value could be interrupted after partially
 * acquiring resources, the `release` `Effect` value is not allowed to access
 * the resource produced by `acquire` and must independently determine what
 * finalization, if any, needs to be performed (e.g. by examining in memory
 * state).
 *
 * Additionally, the `release` `Effect` value may depend on the `Exit` value
 * specified when the scope is closed.
 *
 * @param acquire - The interruptible `Effect` value that acquires the
 * resource.
 * @param release - The `Effect` value that releases the resource. This function
 * must take an `Exit` value as its parameter, and return a new `Effect` value.
 *
 * @returns A new `Effect` value that represents the interruptible scoped
 * resource.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.acquireRelease = acquireRelease;
const acquireReleaseInterruptible = circular.acquireReleaseInterruptible;
/**
 * This function is used to ensure that an `Effect` value that represents the
 * acquisition of a resource (for example, opening a file, launching a thread,
 * etc.) will not be interrupted, and that the resource will always be released
 * when the `Effect` value completes execution.
 *
 * `acquireUseRelease` does the following:
 *
 *   1. Ensures that the `Effect` value that acquires the resource will not be
 *      interrupted. Note that acquisition may still fail due to internal
 *      reasons (such as an uncaught exception).
 *   2. Ensures that the `release` `Effect` value will not be interrupted,
 *      and will be executed as long as the acquisition `Effect` value
 *      successfully acquires the resource.
 *
 * During the time period between the acquisition and release of the resource,
 * the `use` `Effect` value will be executed.
 *
 * If the `release` `Effect` value fails, then the entire `Effect` value will
 * fail, even if the `use` `Effect` value succeeds. If this fail-fast behavior
 * is not desired, errors produced by the `release` `Effect` value can be caught
 * and ignored.
 *
 * @param acquire - The `Effect` value that acquires the resource.
 * @param use - The `Effect` value that is executed between the acquisition
 * and release of the resource.
 * @param release - The `Effect` value that releases the resource.
 *
 * @returns A new `Effect` value that represents the acquisition, use, and
 * release of the resource.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.acquireReleaseInterruptible = acquireReleaseInterruptible;
const acquireUseRelease = core.acquireUseRelease;
/**
 * This function checks if any fibers are attempting to interrupt the current
 * fiber, and if so, performs self-interruption.
 *
 * Note that this allows for interruption to occur in uninterruptible regions.
 *
 * @returns A new `Effect` value that represents the check for interruption
 * and the potential self-interruption of the current fiber.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.acquireUseRelease = acquireUseRelease;
const allowInterrupt = effect.allowInterrupt;
/**
 * This function maps the success value of an `Effect` value to a specified
 * constant value.
 *
 * @param value - The constant value that the success value of the `Effect`
 * value will be mapped to.
 * @param self - The `Effect` value whose success value will be mapped to the
 * specified constant value.
 *
 * @returns A new `Effect` value that represents the mapping of the success
 * value of the original `Effect` value to the specified constant value.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.allowInterrupt = allowInterrupt;
const as = core.as;
/**
 * This function maps the success value of an `Effect` value to a `Left` value
 * in an `Either` value.
 *
 * @param self - The `Effect` value whose success value will be mapped to a
 * `Left` value in an `Either` value.
 *
 * @returns A new `Effect` value that represents the mapping of the success
 * value of the original `Effect` value to a `Left` value in an `Either`
 * value.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.as = as;
const asLeft = effect.asLeft;
/**
 * This function maps the error value of an `Effect` value to a `Left` value
 * in an `Either` value.
 *
 * @param self - The `Effect` value whose error value will be mapped to a
 * `Left` value in an `Either` value.
 *
 * @returns A new `Effect` value that represents the mapping of the error
 * value of the original `Effect` value to a `Left` value in an `Either`
 * value.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.asLeft = asLeft;
const asLeftError = effect.asLeftError;
/**
 * This function maps the success value of an `Effect` value to a `Right` value
 * in an `Either` value.
 *
 * @param self - The `Effect` value whose success value will be mapped to a
 * `Right` value in an `Either` value.
 *
 * @returns A new `Effect` value that represents the mapping of the success
 * value of the original `Effect` value to a `Right` value in an `Either`
 * value.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.asLeftError = asLeftError;
const asRight = effect.asRight;
/**
 * This function maps the error value of an `Effect` value to a `Right` value
 * in an `Either` value.
 *
 * @param self - The `Effect` value whose error value will be mapped to a
 * `Right` value in an `Either` value.
 *
 * @returns A new `Effect` value that represents the mapping of the error
 * value of the original `Effect` value to a `Right` value in an `Either`
 * value.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.asRight = asRight;
const asRightError = effect.asRightError;
/**
 * This function maps the success value of an `Effect` value to a `Some` value
 * in an `Option` value. If the original `Effect` value fails, the returned
 * `Effect` value will also fail.
 *
 * @param self - The `Effect` value whose success value will be mapped to a
 * `Some` value in an `Option` value.
 *
 * @returns A new `Effect` value that represents the mapping of the success
 * value of the original `Effect` value to a `Some` value in an `Option`
 * value. The returned `Effect` value may fail if the original `Effect` value
 * fails.
 *
 * @category mapping
 * @since 1.0.0
 */
exports.asRightError = asRightError;
const asSome = effect.asSome;
/**
 * This function maps the error value of an `Effect` value to a `Some` value
 * in an `Option` value. If the original `Effect` value succeeds, the returned
 * `Effect` value will also succeed.
 *
 * @param self - The `Effect` value whose error value will be mapped to a
 * `Some` value in an `Option` value.
 *
 * @returns A new `Effect` value that represents the mapping of the error
 * value of the original `Effect` value to a `Some` value in an `Option`
 * value. The returned `Effect` value may succeed if the original `Effect`
 * value succeeds.
 *
 * @category mapping
 * @since 1.0.0
 */
exports.asSome = asSome;
const asSomeError = effect.asSomeError;
/**
 * This function maps the success value of an `Effect` value to `void`. If the
 * original `Effect` value succeeds, the returned `Effect` value will also
 * succeed. If the original `Effect` value fails, the returned `Effect` value
 * will fail with the same error.
 *
 * @param self - The `Effect` value whose success value will be mapped to `void`.
 *
 * @returns A new `Effect` value that represents the mapping of the success
 * value of the original `Effect` value to `void`.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.asSomeError = asSomeError;
const asUnit = core.asUnit;
/**
 * Imports an asynchronous side-effect into a pure `Effect` value. See
 * `asyncMaybe` for the more expressive variant of this function that can
 * return a value synchronously.
 *
 * The callback function `Effect<R, E, A> => void` must be called at most once.
 *
 * The `FiberId` of the fiber that may complete the async callback may be
 * provided to allow for better diagnostics.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.asUnit = asUnit;
const async = core.async;
/**
 * Converts an asynchronous, callback-style API into an `Effect`, which will
 * be executed asynchronously.
 *
 * With this variant, the registration function may return a an `Effect`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.async = async;
const asyncEffect = _runtime.asyncEffect;
/**
 * Imports an asynchronous effect into a pure `Effect` value, possibly returning
 * the value synchronously.
 *
 * If the register function returns a value synchronously, then the callback
 * function `Effect<R, E, A> => void` must not be called. Otherwise the callback
 * function must be called at most once.
 *
 * The `FiberId` of the fiber that may complete the async callback may be
 * provided to allow for better diagnostics.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.asyncEffect = asyncEffect;
const asyncOption = effect.asyncOption;
/**
 * Imports an asynchronous side-effect into an effect. It has the option of
 * returning the value synchronously, which is useful in cases where it cannot
 * be determined if the effect is synchronous or asynchronous until the register
 * is actually executed. It also has the option of returning a canceler,
 * which will be used by the runtime to cancel the asynchronous effect if the fiber
 * executing the effect is interrupted.
 *
 * If the register function returns a value synchronously, then the callback
 * function `Effect<R, E, A> => void` must not be called. Otherwise the callback
 * function must be called at most once.
 *
 * The `FiberId` of the fiber that may complete the async callback may be
 * provided to allow for better diagnostics.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.asyncOption = asyncOption;
const asyncInterruptEither = core.asyncInterruptEither;
/**
 * Imports an asynchronous side-effect into an effect allowing control of interruption.
 *
 * The `FiberId` of the fiber that may complete the async callback may be
 * provided to allow for better diagnostics.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.asyncInterruptEither = asyncInterruptEither;
const asyncInterrupt = core.asyncInterrupt;
/**
 * Imports a synchronous side-effect into a pure `Effect` value, translating any
 * thrown exceptions into typed failed effects creating with `Effect.fail`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.asyncInterrupt = asyncInterrupt;
const attempt = effect.attempt;
/**
 * Returns a new effect that will not succeed with its value before first
 * waiting for the end of all child fibers forked by the effect.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.attempt = attempt;
const awaitAllChildren = circular.awaitAllChildren;
/**
 * Returns an effect that, if evaluated, will return the cached result of this
 * effect. Cached results will expire after `timeToLive` duration.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.awaitAllChildren = awaitAllChildren;
const cached = circular.cached;
/**
 * Returns an effect that, if evaluated, will return the cached result of this
 * effect. Cached results will expire after `timeToLive` duration. In
 * addition, returns an effect that can be used to invalidate the current
 * cached value before the `timeToLive` duration expires.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.cached = cached;
const cachedInvalidate = circular.cachedInvalidate;
exports.cachedInvalidate = cachedInvalidate;
const _catch = effect._catch;
exports.catch = _catch;
/**
 * Recovers from all recoverable errors.
 *
 * **Note**: that `Effect.catchAll` will not recover from unrecoverable defects. To
 * recover from both recoverable and unrecoverable errors use
 * `Effect.catchAllCause`.
 *
 * @since 1.0.0
 * @category error handling
 */
const catchAll = core.catchAll;
/**
 * Recovers from both recoverable and unrecoverable errors.
 *
 * See `absorb`, `sandbox`, `mapErrorCause` for other functions that can
 * recover from defects.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.catchAll = catchAll;
const catchAllCause = core.catchAllCause;
/**
 * Recovers from all defects with provided function.
 *
 * **WARNING**: There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.catchAllCause = catchAllCause;
const catchAllDefect = effect.catchAllDefect;
/**
 * Recovers from some or all of the error cases.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.catchAllDefect = catchAllDefect;
const catchSome = core.catchSome;
/**
 * Recovers from some or all of the error cases with provided cause.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.catchSome = catchSome;
const catchSomeCause = effect.catchSomeCause;
/**
 * Recovers from some or all of the defects with provided partial function.
 *
 * **WARNING**: There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.catchSomeCause = catchSomeCause;
const catchSomeDefect = effect.catchSomeDefect;
/**
 * Recovers from the specified tagged error.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.catchSomeDefect = catchSomeDefect;
const catchTag = effect.catchTag;
/**
 * Recovers from the specified tagged errors.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.catchTag = catchTag;
const catchTags = effect.catchTags;
/**
 * Returns an effect that succeeds with the cause of failure of this effect,
 * or `Cause.empty` if the effect did succeed.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.catchTags = catchTags;
const cause = effect.cause;
/**
 * Checks the interrupt status, and produces the effect returned by the
 * specified callback.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.cause = cause;
const checkInterruptible = core.checkInterruptible;
/**
 * Retreives the `Clock` service from the context
 *
 * @since 1.0.0
 * @category context
 */
exports.checkInterruptible = checkInterruptible;
const clock = effect.clock;
/**
 * Retreives the `Clock` service from the context and provides it to the
 * specified effectful function.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.clock = clock;
const clockWith = effect.clockWith;
/**
 * Uses the default config provider to load the specified config, or fail with
 * an error of type Config.Error.
 *
 * @since 1.0.0
 * @category config
 */
exports.clockWith = clockWith;
const config = defaultServices.config;
/**
 * Retrieves the default config provider, and passes it to the specified
 * function, which may return an effect that uses the provider to perform some
 * work or compute some value.
 *
 * @since 1.0.0
 * @category config
 */
exports.config = config;
const configProviderWith = defaultServices.configProviderWith;
/**
 * Evaluate each effect in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.configProviderWith = configProviderWith;
const collect = fiberRuntime.collect;
/**
 * Evaluate each effect in the structure from left to right, and collect the
 * results. For a parallel version, see `collectAllPar`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collect = collect;
const collectAll = effect.collectAll;
/**
 * Evaluate each effect in the structure from left to right, and discard the
 * results. For a parallel version, see `collectAllParDiscard`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collectAll = collectAll;
const collectAllDiscard = effect.collectAllDiscard;
/**
 * Evaluate each effect in the structure in parallel, and collect the results.
 * For a sequential version, see `collectAll`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collectAllDiscard = collectAllDiscard;
const collectAllPar = fiberRuntime.collectAllPar;
/**
 * Evaluate each effect in the structure in parallel, and discard the results.
 * For a sequential version, see `collectAllDiscard`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collectAllPar = collectAllPar;
const collectAllParDiscard = fiberRuntime.collectAllParDiscard;
/**
 * Evaluate each effect in the structure with `collectAll`, and collect the
 * results with given partial function.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collectAllParDiscard = collectAllParDiscard;
const collectAllWith = effect.collectAllWith;
/**
 * Evaluate each effect in the structure with `collectAllPar`, and collect
 * the results with given partial function.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collectAllWith = collectAllWith;
const collectAllWithPar = fiberRuntime.collectAllWithPar;
/**
 * Returns a filtered, mapped subset of the elements of the iterable based on a
 * partial function.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collectAllWithPar = collectAllWithPar;
const collectAllWithEffect = effect.collectAllWithEffect;
/**
 * Evaluate and run each effect in the structure and collect the results,
 * discarding results from failed effects.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collectAllWithEffect = collectAllWithEffect;
const collectAllSuccesses = effect.collectAllSuccesses;
/**
 * Evaluate and run each effect in the structure in parallel and collect the
 * results, discarding results from failed effects.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collectAllSuccesses = collectAllSuccesses;
const collectAllSuccessesPar = fiberRuntime.collectAllSuccessesPar;
/**
 * Collects the first element of the `Collection<A>` for which the effectual
 * function `f` returns `Some`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collectAllSuccessesPar = collectAllSuccessesPar;
const collectFirst = effect.collectFirst;
/**
 * Evaluate each effect in the structure in parallel, collecting the successful
 * values and discarding the empty cases.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collectFirst = collectFirst;
const collectPar = fiberRuntime.collectPar;
/**
 * Transforms all elements of the chunk for as long as the specified partial
 * function is defined.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collectPar = collectPar;
const collectWhile = effect.collectWhile;
/**
 * Evaluate the predicate, return the given `A` as success if predicate returns
 * true, and the given `E` as error otherwise
 *
 * For effectful conditionals, see `ifEffect`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.collectWhile = collectWhile;
const cond = effect.cond;
/**
 * @since 1.0.0
 * @category context
 */
exports.cond = cond;
const context = core.context;
/**
 * Accesses the context of the effect.
 *
 * @since 1.0.0
 * @category context
 */
exports.context = context;
const contextWith = effect.contextWith;
/**
 * Effectually accesses the context of the effect.
 *
 * @since 1.0.0
 * @category context
 */
exports.contextWith = contextWith;
const contextWithEffect = core.contextWithEffect;
/**
 * Fail with the specifed `error` if the supplied partial function does not
 * match, otherwise continue with the returned value.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.contextWithEffect = contextWithEffect;
const continueOrFail = effect.continueOrFail;
/**
 * Fail with the specifed `error` if the supplied partial function does not
 * match, otherwise continue with the returned value.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.continueOrFail = continueOrFail;
const continueOrFailEffect = effect.continueOrFailEffect;
/**
 * Provides some of the context required to run this effect,
 * leaving the remainder `R0`.
 *
 * @since 1.0.0
 * @category context
 */
exports.continueOrFailEffect = continueOrFailEffect;
const contramapContext = core.contramapContext;
/**
 * Returns a new workflow that will not supervise any fibers forked by this
 * workflow.
 *
 * @since 1.0.0
 * @category supervision
 */
exports.contramapContext = contramapContext;
const daemonChildren = fiberRuntime.daemonChildren;
/**
 * Returns an effect that is delayed from this effect by the specified
 * `Duration`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.daemonChildren = daemonChildren;
const delay = effect.delay;
/**
 * Constructs an effect with information about the current `Fiber`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.delay = delay;
const descriptor = effect.descriptor;
/**
 * Constructs an effect based on information about the current `Fiber`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.descriptor = descriptor;
const descriptorWith = effect.descriptorWith;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.descriptorWith = descriptorWith;
const die = core.die;
/**
 * Returns an effect that dies with a `RuntimeException` having the specified
 * text message. This method can be used for terminating a fiber because a
 * defect has been detected in the code.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.die = die;
const dieMessage = effect.dieMessage;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.dieMessage = dieMessage;
const dieSync = core.dieSync;
/**
 * Returns an effect whose interruption will be disconnected from the
 * fiber's own interruption, being performed in the background without
 * slowing down the fiber's interruption.
 *
 * This method is useful to create "fast interrupting" effects. For
 * example, if you call this on a bracketed effect, then even if the
 * effect is "stuck" in acquire or release, its interruption will return
 * immediately, while the acquire / release are performed in the
 * background.
 *
 * See timeout and race for other applications.
 *
 * @since 1.0.0
 * @category interruption
 */
exports.dieSync = dieSync;
const disconnect = circular.disconnect;
/**
 * Returns a new workflow that executes this one and captures the changes in
 * `FiberRef` values.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.disconnect = disconnect;
const diffFiberRefs = effect.diffFiberRefs;
/**
 * Binds an effectful value in a `do` scope
 *
 * @since 1.0.0
 * @category do notation
 */
exports.diffFiberRefs = diffFiberRefs;
const bind = effect.bind;
/**
 * Like bind for values
 *
 * @since 1.0.0
 * @category do notation
 */
exports.bind = bind;
const bindValue = effect.bindValue;
/**
 * @since 1.0.0
 * @category do notation
 */
exports.bindValue = bindValue;
const Do = effect.Do;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.Do = Do;
const done = core.done;
/**
 * Drops all elements until the effectful predicate returns true.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.done = done;
const dropUntil = effect.dropUntil;
/**
 * Drops all elements so long as the predicate returns true.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.dropUntil = dropUntil;
const dropWhile = effect.dropWhile;
/**
 * Returns an effect whose failure and success have been lifted into an
 * `Either`. The resulting effect cannot fail, because the failure case has
 * been exposed as part of the `Either` success case.
 *
 * This method is useful for recovering from effects that may fail.
 *
 * The error parameter of the returned `Effect` is `never`, since it is
 * guaranteed the effect does not model failure.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.dropWhile = dropWhile;
const either = core.either;
/**
 * Returns an effect that, if this effect _starts_ execution, then the
 * specified `finalizer` is guaranteed to be executed, whether this effect
 * succeeds, fails, or is interrupted.
 *
 * For use cases that need access to the effect's result, see `onExit`.
 *
 * Finalizers offer very powerful guarantees, but they are low-level, and
 * should generally not be used for releasing resources. For higher-level
 * logic built on `ensuring`, see the `acquireRelease` family of methods.
 *
 * @since 1.0.0
 * @category finalization
 */
exports.either = either;
const ensuring = circular.ensuring;
/**
 * Acts on the children of this fiber (collected into a single fiber),
 * guaranteeing the specified callback will be invoked, whether or not this
 * effect succeeds.
 *
 * @since 1.0.0
 * @category finalization
 */
exports.ensuring = ensuring;
const ensuringChild = circular.ensuringChild;
/**
 * Acts on the children of this fiber, guaranteeing the specified callback
 * will be invoked, whether or not this effect succeeds.
 *
 * @since 1.0.0
 * @category finalization
 */
exports.ensuringChild = ensuringChild;
const ensuringChildren = circular.ensuringChildren;
/**
 * Returns an effect that ignores errors and runs repeatedly until it
 * eventually succeeds.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.ensuringChildren = ensuringChildren;
const eventually = effect.eventually;
/**
 * Determines whether any element of the `Iterable<A>` satisfies the effectual
 * predicate `f`, working sequentially.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.eventually = eventually;
const exists = effect.exists;
/**
 * Determines whether any element of the `Iterable<A>` satisfies the effectual
 * predicate `f`, working in parallel. Interrupts all effects on any failure or
 * finding an element that satisfies the predicate.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.exists = exists;
const existsPar = fiberRuntime.existsPar;
/**
 * @since 1.0.0
 * @category utilities
 */
exports.existsPar = existsPar;
const exit = core.exit;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.exit = exit;
const fail = core.fail;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.fail = fail;
const failSync = core.failSync;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.failSync = failSync;
const failCause = core.failCause;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.failCause = failCause;
const failCauseSync = core.failCauseSync;
/**
 * @since 1.0.0
 * @category utilities
 */
exports.failCauseSync = failCauseSync;
const fiberId = core.fiberId;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.fiberId = fiberId;
const fiberIdWith = core.fiberIdWith;
/**
 * Filters the collection using the specified effectful predicate.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.fiberIdWith = fiberIdWith;
const filter = effect.filter;
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filter` for a sequential version of it.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.filter = filter;
const filterPar = fiberRuntime.filterPar;
/**
 * Filters the collection using the specified effectual predicate, removing
 * all elements that satisfy the predicate.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.filterPar = filterPar;
const filterNot = effect.filterNot;
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filterNot` for a sequential version.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.filterNot = filterNot;
const filterNotPar = fiberRuntime.filterNotPar;
/**
 * Filter the specified effect with the provided function, dying with specified
 * defect if the predicate fails.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.filterNotPar = filterNotPar;
const filterOrDie = effect.filterOrDie;
/**
 * Filter the specified effect with the provided function, dying with specified
 * message if the predicate fails.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.filterOrDie = filterOrDie;
const filterOrDieMessage = effect.filterOrDieMessage;
/**
 * Filters the specified effect with the provided function returning the value
 * of the effect if it is successful, otherwise returns the value of `orElse`.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.filterOrDieMessage = filterOrDieMessage;
const filterOrElse = effect.filterOrElse;
/**
 * Filters the specified effect with the provided function returning the value
 * of the effect if it is successful, otherwise returns the value of `orElse`.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.filterOrElse = filterOrElse;
const filterOrElseWith = effect.filterOrElseWith;
/**
 * Filter the specified effect with the provided function, failing with specified
 * error if the predicate fails.
 *
 * @since 1.0.0
 * @category filtering
 */
exports.filterOrElseWith = filterOrElseWith;
const filterOrFail = effect.filterOrFail;
/**
 * Returns the first element that satisfies the effectful predicate.
 *
 * @since 1.0.0
 * @category elements
 */
exports.filterOrFail = filterOrFail;
const find = effect.find;
/**
 * This function takes an iterable of `Effect` values and returns a new
 * `Effect` value that represents the first `Effect` value in the iterable
 * that succeeds. If all of the `Effect` values in the iterable fail, then
 * the resulting `Effect` value will fail as well.
 *
 * This function is sequential, meaning that the `Effect` values in the
 * iterable will be executed in sequence, and the first one that succeeds
 * will determine the outcome of the resulting `Effect` value.
 *
 * @param effects - The iterable of `Effect` values to evaluate.
 *
 * @returns A new `Effect` value that represents the first successful
 * `Effect` value in the iterable, or a failed `Effect` value if all of the
 * `Effect` values in the iterable fail.
 *
 * @since 1.0.0
 * @category elements
 */
exports.find = find;
const firstSuccessOf = effect.firstSuccessOf;
/**
 * This function is a pipeable operator that maps over an `Effect` value,
 * flattening the result of the mapping function into a new `Effect` value.
 *
 * @param f - The mapping function to apply to the `Effect` value.
 * This function must return another `Effect` value.
 *
 * @returns A new `Effect` value that is the result of flattening the
 * mapped `Effect` value.
 *
 * @since 1.0.0
 * @category sequencing
 */
exports.firstSuccessOf = firstSuccessOf;
const flatMap = core.flatMap;
/**
 * @since 1.0.0
 * @category sequencing
 */
exports.flatMap = flatMap;
const flatten = core.flatten;
/**
 * Unwraps the optional error, defaulting to the provided value.
 *
 * @since 1.0.0
 * @category sequencing
 */
exports.flatten = flatten;
const flattenErrorOption = effect.flattenErrorOption;
/**
 * Returns an effect that swaps the error/success cases. This allows you to
 * use all methods on the error channel, possibly before flipping back.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.flattenErrorOption = flattenErrorOption;
const flip = core.flip;
/**
 * Swaps the error/value parameters, applies the function `f` and flips the
 * parameters back
 *
 * @since 1.0.0
 * @category mutations
 */
exports.flip = flip;
const flipWith = effect.flipWith;
/**
 * Determines whether all elements of the `Collection<A>` satisfies the effectual
 * predicate `f`.
 *
 * @since 1.0.0
 * @category elements
 */
exports.flipWith = flipWith;
const forAll = effect.forAll;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.forAll = forAll;
const forEach = core.forEach;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.forEach = forEach;
const forEachDiscard = core.forEachDiscard;
/**
 * Returns a new effect that will pass the success value of this effect to the
 * provided callback. If this effect fails, then the failure will be ignored.
 *
 * @since 1.0.0
 * @category elements
 */
exports.forEachDiscard = forEachDiscard;
const forEachEffect = effect.forEachEffect;
/**
 * Applies the function `f` to each element of the `Collection<A>` and returns
 * the result in a new `Chunk<B>` using the specified execution strategy.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.forEachEffect = forEachEffect;
const forEachExec = fiberRuntime.forEachExec;
/**
 * Applies the function `f` if the argument is non-empty and returns the
 * results in a new `Option<B>`.
 *
 * @since 1.0.0
 * @category elements
 */
exports.forEachExec = forEachExec;
const forEachOption = effect.forEachOption;
/**
 * Same as `forEach`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 *
 * @since 1.0.0
 * @category traversing
 */
exports.forEachOption = forEachOption;
const forEachWithIndex = effect.forEachWithIndex;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.forEachWithIndex = forEachWithIndex;
const forEachPar = fiberRuntime.forEachPar;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.forEachPar = forEachPar;
const forEachParDiscard = fiberRuntime.forEachParDiscard;
/**
 * Same as `forEachPar`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.forEachParDiscard = forEachParDiscard;
const forEachParWithIndex = fiberRuntime.forEachParWithIndex;
/**
 * Repeats this effect forever (until the first error).
 *
 * @since 1.0.0
 * @category mutations
 */
exports.forEachParWithIndex = forEachParWithIndex;
const forever = effect.forever;
/**
 * Returns an effect that forks this effect into its own separate fiber,
 * returning the fiber immediately, without waiting for it to begin executing
 * the effect.
 *
 * You can use the `fork` method whenever you want to execute an effect in a
 * new fiber, concurrently and without "blocking" the fiber executing other
 * effects. Using fibers can be tricky, so instead of using this method
 * directly, consider other higher-level methods, such as `raceWith`,
 * `zipPar`, and so forth.
 *
 * The fiber returned by this method has methods to interrupt the fiber and to
 * wait for it to finish executing the effect. See `Fiber` for more
 * information.
 *
 * Whenever you use this method to launch a new fiber, the new fiber is
 * attached to the parent fiber's scope. This means when the parent fiber
 * terminates, the child fiber will be terminated as well, ensuring that no
 * fibers leak. This behavior is called "auto supervision", and if this
 * behavior is not desired, you may use the `forkDaemon` or `forkIn` methods.
 *
 * @since 1.0.0
 * @category supervision
 */
exports.forever = forever;
const fork = fiberRuntime.fork;
/**
 * Forks the effect into a new fiber attached to the global scope. Because the
 * new fiber is attached to the global scope, when the fiber executing the
 * returned effect terminates, the forked fiber will continue running.
 *
 * @since 1.0.0
 * @category supervision
 */
exports.fork = fork;
const forkDaemon = fiberRuntime.forkDaemon;
/**
 * Returns an effect that forks all of the specified values, and returns a
 * composite fiber that produces a list of their results, in order.
 *
 * @since 1.0.0
 * @category supervision
 */
exports.forkDaemon = forkDaemon;
const forkAll = circular.forkAll;
/**
 * Returns an effect that forks all of the specified values, and returns a
 * composite fiber that produces unit. This version is faster than `forkAll`
 * in cases where the results of the forked fibers are not needed.
 *
 * @since 1.0.0
 * @category supervision
 */
exports.forkAll = forkAll;
const forkAllDiscard = fiberRuntime.forkAllDiscard;
/**
 * Forks the effect in the specified scope. The fiber will be interrupted
 * when the scope is closed.
 *
 * @since 1.0.0
 * @category supervision
 */
exports.forkAllDiscard = forkAllDiscard;
const forkIn = circular.forkIn;
/**
 * Forks the fiber in a `Scope`, interrupting it when the scope is closed.
 *
 * @since 1.0.0
 * @category supervision
 */
exports.forkIn = forkIn;
const forkScoped = circular.forkScoped;
/**
 * Like fork but handles an error with the provided handler.
 *
 * @since 1.0.0
 * @category supervision
 */
exports.forkScoped = forkScoped;
const forkWithErrorHandler = fiberRuntime.forkWithErrorHandler;
/**
 * Lifts an `Either<E, A>` into an `Effect<never, E, A>`.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.forkWithErrorHandler = forkWithErrorHandler;
const fromEither = core.fromEither;
/**
 * Lifts an `Either<Cause<E>, A>` into an `Effect<never, E, A>`.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.fromEither = fromEither;
const fromEitherCause = effect.fromEitherCause;
/**
 * Creates an `Effect` value that represents the exit value of the specified
 * fiber.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.fromEitherCause = fromEitherCause;
const fromFiber = circular.fromFiber;
/**
 * Creates an `Effect` value that represents the exit value of the specified
 * fiber.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.fromFiber = fromFiber;
const fromFiberEffect = circular.fromFiberEffect;
/**
 * Lifts an `Option` into an `Effect` but preserves the error as an option in
 * the error channel, making it easier to compose in some scenarios.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.fromFiberEffect = fromFiberEffect;
const fromOption = core.fromOption;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.fromOption = fromOption;
const gen = effect.gen;
/**
 * Returns a collection of all `FiberRef` values for the fiber running this
 * effect.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.gen = gen;
const getFiberRefs = effect.getFiberRefs;
/**
 * Lifts an `Option` into an `Effect`, if the option is not defined it fails
 * with `NoSuchElementException`.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.getFiberRefs = getFiberRefs;
const getOrFail = effect.getOrFail;
/**
 * Lifts an `Option` into a `IO`, if the option is not defined it fails with
 * `void`.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.getOrFail = getOrFail;
const getOrFailDiscard = effect.getOrFailDiscard;
/**
 * Lifts an `Maybe` into an `Effect`. If the option is not defined, fail with
 * the specified `e` value.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.getOrFailDiscard = getOrFailDiscard;
const getOrFailWith = effect.getOrFailWith;
/**
 * Returns a successful effect with the head of the collection if the collection
 * is non-empty, or fails with the error `None` if the collection is empty.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.getOrFailWith = getOrFailWith;
const head = effect.head;
/**
 * Runs `onTrue` if the result of `self` is `true` and `onFalse` otherwise.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.head = head;
const ifEffect = core.ifEffect;
/**
 * Returns a new effect that ignores the success or failure of this effect.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.ifEffect = ifEffect;
const ignore = effect.ignore;
/**
 * Returns a new effect that ignores the success or failure of this effect,
 * but which also logs failures at the Debug level, just in case the failure
 * turns out to be important.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.ignore = ignore;
const ignoreLogged = effect.ignoreLogged;
/**
 * Inherits values from all `FiberRef` instances into current fiber.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.ignoreLogged = ignoreLogged;
const inheritFiberRefs = effect.inheritFiberRefs;
/**
 * @since 1.0.0
 * @category interruption
 */
exports.inheritFiberRefs = inheritFiberRefs;
const interrupt = core.interrupt;
/**
 * @since 1.0.0
 * @category interruption
 */
exports.interrupt = interrupt;
const interruptWith = core.interruptWith;
/**
 * @since 1.0.0
 * @category interruption
 */
exports.interruptWith = interruptWith;
const interruptible = core.interruptible;
/**
 * @since 1.0.0
 * @category interruption
 */
exports.interruptible = interruptible;
const interruptibleMask = core.interruptibleMask;
/**
 * @since 1.0.0
 * @category utilities
 */
exports.interruptibleMask = interruptibleMask;
const intoDeferred = core.intoDeferred;
/**
 * Returns `true` if this effect is a failure, `false` otherwise.
 *
 * @since 1.0.0
 * @category getter
 */
exports.intoDeferred = intoDeferred;
const isFailure = effect.isFailure;
/**
 * Returns `true` if this effect is a success, `false` otherwise.
 *
 * @since 1.0.0
 * @category getter
 */
exports.isFailure = isFailure;
const isSuccess = effect.isSuccess;
/**
 * Iterates with the specified effectual function. The moral equivalent of:
 *
 * ```ts
 * let s = initial
 *
 * while (cont(s)) {
 *   s = body(s)
 * }
 *
 * return s
 * ```
 *
 * @since 1.0.0
 * @category constructors
 */
exports.isSuccess = isSuccess;
const iterate = effect.iterate;
/**
 * "Zooms in" on the value in the `Left` side of an `Either`, moving the
 * possibility that the value is a `Right` to the error channel.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.iterate = iterate;
const left = effect.left;
/**
 * Performs the specified operation while "zoomed in" on the `Left` case of an
 * `Either`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.left = left;
const leftWith = effect.leftWith;
/**
 * Logs the specified message at the current log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.leftWith = leftWith;
const log = effect.log;
/**
 * Logs the specified message at the debug log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.log = log;
const logDebug = effect.logDebug;
/**
 * Logs the specified cause at the debug log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logDebug = logDebug;
const logDebugCause = effect.logDebugCause;
/**
 * Logs the specified message and cause at the debug log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logDebugCause = logDebugCause;
const logDebugCauseMessage = effect.logDebugCauseMessage;
/**
 * Logs the specified message at the error log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logDebugCauseMessage = logDebugCauseMessage;
const logError = effect.logError;
/**
 * Logs the specified cause at the error log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logError = logError;
const logErrorCause = effect.logErrorCause;
/**
 * Logs the specified message and cause at the error log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logErrorCause = logErrorCause;
const logErrorCauseMessage = effect.logErrorCauseMessage;
/**
 * Logs the specified message at the fatal log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logErrorCauseMessage = logErrorCauseMessage;
const logFatal = effect.logFatal;
/**
 * Logs the specified cause at the fatal log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logFatal = logFatal;
const logFatalCause = effect.logFatalCause;
/**
 * Logs the specified message and cause at the fatal log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logFatalCause = logFatalCause;
const logFatalCauseMessage = effect.logFatalCauseMessage;
/**
 * Logs the specified message at the informational log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logFatalCauseMessage = logFatalCauseMessage;
const logInfo = effect.logInfo;
/**
 * Logs the specified cause at the informational log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logInfo = logInfo;
const logInfoCause = effect.logInfoCause;
/**
 * Logs the specified message and cause at the informational log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logInfoCause = logInfoCause;
const logInfoCauseMessage = effect.logInfoCauseMessage;
/**
 * Logs the specified message at the warning log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logInfoCauseMessage = logInfoCauseMessage;
const logWarning = effect.logWarning;
/**
 * Logs the specified cause at the warning log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logWarning = logWarning;
const logWarningCause = effect.logWarningCause;
/**
 * Logs the specified message and cause at the warning log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logWarningCause = logWarningCause;
const logWarningCauseMessage = effect.logWarningCauseMessage;
/**
 * Logs the specified message at the trace log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logWarningCauseMessage = logWarningCauseMessage;
const logTrace = effect.logTrace;
/**
 * Logs the specified cause at the trace log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logTrace = logTrace;
const logTraceCause = effect.logTraceCause;
/**
 * Logs the specified message and cause at the trace log level.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logTraceCause = logTraceCause;
const logTraceCauseMessage = effect.logTraceCauseMessage;
/**
 * Adjusts the label for the current logging span.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logTraceCauseMessage = logTraceCauseMessage;
const logSpan = effect.logSpan;
/**
 * Annotates each log in this effect with the specified log annotation.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logSpan = logSpan;
const logAnnotate = effect.logAnnotate;
/**
 * Retrieves the log annotations associated with the current scope.
 *
 * @since 1.0.0
 * @category logging
 */
exports.logAnnotate = logAnnotate;
const logAnnotations = effect.logAnnotations;
/**
 * Loops with the specified effectual function, collecting the results into a
 * list. The moral equivalent of:
 *
 * ```ts
 * let s  = initial
 * let as = [] as readonly A[]
 *
 * while (cont(s)) {
 *   as = [body(s), ...as]
 *   s  = inc(s)
 * }
 *
 * A.reverse(as)
 * ```
 *
 * @since 1.0.0
 * @category constructors
 */
exports.logAnnotations = logAnnotations;
const loop = effect.loop;
/**
 * Loops with the specified effectual function purely for its effects. The
 * moral equivalent of:
 *
 * ```ts
 * let s = initial
 *
 * while (cont(s)) {
 *   body(s)
 *   s = inc(s)
 * }
 * ```
 *
 * @since 1.0.0
 * @category constructors
 */
exports.loop = loop;
const loopDiscard = effect.loopDiscard;
/**
 * @since 1.0.0
 * @category mapping
 */
exports.loopDiscard = loopDiscard;
const map = core.map;
/**
 * Statefully and effectfully maps over the elements of this chunk to produce
 * new elements.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.map = map;
const mapAccum = effect.mapAccum;
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.mapAccum = mapAccum;
const mapBoth = effect.mapBoth;
/**
 * Returns an effect with its error channel mapped using the specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.mapBoth = mapBoth;
const mapError = core.mapError;
/**
 * Returns an effect with its full cause of failure mapped using the specified
 * function. This can be used to transform errors while preserving the
 * original structure of `Cause`.
 *
 * See `absorb`, `sandbox`, `catchAllCause` for other functions for dealing
 * with defects.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.mapError = mapError;
const mapErrorCause = effect.mapErrorCause;
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.mapErrorCause = mapErrorCause;
const mapTryCatch = effect.mapTryCatch;
/**
 * Folds over the failure value or the success value to yield an effect that
 * does not fail, but succeeds with the value returned by the left or right
 * function passed to `match`.
 *
 * @since 1.0.0
 * @category folding
 */
exports.mapTryCatch = mapTryCatch;
const match = effect.match;
/**
 * @since 1.0.0
 * @category error handling
 */
exports.match = match;
const matchCause = core.matchCause;
/**
 * @since 1.0.0
 * @category error handling
 */
exports.matchCause = matchCause;
const matchCauseEffect = core.matchCauseEffect;
/**
 * @since 1.0.0
 * @category error handling
 */
exports.matchCauseEffect = matchCauseEffect;
const matchEffect = core.matchEffect;
/**
 * Returns an effect that, if evaluated, will return the lazily computed
 * result of this effect.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.matchEffect = matchEffect;
const memoize = effect.memoize;
/**
 * Returns a memoized version of the specified effectual function.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.memoize = memoize;
const memoizeFunction = circular.memoizeFunction;
/**
 * Returns a new effect where the error channel has been merged into the
 * success channel to their common combined type.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.memoizeFunction = memoizeFunction;
const merge = effect.merge;
/**
 * Merges an `Iterable<Effect<R, E, A>>` to a single effect, working
 * sequentially.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.merge = merge;
const mergeAll = effect.mergeAll;
/**
 * Merges an `Iterable<Effect<R, E, A>>` to a single effect, working in
 * parallel.
 *
 * Due to the parallel nature of this combinator, `f` must be both:
 * - commutative: `f(a, b) == f(b, a)`
 * - associative: `f(a, f(b, c)) == f(f(a, b), c)`
 *
 * It's unsafe to execute side effects inside `f`, as `f` may be executed
 * more than once for some of `in` elements during effect execution.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.mergeAll = mergeAll;
const mergeAllPar = fiberRuntime.mergeAllPar;
/**
 * Returns a new effect where boolean value of this effect is negated.
 *
 * @since 1.0.0
 * @category mapping
 */
exports.mergeAllPar = mergeAllPar;
const negate = effect.negate;
/**
 * Returns a effect that will never produce anything. The moral equivalent of
 * `while(true) {}`, only without the wasted CPU cycles.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.negate = negate;
const never = core.never;
/**
 * Requires the option produced by this value to be `None`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.never = never;
const none = effect.none;
/**
 * Lifts an `Option` into a `Effect`. If the option is empty it succeeds with
 * `void`. If the option is defined it fails with the content.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.none = none;
const noneOrFail = effect.noneOrFail;
/**
 * Lifts an `Option` into a `Effect`. If the option is empty it succeeds with
 * `undefined`. If the option is defined it fails with an error computed by
 * the specified function.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.noneOrFail = noneOrFail;
const noneOrFailWith = effect.noneOrFailWith;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.noneOrFailWith = noneOrFailWith;
const onDone = fiberRuntime.onDone;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.onDone = onDone;
const onDoneCause = fiberRuntime.onDoneCause;
/**
 * Runs the specified effect if this effect fails, providing the error to the
 * effect if it exists. The provided effect will not be interrupted.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.onDoneCause = onDoneCause;
const onError = core.onError;
/**
 * Ensures that a cleanup functions runs, whether this effect succeeds, fails,
 * or is interrupted.
 *
 * @category finalization
 * @since 1.0.0
 */
exports.onError = onError;
const onExit = core.onExit;
/**
 * @since 1.0.0
 * @category finalization
 */
exports.onExit = onExit;
const onInterrupt = core.onInterrupt;
/**
 * Returns an effect that will be executed at most once, even if it is
 * evaluated multiple times.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.onInterrupt = onInterrupt;
const once = effect.once;
/**
 * Executes this effect, skipping the error but returning optionally the
 * success.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.once = once;
const option = effect.option;
/**
 * Translates effect failure into death of the fiber, making all failures
 * unchecked and not a part of the type of the effect.
 *
 * @since 1.0.0
 * @category alternatives
 */
exports.option = option;
const orDie = core.orDie;
/**
 * Keeps none of the errors, and terminates the fiber with them, using the
 * specified function to convert the `E` into a `Throwable`.
 *
 * @since 1.0.0
 * @category alternatives
 */
exports.orDie = orDie;
const orDieWith = core.orDieWith;
/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * executes the specified effect.
 *
 * @since 1.0.0
 * @category alternatives
 */
exports.orDieWith = orDieWith;
const orElse = core.orElse;
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 *
 * @since 1.0.0
 * @category alternatives
 */
exports.orElse = orElse;
const orElseEither = effect.orElseEither;
/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * fails with the specified error.
 *
 * @since 1.0.0
 * @category alternatives
 */
exports.orElseEither = orElseEither;
const orElseFail = effect.orElseFail;
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails with the `None` value, in which case it will produce the value of
 * the specified effect.
 *
 * @since 1.0.0
 * @category alternatives
 */
exports.orElseFail = orElseFail;
const orElseOptional = effect.orElseOptional;
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise succeeds with the specified value.
 *
 * @since 1.0.0
 * @category alternatives
 */
exports.orElseOptional = orElseOptional;
const orElseSucceed = effect.orElseSucceed;
/**
 * Exposes all parallel errors in a single call.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.orElseSucceed = orElseSucceed;
const parallelErrors = effect.parallelErrors;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.parallelErrors = parallelErrors;
const parallelFinalizers = fiberRuntime.parallelFinalizers;
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in a tupled fashion.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.parallelFinalizers = parallelFinalizers;
const partition = effect.partition;
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in parallel and returns the result as a
 * tuple.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.partition = partition;
const partitionPar = fiberRuntime.partitionPar;
/**
 * Applies the specified changes to the `FiberRef` values for the fiber
 * running this workflow.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.partitionPar = partitionPar;
const patchFiberRefs = effect.patchFiberRefs;
/**
 * Like `attemptPromise` but produces a defect in case of errors.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.patchFiberRefs = patchFiberRefs;
const promise = effect.promise;
/**
 * Like `promise` but allows for interruption via AbortSignal
 *
 * @since 1.0.0
 * @category constructors
 */
exports.promise = promise;
const promiseInterrupt = effect.promiseInterrupt;
/**
 * Provides the effect with its required context, which eliminates its
 * dependency on `R`.
 *
 * @since 1.0.0
 * @category context
 */
exports.promiseInterrupt = promiseInterrupt;
const provideContext = core.provideContext;
/**
 * Provides a layer to the effect, which translates it to another level.
 *
 * @since 1.0.0
 * @category context
 */
exports.provideContext = provideContext;
const provideLayer = layer.provideLayer;
/**
 * Provides the effect with the single service it requires. If the effect
 * requires more than one service use `provideContext` instead.
 *
 * @since 1.0.0
 * @category context
 */
exports.provideLayer = provideLayer;
const provideService = effect.provideService;
/**
 * Provides the effect with the single service it requires. If the effect
 * requires more than one service use `provideContext` instead.
 *
 * @since 1.0.0
 * @category context
 */
exports.provideService = provideService;
const provideServiceEffect = effect.provideServiceEffect;
/**
 * Splits the context into two parts, providing one part using the
 * specified layer and leaving the remainder `R0`.
 *
 * @since 1.0.0
 * @category context
 */
exports.provideServiceEffect = provideServiceEffect;
const provideSomeLayer = layer.provideSomeLayer;
/**
 * Returns an effect that races this effect with the specified effect,
 * returning the first successful `A` from the faster side. If one effect
 * succeeds, the other will be interrupted. If neither succeeds, then the
 * effect will fail with some error.
 *
 * Note that both effects are disconnected before being raced. This means that
 * interruption of the loser will always be performed in the background. If this
 * behavior is not desired, you can use `Effect.raceWith`, which will not
 * disconnect or interrupt losers.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.provideSomeLayer = provideSomeLayer;
const race = circular.race;
/**
 * Returns an effect that races this effect with all the specified effects,
 * yielding the value of the first effect to succeed with a value. Losers of
 * the race will be interrupted immediately
 *
 * @since 1.0.0
 * @category mutations
 */
exports.race = race;
const raceAll = fiberRuntime.raceAll;
/**
 * Returns an effect that races this effect with the specified effect,
 * returning the first successful `A` from the faster side. If one effect
 * succeeds, the other will be interrupted. If neither succeeds, then the
 * effect will fail with some error.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.raceAll = raceAll;
const raceAwait = circular.raceAwait;
/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to succeed. If neither effect succeeds, then the
 * composed effect will fail with some error.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.raceAwait = raceAwait;
const raceEither = circular.raceEither;
/**
 * Forks this effect and the specified effect into their own fibers, and races
 * them, calling one of two specified callbacks depending on which fiber wins
 * the race. This method does not interrupt, join, or otherwise do anything
 * with the fibers. It can be considered a low-level building block for
 * higher-level operators like `race`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.raceEither = raceEither;
const raceFibersWith = circular.raceFibersWith;
/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to complete, whether by success or failure. If
 * neither effect completes, then the composed effect will not complete.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated. If early return is
 * desired, then instead of performing `l raceFirst r`, perform
 * `l.disconnect raceFirst r.disconnect`, which disconnects left and right
 * interrupt signal, allowing a fast return, with interruption performed
 * in the background.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.raceFibersWith = raceFibersWith;
const raceFirst = circular.raceFirst;
/**
 * Returns an effect that races this effect with the specified effect, calling
 * the specified finisher as soon as one result or the other has been computed.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.raceFirst = raceFirst;
const raceWith = circular.raceWith;
/**
 * Retreives the `Random` service from the context.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.raceWith = raceWith;
const random = effect.random;
/**
 * Retreives the `Random` service from the context and uses it to run the
 * specified workflow.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.random = random;
const randomWith = effect.randomWith;
/**
 * Folds an `Iterable<A>` using an effectual function f, working sequentially
 * from left to right.
 *
 * @since 1.0.0
 * @category folding
 */
exports.randomWith = randomWith;
const reduce = effect.reduce;
/**
 * Reduces an `Iterable<Effect<R, E, A>>` to a single effect, working
 * sequentially.
 *
 * @since 1.0.0
 * @category folding
 */
exports.reduce = reduce;
const reduceAll = effect.reduceAll;
/**
 * Reduces an `Iterable<Effect<R, E, A>>` to a single effect, working in
 * parallel.
 *
 * @since 1.0.0
 * @category folding
 */
exports.reduceAll = reduceAll;
const reduceAllPar = fiberRuntime.reduceAllPar;
/**
 * Folds an `Iterable<A>` using an effectual function f, working sequentially from left to right.
 *
 * @since 1.0.0
 * @category folding
 */
exports.reduceAllPar = reduceAllPar;
const reduceRight = effect.reduceRight;
/**
 * Folds over the elements in this chunk from the left, stopping the fold early
 * when the predicate is not satisfied.
 *
 * @since 1.0.0
 * @category folding
 */
exports.reduceRight = reduceRight;
const reduceWhile = effect.reduceWhile;
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 *
 * @since 1.0.0
 * @category mutations
 */
exports.reduceWhile = reduceWhile;
const refineOrDie = effect.refineOrDie;
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a defect.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.refineOrDie = refineOrDie;
const refineOrDieWith = effect.refineOrDieWith;
/**
 * Keeps only the error matching the specified tag, and terminates the fiber
 * with the rest
 *
 * @since 1.0.0
 * @category mutations
 */
exports.refineOrDieWith = refineOrDieWith;
const refineTagOrDie = effect.refineTagOrDie;
/**
 * Keeps only the error matching the specified tag, and terminates the fiber
 * with the rest, using the specified function to convert the `E` into a defect.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.refineTagOrDie = refineTagOrDie;
const refineTagOrDieWith = effect.refineTagOrDieWith;
/**
 * Fail with the returned value if the `PartialFunction` matches, otherwise
 * continue with our held value.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.refineTagOrDieWith = refineTagOrDieWith;
const reject = effect.reject;
/**
 * Continue with the returned computation if the `PartialFunction` matches,
 * translating the successful match into a failure, otherwise continue with
 * our held value.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.reject = reject;
const rejectEffect = effect.rejectEffect;
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure. Scheduled recurrences are in addition
 * to the first execution, so that `io.repeat(Schedule.once)` yields an effect
 * that executes `io`, and then if that succeeds, executes `io` an additional
 * time.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.rejectEffect = rejectEffect;
const repeat = _schedule.repeat_Effect;
/**
 * Returns a new effect that repeats this effect the specified number of times
 * or until the first failure. Repeats are in addition to the first execution,
 * so that `io.repeatN(1)` yields an effect that executes `io`, and then if
 * that succeeds, executes `io` an additional time.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.repeat = repeat;
const repeatN = effect.repeatN;
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value and
 * schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `pipe(effect, Effect.repeat(Schedule.once()))` yields an effect that executes
 * `effect`, and then if that succeeds, executes `effect` an additional time.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.repeatN = repeatN;
const repeatOrElse = _schedule.repeatOrElse_Effect;
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value and
 * schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `pipe(effect, Effect.repeat(Schedule.once()))` yields an effect that executes
 * `effect`, and then if that succeeds, executes `effect` an additional time.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.repeatOrElse = repeatOrElse;
const repeatOrElseEither = _schedule.repeatOrElseEither_Effect;
/**
 * Repeats this effect until its value satisfies the specified predicate or
 * until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.repeatOrElseEither = repeatOrElseEither;
const repeatUntil = _schedule.repeatUntil_Effect;
/**
 * Repeats this effect until its value satisfies the specified effectful
 * predicate or until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.repeatUntil = repeatUntil;
const repeatUntilEffect = _schedule.repeatUntilEffect_Effect;
/**
 * Repeats this effect until its value is equal to the specified value or
 * until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.repeatUntilEffect = repeatUntilEffect;
const repeatUntilEquals = _schedule.repeatUntilEquals_Effect;
/**
 * Repeats this effect while its value satisfies the specified effectful
 * predicate or until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.repeatUntilEquals = repeatUntilEquals;
const repeatWhile = _schedule.repeatWhile_Effect;
/**
 * Repeats this effect while its value satisfies the specified effectful
 * predicate or until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.repeatWhile = repeatWhile;
const repeatWhileEffect = _schedule.repeatWhileEffect_Effect;
/**
 * Repeats this effect for as long as its value is equal to the specified
 * value or until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.repeatWhileEffect = repeatWhileEffect;
const repeatWhileEquals = _schedule.repeatWhileEquals_Effect;
/**
 * Retries with the specified retry policy. Retries are done following the
 * failure of the original `io` (up to a fixed maximum with `once` or `recurs`
 * for example), so that that `io.retry(Schedule.once)` means "execute `io`
 * and in case of failure, try again once".
 *
 * @since 1.0.0
 * @category mutations
 */
exports.repeatWhileEquals = repeatWhileEquals;
const retry = _schedule.retry_Effect;
/**
 * Retries this effect the specified number of times.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.retry = retry;
const retryN = _schedule.retryN_Effect;
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.retryN = retryN;
const retryOrElse = _schedule.retryOrElse_Effect;
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.retryOrElse = retryOrElse;
const retryOrElseEither = _schedule.retryOrElseEither_Effect;
/**
 * Retries this effect until its error satisfies the specified predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.retryOrElseEither = retryOrElseEither;
const retryUntil = _schedule.retryUntil_Effect;
/**
 * Retries this effect until its error satisfies the specified effectful
 * predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.retryUntil = retryUntil;
const retryUntilEffect = _schedule.retryUntilEffect_Effect;
/**
 * Retries this effect until its error is equal to the specified error.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.retryUntilEffect = retryUntilEffect;
const retryUntilEquals = _schedule.retryUntilEquals_Effect;
/**
 * Retries this effect while its error satisfies the specified predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.retryUntilEquals = retryUntilEquals;
const retryWhile = _schedule.retryWhile_Effect;
/**
 * Retries this effect while its error satisfies the specified effectful
 * predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.retryWhile = retryWhile;
const retryWhileEffect = _schedule.retryWhileEffect_Effect;
/**
 * Retries this effect for as long as its error is equal to the specified
 * error.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.retryWhileEffect = retryWhileEffect;
const retryWhileEquals = _schedule.retryWhileEquals_Effect;
/**
 * Replicates the given effect `n` times.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.retryWhileEquals = retryWhileEquals;
const replicate = effect.replicate;
/**
 * Performs this effect the specified number of times and collects the
 * results.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.replicate = replicate;
const replicateEffect = effect.replicateEffect;
/**
 * Performs this effect the specified number of times, discarding the results.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.replicateEffect = replicateEffect;
const replicateEffectDiscard = effect.replicateEffectDiscard;
/**
 * Unearth the unchecked failure of the effect (opposite of `orDie`).
 *
 * @since 1.0.0
 * @category mutations
 */
exports.replicateEffectDiscard = replicateEffectDiscard;
const resurrect = effect.resurrect;
/**
 * "Zooms in" on the value in the `Right` side of an `Either`, moving the
 * possibility that the value is a `Left` to the error channel.
 *
 * @since 1.0.0
 * @category getters
 */
exports.resurrect = resurrect;
const right = effect.right;
/**
 * Performs the specified operation while "zoomed in" on the `Right` case of an
 * `Either`.
 *
 * @since 1.0.0
 * @category getters
 */
exports.right = right;
const rightWith = effect.rightWith;
/**
 * Returns an effect that accesses the runtime, which can be used to
 * (unsafely) execute tasks. This is useful for integration with legacy code
 * that must call back into Effect code.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.rightWith = rightWith;
const runtime = _runtime.runtime;
/**
 * Retrieves an effect that succeeds with the current runtime flags, which
 * govern behavior and features of the runtime system.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.runtime = runtime;
const runtimeFlags = core.runtimeFlags;
/**
 * Exposes the full `Cause` of failure for the specified effect.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.runtimeFlags = runtimeFlags;
const sandbox = effect.sandbox;
/**
 * Runs this effect according to the specified schedule.
 *
 * See `scheduleFrom` for a variant that allows the schedule's decision to
 * depend on the result of this effect.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.sandbox = sandbox;
const schedule = _schedule.schedule_Effect;
/**
 * Runs this effect according to the specified schedule in a new fiber
 * attached to the current scope.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.schedule = schedule;
const scheduleForked = circular.scheduleForked;
/**
 * Runs this effect according to the specified schedule starting from the
 * specified input value.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.scheduleForked = scheduleForked;
const scheduleFrom = _schedule.scheduleFrom_Effect;
/**
 * @since 1.0.0
 * @category context
 */
exports.scheduleFrom = scheduleFrom;
const scope = fiberRuntime.scope;
/**
 * Accesses the current scope and uses it to perform the specified effect.
 *
 * @since 1.0.0
 * @category scoping
 */
exports.scope = scope;
const scopeWith = fiberRuntime.scopeWith;
/**
 * Scopes all resources uses in this workflow to the lifetime of the workflow,
 * ensuring that their finalizers are run as soon as this workflow completes
 * execution, whether by success, failure, or interruption.
 *
 * @since 1.0.0
 * @category context
 */
exports.scopeWith = scopeWith;
const scoped = fiberRuntime.scopedEffect;
/**
 * Returns a new scoped workflow that runs finalizers added to the scope of
 * this workflow sequentially in the reverse of the order in which they were
 * added. Note that finalizers are run sequentially by default so this only
 * has meaning if used within a scope where finalizers are being run in
 * parallel.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.scoped = scoped;
const sequentialFinalizers = fiberRuntime.sequentialFinalizers;
/**
 * Extracts the specified service from the context of the effect.
 *
 * @since 1.0.0
 * @category context
 */
exports.sequentialFinalizers = sequentialFinalizers;
const service = core.service;
/**
 * Accesses the specified service in the context of the effect.
 *
 * @since 1.0.0
 * @category context
 */
exports.service = service;
const serviceWith = core.serviceWith;
/**
 * Effectfully accesses the specified service in the context of the effect.
 *
 * @since 1.0.0
 * @category context
 */
exports.serviceWith = serviceWith;
const serviceWithEffect = core.serviceWithEffect;
/**
 * Sets the current `ConfigProvider`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.serviceWithEffect = serviceWithEffect;
const setConfigProvider = circularLayer.setConfigProvider;
/**
 * Sets the `FiberRef` values for the fiber running this effect to the values
 * in the specified collection of `FiberRef` values.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.setConfigProvider = setConfigProvider;
const setFiberRefs = effect.setFiberRefs;
/**
 * Returns an effect that suspends for the specified duration. This method is
 * asynchronous, and does not actually block the fiber executing the effect.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.setFiberRefs = setFiberRefs;
const sleep = effect.sleep;
/**
 * Converts an option on values into an option on errors.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.sleep = sleep;
const some = fiberRuntime.some;
/**
 * Extracts the optional value, or returns the given 'orElse'.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.some = some;
const someOrElse = effect.someOrElse;
/**
 * Extracts the optional value, or executes the given 'orElse' effect.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.someOrElse = someOrElse;
const someOrElseEffect = effect.someOrElseEffect;
/**
 * Extracts the optional value, or fails with the given error 'e'.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.someOrElseEffect = someOrElseEffect;
const someOrFail = effect.someOrFail;
/**
 * Extracts the optional value, or fails with a `NoSuchElementException`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.someOrFail = someOrFail;
const someOrFailException = effect.someOrFailException;
/**
 * Perfoms the specified operation while "zoomed in" on the `Some` case of an
 * `Option`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.someOrFailException = someOrFailException;
const someWith = fiberRuntime.someWith;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.someWith = someWith;
const succeed = core.succeed;
/**
 * Returns an effect which succeeds with the value wrapped in a `Left`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.succeed = succeed;
const succeedLeft = effect.succeedLeft;
/**
 * Returns an effect which succeeds with `None`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.succeedLeft = succeedLeft;
const succeedNone = effect.succeedNone;
/**
 * Returns an effect which succeeds with the value wrapped in a `Right`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.succeedNone = succeedNone;
const succeedRight = effect.succeedRight;
/**
 * Returns an effect which succeeds with the value wrapped in a `Some`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.succeedRight = succeedRight;
const succeedSome = effect.succeedSome;
/**
 * Summarizes a effect by computing some value before and after execution, and
 * then combining the values to produce a summary, together with the result of
 * execution.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.succeedSome = succeedSome;
const summarized = effect.summarized;
/**
 * Returns an effect with the behavior of this one, but where all child fibers
 * forked in the effect are reported to the specified supervisor.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.summarized = summarized;
const supervised = circular.supervised;
/**
 * Returns a lazily constructed effect, whose construction may itself require
 * effects. When no context is required (i.e., when `R == unknown`) it is
 * conceptually equivalent to `flatten(succeed(io))`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.supervised = supervised;
const attemptSuspend = effect.attemptSuspend;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.attemptSuspend = attemptSuspend;
const suspend = core.suspend;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.suspend = suspend;
const sync = core.sync;
/**
 * Takes all elements so long as the effectual predicate returns true.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.sync = sync;
const takeWhile = effect.takeWhile;
/**
 * Tags each metric in this effect with the specific tag.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.takeWhile = takeWhile;
const tagged = effect.tagged;
/**
 * Tags each metric in this effect with the specific tag.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.tagged = tagged;
const taggedWithLabels = effect.taggedWithLabels;
/**
 * Tags each metric in this effect with the specific tag.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.taggedWithLabels = taggedWithLabels;
const taggedWithLabelSet = effect.taggedWithLabelSet;
/**
 * Tags each metric in a scope with a the specific tag.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.taggedWithLabelSet = taggedWithLabelSet;
const taggedScoped = fiberRuntime.taggedScoped;
/**
 * Tags each metric in a scope with a the specific tag.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.taggedScoped = taggedScoped;
const taggedScopedWithLabels = fiberRuntime.taggedScopedWithLabels;
/**
 * Tags each metric in a scope with a the specific tag.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.taggedScopedWithLabels = taggedScopedWithLabels;
const taggedScopedWithLabelSet = fiberRuntime.taggedScopedWithLabelSet;
/**
 * Retrieves the metric tags associated with the current scope.
 *
 * @since 1.0.0
 * @category getters
 */
exports.taggedScopedWithLabelSet = taggedScopedWithLabelSet;
const tags = core.tags;
/**
 * @since 1.0.0
 * @category sequencing
 */
exports.tags = tags;
const tap = core.tap;
/**
 * Returns an effect that effectfully "peeks" at the failure or success of
 * this effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
exports.tap = tap;
const tapBoth = effect.tapBoth;
/**
 * Returns an effect that effectually "peeks" at the defect of this effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
exports.tapBoth = tapBoth;
const tapDefect = effect.tapDefect;
/**
 * Returns an effect that effectfully "peeks" at the result of this effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
exports.tapDefect = tapDefect;
const tapEither = effect.tapEither;
/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
exports.tapEither = tapEither;
const tapError = effect.tapError;
/**
 * Returns an effect that effectually "peeks" at the cause of the failure of
 * this effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
exports.tapError = tapError;
const tapErrorCause = effect.tapErrorCause;
/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 * If the partial function isn't defined at the input, the result is
 * equivalent to the original effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
exports.tapErrorCause = tapErrorCause;
const tapSome = effect.tapSome;
/**
 * Returns a new effect that executes this one and times the execution.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.tapSome = tapSome;
const timed = effect.timed;
/**
 * A more powerful variation of `timed` that allows specifying the clock.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.timed = timed;
const timedWith = effect.timedWith;
/**
 * Returns an effect that will timeout this effect, returning `None` if the
 * timeout elapses before the effect has produced a value; and returning
 * `Some` of the produced value otherwise.
 *
 * If the timeout elapses without producing a value, the running effect will
 * be safely interrupted.
 *
 * WARNING: The effect returned by this method will not itself return until
 * the underlying effect is actually interrupted. This leads to more
 * predictable resource utilization. If early return is desired, then instead
 * of using `effect.timeout(d)`, use `effect.disconnect.timeout(d)`, which
 * first disconnects the effect's interruption signal before performing the
 * timeout, resulting in earliest possible return, before an underlying effect
 * has been successfully interrupted.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.timedWith = timedWith;
const timeout = circular.timeout;
/**
 * The same as `timeout`, but instead of producing a `None` in the event of
 * timeout, it will produce the specified error.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.timeout = timeout;
const timeoutFail = circular.timeoutFail;
/**
 * The same as `timeout`, but instead of producing a `None` in the event of
 * timeout, it will produce the specified failure.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.timeoutFail = timeoutFail;
const timeoutFailCause = circular.timeoutFailCause;
/**
 * Returns an effect that will timeout this effect, returning either the
 * default value if the timeout elapses before the effect has produced a
 * value or returning the result of applying the function `f` to the
 * success value of the effect.
 *
 * If the timeout elapses without producing a value, the running effect will
 * be safely interrupted.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.timeoutFailCause = timeoutFailCause;
const timeoutTo = circular.timeoutTo;
/**
 * Constructs a layer from this effect.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.timeoutTo = timeoutTo;
const toLayer = layer.toLayer;
/**
 * Constructs a layer from this effect.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.toLayer = toLayer;
const toLayerContext = layer.fromEffectContext;
/**
 * Constructs a layer from this effect.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.toLayerContext = toLayerContext;
const toLayerDiscard = layer.fromEffectDiscard;
/**
 * Constructs a layer from this effect.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.toLayerDiscard = toLayerDiscard;
const toLayerScopedDiscard = layer.scopedDiscard;
/**
 * Constructs a layer from this effect.
 *
 * @since 1.0.0
 * @category conversions
 */
exports.toLayerScopedDiscard = toLayerScopedDiscard;
const toLayerScoped = layer.toLayerScoped;
/**
 * Transplants specified effects so that when those effects fork other
 * effects, the forked effects will be governed by the scope of the fiber that
 * executes this effect.
 *
 * This can be used to "graft" deep grandchildren onto a higher-level scope,
 * effectively extending their lifespans into the parent scope.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.toLayerScoped = toLayerScoped;
const transplant = core.transplant;
/**
 * Imports a synchronous side-effect into a pure value, translating any
 * thrown exceptions into typed failed effects.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.transplant = transplant;
const attemptCatch = effect.attemptCatch;
/**
 * Create an `Effect` that when executed will construct `promise` and wait for
 * its result, errors will be handled using `onReject`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.attemptCatch = attemptCatch;
const attemptCatchPromise = effect.attemptCatchPromise;
/**
 * Like `tryCatchPromise` but allows for interruption via AbortSignal
 *
 * @since 1.0.0
 * @category constructors
 */
exports.attemptCatchPromise = attemptCatchPromise;
const attemptCatchPromiseInterrupt = effect.attemptCatchPromiseInterrupt;
/**
 * Executed `that` in case `self` fails with a `Cause` that doesn't contain
 * defects, executes `success` in case of successes
 *
 * @since 1.0.0
 * @category alternatives
 */
exports.attemptCatchPromiseInterrupt = attemptCatchPromiseInterrupt;
const attemptOrElse = core.attemptOrElse;
/**
 * Create an `Effect` that when executed will construct `promise` and wait for
 * its result, errors will produce failure as `unknown`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.attemptOrElse = attemptOrElse;
const attemptPromise = effect.attemptPromise;
/**
 * Like `tryPromise` but allows for interruption via AbortSignal
 *
 * @since 1.0.0
 * @category constructors
 */
exports.attemptPromise = attemptPromise;
const attemptPromiseInterrupt = effect.attemptPromiseInterrupt;
/**
 * Runs all the provided effects in sequence respecting the structure provided in input.
 *
 * Supports multiple arguments, a single argument tuple / array or record / struct.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.attemptPromiseInterrupt = attemptPromiseInterrupt;
const all = effect.all;
/**
 * Runs all the provided effects in parallel respecting the structure provided in input.
 *
 * Supports multiple arguments, a single argument tuple / array or record / struct.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.all = all;
const allPar = fiberRuntime.allPar;
/**
 * Used to unify functions that would otherwise return `Effect<A, B, C> | Effect<D, E, F>`
 *
 * @category utilities
 * @since 1.0.0
 */
exports.allPar = allPar;
const unified = core.unified;
/**
 * When this effect succeeds with a cause, then this method returns a new
 * effect that either fails with the cause that this effect succeeded with, or
 * succeeds with unit, depending on whether the cause is empty.
 *
 * This operation is the opposite of `cause`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.unified = unified;
const uncause = effect.uncause;
/**
 * Constructs a `Chunk` by repeatedly applying the effectual function `f` as
 * long as it returns `Some`.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.uncause = uncause;
const unfold = effect.unfold;
/**
 * @since 1.0.0
 * @category interruption
 */
exports.unfold = unfold;
const uninterruptible = core.uninterruptible;
/**
 * @since 1.0.0
 * @category interruption
 */
exports.uninterruptible = uninterruptible;
const uninterruptibleMask = core.uninterruptibleMask;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.uninterruptibleMask = uninterruptibleMask;
const unit = core.unit;
/**
 * Converts a `Effect<R, Either<E, B>, A>` into a `Effect<R, E, Either<A, B>>`.
 * The inverse of `left`.
 *
 * @since 1.0.0
 * @category getters
 */
exports.unit = unit;
const unleft = effect.unleft;
/**
 * The moral equivalent of `if (!p) exp`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.unleft = unleft;
const unless = effect.unless;
/**
 * The moral equivalent of `if (!p) exp` when `p` has side-effects.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.unless = unless;
const unlessEffect = effect.unlessEffect;
/**
 * Takes some fiber failures and converts them into errors.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.unlessEffect = unlessEffect;
const unrefine = effect.unrefine;
/**
 * Takes some fiber failures and converts them into errors, using the specified
 * function to convert the `E` into an `E1 | E2`.
 *
 * @since 1.0.0
 * @category error handling
 */
exports.unrefine = unrefine;
const unrefineWith = effect.unrefineWith;
/**
 * Converts a `Effect<R, Either<B, E>, A>` into a `Effect<R, E, Either<B, A>>`.
 * The inverse of `right`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.unrefineWith = unrefineWith;
const unright = effect.unright;
/**
 * Unsafely creates a new Semaphore
 *
 * @since 1.0.0
 * @category locking
 */
exports.unright = unright;
const unsafeMakeSemaphore = circular.unsafeMakeSemaphore;
/**
 * Creates a new Semaphore
 *
 * @since 1.0.0
 * @category locking
 */
exports.unsafeMakeSemaphore = unsafeMakeSemaphore;
const makeSemaphore = circular.makeSemaphore;
/**
 * @since 1.0.0
 * @category execution
 */
exports.makeSemaphore = makeSemaphore;
const runFork = _runtime.unsafeForkEffect;
/**
 * @since 1.0.0
 * @category execution
 */
exports.runFork = runFork;
const runCallback = _runtime.unsafeRunEffect;
/**
 * @since 1.0.0
 * @category execution
 */
exports.runCallback = runCallback;
const runPromiseEither = _runtime.unsafeRunPromiseEitherEffect;
/**
 * Runs an `Effect` workflow, returning a `Promise` which resolves with the
 * result of the workflow or rejects with an error.
 *
 * @since 1.0.0
 * @category execution
 */
exports.runPromiseEither = runPromiseEither;
const runPromise = _runtime.unsafeRunPromiseEffect;
/**
 * Runs an `Effect` workflow, returning a `Promise` which resolves with the
 * `Exit` value of the workflow.
 *
 * @since 1.0.0
 * @category execution
 */
exports.runPromise = runPromise;
const runPromiseExit = _runtime.unsafeRunPromiseExitEffect;
/**
 * @since 1.0.0
 * @category execution
 */
exports.runPromiseExit = runPromiseExit;
const runSync = _runtime.unsafeRunSyncEffect;
/**
 * @since 1.0.0
 * @category execution
 */
exports.runSync = runSync;
const runSyncExit = _runtime.unsafeRunSyncExitEffect;
/**
 * @since 1.0.0
 * @category execution
 */
exports.runSyncExit = runSyncExit;
const runSyncExitOrFiber = _runtime.unsafeRunSyncExitOrFiberEffect;
/**
 * @since 1.0.0
 * @category execution
 */
exports.runSyncExitOrFiber = runSyncExitOrFiber;
const runSyncEither = _runtime.unsafeRunSyncEitherEffect;
/**
 * The inverse operation `sandbox(effect)`
 *
 * Terminates with exceptions on the `Left` side of the `Either` error, if it
 * exists. Otherwise extracts the contained `Effect< R, E, A>`
 *
 * @since 1.0.0
 * @category mutations
 */
exports.runSyncEither = runSyncEither;
const unsandbox = effect.unsandbox;
/**
 * Scopes all resources acquired by `resource` to the lifetime of `use`
 * without effecting the scope of any resources acquired by `use`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.unsandbox = unsandbox;
const using = fiberRuntime.using;
/**
 * Converts an option on errors into an option on values.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.using = using;
const unsome = fiberRuntime.unsome;
/**
 * Updates the `FiberRef` values for the fiber running this effect using the
 * specified function.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.unsome = unsome;
const updateFiberRefs = effect.updateFiberRefs;
/**
 * @since 1.0.0
 * @category runtime
 */
exports.updateFiberRefs = updateFiberRefs;
const updateRuntimeFlags = core.updateRuntimeFlags;
/**
 * Updates the service with the required service entry.
 *
 * @since 1.0.0
 * @category context
 */
exports.updateRuntimeFlags = updateRuntimeFlags;
const updateService = effect.updateService;
/**
 * Sequentially zips the this result with the specified result. Combines both
 * `Cause`s when both effects fail.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.updateService = updateService;
const validate = effect.validate;
/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel. Combines both Cause<E1>` when both effects fail.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.validate = validate;
const validatePar = circular.validatePar;
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost. To retain all information please use `partition`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.validatePar = validatePar;
const validateAll = effect.validateAll;
/**
 * Feeds elements of type `A` to `f `and accumulates, in parallel, all errors
 * in error channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost. To retain all information please use [[partitionPar]].
 *
 * @since 1.0.0
 * @category mutations
 */
exports.validateAll = validateAll;
const validateAllPar = fiberRuntime.validateAllPar;
/**
 * Feeds elements of type `A` to `f` and accumulates all errors, discarding
 * the successes.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.validateAllPar = validateAllPar;
const validateAllDiscard = effect.validateAllDiscard;
/**
 * Feeds elements of type `A` to `f` in parallel and accumulates all errors,
 * discarding the successes.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.validateAllDiscard = validateAllDiscard;
const validateAllParDiscard = fiberRuntime.validateAllParDiscard;
/**
 * Feeds elements of type `A` to `f` until it succeeds. Returns first success
 * or the accumulation of all errors.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.validateAllParDiscard = validateAllParDiscard;
const validateFirst = effect.validateFirst;
/**
 * Feeds elements of type `A` to `f` until it succeeds. Returns first success
 * or the accumulation of all errors.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.validateFirst = validateFirst;
const validateFirstPar = fiberRuntime.validateFirstPar;
/**
 * Sequentially zips this effect with the specified effect using the specified
 * combiner function. Combines the causes in case both effect fail.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.validateFirstPar = validateFirstPar;
const validateWith = effect.validateWith;
/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, combining their results with the specified `f` function. If
 * both sides fail, then the cause will be combined.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.validateWith = validateWith;
const validateWithPar = circular.validateWithPar;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.validateWithPar = validateWithPar;
const whileLoop = core.whileLoop;
/**
 * The moral equivalent of `if (p) exp`.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.whileLoop = whileLoop;
const when = effect.when;
/**
 * Runs an effect when the supplied partial function matches for the given
 * value, otherwise does nothing.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.when = when;
const whenCase = effect.whenCase;
/**
 * Runs an effect when the supplied partial function matches for the given
 * value, otherwise does nothing.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.whenCase = whenCase;
const whenCaseEffect = effect.whenCaseEffect;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.whenCaseEffect = whenCaseEffect;
const whenEffect = core.whenEffect;
/**
 * Executes this workflow when value of the specified `FiberRef` satisfies the
 * predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.whenEffect = whenEffect;
const whenFiberRef = effect.whenFiberRef;
/**
 * Executes this workflow when the value of the `Ref` satisfies the predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.whenFiberRef = whenFiberRef;
const whenRef = effect.whenRef;
/**
 * Executes the specified workflow with the specified implementation of the
 * clock service.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.whenRef = whenRef;
const withClock = defaultServices.withClock;
/**
 * Sets the implementation of the clock service to the specified value and
 * restores it to its original value when the scope is closed.
 *
 * @since 1.0.0
 * @category constructors
 */
exports.withClock = withClock;
const withClockScoped = fiberRuntime.withClockScoped;
/**
 * Executes the specified workflow with the specified configuration provider.
 *
 * @since 1.0.0
 * @category config
 */
exports.withClockScoped = withClockScoped;
const withConfigProvider = defaultServices.withConfigProvider;
/**
 * Sets the configuration provider to the specified value and restores it to its original value
 * when the scope is closed.
 *
 * @since 1.0.0
 * @category config
 */
exports.withConfigProvider = withConfigProvider;
const withConfigProviderScoped = fiberRuntime.withConfigProviderScoped;
/**
 * Returns a new scoped workflow that returns the result of this workflow as
 * well as a finalizer that can be run to close the scope of this workflow.
 *
 * @since 1.0.0
 * @category mutations
 */
exports.withConfigProviderScoped = withConfigProviderScoped;
const withEarlyRelease = fiberRuntime.withEarlyRelease;
/**
 * @since 1.0.0
 * @category mutations
 */
exports.withEarlyRelease = withEarlyRelease;
const withMetric = effect.withMetric;
/**
 * @since 1.0.0
 * @category concurrency
 */
exports.withMetric = withMetric;
const withParallelism = core.withParallelism;
/**
 * Runs the specified effect with an unbounded maximum number of fibers for
 * parallel operations.
 *
 * @since 1.0.0
 * @category aspects
 */
exports.withParallelism = withParallelism;
const withParallelismUnbounded = core.withParallelismUnbounded;
/**
 * @since 1.0.0
 * @category runtime
 */
exports.withParallelismUnbounded = withParallelismUnbounded;
const withRuntimeFlags = core.withRuntimeFlags;
/**
 * @since 1.0.0
 * @category runtime
 */
exports.withRuntimeFlags = withRuntimeFlags;
const withRuntimeFlagsScoped = fiberRuntime.withRuntimeFlagsScoped;
/**
 * @since 1.0.0
 * @category constructors
 */
exports.withRuntimeFlagsScoped = withRuntimeFlagsScoped;
const yieldNow = core.yieldNow;
/**
 * @since 1.0.0
 * @category products
 */
exports.yieldNow = yieldNow;
const zip = core.zip;
/**
 * @since 1.0.0
 * @category products
 */
exports.zip = zip;
const zipLeft = core.zipLeft;
/**
 * @since 1.0.0
 * @category products
 */
exports.zipLeft = zipLeft;
const zipRight = core.zipRight;
/**
 * @since 1.0.0
 * @category products
 */
exports.zipRight = zipRight;
const zipWith = core.zipWith;
/**
 * Zips this effect and that effect in parallel.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.zipWith = zipWith;
const zipPar = circular.zipPar;
/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, returning result of that effect. If either side fails,
 * then the other side will be interrupted.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.zipPar = zipPar;
const zipParLeft = circular.zipParLeft;
/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, returning result of the provided effect. If either side fails,
 * then the other side will be interrupted.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.zipParLeft = zipParLeft;
const zipParRight = circular.zipParRight;
/**
 * Sequentially zips this effect with the specified effect using the
 * specified combiner function.
 *
 * @since 1.0.0
 * @category zipping
 */
exports.zipParRight = zipParRight;
const zipWithPar = circular.zipWithPar;
exports.zipWithPar = zipWithPar;
//# sourceMappingURL=Effect.js.map