import * as core from "@effect/io/internal_effect_untraced/core";
import * as defaultServices from "@effect/io/internal_effect_untraced/defaultServices";
import * as effect from "@effect/io/internal_effect_untraced/effect";
import * as circular from "@effect/io/internal_effect_untraced/effect/circular";
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime";
import * as layer from "@effect/io/internal_effect_untraced/layer";
import * as circularLayer from "@effect/io/internal_effect_untraced/layer/circular";
import * as _runtime from "@effect/io/internal_effect_untraced/runtime";
import * as _schedule from "@effect/io/internal_effect_untraced/schedule";
/**
 * @since 1.0.0
 * @category symbols
 */
export const EffectTypeId = core.EffectTypeId;
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
export const isEffect = core.isEffect;
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
export const addFinalizer = fiberRuntime.addFinalizer;
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
export const absolve = effect.absolve;
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
export const absolveWith = effect.absolveWith;
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
export const absorb = effect.absorb;
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
export const absorbWith = effect.absorbWith;
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
export const acquireRelease = fiberRuntime.acquireRelease;
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
export const acquireReleaseInterruptible = circular.acquireReleaseInterruptible;
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
export const acquireUseRelease = core.acquireUseRelease;
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
export const allowInterrupt = effect.allowInterrupt;
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
export const as = core.as;
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
export const asLeft = effect.asLeft;
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
export const asLeftError = effect.asLeftError;
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
export const asRight = effect.asRight;
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
export const asRightError = effect.asRightError;
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
export const asSome = effect.asSome;
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
export const asSomeError = effect.asSomeError;
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
export const asUnit = core.asUnit;
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
export const async = core.async;
/**
 * Converts an asynchronous, callback-style API into an `Effect`, which will
 * be executed asynchronously.
 *
 * With this variant, the registration function may return a an `Effect`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const asyncEffect = _runtime.asyncEffect;
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
export const asyncOption = effect.asyncOption;
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
export const asyncInterruptEither = core.asyncInterruptEither;
/**
 * Imports an asynchronous side-effect into an effect allowing control of interruption.
 *
 * The `FiberId` of the fiber that may complete the async callback may be
 * provided to allow for better diagnostics.
 *
 * @since 1.0.0
 * @category constructors
 */
export const asyncInterrupt = core.asyncInterrupt;
/**
 * Imports a synchronous side-effect into a pure `Effect` value, translating any
 * thrown exceptions into typed failed effects creating with `Effect.fail`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const attempt = effect.attempt;
/**
 * Returns a new effect that will not succeed with its value before first
 * waiting for the end of all child fibers forked by the effect.
 *
 * @since 1.0.0
 * @category mutations
 */
export const awaitAllChildren = circular.awaitAllChildren;
/**
 * Returns an effect that, if evaluated, will return the cached result of this
 * effect. Cached results will expire after `timeToLive` duration.
 *
 * @since 1.0.0
 * @category mutations
 */
export const cached = circular.cached;
/**
 * Returns an effect that, if evaluated, will return the cached result of this
 * effect. Cached results will expire after `timeToLive` duration. In
 * addition, returns an effect that can be used to invalidate the current
 * cached value before the `timeToLive` duration expires.
 *
 * @since 1.0.0
 * @category mutations
 */
export const cachedInvalidate = circular.cachedInvalidate;
const _catch = effect._catch;
export {
/**
 * Recovers from specified error.
 *
 * @since 1.0.0
 * @category error handling
 */
_catch as catch };
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
export const catchAll = core.catchAll;
/**
 * Recovers from both recoverable and unrecoverable errors.
 *
 * See `absorb`, `sandbox`, `mapErrorCause` for other functions that can
 * recover from defects.
 *
 * @since 1.0.0
 * @category error handling
 */
export const catchAllCause = core.catchAllCause;
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
export const catchAllDefect = effect.catchAllDefect;
/**
 * Recovers from some or all of the error cases.
 *
 * @since 1.0.0
 * @category error handling
 */
export const catchSome = core.catchSome;
/**
 * Recovers from some or all of the error cases with provided cause.
 *
 * @since 1.0.0
 * @category error handling
 */
export const catchSomeCause = effect.catchSomeCause;
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
export const catchSomeDefect = effect.catchSomeDefect;
/**
 * Recovers from the specified tagged error.
 *
 * @since 1.0.0
 * @category error handling
 */
export const catchTag = effect.catchTag;
/**
 * Recovers from the specified tagged errors.
 *
 * @since 1.0.0
 * @category error handling
 */
export const catchTags = effect.catchTags;
/**
 * Returns an effect that succeeds with the cause of failure of this effect,
 * or `Cause.empty` if the effect did succeed.
 *
 * @since 1.0.0
 * @category error handling
 */
export const cause = effect.cause;
/**
 * Checks the interrupt status, and produces the effect returned by the
 * specified callback.
 *
 * @since 1.0.0
 * @category constructors
 */
export const checkInterruptible = core.checkInterruptible;
/**
 * Retreives the `Clock` service from the context
 *
 * @since 1.0.0
 * @category context
 */
export const clock = effect.clock;
/**
 * Retreives the `Clock` service from the context and provides it to the
 * specified effectful function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const clockWith = effect.clockWith;
/**
 * Uses the default config provider to load the specified config, or fail with
 * an error of type Config.Error.
 *
 * @since 1.0.0
 * @category config
 */
export const config = defaultServices.config;
/**
 * Retrieves the default config provider, and passes it to the specified
 * function, which may return an effect that uses the provider to perform some
 * work or compute some value.
 *
 * @since 1.0.0
 * @category config
 */
export const configProviderWith = defaultServices.configProviderWith;
/**
 * Evaluate each effect in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collect = fiberRuntime.collect;
/**
 * Evaluate each effect in the structure from left to right, and collect the
 * results. For a parallel version, see `collectAllPar`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAll = effect.collectAll;
/**
 * Evaluate each effect in the structure from left to right, and discard the
 * results. For a parallel version, see `collectAllParDiscard`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllDiscard = effect.collectAllDiscard;
/**
 * Evaluate each effect in the structure in parallel, and collect the results.
 * For a sequential version, see `collectAll`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllPar = fiberRuntime.collectAllPar;
/**
 * Evaluate each effect in the structure in parallel, and discard the results.
 * For a sequential version, see `collectAllDiscard`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllParDiscard = fiberRuntime.collectAllParDiscard;
/**
 * Evaluate each effect in the structure with `collectAll`, and collect the
 * results with given partial function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllWith = effect.collectAllWith;
/**
 * Evaluate each effect in the structure with `collectAllPar`, and collect
 * the results with given partial function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllWithPar = fiberRuntime.collectAllWithPar;
/**
 * Returns a filtered, mapped subset of the elements of the iterable based on a
 * partial function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllWithEffect = effect.collectAllWithEffect;
/**
 * Evaluate and run each effect in the structure and collect the results,
 * discarding results from failed effects.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllSuccesses = effect.collectAllSuccesses;
/**
 * Evaluate and run each effect in the structure in parallel and collect the
 * results, discarding results from failed effects.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectAllSuccessesPar = fiberRuntime.collectAllSuccessesPar;
/**
 * Collects the first element of the `Collection<A>` for which the effectual
 * function `f` returns `Some`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectFirst = effect.collectFirst;
/**
 * Evaluate each effect in the structure in parallel, collecting the successful
 * values and discarding the empty cases.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectPar = fiberRuntime.collectPar;
/**
 * Transforms all elements of the chunk for as long as the specified partial
 * function is defined.
 *
 * @since 1.0.0
 * @category constructors
 */
