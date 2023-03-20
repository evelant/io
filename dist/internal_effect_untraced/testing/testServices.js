"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTestConfigScoped = exports.withTestConfig = exports.withSizedScoped = exports.withSized = exports.withSize = exports.withLiveScoped = exports.withLive = exports.withAnnotationsScoped = exports.withAnnotations = exports.testConfigWith = exports.testConfigLayer = exports.testConfig = exports.supervisedFibers = exports.sizedWith = exports.sizedLayer = exports.sized = exports.size = exports.shrinks = exports.samples = exports.retries = exports.repeats = exports.provideWithLive = exports.provideLive = exports.liveWith = exports.liveServices = exports.liveLayer = exports.live = exports.get = exports.currentServices = exports.annotationsWith = exports.annotationsLayer = exports.annotations = exports.annotate = void 0;
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var Effect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Effect"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var defaultServices = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/defaultServices"));
var fiberRuntime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRuntime"));
var layer = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/layer"));
var ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/ref"));
var Annotations = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/testing/annotations"));
var Live = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/testing/live"));
var Sized = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/testing/sized"));
var TestAnnotationMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/testing/testAnnotationMap"));
var TestConfig = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/testing/testConfig"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * The default Effect test services.
 *
 * @internal
 */
const liveServices = /*#__PURE__*/Context.add(TestConfig.Tag, TestConfig.make({
  repeats: 100,
  retries: 100,
  samples: 200,
  shrinks: 1000
}))( /*#__PURE__*/Context.add(Sized.Tag, Sized.make(100))( /*#__PURE__*/Context.add(Live.Tag, Live.make(defaultServices.liveServices))( /*#__PURE__*/Context.make(Annotations.Tag, /*#__PURE__*/Annotations.make( /*#__PURE__*/ref.unsafeMake( /*#__PURE__*/TestAnnotationMap.empty()))))));
/** @internal */
exports.liveServices = liveServices;
const currentServices = /*#__PURE__*/core.fiberRefUnsafeMakeContext(liveServices);
/**
 * Retrieves the `Annotations` service for this test.
 *
 * @internal
 */
exports.currentServices = currentServices;
const annotations = /*#__PURE__*/Debug.methodWithTrace(trace => () => annotationsWith(core.succeed).traced(trace));
/**
 * Retrieves the `Annotations` service for this test and uses it to run the
 * specified workflow.
 *
 * @internal
 */
exports.annotations = annotations;
const annotationsWith = /*#__PURE__*/Debug.methodWithTrace(trace => f => core.fiberRefGetWith(currentServices, services => f(Context.get(Annotations.Tag)(services))).traced(trace));
/**
 * Executes the specified workflow with the specified implementation of the
 * annotations service.
 *
 * @internal
 */
exports.annotationsWith = annotationsWith;
const withAnnotations = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, annotations) => core.fiberRefLocallyWith(currentServices, Context.add(Annotations.Tag, annotations))(effect).traced(trace));
/**
 * Sets the implementation of the annotations service to the specified value
 * and restores it to its original value when the scope is closed.
 *
 * @internal
 */
exports.withAnnotations = withAnnotations;
const withAnnotationsScoped = /*#__PURE__*/Debug.methodWithTrace(trace => annotations => fiberRuntime.fiberRefLocallyScopedWith(currentServices, Context.add(Annotations.Tag, annotations)).traced(trace));
/**
 * Constructs a new `Annotations` service wrapped in a layer.
 *
 * @internal
 */
exports.withAnnotationsScoped = withAnnotationsScoped;
const annotationsLayer = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scoped(Annotations.Tag, core.tap(withAnnotationsScoped)(core.map(Annotations.make)(core.sync(() => ref.unsafeMake(TestAnnotationMap.empty()))))));
/**
 * Accesses an `Annotations` instance in the context and retrieves the
 * annotation of the specified type, or its default value if there is none.
 *
 * @internal
 */
