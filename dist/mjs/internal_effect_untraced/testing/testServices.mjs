import * as Context from "@effect/data/Context";
import * as Debug from "@effect/io/Debug";
import * as Effect from "@effect/io/Effect";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as defaultServices from "@effect/io/internal_effect_untraced/defaultServices";
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime";
import * as layer from "@effect/io/internal_effect_untraced/layer";
import * as ref from "@effect/io/internal_effect_untraced/ref";
import * as Annotations from "@effect/io/internal_effect_untraced/testing/annotations";
import * as Live from "@effect/io/internal_effect_untraced/testing/live";
import * as Sized from "@effect/io/internal_effect_untraced/testing/sized";
import * as TestAnnotationMap from "@effect/io/internal_effect_untraced/testing/testAnnotationMap";
import * as TestConfig from "@effect/io/internal_effect_untraced/testing/testConfig";
/**
 * The default Effect test services.
 *
 * @internal
 */
export const liveServices = /*#__PURE__*/Context.add(TestConfig.Tag, TestConfig.make({
  repeats: 100,
  retries: 100,
  samples: 200,
  shrinks: 1000
}))( /*#__PURE__*/Context.add(Sized.Tag, Sized.make(100))( /*#__PURE__*/Context.add(Live.Tag, Live.make(defaultServices.liveServices))( /*#__PURE__*/Context.make(Annotations.Tag, /*#__PURE__*/Annotations.make( /*#__PURE__*/ref.unsafeMake( /*#__PURE__*/TestAnnotationMap.empty()))))));
/** @internal */
export const currentServices = /*#__PURE__*/core.fiberRefUnsafeMakeContext(liveServices);
/**
 * Retrieves the `Annotations` service for this test.
 *
 * @internal
 */
export const annotations = /*#__PURE__*/Debug.methodWithTrace(trace => () => annotationsWith(core.succeed).traced(trace));
/**
 * Retrieves the `Annotations` service for this test and uses it to run the
 * specified workflow.
 *
 * @internal
 */
export const annotationsWith = /*#__PURE__*/Debug.methodWithTrace(trace => f => core.fiberRefGetWith(currentServices, services => f(Context.get(Annotations.Tag)(services))).traced(trace));
/**
 * Executes the specified workflow with the specified implementation of the
 * annotations service.
 *
 * @internal
 */
export const withAnnotations = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, annotations) => core.fiberRefLocallyWith(currentServices, Context.add(Annotations.Tag, annotations))(effect).traced(trace));
/**
 * Sets the implementation of the annotations service to the specified value
 * and restores it to its original value when the scope is closed.
 *
 * @internal
 */
export const withAnnotationsScoped = /*#__PURE__*/Debug.methodWithTrace(trace => annotations => fiberRuntime.fiberRefLocallyScopedWith(currentServices, Context.add(Annotations.Tag, annotations)).traced(trace));
/**
 * Constructs a new `Annotations` service wrapped in a layer.
 *
 * @internal
 */
export const annotationsLayer = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scoped(Annotations.Tag, core.tap(withAnnotationsScoped)(core.map(Annotations.make)(core.sync(() => ref.unsafeMake(TestAnnotationMap.empty()))))));
/**
 * Accesses an `Annotations` instance in the context and retrieves the
 * annotation of the specified type, or its default value if there is none.
 *
 * @internal
 */
export const get = /*#__PURE__*/Debug.methodWithTrace(trace => key => annotationsWith(annotations => annotations.get(key)).traced(trace));
/**
 * Accesses an `Annotations` instance in the context and appends the
 * specified annotation to the annotation map.
 *
 * @internal
 */
export const annotate = /*#__PURE__*/Debug.methodWithTrace(trace => (key, value) => annotationsWith(annotations => annotations.annotate(key, value)).traced(trace));
/**
 * Returns the set of all fibers in this test.
 *
 * @internal
 */
export const supervisedFibers = /*#__PURE__*/Debug.methodWithTrace(trace => () => annotationsWith(annotations => annotations.supervisedFibers()).traced(trace));
/**
 * Retrieves the `Live` service for this test.
 *
 * @internal
 */
export const live = /*#__PURE__*/Debug.methodWithTrace(trace => () => liveWith(core.succeed).traced(trace));
/**
 * Retrieves the `Live` service for this test and uses it to run the specified
 * workflow.
 *
 * @internal
 */
export const liveWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.fiberRefGetWith(currentServices, services => restore(f)(Context.get(Live.Tag)(services))).traced(trace));
/**
 * Executes the specified workflow with the specified implementation of the
 * live service.
 *
 * @internal
 */
export const withLive = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, live) => core.fiberRefLocallyWith(currentServices, Context.add(Live.Tag, live))(effect).traced(trace));
/**
 * Sets the implementation of the live service to the specified value and
 * restores it to its original value when the scope is closed.
 *
 * @internal
 */