export const collectWhile = effect.collectWhile;
/**
 * Evaluate the predicate, return the given `A` as success if predicate returns
 * true, and the given `E` as error otherwise
 *
 * For effectful conditionals, see `ifEffect`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const cond = effect.cond;
/**
 * @since 1.0.0
 * @category context
 */
export const context = core.context;
/**
 * Accesses the context of the effect.
 *
 * @since 1.0.0
 * @category context
 */
export const contextWith = effect.contextWith;
/**
 * Effectually accesses the context of the effect.
 *
 * @since 1.0.0
 * @category context
 */
export const contextWithEffect = core.contextWithEffect;
/**
 * Fail with the specifed `error` if the supplied partial function does not
 * match, otherwise continue with the returned value.
 *
 * @since 1.0.0
 * @category error handling
 */
export const continueOrFail = effect.continueOrFail;
/**
 * Fail with the specifed `error` if the supplied partial function does not
 * match, otherwise continue with the returned value.
 *
 * @since 1.0.0
 * @category error handling
 */
export const continueOrFailEffect = effect.continueOrFailEffect;
/**
 * Provides some of the context required to run this effect,
 * leaving the remainder `R0`.
 *
 * @since 1.0.0
 * @category context
 */
export const contramapContext = core.contramapContext;
/**
 * Returns a new workflow that will not supervise any fibers forked by this
 * workflow.
 *
 * @since 1.0.0
 * @category supervision
 */
export const daemonChildren = fiberRuntime.daemonChildren;
/**
 * Returns an effect that is delayed from this effect by the specified
 * `Duration`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const delay = effect.delay;
/**
 * Constructs an effect with information about the current `Fiber`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const descriptor = effect.descriptor;
/**
 * Constructs an effect based on information about the current `Fiber`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const descriptorWith = effect.descriptorWith;
/**
 * @since 1.0.0
 * @category constructors
 */
export const die = core.die;
/**
 * Returns an effect that dies with a `RuntimeException` having the specified
 * text message. This method can be used for terminating a fiber because a
 * defect has been detected in the code.
 *
 * @since 1.0.0
 * @category constructors
 */
export const dieMessage = effect.dieMessage;
/**
 * @since 1.0.0
 * @category constructors
 */
export const dieSync = core.dieSync;
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
export const disconnect = circular.disconnect;
/**
 * Returns a new workflow that executes this one and captures the changes in
 * `FiberRef` values.
 *
 * @since 1.0.0
 * @category mutations
 */
export const diffFiberRefs = effect.diffFiberRefs;
/**
 * Binds an effectful value in a `do` scope
 *
 * @since 1.0.0
 * @category do notation
 */
export const bind = effect.bind;
/**
 * Like bind for values
 *
 * @since 1.0.0
 * @category do notation
 */
export const bindValue = effect.bindValue;
/**
 * @since 1.0.0
 * @category do notation
 */
export const Do = effect.Do;
/**
 * @since 1.0.0
 * @category constructors
 */
export const done = core.done;
/**
 * Drops all elements until the effectful predicate returns true.
 *
 * @since 1.0.0
 * @category mutations
 */
export const dropUntil = effect.dropUntil;
/**
 * Drops all elements so long as the predicate returns true.
 *
 * @since 1.0.0
 * @category constructors
 */
export const dropWhile = effect.dropWhile;
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
export const either = core.either;
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
export const ensuring = circular.ensuring;
/**
 * Acts on the children of this fiber (collected into a single fiber),
 * guaranteeing the specified callback will be invoked, whether or not this
 * effect succeeds.
 *
 * @since 1.0.0
 * @category finalization
 */
export const ensuringChild = circular.ensuringChild;
/**
 * Acts on the children of this fiber, guaranteeing the specified callback
 * will be invoked, whether or not this effect succeeds.
 *
 * @since 1.0.0
 * @category finalization
 */
export const ensuringChildren = circular.ensuringChildren;
/**
 * Returns an effect that ignores errors and runs repeatedly until it
 * eventually succeeds.
 *
 * @since 1.0.0
 * @category mutations
 */
export const eventually = effect.eventually;
/**
 * Determines whether any element of the `Iterable<A>` satisfies the effectual
 * predicate `f`, working sequentially.
 *
 * @since 1.0.0
 * @category constructors
 */
export const exists = effect.exists;
/**
 * Determines whether any element of the `Iterable<A>` satisfies the effectual
 * predicate `f`, working in parallel. Interrupts all effects on any failure or
 * finding an element that satisfies the predicate.
 *
 * @since 1.0.0
 * @category constructors
 */
export const existsPar = fiberRuntime.existsPar;
/**
 * @since 1.0.0
 * @category utilities
 */
export const exit = core.exit;
/**
 * @since 1.0.0
 * @category constructors
 */
export const fail = core.fail;
/**
 * @since 1.0.0
 * @category constructors
 */
export const failSync = core.failSync;
/**
 * @since 1.0.0
 * @category constructors
 */
export const failCause = core.failCause;
/**
 * @since 1.0.0
 * @category constructors
 */
export const failCauseSync = core.failCauseSync;
/**
 * @since 1.0.0
 * @category utilities
 */
export const fiberId = core.fiberId;
/**
 * @since 1.0.0
 * @category constructors
 */
export const fiberIdWith = core.fiberIdWith;
/**
 * Filters the collection using the specified effectful predicate.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filter = effect.filter;
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filter` for a sequential version of it.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterPar = fiberRuntime.filterPar;
/**
 * Filters the collection using the specified effectual predicate, removing
 * all elements that satisfy the predicate.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterNot = effect.filterNot;
/**
 * Filters the collection in parallel using the specified effectual predicate.
 * See `filterNot` for a sequential version.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterNotPar = fiberRuntime.filterNotPar;
/**
 * Filter the specified effect with the provided function, dying with specified
 * defect if the predicate fails.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterOrDie = effect.filterOrDie;
/**
 * Filter the specified effect with the provided function, dying with specified
 * message if the predicate fails.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterOrDieMessage = effect.filterOrDieMessage;
/**
 * Filters the specified effect with the provided function returning the value
 * of the effect if it is successful, otherwise returns the value of `orElse`.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterOrElse = effect.filterOrElse;
/**
 * Filters the specified effect with the provided function returning the value
 * of the effect if it is successful, otherwise returns the value of `orElse`.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterOrElseWith = effect.filterOrElseWith;
/**
 * Filter the specified effect with the provided function, failing with specified
 * error if the predicate fails.
 *
 * @since 1.0.0
 * @category filtering
 */
export const filterOrFail = effect.filterOrFail;
/**
 * Returns the first element that satisfies the effectful predicate.
 *
 * @since 1.0.0
 * @category elements
 */
export const find = effect.find;
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
export const firstSuccessOf = effect.firstSuccessOf;
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
export const flatMap = core.flatMap;
/**
 * @since 1.0.0
 * @category sequencing
 */
export const flatten = core.flatten;
/**
 * Unwraps the optional error, defaulting to the provided value.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const flattenErrorOption = effect.flattenErrorOption;
/**
 * Returns an effect that swaps the error/success cases. This allows you to
 * use all methods on the error channel, possibly before flipping back.
 *
 * @since 1.0.0
 * @category mutations
 */
export const flip = core.flip;
/**
 * Swaps the error/value parameters, applies the function `f` and flips the
 * parameters back
 *
 * @since 1.0.0
 * @category mutations
 */
