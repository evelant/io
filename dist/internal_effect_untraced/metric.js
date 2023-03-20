"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zip = exports.withNow = exports.withConstantInput = exports.value = exports.update = exports.unsafeSnapshot = exports.trackSuccessWith = exports.trackSuccess = exports.trackErrorWith = exports.trackError = exports.trackDurationWith = exports.trackDuration = exports.trackDefectWith = exports.trackDefect = exports.trackAll = exports.timerWithBoundaries = exports.timer = exports.taggedWithLabelsInput = exports.taggedWithLabels = exports.tagged = exports.sync = exports.summaryTimestamp = exports.summary = exports.succeed = exports.snapshot = exports.set = exports.mapType = exports.map = exports.make = exports.incrementBy = exports.increment = exports.histogram = exports.globalMetricRegistry = exports.gauge = exports.fromMetricKey = exports.frequency = exports.counter = exports.contramap = exports.MetricTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Duration = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Duration"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var _Global = /*#__PURE__*/require("@effect/data/Global");
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var Cause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/cause"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var _effect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/effect"));
var metricBoundaries = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric/boundaries"));
var metricKey = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric/key"));
var metricLabel = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric/label"));
var metricRegistry = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric/registry"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const MetricSymbolKey = "@effect/io/Metric";
/** @internal */
const MetricTypeId = /*#__PURE__*/Symbol.for(MetricSymbolKey);
/** @internal */
exports.MetricTypeId = MetricTypeId;
const metricVariance = {
  _Type: _ => _,
  _In: _ => _,
  _Out: _ => _
};
/** @internal */
const globalMetricRegistry = /*#__PURE__*/(0, _Global.globalValue)( /*#__PURE__*/Symbol.for("@effect/io/Metric/globalMetricRegistry"), () => metricRegistry.make());
/** @internal */
exports.globalMetricRegistry = globalMetricRegistry;
const make = function (keyType, unsafeUpdate, unsafeValue) {
  const metric = Object.assign(Debug.methodWithTrace((trace, restore) => effect => core.tap(effect, a => core.sync(() => restore(unsafeUpdate)(a, HashSet.empty()))).traced(trace)), {
    [MetricTypeId]: metricVariance,
    keyType,
    unsafeUpdate,
    unsafeValue
  });
  return metric;
};
/** @internal */
exports.make = make;
const contramap = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => make(self.keyType, (input, extraTags) => self.unsafeUpdate(restore(f)(input), extraTags), self.unsafeValue));
/** @internal */
exports.contramap = contramap;
const counter = name => fromMetricKey(metricKey.counter(name));
/** @internal */
exports.counter = counter;
const frequency = name => fromMetricKey(metricKey.frequency(name));
/** @internal */
exports.frequency = frequency;
const withConstantInput = /*#__PURE__*/Debug.untracedDual(2, () => (self, input) => contramap(self, () => input));
/** @internal */
exports.withConstantInput = withConstantInput;
const fromMetricKey = key => {
  const hook = extraTags => {
    const fullKey = metricKey.taggedWithLabelSet(extraTags)(key);
    return globalMetricRegistry.get(fullKey);
  };
  return make(key.keyType, (input, extraTags) => hook(extraTags).update(input), extraTags => hook(extraTags).get());
};
/** @internal */
exports.fromMetricKey = fromMetricKey;
const gauge = name => fromMetricKey(metricKey.gauge(name));
/** @internal */
exports.gauge = gauge;
const histogram = (name, boundaries) => fromMetricKey(metricKey.histogram(name, boundaries));
/* @internal */
exports.histogram = histogram;
const increment = /*#__PURE__*/Debug.methodWithTrace(trace => self => update(self, 1).traced(trace));
/* @internal */
exports.increment = increment;
const incrementBy = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, amount) => update(self, amount).traced(trace));
/** @internal */
exports.incrementBy = incrementBy;
const map = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => make(self.keyType, self.unsafeUpdate, extraTags => restore(f)(self.unsafeValue(extraTags))));
/** @internal */
exports.map = map;
const mapType = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => make(restore(f)(self.keyType), self.unsafeUpdate, self.unsafeValue));
/* @internal */
exports.mapType = mapType;
const set = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => update(self, value).traced(trace));
/** @internal */
exports.set = set;
const snapshot = /*#__PURE__*/Debug.methodWithTrace(trace => () => core.sync(unsafeSnapshot).traced(trace));
/** @internal */
exports.snapshot = snapshot;
const succeed = out => make(void 0, _Function.constVoid, () => out);
/** @internal */
exports.succeed = succeed;
const sync = evaluate => make(void 0, _Function.constVoid, evaluate);
/** @internal */
exports.sync = sync;
const summary = (name, maxAge, maxSize, error, quantiles) => withNow(summaryTimestamp(name, maxAge, maxSize, error, quantiles));
/** @internal */
exports.summary = summary;
const summaryTimestamp = (name, maxAge, maxSize, error, quantiles) => fromMetricKey(metricKey.summary(name, maxAge, maxSize, error, quantiles));
/** @internal */
exports.summaryTimestamp = summaryTimestamp;
const tagged = /*#__PURE__*/(0, _Function.dual)(3, (self, key, value) => taggedWithLabels(self, HashSet.make(metricLabel.make(key, value))));
/** @internal */
exports.tagged = tagged;
const taggedWithLabelsInput = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => map(make(self.keyType, (input, extraTags) => self.unsafeUpdate(input, HashSet.union(HashSet.fromIterable(restore(f)(input)), extraTags)), self.unsafeValue), _Function.constVoid));
/** @internal */
exports.taggedWithLabelsInput = taggedWithLabelsInput;
const taggedWithLabels = /*#__PURE__*/(0, _Function.dual)(2, (self, extraTagsIterable) => {
  const extraTags = HashSet.isHashSet(extraTagsIterable) ? extraTagsIterable : HashSet.fromIterable(extraTagsIterable);
  return make(self.keyType, (input, extraTags1) => self.unsafeUpdate(input, HashSet.union(extraTags1)(extraTags)), extraTags1 => self.unsafeValue(HashSet.union(extraTags1)(extraTags)));
});
/** @internal */
exports.taggedWithLabels = taggedWithLabels;
const timer = name => {
  const boundaries = metricBoundaries.exponential(1, 2, 100);
  const base = tagged("time_unit", "milliseconds")(histogram(name, boundaries));
  return contramap(duration => duration.millis)(base);
};
/** @internal */
exports.timer = timer;
const timerWithBoundaries = (name, boundaries) => {
  const base = tagged("time_unit", "milliseconds")(histogram(name, metricBoundaries.fromChunk(boundaries)));
  return contramap(base, duration => duration.millis);
};
/* @internal */
exports.timerWithBoundaries = timerWithBoundaries;
const trackAll = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, input) => effect => Debug.untraced(() => core.matchCauseEffect(effect, cause => {
  self.unsafeUpdate(input, HashSet.empty());
  return core.failCause(cause);
}, value => {
  self.unsafeUpdate(input, HashSet.empty());
  return core.succeed(value);
}).traced(trace)));
/* @internal */
exports.trackAll = trackAll;
const trackDefect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, metric) => trackDefectWith(self, metric, _Function.identity).traced(trace));
/* @internal */
exports.trackDefect = trackDefect;
const trackDefectWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, metric, f) => Debug.untraced(() => {
  const updater = defect => metric.unsafeUpdate(restore(f)(defect), HashSet.empty());
  return _effect.tapDefect(self, cause => core.sync(() => Chunk.forEach(updater)(Cause.defects(cause)))).traced(trace);
}));
/* @internal */
exports.trackDefectWith = trackDefectWith;
const trackDuration = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, metric) => trackDurationWith(self, metric, _Function.identity).traced(trace));
/* @internal */
exports.trackDuration = trackDuration;
const trackDurationWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, metric, f) => Debug.untraced(() => core.suspend(() => {
  const startTime = Date.now();
  return core.map(self, a => {
    const endTime = Date.now();
    const duration = Duration.millis(endTime - startTime);
    metric.unsafeUpdate(restore(f)(duration), HashSet.empty());
    return a;
  });
}).traced(trace)));
/* @internal */
exports.trackDurationWith = trackDurationWith;
const trackError = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, metric) => trackErrorWith(self, metric, a => a).traced(trace));
/* @internal */
exports.trackError = trackError;
const trackErrorWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, metric, f) => Debug.untraced(() => {
  const updater = error => update(metric, restore(f)(error));
  return _effect.tapError(self, updater).traced(trace);
}));
/* @internal */
exports.trackErrorWith = trackErrorWith;
const trackSuccess = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, metric) => trackSuccessWith(self, metric, a => a).traced(trace));
/* @internal */
exports.trackSuccess = trackSuccess;
const trackSuccessWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, metric, f) => Debug.untraced(() => {
  const updater = value => update(metric, restore(f)(value));
  return core.tap(self, updater).traced(trace);
}));
/* @internal */
exports.trackSuccessWith = trackSuccessWith;
const update = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, input) => core.fiberRefGetWith(core.currentTags, tags => core.sync(() => self.unsafeUpdate(input, tags))).traced(trace));
/* @internal */
exports.update = update;
const value = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.fiberRefGetWith(core.currentTags, tags => core.sync(() => self.unsafeValue(tags))).traced(trace));
/** @internal */
exports.value = value;
const withNow = self => contramap(self, input => [input, Date.now()]);
/** @internal */
exports.withNow = withNow;
const zip = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => make([self.keyType, that.keyType], (input, extraTags) => {
  const [l, r] = input;
  self.unsafeUpdate(l, extraTags);
  that.unsafeUpdate(r, extraTags);
}, extraTags => [self.unsafeValue(extraTags), that.unsafeValue(extraTags)]));
/** @internal */
exports.zip = zip;
const unsafeSnapshot = () => globalMetricRegistry.snapshot();
exports.unsafeSnapshot = unsafeSnapshot;
//# sourceMappingURL=metric.js.map