export const withLiveScoped = /*#__PURE__*/Debug.methodWithTrace(trace => live => fiberRuntime.fiberRefLocallyScopedWith(currentServices, Context.add(Live.Tag, live)).traced(trace));
/**
 * Constructs a new `Live` service wrapped in a layer.
 *
 * @internal
 */
export const liveLayer = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scoped(Live.Tag, core.tap(withLiveScoped)(core.map(Live.make)(core.context()))));
/**
 * Provides a workflow with the "live" default Effect services.
 *
 * @internal
 */
export const provideLive = /*#__PURE__*/Debug.methodWithTrace(trace => effect => liveWith(live => live.provide(effect)).traced(trace));
/**
 * Runs a transformation function with the live default Effect services while
 * ensuring that the workflow itself is run with the test services.
 *
 * @internal
 */
export const provideWithLive = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.fiberRefGetWith(defaultServices.currentServices, services => provideLive(restore(f)(core.fiberRefLocally(defaultServices.currentServices, services)(self)))).traced(trace));
/**
 * Retrieves the `Sized` service for this test.
 *
 * @internal
 */
export const sized = /*#__PURE__*/Debug.methodWithTrace(trace => () => sizedWith(core.succeed).traced(trace));
/**
 * Retrieves the `Sized` service for this test and uses it to run the
 * specified workflow.
 *
 * @internal
 */
export const sizedWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.fiberRefGetWith(currentServices, services => restore(f)(Context.get(Sized.Tag)(services))).traced(trace));
/**
 * Executes the specified workflow with the specified implementation of the
 * sized service.
 *
 * @internal
 */
export const withSized = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, sized) => core.fiberRefLocallyWith(currentServices, Context.add(Sized.Tag, sized))(effect).traced(trace));
/**
 * Sets the implementation of the sized service to the specified value and
 * restores it to its original value when the scope is closed.
 *
 * @internal
 */
export const withSizedScoped = /*#__PURE__*/Debug.methodWithTrace(trace => sized => fiberRuntime.fiberRefLocallyScopedWith(currentServices, Context.add(Sized.Tag, sized)).traced(trace));
/** @internal */
export const sizedLayer = /*#__PURE__*/Debug.untracedMethod(() => size => layer.scoped(Sized.Tag, core.tap(withSizedScoped)(core.map(Sized.fromFiberRef)(fiberRuntime.fiberRefMake(size)))));
/** @internal */
export const size = /*#__PURE__*/Debug.methodWithTrace(trace => () => sizedWith(sized => sized.size()).traced(trace));
/** @internal */
export const withSize = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, size) => sizedWith(sized => sized.withSize(size)(effect)).traced(trace));
/**
 * Retrieves the `TestConfig` service for this test.
 *
 * @internal
 */
export const testConfig = /*#__PURE__*/Debug.methodWithTrace(trace => () => testConfigWith(core.succeed).traced(trace));
/**
 * Retrieves the `TestConfig` service for this test and uses it to run the
 * specified workflow.
 *
 * @internal
 */
export const testConfigWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.fiberRefGetWith(currentServices, services => restore(f)(Context.get(TestConfig.Tag)(services))).traced(trace));
/**
 * Executes the specified workflow with the specified implementation of the
 * config service.
 *
 * @internal
 */
export const withTestConfig = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, config) => core.fiberRefLocallyWith(currentServices, Context.add(TestConfig.Tag, config))(effect).traced(trace));
/**
 * Sets the implementation of the config service to the specified value and
 * restores it to its original value when the scope is closed.
 *
 * @internal
 */
export const withTestConfigScoped = /*#__PURE__*/Debug.methodWithTrace(trace => config => fiberRuntime.fiberRefLocallyScopedWith(currentServices, Context.add(TestConfig.Tag, config)).traced(trace));
/**
 * Constructs a new `TestConfig` service with the specified settings.
 *
 * @internal
 */
export const testConfigLayer = /*#__PURE__*/Debug.untracedMethod(() => params => layer.scoped(TestConfig.Tag, Effect.suspend(() => {
  const testConfig = TestConfig.make(params);
  return core.as(testConfig)(withTestConfigScoped(testConfig));
})));
/**
 * The number of times to repeat tests to ensure they are stable.
 *
 * @internal
 */
export const repeats = /*#__PURE__*/Debug.methodWithTrace(trace => () => testConfigWith(config => core.succeed(config.repeats)).traced(trace));
/**
 * The number of times to retry flaky tests.
 *
 * @internal
 */
export const retries = /*#__PURE__*/Debug.methodWithTrace(trace => () => testConfigWith(config => core.succeed(config.retries)).traced(trace));
/**
 * The number of sufficient samples to check for a random variable.
 *
 * @internal
 */
export const samples = /*#__PURE__*/Debug.methodWithTrace(trace => () => testConfigWith(config => core.succeed(config.samples)).traced(trace));
/**
 * The maximum number of shrinkings to minimize large failures.
 *
 * @internal
 */
export const shrinks = /*#__PURE__*/Debug.methodWithTrace(trace => () => testConfigWith(config => core.succeed(config.shrinks)).traced(trace));
//# sourceMappingURL=testServices.mjs.map