export const flipWith = effect.flipWith;
/**
 * Determines whether all elements of the `Collection<A>` satisfies the effectual
 * predicate `f`.
 *
 * @since 1.0.0
 * @category elements
 */
export const forAll = effect.forAll;
/**
 * @since 1.0.0
 * @category constructors
 */
export const forEach = core.forEach;
/**
 * @since 1.0.0
 * @category constructors
 */
export const forEachDiscard = core.forEachDiscard;
/**
 * Returns a new effect that will pass the success value of this effect to the
 * provided callback. If this effect fails, then the failure will be ignored.
 *
 * @since 1.0.0
 * @category elements
 */
export const forEachEffect = effect.forEachEffect;
/**
 * Applies the function `f` to each element of the `Collection<A>` and returns
 * the result in a new `Chunk<B>` using the specified execution strategy.
 *
 * @since 1.0.0
 * @category constructors
 */
export const forEachExec = fiberRuntime.forEachExec;
/**
 * Applies the function `f` if the argument is non-empty and returns the
 * results in a new `Option<B>`.
 *
 * @since 1.0.0
 * @category elements
 */
export const forEachOption = effect.forEachOption;
/**
 * Same as `forEach`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 *
 * @since 1.0.0
 * @category traversing
 */
export const forEachWithIndex = effect.forEachWithIndex;
/**
 * @since 1.0.0
 * @category constructors
 */
export const forEachPar = fiberRuntime.forEachPar;
/**
 * @since 1.0.0
 * @category constructors
 */
export const forEachParDiscard = fiberRuntime.forEachParDiscard;
/**
 * Same as `forEachPar`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 *
 * @since 1.0.0
 * @category constructors
 */
export const forEachParWithIndex = fiberRuntime.forEachParWithIndex;
/**
 * Repeats this effect forever (until the first error).
 *
 * @since 1.0.0
 * @category mutations
 */
export const forever = effect.forever;
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
export const fork = fiberRuntime.fork;
/**
 * Forks the effect into a new fiber attached to the global scope. Because the
 * new fiber is attached to the global scope, when the fiber executing the
 * returned effect terminates, the forked fiber will continue running.
 *
 * @since 1.0.0
 * @category supervision
 */
export const forkDaemon = fiberRuntime.forkDaemon;
/**
 * Returns an effect that forks all of the specified values, and returns a
 * composite fiber that produces a list of their results, in order.
 *
 * @since 1.0.0
 * @category supervision
 */
export const forkAll = circular.forkAll;
/**
 * Returns an effect that forks all of the specified values, and returns a
 * composite fiber that produces unit. This version is faster than `forkAll`
 * in cases where the results of the forked fibers are not needed.
 *
 * @since 1.0.0
 * @category supervision
 */
export const forkAllDiscard = fiberRuntime.forkAllDiscard;
/**
 * Forks the effect in the specified scope. The fiber will be interrupted
 * when the scope is closed.
 *
 * @since 1.0.0
 * @category supervision
 */
export const forkIn = circular.forkIn;
/**
 * Forks the fiber in a `Scope`, interrupting it when the scope is closed.
 *
 * @since 1.0.0
 * @category supervision
 */
export const forkScoped = circular.forkScoped;
/**
 * Like fork but handles an error with the provided handler.
 *
 * @since 1.0.0
 * @category supervision
 */
export const forkWithErrorHandler = fiberRuntime.forkWithErrorHandler;
/**
 * Lifts an `Either<E, A>` into an `Effect<never, E, A>`.
 *
 * @since 1.0.0
 * @category conversions
 */
export const fromEither = core.fromEither;
/**
 * Lifts an `Either<Cause<E>, A>` into an `Effect<never, E, A>`.
 *
 * @since 1.0.0
 * @category conversions
 */
export const fromEitherCause = effect.fromEitherCause;
/**
 * Creates an `Effect` value that represents the exit value of the specified
 * fiber.
 *
 * @since 1.0.0
 * @category conversions
 */
export const fromFiber = circular.fromFiber;
/**
 * Creates an `Effect` value that represents the exit value of the specified
 * fiber.
 *
 * @since 1.0.0
 * @category conversions
 */
export const fromFiberEffect = circular.fromFiberEffect;
/**
 * Lifts an `Option` into an `Effect` but preserves the error as an option in
 * the error channel, making it easier to compose in some scenarios.
 *
 * @since 1.0.0
 * @category conversions
 */
export const fromOption = core.fromOption;
/**
 * @since 1.0.0
 * @category constructors
 */
export const gen = effect.gen;
/**
 * Returns a collection of all `FiberRef` values for the fiber running this
 * effect.
 *
 * @since 1.0.0
 * @category constructors
 */
export const getFiberRefs = effect.getFiberRefs;
/**
 * Lifts an `Option` into an `Effect`, if the option is not defined it fails
 * with `NoSuchElementException`.
 *
 * @since 1.0.0
 * @category conversions
 */
export const getOrFail = effect.getOrFail;
/**
 * Lifts an `Option` into a `IO`, if the option is not defined it fails with
 * `void`.
 *
 * @since 1.0.0
 * @category conversions
 */
export const getOrFailDiscard = effect.getOrFailDiscard;
/**
 * Lifts an `Maybe` into an `Effect`. If the option is not defined, fail with
 * the specified `e` value.
 *
 * @since 1.0.0
 * @category conversions
 */
export const getOrFailWith = effect.getOrFailWith;
/**
 * Returns a successful effect with the head of the collection if the collection
 * is non-empty, or fails with the error `None` if the collection is empty.
 *
 * @since 1.0.0
 * @category mutations
 */
export const head = effect.head;
/**
 * Runs `onTrue` if the result of `self` is `true` and `onFalse` otherwise.
 *
 * @since 1.0.0
 * @category constructors
 */
export const ifEffect = core.ifEffect;
/**
 * Returns a new effect that ignores the success or failure of this effect.
 *
 * @since 1.0.0
 * @category mutations
 */
export const ignore = effect.ignore;
/**
 * Returns a new effect that ignores the success or failure of this effect,
 * but which also logs failures at the Debug level, just in case the failure
 * turns out to be important.
 *
 * @since 1.0.0
 * @category mutations
 */
export const ignoreLogged = effect.ignoreLogged;
/**
 * Inherits values from all `FiberRef` instances into current fiber.
 *
 * @since 1.0.0
 * @category constructors
 */
export const inheritFiberRefs = effect.inheritFiberRefs;
/**
 * @since 1.0.0
 * @category interruption
 */
export const interrupt = core.interrupt;
/**
 * @since 1.0.0
 * @category interruption
 */
export const interruptWith = core.interruptWith;
/**
 * @since 1.0.0
 * @category interruption
 */
export const interruptible = core.interruptible;
/**
 * @since 1.0.0
 * @category interruption
 */
export const interruptibleMask = core.interruptibleMask;
/**
 * @since 1.0.0
 * @category utilities
 */
export const intoDeferred = core.intoDeferred;
/**
 * Returns `true` if this effect is a failure, `false` otherwise.
 *
 * @since 1.0.0
 * @category getter
 */
export const isFailure = effect.isFailure;
/**
 * Returns `true` if this effect is a success, `false` otherwise.
 *
 * @since 1.0.0
 * @category getter
 */
export const isSuccess = effect.isSuccess;
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
export const iterate = effect.iterate;
/**
 * "Zooms in" on the value in the `Left` side of an `Either`, moving the
 * possibility that the value is a `Right` to the error channel.
 *
 * @since 1.0.0
 * @category mutations
 */