exports.annotationsLayer = annotationsLayer;
const get = /*#__PURE__*/Debug.methodWithTrace(trace => key => annotationsWith(annotations => annotations.get(key)).traced(trace));
/**
 * Accesses an `Annotations` instance in the context and appends the
 * specified annotation to the annotation map.
 *
 * @internal
 */
exports.get = get;
const annotate = /*#__PURE__*/Debug.methodWithTrace(trace => (key, value) => annotationsWith(annotations => annotations.annotate(key, value)).traced(trace));
/**
 * Returns the set of all fibers in this test.
 *
 * @internal
 */
exports.annotate = annotate;
const supervisedFibers = /*#__PURE__*/Debug.methodWithTrace(trace => () => annotationsWith(annotations => annotations.supervisedFibers()).traced(trace));
/**
 * Retrieves the `Live` service for this test.
 *
 * @internal
 */
exports.supervisedFibers = supervisedFibers;
const live = /*#__PURE__*/Debug.methodWithTrace(trace => () => liveWith(core.succeed).traced(trace));
/**
 * Retrieves the `Live` service for this test and uses it to run the specified
 * workflow.
 *
 * @internal
 */
exports.live = live;
const liveWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.fiberRefGetWith(currentServices, services => restore(f)(Context.get(Live.Tag)(services))).traced(trace));
/**
 * Executes the specified workflow with the specified implementation of the
 * live service.
 *
 * @internal
 */
exports.liveWith = liveWith;
const withLive = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, live) => core.fiberRefLocallyWith(currentServices, Context.add(Live.Tag, live))(effect).traced(trace));
/**
 * Sets the implementation of the live service to the specified value and
 * restores it to its original value when the scope is closed.
 *
 * @internal
 */
exports.withLive = withLive;
const withLiveScoped = /*#__PURE__*/Debug.methodWithTrace(trace => live => fiberRuntime.fiberRefLocallyScopedWith(currentServices, Context.add(Live.Tag, live)).traced(trace));
/**
 * Constructs a new `Live` service wrapped in a layer.
 *
 * @internal
 */
exports.withLiveScoped = withLiveScoped;
const liveLayer = /*#__PURE__*/Debug.untracedMethod(() => () => layer.scoped(Live.Tag, core.tap(withLiveScoped)(core.map(Live.make)(core.context()))));
/**
 * Provides a workflow with the "live" default Effect services.
 *
 * @internal
 */
exports.liveLayer = liveLayer;
const provideLive = /*#__PURE__*/Debug.methodWithTrace(trace => effect => liveWith(live => live.provide(effect)).traced(trace));
/**
 * Runs a transformation function with the live default Effect services while
 * ensuring that the workflow itself is run with the test services.
 *
 * @internal
 */
exports.provideLive = provideLive;
const provideWithLive = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.fiberRefGetWith(defaultServices.currentServices, services => provideLive(restore(f)(core.fiberRefLocally(defaultServices.currentServices, services)(self)))).traced(trace));
/**
 * Retrieves the `Sized` service for this test.
 *
 * @internal
 */
exports.provideWithLive = provideWithLive;
const sized = /*#__PURE__*/Debug.methodWithTrace(trace => () => sizedWith(core.succeed).traced(trace));
/**
 * Retrieves the `Sized` service for this test and uses it to run the
 * specified workflow.
 *
 * @internal
 */
exports.sized = sized;
const sizedWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.fiberRefGetWith(currentServices, services => restore(f)(Context.get(Sized.Tag)(services))).traced(trace));
/**
 * Executes the specified workflow with the specified implementation of the
 * sized service.
 *
 * @internal
 */
exports.sizedWith = sizedWith;
const withSized = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, sized) => core.fiberRefLocallyWith(currentServices, Context.add(Sized.Tag, sized))(effect).traced(trace));
/**
 * Sets the implementation of the sized service to the specified value and
 * restores it to its original value when the scope is closed.
 *
 * @internal
 */