export const left = effect.left;
/**
 * Performs the specified operation while "zoomed in" on the `Left` case of an
 * `Either`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const leftWith = effect.leftWith;
/**
 * Logs the specified message at the current log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const log = effect.log;
/**
 * Logs the specified message at the debug log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logDebug = effect.logDebug;
/**
 * Logs the specified cause at the debug log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logDebugCause = effect.logDebugCause;
/**
 * Logs the specified message and cause at the debug log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logDebugCauseMessage = effect.logDebugCauseMessage;
/**
 * Logs the specified message at the error log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logError = effect.logError;
/**
 * Logs the specified cause at the error log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logErrorCause = effect.logErrorCause;
/**
 * Logs the specified message and cause at the error log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logErrorCauseMessage = effect.logErrorCauseMessage;
/**
 * Logs the specified message at the fatal log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logFatal = effect.logFatal;
/**
 * Logs the specified cause at the fatal log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logFatalCause = effect.logFatalCause;
/**
 * Logs the specified message and cause at the fatal log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logFatalCauseMessage = effect.logFatalCauseMessage;
/**
 * Logs the specified message at the informational log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logInfo = effect.logInfo;
/**
 * Logs the specified cause at the informational log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logInfoCause = effect.logInfoCause;
/**
 * Logs the specified message and cause at the informational log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logInfoCauseMessage = effect.logInfoCauseMessage;
/**
 * Logs the specified message at the warning log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logWarning = effect.logWarning;
/**
 * Logs the specified cause at the warning log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logWarningCause = effect.logWarningCause;
/**
 * Logs the specified message and cause at the warning log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logWarningCauseMessage = effect.logWarningCauseMessage;
/**
 * Logs the specified message at the trace log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logTrace = effect.logTrace;
/**
 * Logs the specified cause at the trace log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logTraceCause = effect.logTraceCause;
/**
 * Logs the specified message and cause at the trace log level.
 *
 * @since 1.0.0
 * @category logging
 */
export const logTraceCauseMessage = effect.logTraceCauseMessage;
/**
 * Adjusts the label for the current logging span.
 *
 * @since 1.0.0
 * @category logging
 */
export const logSpan = effect.logSpan;
/**
 * Annotates each log in this effect with the specified log annotation.
 *
 * @since 1.0.0
 * @category logging
 */
export const logAnnotate = effect.logAnnotate;
/**
 * Retrieves the log annotations associated with the current scope.
 *
 * @since 1.0.0
 * @category logging
 */
export const logAnnotations = effect.logAnnotations;
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
export const loop = effect.loop;
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
export const loopDiscard = effect.loopDiscard;
/**
 * @since 1.0.0
 * @category mapping
 */
export const map = core.map;
/**
 * Statefully and effectfully maps over the elements of this chunk to produce
 * new elements.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapAccum = effect.mapAccum;
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapBoth = effect.mapBoth;
/**
 * Returns an effect with its error channel mapped using the specified function.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapError = core.mapError;
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
export const mapErrorCause = effect.mapErrorCause;
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 *
 * @since 1.0.0
 * @category mapping
 */
export const mapTryCatch = effect.mapTryCatch;
/**
 * Folds over the failure value or the success value to yield an effect that
 * does not fail, but succeeds with the value returned by the left or right
 * function passed to `match`.
 *
 * @since 1.0.0
 * @category folding
 */
export const match = effect.match;
/**
 * @since 1.0.0
 * @category error handling
 */
export const matchCause = core.matchCause;
/**
 * @since 1.0.0
 * @category error handling
 */
export const matchCauseEffect = core.matchCauseEffect;
/**
 * @since 1.0.0
 * @category error handling
 */
export const matchEffect = core.matchEffect;
/**
 * Returns an effect that, if evaluated, will return the lazily computed
 * result of this effect.
 *
 * @since 1.0.0
 * @category mutations
 */
export const memoize = effect.memoize;
/**
 * Returns a memoized version of the specified effectual function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const memoizeFunction = circular.memoizeFunction;
/**
 * Returns a new effect where the error channel has been merged into the
 * success channel to their common combined type.
 *
 * @since 1.0.0
 * @category mutations
 */
export const merge = effect.merge;
/**
 * Merges an `Iterable<Effect<R, E, A>>` to a single effect, working
 * sequentially.
 *
 * @since 1.0.0
 * @category constructors
 */
export const mergeAll = effect.mergeAll;
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
export const mergeAllPar = fiberRuntime.mergeAllPar;
/**
 * Returns a new effect where boolean value of this effect is negated.
 *
 * @since 1.0.0
 * @category mapping
 */
export const negate = effect.negate;
/**
 * Returns a effect that will never produce anything. The moral equivalent of
 * `while(true) {}`, only without the wasted CPU cycles.
 *
 * @since 1.0.0
 * @category constructors
 */
export const never = core.never;
/**
 * Requires the option produced by this value to be `None`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const none = effect.none;
/**
 * Lifts an `Option` into a `Effect`. If the option is empty it succeeds with
 * `void`. If the option is defined it fails with the content.
 *
 * @since 1.0.0
 * @category constructors
 */
export const noneOrFail = effect.noneOrFail;
/**
 * Lifts an `Option` into a `Effect`. If the option is empty it succeeds with
 * `undefined`. If the option is defined it fails with an error computed by
 * the specified function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const noneOrFailWith = effect.noneOrFailWith;
/**
 * @since 1.0.0
 * @category mutations
 */
export const onDone = fiberRuntime.onDone;
/**
 * @since 1.0.0
 * @category mutations
 */
export const onDoneCause = fiberRuntime.onDoneCause;
/**
 * Runs the specified effect if this effect fails, providing the error to the
 * effect if it exists. The provided effect will not be interrupted.
 *
 * @since 1.0.0
 * @category mutations
 */
export const onError = core.onError;
/**
 * Ensures that a cleanup functions runs, whether this effect succeeds, fails,
 * or is interrupted.
 *
 * @category finalization
 * @since 1.0.0
 */
export const onExit = core.onExit;
/**
 * @since 1.0.0
 * @category finalization
 */
export const onInterrupt = core.onInterrupt;
/**
 * Returns an effect that will be executed at most once, even if it is
 * evaluated multiple times.
 *
 * @since 1.0.0
 * @category mutations
 */
export const once = effect.once;
/**
 * Executes this effect, skipping the error but returning optionally the
 * success.
 *
 * @since 1.0.0
 * @category mutations
 */
export const option = effect.option;
/**
 * Translates effect failure into death of the fiber, making all failures
 * unchecked and not a part of the type of the effect.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orDie = core.orDie;
/**
 * Keeps none of the errors, and terminates the fiber with them, using the
 * specified function to convert the `E` into a `Throwable`.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orDieWith = core.orDieWith;
/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * executes the specified effect.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orElse = core.orElse;
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails, in which case, it will produce the value of the specified effect.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orElseEither = effect.orElseEither;
/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * fails with the specified error.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orElseFail = effect.orElseFail;
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails with the `None` value, in which case it will produce the value of
 * the specified effect.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orElseOptional = effect.orElseOptional;
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise succeeds with the specified value.
 *
 * @since 1.0.0
 * @category alternatives
 */
export const orElseSucceed = effect.orElseSucceed;
/**
 * Exposes all parallel errors in a single call.
 *
 * @since 1.0.0
 * @category mutations
 */
export const parallelErrors = effect.parallelErrors;
/**
 * @since 1.0.0
 * @category mutations
 */
export const parallelFinalizers = fiberRuntime.parallelFinalizers;
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in a tupled fashion.
 *
 * @since 1.0.0
 * @category constructors
 */
export const partition = effect.partition;
/**
 * Feeds elements of type `A` to a function `f` that returns an effect.
 * Collects all successes and failures in parallel and returns the result as a
 * tuple.
 *
 * @since 1.0.0
 * @category constructors
 */
export const partitionPar = fiberRuntime.partitionPar;
/**
 * Applies the specified changes to the `FiberRef` values for the fiber
 * running this workflow.
 *
 * @since 1.0.0
 * @category mutations
 */
export const patchFiberRefs = effect.patchFiberRefs;
/**
 * Like `attemptPromise` but produces a defect in case of errors.
 *
 * @since 1.0.0
 * @category constructors
 */
export const promise = effect.promise;
/**
 * Like `promise` but allows for interruption via AbortSignal
 *
 * @since 1.0.0
 * @category constructors
 */
export const promiseInterrupt = effect.promiseInterrupt;
/**
 * Provides the effect with its required context, which eliminates its
 * dependency on `R`.
 *
 * @since 1.0.0
 * @category context
 */
export const provideContext = core.provideContext;
/**
 * Provides a layer to the effect, which translates it to another level.
 *
 * @since 1.0.0
 * @category context
 */
export const provideLayer = layer.provideLayer;
/**
 * Provides the effect with the single service it requires. If the effect
 * requires more than one service use `provideContext` instead.
 *
 * @since 1.0.0
 * @category context
 */
export const provideService = effect.provideService;
/**
 * Provides the effect with the single service it requires. If the effect
 * requires more than one service use `provideContext` instead.
 *
 * @since 1.0.0
 * @category context
 */
export const provideServiceEffect = effect.provideServiceEffect;
/**
 * Splits the context into two parts, providing one part using the
 * specified layer and leaving the remainder `R0`.
 *
 * @since 1.0.0
 * @category context
 */
export const provideSomeLayer = layer.provideSomeLayer;
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
export const race = circular.race;
/**
 * Returns an effect that races this effect with all the specified effects,
 * yielding the value of the first effect to succeed with a value. Losers of
 * the race will be interrupted immediately
 *
 * @since 1.0.0
 * @category mutations
 */
export const raceAll = fiberRuntime.raceAll;
/**
 * Returns an effect that races this effect with the specified effect,
 * returning the first successful `A` from the faster side. If one effect
 * succeeds, the other will be interrupted. If neither succeeds, then the
 * effect will fail with some error.
 *
 * @since 1.0.0
 * @category mutations
 */
export const raceAwait = circular.raceAwait;
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
export const raceEither = circular.raceEither;
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
export const raceFibersWith = circular.raceFibersWith;
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
export const raceFirst = circular.raceFirst;
/**
 * Returns an effect that races this effect with the specified effect, calling
 * the specified finisher as soon as one result or the other has been computed.
 *
 * @since 1.0.0
 * @category mutations
 */
export const raceWith = circular.raceWith;
/**
 * Retreives the `Random` service from the context.
 *
 * @since 1.0.0
 * @category constructors
 */
export const random = effect.random;
/**
 * Retreives the `Random` service from the context and uses it to run the
 * specified workflow.
 *
 * @since 1.0.0
 * @category constructors
 */
export const randomWith = effect.randomWith;
/**
 * Folds an `Iterable<A>` using an effectual function f, working sequentially
 * from left to right.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduce = effect.reduce;
/**
 * Reduces an `Iterable<Effect<R, E, A>>` to a single effect, working
 * sequentially.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduceAll = effect.reduceAll;
/**
 * Reduces an `Iterable<Effect<R, E, A>>` to a single effect, working in
 * parallel.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduceAllPar = fiberRuntime.reduceAllPar;
/**
 * Folds an `Iterable<A>` using an effectual function f, working sequentially from left to right.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduceRight = effect.reduceRight;
/**
 * Folds over the elements in this chunk from the left, stopping the fold early
 * when the predicate is not satisfied.
 *
 * @since 1.0.0
 * @category folding
 */
export const reduceWhile = effect.reduceWhile;
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 *
 * @since 1.0.0
 * @category mutations
 */
export const refineOrDie = effect.refineOrDie;
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a defect.
 *
 * @since 1.0.0
 * @category mutations
 */
export const refineOrDieWith = effect.refineOrDieWith;
/**
 * Keeps only the error matching the specified tag, and terminates the fiber
 * with the rest
 *
 * @since 1.0.0
 * @category mutations
 */
export const refineTagOrDie = effect.refineTagOrDie;
/**
 * Keeps only the error matching the specified tag, and terminates the fiber
 * with the rest, using the specified function to convert the `E` into a defect.
 *
 * @since 1.0.0
 * @category mutations
 */
export const refineTagOrDieWith = effect.refineTagOrDieWith;
/**
 * Fail with the returned value if the `PartialFunction` matches, otherwise
 * continue with our held value.
 *
 * @since 1.0.0
 * @category mutations
 */
export const reject = effect.reject;
/**
 * Continue with the returned computation if the `PartialFunction` matches,
 * translating the successful match into a failure, otherwise continue with
 * our held value.
 *
 * @since 1.0.0
 * @category mutations
 */
export const rejectEffect = effect.rejectEffect;
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
export const repeat = _schedule.repeat_Effect;
/**
 * Returns a new effect that repeats this effect the specified number of times
 * or until the first failure. Repeats are in addition to the first execution,
 * so that `io.repeatN(1)` yields an effect that executes `io`, and then if
 * that succeeds, executes `io` an additional time.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatN = effect.repeatN;
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
export const repeatOrElse = _schedule.repeatOrElse_Effect;
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
export const repeatOrElseEither = _schedule.repeatOrElseEither_Effect;
/**
 * Repeats this effect until its value satisfies the specified predicate or
 * until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatUntil = _schedule.repeatUntil_Effect;
/**
 * Repeats this effect until its value satisfies the specified effectful
 * predicate or until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatUntilEffect = _schedule.repeatUntilEffect_Effect;
/**
 * Repeats this effect until its value is equal to the specified value or
 * until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatUntilEquals = _schedule.repeatUntilEquals_Effect;
/**
 * Repeats this effect while its value satisfies the specified effectful
 * predicate or until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatWhile = _schedule.repeatWhile_Effect;
/**
 * Repeats this effect while its value satisfies the specified effectful
 * predicate or until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatWhileEffect = _schedule.repeatWhileEffect_Effect;
/**
 * Repeats this effect for as long as its value is equal to the specified
 * value or until the first failure.
 *
 * @since 1.0.0
 * @category mutations
 */
export const repeatWhileEquals = _schedule.repeatWhileEquals_Effect;
/**
 * Retries with the specified retry policy. Retries are done following the
 * failure of the original `io` (up to a fixed maximum with `once` or `recurs`
 * for example), so that that `io.retry(Schedule.once)` means "execute `io`
 * and in case of failure, try again once".
 *
 * @since 1.0.0
 * @category mutations
 */
export const retry = _schedule.retry_Effect;
/**
 * Retries this effect the specified number of times.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryN = _schedule.retryN_Effect;
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryOrElse = _schedule.retryOrElse_Effect;
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryOrElseEither = _schedule.retryOrElseEither_Effect;
/**
 * Retries this effect until its error satisfies the specified predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryUntil = _schedule.retryUntil_Effect;
/**
 * Retries this effect until its error satisfies the specified effectful
 * predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryUntilEffect = _schedule.retryUntilEffect_Effect;
/**
 * Retries this effect until its error is equal to the specified error.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryUntilEquals = _schedule.retryUntilEquals_Effect;
/**
 * Retries this effect while its error satisfies the specified predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryWhile = _schedule.retryWhile_Effect;
/**
 * Retries this effect while its error satisfies the specified effectful
 * predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryWhileEffect = _schedule.retryWhileEffect_Effect;
/**
 * Retries this effect for as long as its error is equal to the specified
 * error.
 *
 * @since 1.0.0
 * @category mutations
 */