exports.withSized = withSized;
const withSizedScoped = /*#__PURE__*/Debug.methodWithTrace(trace => sized => fiberRuntime.fiberRefLocallyScopedWith(currentServices, Context.add(Sized.Tag, sized)).traced(trace));
/** @internal */
exports.withSizedScoped = withSizedScoped;
const sizedLayer = /*#__PURE__*/Debug.untracedMethod(() => size => layer.scoped(Sized.Tag, core.tap(withSizedScoped)(core.map(Sized.fromFiberRef)(fiberRuntime.fiberRefMake(size)))));
/** @internal */
exports.sizedLayer = sizedLayer;
const size = /*#__PURE__*/Debug.methodWithTrace(trace => () => sizedWith(sized => sized.size()).traced(trace));
/** @internal */
exports.size = size;
const withSize = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, size) => sizedWith(sized => sized.withSize(size)(effect)).traced(trace));
/**
 * Retrieves the `TestConfig` service for this test.
 *
 * @internal
 */
exports.withSize = withSize;
const testConfig = /*#__PURE__*/Debug.methodWithTrace(trace => () => testConfigWith(core.succeed).traced(trace));
/**
 * Retrieves the `TestConfig` service for this test and uses it to run the
 * specified workflow.
 *
 * @internal
 */
exports.testConfig = testConfig;
const testConfigWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.fiberRefGetWith(currentServices, services => restore(f)(Context.get(TestConfig.Tag)(services))).traced(trace));
/**
 * Executes the specified workflow with the specified implementation of the
 * config service.
 *
 * @internal
 */
exports.testConfigWith = testConfigWith;
const withTestConfig = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, config) => core.fiberRefLocallyWith(currentServices, Context.add(TestConfig.Tag, config))(effect).traced(trace));
/**
 * Sets the implementation of the config service to the specified value and
 * restores it to its original value when the scope is closed.
 *
 * @internal
 */
exports.withTestConfig = withTestConfig;
const withTestConfigScoped = /*#__PURE__*/Debug.methodWithTrace(trace => config => fiberRuntime.fiberRefLocallyScopedWith(currentServices, Context.add(TestConfig.Tag, config)).traced(trace));
/**
 * Constructs a new `TestConfig` service with the specified settings.
 *
 * @internal
 */
exports.withTestConfigScoped = withTestConfigScoped;
const testConfigLayer = /*#__PURE__*/Debug.untracedMethod(() => params => layer.scoped(TestConfig.Tag, Effect.suspend(() => {
  const testConfig = TestConfig.make(params);
  return core.as(testConfig)(withTestConfigScoped(testConfig));
})));
/**
 * The number of times to repeat tests to ensure they are stable.
 *
 * @internal
 */
exports.testConfigLayer = testConfigLayer;
const repeats = /*#__PURE__*/Debug.methodWithTrace(trace => () => testConfigWith(config => core.succeed(config.repeats)).traced(trace));
/**
 * The number of times to retry flaky tests.
 *
 * @internal
 */
exports.repeats = repeats;
const retries = /*#__PURE__*/Debug.methodWithTrace(trace => () => testConfigWith(config => core.succeed(config.retries)).traced(trace));
/**
 * The number of sufficient samples to check for a random variable.
 *
 * @internal
 */
exports.retries = retries;
const samples = /*#__PURE__*/Debug.methodWithTrace(trace => () => testConfigWith(config => core.succeed(config.samples)).traced(trace));
/**
 * The maximum number of shrinkings to minimize large failures.
 *
 * @internal
 */
exports.samples = samples;
const shrinks = /*#__PURE__*/Debug.methodWithTrace(trace => () => testConfigWith(config => core.succeed(config.shrinks)).traced(trace));
exports.shrinks = shrinks;
//# sourceMappingURL=testServices.js.map