export const retryWhileEquals = _schedule.retryWhileEquals_Effect;
/**
 * Replicates the given effect `n` times.
 *
 * @since 1.0.0
 * @category mutations
 */
export const replicate = effect.replicate;
/**
 * Performs this effect the specified number of times and collects the
 * results.
 *
 * @since 1.0.0
 * @category mutations
 */
export const replicateEffect = effect.replicateEffect;
/**
 * Performs this effect the specified number of times, discarding the results.
 *
 * @since 1.0.0
 * @category mutations
 */
export const replicateEffectDiscard = effect.replicateEffectDiscard;
/**
 * Unearth the unchecked failure of the effect (opposite of `orDie`).
 *
 * @since 1.0.0
 * @category mutations
 */
export const resurrect = effect.resurrect;
/**
 * "Zooms in" on the value in the `Right` side of an `Either`, moving the
 * possibility that the value is a `Left` to the error channel.
 *
 * @since 1.0.0
 * @category getters
 */
export const right = effect.right;
/**
 * Performs the specified operation while "zoomed in" on the `Right` case of an
 * `Either`.
 *
 * @since 1.0.0
 * @category getters
 */
export const rightWith = effect.rightWith;
/**
 * Returns an effect that accesses the runtime, which can be used to
 * (unsafely) execute tasks. This is useful for integration with legacy code
 * that must call back into Effect code.
 *
 * @since 1.0.0
 * @category constructors
 */
export const runtime = _runtime.runtime;
/**
 * Retrieves an effect that succeeds with the current runtime flags, which
 * govern behavior and features of the runtime system.
 *
 * @since 1.0.0
 * @category constructors
 */
export const runtimeFlags = core.runtimeFlags;
/**
 * Exposes the full `Cause` of failure for the specified effect.
 *
 * @since 1.0.0
 * @category error handling
 */
export const sandbox = effect.sandbox;
/**
 * Runs this effect according to the specified schedule.
 *
 * See `scheduleFrom` for a variant that allows the schedule's decision to
 * depend on the result of this effect.
 *
 * @since 1.0.0
 * @category mutations
 */
export const schedule = _schedule.schedule_Effect;
/**
 * Runs this effect according to the specified schedule in a new fiber
 * attached to the current scope.
 *
 * @since 1.0.0
 * @category mutations
 */
export const scheduleForked = circular.scheduleForked;
/**
 * Runs this effect according to the specified schedule starting from the
 * specified input value.
 *
 * @since 1.0.0
 * @category mutations
 */
export const scheduleFrom = _schedule.scheduleFrom_Effect;
/**
 * @since 1.0.0
 * @category context
 */
export const scope = fiberRuntime.scope;
/**
 * Accesses the current scope and uses it to perform the specified effect.
 *
 * @since 1.0.0
 * @category scoping
 */
export const scopeWith = fiberRuntime.scopeWith;
/**
 * Scopes all resources uses in this workflow to the lifetime of the workflow,
 * ensuring that their finalizers are run as soon as this workflow completes
 * execution, whether by success, failure, or interruption.
 *
 * @since 1.0.0
 * @category context
 */
export const scoped = fiberRuntime.scopedEffect;
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
export const sequentialFinalizers = fiberRuntime.sequentialFinalizers;
/**
 * Extracts the specified service from the context of the effect.
 *
 * @since 1.0.0
 * @category context
 */
export const service = core.service;
/**
 * Accesses the specified service in the context of the effect.
 *
 * @since 1.0.0
 * @category context
 */
export const serviceWith = core.serviceWith;
/**
 * Effectfully accesses the specified service in the context of the effect.
 *
 * @since 1.0.0
 * @category context
 */
export const serviceWithEffect = core.serviceWithEffect;
/**
 * Sets the current `ConfigProvider`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const setConfigProvider = circularLayer.setConfigProvider;
/**
 * Sets the `FiberRef` values for the fiber running this effect to the values
 * in the specified collection of `FiberRef` values.
 *
 * @since 1.0.0
 * @category mutations
 */
export const setFiberRefs = effect.setFiberRefs;
/**
 * Returns an effect that suspends for the specified duration. This method is
 * asynchronous, and does not actually block the fiber executing the effect.
 *
 * @since 1.0.0
 * @category constructors
 */
export const sleep = effect.sleep;
/**
 * Converts an option on values into an option on errors.
 *
 * @since 1.0.0
 * @category mutations
 */
export const some = fiberRuntime.some;
/**
 * Extracts the optional value, or returns the given 'orElse'.
 *
 * @since 1.0.0
 * @category mutations
 */
export const someOrElse = effect.someOrElse;
/**
 * Extracts the optional value, or executes the given 'orElse' effect.
 *
 * @since 1.0.0
 * @category mutations
 */
export const someOrElseEffect = effect.someOrElseEffect;
/**
 * Extracts the optional value, or fails with the given error 'e'.
 *
 * @since 1.0.0
 * @category mutations
 */
export const someOrFail = effect.someOrFail;
/**
 * Extracts the optional value, or fails with a `NoSuchElementException`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const someOrFailException = effect.someOrFailException;
/**
 * Perfoms the specified operation while "zoomed in" on the `Some` case of an
 * `Option`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const someWith = fiberRuntime.someWith;
/**
 * @since 1.0.0
 * @category constructors
 */
export const succeed = core.succeed;
/**
 * Returns an effect which succeeds with the value wrapped in a `Left`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const succeedLeft = effect.succeedLeft;
/**
 * Returns an effect which succeeds with `None`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const succeedNone = effect.succeedNone;
/**
 * Returns an effect which succeeds with the value wrapped in a `Right`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const succeedRight = effect.succeedRight;
/**
 * Returns an effect which succeeds with the value wrapped in a `Some`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const succeedSome = effect.succeedSome;
/**
 * Summarizes a effect by computing some value before and after execution, and
 * then combining the values to produce a summary, together with the result of
 * execution.
 *
 * @since 1.0.0
 * @category mutations
 */
export const summarized = effect.summarized;
/**
 * Returns an effect with the behavior of this one, but where all child fibers
 * forked in the effect are reported to the specified supervisor.
 *
 * @since 1.0.0
 * @category mutations
 */
export const supervised = circular.supervised;
/**
 * Returns a lazily constructed effect, whose construction may itself require
 * effects. When no context is required (i.e., when `R == unknown`) it is
 * conceptually equivalent to `flatten(succeed(io))`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const attemptSuspend = effect.attemptSuspend;
/**
 * @since 1.0.0
 * @category constructors
 */
export const suspend = core.suspend;
/**
 * @since 1.0.0
 * @category constructors
 */
export const sync = core.sync;
/**
 * Takes all elements so long as the effectual predicate returns true.
 *
 * @since 1.0.0
 * @category constructors
 */
export const takeWhile = effect.takeWhile;
/**
 * Tags each metric in this effect with the specific tag.
 *
 * @since 1.0.0
 * @category mutations
 */
export const tagged = effect.tagged;
/**
 * Tags each metric in this effect with the specific tag.
 *
 * @since 1.0.0
 * @category mutations
 */
export const taggedWithLabels = effect.taggedWithLabels;
/**
 * Tags each metric in this effect with the specific tag.
 *
 * @since 1.0.0
 * @category mutations
 */
export const taggedWithLabelSet = effect.taggedWithLabelSet;
/**
 * Tags each metric in a scope with a the specific tag.
 *
 * @since 1.0.0
 * @category constructors
 */
export const taggedScoped = fiberRuntime.taggedScoped;
/**
 * Tags each metric in a scope with a the specific tag.
 *
 * @since 1.0.0
 * @category constructors
 */
export const taggedScopedWithLabels = fiberRuntime.taggedScopedWithLabels;
/**
 * Tags each metric in a scope with a the specific tag.
 *
 * @since 1.0.0
 * @category constructors
 */
export const taggedScopedWithLabelSet = fiberRuntime.taggedScopedWithLabelSet;
/**
 * Retrieves the metric tags associated with the current scope.
 *
 * @since 1.0.0
 * @category getters
 */
export const tags = core.tags;
/**
 * @since 1.0.0
 * @category sequencing
 */
export const tap = core.tap;
/**
 * Returns an effect that effectfully "peeks" at the failure or success of
 * this effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapBoth = effect.tapBoth;
/**
 * Returns an effect that effectually "peeks" at the defect of this effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapDefect = effect.tapDefect;
/**
 * Returns an effect that effectfully "peeks" at the result of this effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapEither = effect.tapEither;
/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapError = effect.tapError;
/**
 * Returns an effect that effectually "peeks" at the cause of the failure of
 * this effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapErrorCause = effect.tapErrorCause;
/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 * If the partial function isn't defined at the input, the result is
 * equivalent to the original effect.
 *
 * @since 1.0.0
 * @category sequencing
 */
export const tapSome = effect.tapSome;
/**
 * Returns a new effect that executes this one and times the execution.
 *
 * @since 1.0.0
 * @category mutations
 */
export const timed = effect.timed;
/**
 * A more powerful variation of `timed` that allows specifying the clock.
 *
 * @since 1.0.0
 * @category mutations
 */
export const timedWith = effect.timedWith;
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
export const timeout = circular.timeout;
/**
 * The same as `timeout`, but instead of producing a `None` in the event of
 * timeout, it will produce the specified error.
 *
 * @since 1.0.0
 * @category mutations
 */
export const timeoutFail = circular.timeoutFail;
/**
 * The same as `timeout`, but instead of producing a `None` in the event of
 * timeout, it will produce the specified failure.
 *
 * @since 1.0.0
 * @category mutations
 */
export const timeoutFailCause = circular.timeoutFailCause;
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
export const timeoutTo = circular.timeoutTo;
/**
 * Constructs a layer from this effect.
 *
 * @since 1.0.0
 * @category conversions
 */
export const toLayer = layer.toLayer;
/**
 * Constructs a layer from this effect.
 *
 * @since 1.0.0
 * @category conversions
 */
export const toLayerContext = layer.fromEffectContext;
/**
 * Constructs a layer from this effect.
 *
 * @since 1.0.0
 * @category conversions
 */
export const toLayerDiscard = layer.fromEffectDiscard;
/**
 * Constructs a layer from this effect.
 *
 * @since 1.0.0
 * @category conversions
 */
export const toLayerScopedDiscard = layer.scopedDiscard;
/**
 * Constructs a layer from this effect.
 *
 * @since 1.0.0
 * @category conversions
 */
export const toLayerScoped = layer.toLayerScoped;
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
export const transplant = core.transplant;
/**
 * Imports a synchronous side-effect into a pure value, translating any
 * thrown exceptions into typed failed effects.
 *
 * @since 1.0.0
 * @category constructors
 */
export const attemptCatch = effect.attemptCatch;
/**
 * Create an `Effect` that when executed will construct `promise` and wait for
 * its result, errors will be handled using `onReject`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const attemptCatchPromise = effect.attemptCatchPromise;
/**
 * Like `tryCatchPromise` but allows for interruption via AbortSignal
 *
 * @since 1.0.0
 * @category constructors
 */
export const attemptCatchPromiseInterrupt = effect.attemptCatchPromiseInterrupt;
/**
 * Executed `that` in case `self` fails with a `Cause` that doesn't contain
 * defects, executes `success` in case of successes
 *
 * @since 1.0.0
 * @category alternatives
 */
export const attemptOrElse = core.attemptOrElse;
/**
 * Create an `Effect` that when executed will construct `promise` and wait for
 * its result, errors will produce failure as `unknown`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const attemptPromise = effect.attemptPromise;
/**
 * Like `tryPromise` but allows for interruption via AbortSignal
 *
 * @since 1.0.0
 * @category constructors
 */
export const attemptPromiseInterrupt = effect.attemptPromiseInterrupt;
/**
 * Runs all the provided effects in sequence respecting the structure provided in input.
 *
 * Supports multiple arguments, a single argument tuple / array or record / struct.
 *
 * @since 1.0.0
 * @category constructors
 */
export const all = effect.all;
/**
 * Runs all the provided effects in parallel respecting the structure provided in input.
 *
 * Supports multiple arguments, a single argument tuple / array or record / struct.
 *
 * @since 1.0.0
 * @category constructors
 */
export const allPar = fiberRuntime.allPar;
/**
 * Used to unify functions that would otherwise return `Effect<A, B, C> | Effect<D, E, F>`
 *
 * @category utilities
 * @since 1.0.0
 */
export const unified = core.unified;
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
export const uncause = effect.uncause;
/**
 * Constructs a `Chunk` by repeatedly applying the effectual function `f` as
 * long as it returns `Some`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const unfold = effect.unfold;
/**
 * @since 1.0.0
 * @category interruption
 */
export const uninterruptible = core.uninterruptible;
/**
 * @since 1.0.0
 * @category interruption
 */
export const uninterruptibleMask = core.uninterruptibleMask;
/**
 * @since 1.0.0
 * @category constructors
 */
export const unit = core.unit;
/**
 * Converts a `Effect<R, Either<E, B>, A>` into a `Effect<R, E, Either<A, B>>`.
 * The inverse of `left`.
 *
 * @since 1.0.0
 * @category getters
 */
export const unleft = effect.unleft;
/**
 * The moral equivalent of `if (!p) exp`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const unless = effect.unless;
/**
 * The moral equivalent of `if (!p) exp` when `p` has side-effects.
 *
 * @since 1.0.0
 * @category mutations
 */
export const unlessEffect = effect.unlessEffect;
/**
 * Takes some fiber failures and converts them into errors.
 *
 * @since 1.0.0
 * @category mutations
 */
export const unrefine = effect.unrefine;
/**
 * Takes some fiber failures and converts them into errors, using the specified
 * function to convert the `E` into an `E1 | E2`.
 *
 * @since 1.0.0
 * @category error handling
 */
export const unrefineWith = effect.unrefineWith;
/**
 * Converts a `Effect<R, Either<B, E>, A>` into a `Effect<R, E, Either<B, A>>`.
 * The inverse of `right`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const unright = effect.unright;
/**
 * Unsafely creates a new Semaphore
 *
 * @since 1.0.0
 * @category locking
 */
export const unsafeMakeSemaphore = circular.unsafeMakeSemaphore;
/**
 * Creates a new Semaphore
 *
 * @since 1.0.0
 * @category locking
 */
export const makeSemaphore = circular.makeSemaphore;
/**
 * @since 1.0.0
 * @category execution
 */
export const runFork = _runtime.unsafeForkEffect;
/**
 * @since 1.0.0
 * @category execution
 */
export const runCallback = _runtime.unsafeRunEffect;
/**
 * @since 1.0.0
 * @category execution
 */
export const runPromiseEither = _runtime.unsafeRunPromiseEitherEffect;
/**
 * Runs an `Effect` workflow, returning a `Promise` which resolves with the
 * result of the workflow or rejects with an error.
 *
 * @since 1.0.0
 * @category execution
 */
export const runPromise = _runtime.unsafeRunPromiseEffect;
/**
 * Runs an `Effect` workflow, returning a `Promise` which resolves with the
 * `Exit` value of the workflow.
 *
 * @since 1.0.0
 * @category execution
 */
export const runPromiseExit = _runtime.unsafeRunPromiseExitEffect;
/**
 * @since 1.0.0
 * @category execution
 */
export const runSync = _runtime.unsafeRunSyncEffect;
/**
 * @since 1.0.0
 * @category execution
 */
export const runSyncExit = _runtime.unsafeRunSyncExitEffect;
/**
 * @since 1.0.0
 * @category execution
 */
export const runSyncExitOrFiber = _runtime.unsafeRunSyncExitOrFiberEffect;
/**
 * @since 1.0.0
 * @category execution
 */
export const runSyncEither = _runtime.unsafeRunSyncEitherEffect;
/**
 * The inverse operation `sandbox(effect)`
 *
 * Terminates with exceptions on the `Left` side of the `Either` error, if it
 * exists. Otherwise extracts the contained `Effect< R, E, A>`
 *
 * @since 1.0.0
 * @category mutations
 */
export const unsandbox = effect.unsandbox;
/**
 * Scopes all resources acquired by `resource` to the lifetime of `use`
 * without effecting the scope of any resources acquired by `use`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const using = fiberRuntime.using;
/**
 * Converts an option on errors into an option on values.
 *
 * @since 1.0.0
 * @category mutations
 */
export const unsome = fiberRuntime.unsome;
/**
 * Updates the `FiberRef` values for the fiber running this effect using the
 * specified function.
 *
 * @since 1.0.0
 * @category constructors
 */
export const updateFiberRefs = effect.updateFiberRefs;
/**
 * @since 1.0.0
 * @category runtime
 */
export const updateRuntimeFlags = core.updateRuntimeFlags;
/**
 * Updates the service with the required service entry.
 *
 * @since 1.0.0
 * @category context
 */
export const updateService = effect.updateService;
/**
 * Sequentially zips the this result with the specified result. Combines both
 * `Cause`s when both effects fail.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validate = effect.validate;
/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel. Combines both Cause<E1>` when both effects fail.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validatePar = circular.validatePar;
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
export const validateAll = effect.validateAll;
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
export const validateAllPar = fiberRuntime.validateAllPar;
/**
 * Feeds elements of type `A` to `f` and accumulates all errors, discarding
 * the successes.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validateAllDiscard = effect.validateAllDiscard;
/**
 * Feeds elements of type `A` to `f` in parallel and accumulates all errors,
 * discarding the successes.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validateAllParDiscard = fiberRuntime.validateAllParDiscard;
/**
 * Feeds elements of type `A` to `f` until it succeeds. Returns first success
 * or the accumulation of all errors.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validateFirst = effect.validateFirst;
/**
 * Feeds elements of type `A` to `f` until it succeeds. Returns first success
 * or the accumulation of all errors.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validateFirstPar = fiberRuntime.validateFirstPar;
/**
 * Sequentially zips this effect with the specified effect using the specified
 * combiner function. Combines the causes in case both effect fail.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validateWith = effect.validateWith;
/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, combining their results with the specified `f` function. If
 * both sides fail, then the cause will be combined.
 *
 * @since 1.0.0
 * @category mutations
 */
export const validateWithPar = circular.validateWithPar;
/**
 * @since 1.0.0
 * @category constructors
 */
export const whileLoop = core.whileLoop;
/**
 * The moral equivalent of `if (p) exp`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const when = effect.when;
/**
 * Runs an effect when the supplied partial function matches for the given
 * value, otherwise does nothing.
 *
 * @since 1.0.0
 * @category mutations
 */
export const whenCase = effect.whenCase;
/**
 * Runs an effect when the supplied partial function matches for the given
 * value, otherwise does nothing.
 *
 * @since 1.0.0
 * @category mutations
 */
export const whenCaseEffect = effect.whenCaseEffect;
/**
 * @since 1.0.0
 * @category constructors
 */
export const whenEffect = core.whenEffect;
/**
 * Executes this workflow when value of the specified `FiberRef` satisfies the
 * predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
export const whenFiberRef = effect.whenFiberRef;
/**
 * Executes this workflow when the value of the `Ref` satisfies the predicate.
 *
 * @since 1.0.0
 * @category mutations
 */
export const whenRef = effect.whenRef;
/**
 * Executes the specified workflow with the specified implementation of the
 * clock service.
 *
 * @since 1.0.0
 * @category mutations
 */
export const withClock = defaultServices.withClock;
/**
 * Sets the implementation of the clock service to the specified value and
 * restores it to its original value when the scope is closed.
 *
 * @since 1.0.0
 * @category constructors
 */
export const withClockScoped = fiberRuntime.withClockScoped;
/**
 * Executes the specified workflow with the specified configuration provider.
 *
 * @since 1.0.0
 * @category config
 */
export const withConfigProvider = defaultServices.withConfigProvider;
/**
 * Sets the configuration provider to the specified value and restores it to its original value
 * when the scope is closed.
 *
 * @since 1.0.0
 * @category config
 */
export const withConfigProviderScoped = fiberRuntime.withConfigProviderScoped;
/**
 * Returns a new scoped workflow that returns the result of this workflow as
 * well as a finalizer that can be run to close the scope of this workflow.
 *
 * @since 1.0.0
 * @category mutations
 */
export const withEarlyRelease = fiberRuntime.withEarlyRelease;
/**
 * @since 1.0.0
 * @category mutations
 */
export const withMetric = effect.withMetric;
/**
 * @since 1.0.0
 * @category concurrency
 */
export const withParallelism = core.withParallelism;
/**
 * Runs the specified effect with an unbounded maximum number of fibers for
 * parallel operations.
 *
 * @since 1.0.0
 * @category aspects
 */
export const withParallelismUnbounded = core.withParallelismUnbounded;
/**
 * @since 1.0.0
 * @category runtime
 */
export const withRuntimeFlags = core.withRuntimeFlags;
/**
 * @since 1.0.0
 * @category runtime
 */
export const withRuntimeFlagsScoped = fiberRuntime.withRuntimeFlagsScoped;
/**
 * @since 1.0.0
 * @category constructors
 */
export const yieldNow = core.yieldNow;
/**
 * @since 1.0.0
 * @category products
 */
export const zip = core.zip;
/**
 * @since 1.0.0
 * @category products
 */
export const zipLeft = core.zipLeft;
/**
 * @since 1.0.0
 * @category products
 */
export const zipRight = core.zipRight;
/**
 * @since 1.0.0
 * @category products
 */
export const zipWith = core.zipWith;
/**
 * Zips this effect and that effect in parallel.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zipPar = circular.zipPar;
/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, returning result of that effect. If either side fails,
 * then the other side will be interrupted.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zipParLeft = circular.zipParLeft;
/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, returning result of the provided effect. If either side fails,
 * then the other side will be interrupted.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zipParRight = circular.zipParRight;
/**
 * Sequentially zips this effect with the specified effect using the
 * specified combiner function.
 *
 * @since 1.0.0
 * @category zipping
 */
export const zipWithPar = circular.zipWithPar;
//# sourceMappingURL=Effect.mjs.map