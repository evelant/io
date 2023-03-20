import * as Chunk from "@effect/data/Chunk";
import * as Duration from "@effect/data/Duration";
import { constVoid, dual, identity } from "@effect/data/Function";
import { globalValue } from "@effect/data/Global";
import * as HashSet from "@effect/data/HashSet";
import * as Debug from "@effect/io/Debug";
import * as Cause from "@effect/io/internal_effect_untraced/cause";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as _effect from "@effect/io/internal_effect_untraced/effect";
import * as metricBoundaries from "@effect/io/internal_effect_untraced/metric/boundaries";
import * as metricKey from "@effect/io/internal_effect_untraced/metric/key";
import * as metricLabel from "@effect/io/internal_effect_untraced/metric/label";
import * as metricRegistry from "@effect/io/internal_effect_untraced/metric/registry";
/** @internal */
const MetricSymbolKey = "@effect/io/Metric";
/** @internal */
export const MetricTypeId = /*#__PURE__*/Symbol.for(MetricSymbolKey);
/** @internal */
const metricVariance = {
  _Type: _ => _,
  _In: _ => _,
  _Out: _ => _
};
/** @internal */
export const globalMetricRegistry = /*#__PURE__*/globalValue( /*#__PURE__*/Symbol.for("@effect/io/Metric/globalMetricRegistry"), () => metricRegistry.make());
/** @internal */
export const make = function (keyType, unsafeUpdate, unsafeValue) {
  const metric = Object.assign(Debug.methodWithTrace((trace, restore) => effect => core.tap(effect, a => core.sync(() => restore(unsafeUpdate)(a, HashSet.empty()))).traced(trace)), {
    [MetricTypeId]: metricVariance,
    keyType,
    unsafeUpdate,
    unsafeValue
  });
  return metric;
};
/** @internal */
export const contramap = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => make(self.keyType, (input, extraTags) => self.unsafeUpdate(restore(f)(input), extraTags), self.unsafeValue));
/** @internal */
export const counter = name => fromMetricKey(metricKey.counter(name));
/** @internal */
export const frequency = name => fromMetricKey(metricKey.frequency(name));
/** @internal */
export const withConstantInput = /*#__PURE__*/Debug.untracedDual(2, () => (self, input) => contramap(self, () => input));
/** @internal */
export const fromMetricKey = key => {
  const hook = extraTags => {
    const fullKey = metricKey.taggedWithLabelSet(extraTags)(key);
    return globalMetricRegistry.get(fullKey);
  };
  return make(key.keyType, (input, extraTags) => hook(extraTags).update(input), extraTags => hook(extraTags).get());
};
/** @internal */
export const gauge = name => fromMetricKey(metricKey.gauge(name));
/** @internal */
export const histogram = (name, boundaries) => fromMetricKey(metricKey.histogram(name, boundaries));
/* @internal */
export const increment = /*#__PURE__*/Debug.methodWithTrace(trace => self => update(self, 1).traced(trace));
/* @internal */
export const incrementBy = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, amount) => update(self, amount).traced(trace));
/** @internal */
export const map = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => make(self.keyType, self.unsafeUpdate, extraTags => restore(f)(self.unsafeValue(extraTags))));
/** @internal */
export const mapType = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => make(restore(f)(self.keyType), self.unsafeUpdate, self.unsafeValue));
/* @internal */
export const set = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => update(self, value).traced(trace));
/** @internal */
export const snapshot = /*#__PURE__*/Debug.methodWithTrace(trace => () => core.sync(unsafeSnapshot).traced(trace));
/** @internal */
export const succeed = out => make(void 0, constVoid, () => out);
/** @internal */
export const sync = evaluate => make(void 0, constVoid, evaluate);
/** @internal */
export const summary = (name, maxAge, maxSize, error, quantiles) => withNow(summaryTimestamp(name, maxAge, maxSize, error, quantiles));
/** @internal */
export const summaryTimestamp = (name, maxAge, maxSize, error, quantiles) => fromMetricKey(metricKey.summary(name, maxAge, maxSize, error, quantiles));
/** @internal */
export const tagged = /*#__PURE__*/dual(3, (self, key, value) => taggedWithLabels(self, HashSet.make(metricLabel.make(key, value))));
/** @internal */
export const taggedWithLabelsInput = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => map(make(self.keyType, (input, extraTags) => self.unsafeUpdate(input, HashSet.union(HashSet.fromIterable(restore(f)(input)), extraTags)), self.unsafeValue), constVoid));
/** @internal */
export const taggedWithLabels = /*#__PURE__*/dual(2, (self, extraTagsIterable) => {
  const extraTags = HashSet.isHashSet(extraTagsIterable) ? extraTagsIterable : HashSet.fromIterable(extraTagsIterable);
  return make(self.keyType, (input, extraTags1) => self.unsafeUpdate(input, HashSet.union(extraTags1)(extraTags)), extraTags1 => self.unsafeValue(HashSet.union(extraTags1)(extraTags)));
});
/** @internal */
export const timer = name => {
  const boundaries = metricBoundaries.exponential(1, 2, 100);
  const base = tagged("time_unit", "milliseconds")(histogram(name, boundaries));
  return contramap(duration => duration.millis)(base);
};
/** @internal */
export const timerWithBoundaries = (name, boundaries) => {
  const base = tagged("time_unit", "milliseconds")(histogram(name, metricBoundaries.fromChunk(boundaries)));
  return contramap(base, duration => duration.millis);
};
/* @internal */
export const trackAll = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, input) => effect => Debug.untraced(() => core.matchCauseEffect(effect, cause => {
  self.unsafeUpdate(input, HashSet.empty());
  return core.failCause(cause);
}, value => {
  self.unsafeUpdate(input, HashSet.empty());
  return core.succeed(value);
}).traced(trace)));
/* @internal */
export const trackDefect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, metric) => trackDefectWith(self, metric, identity).traced(trace));
/* @internal */
export const trackDefectWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, metric, f) => Debug.untraced(() => {
  const updater = defect => metric.unsafeUpdate(restore(f)(defect), HashSet.empty());
  return _effect.tapDefect(self, cause => core.sync(() => Chunk.forEach(updater)(Cause.defects(cause)))).traced(trace);
}));
/* @internal */
export const trackDuration = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, metric) => trackDurationWith(self, metric, identity).traced(trace));
/* @internal */
export const trackDurationWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, metric, f) => Debug.untraced(() => core.suspend(() => {
  const startTime = Date.now();
  return core.map(self, a => {
    const endTime = Date.now();
    const duration = Duration.millis(endTime - startTime);
    metric.unsafeUpdate(restore(f)(duration), HashSet.empty());
    return a;
  });
}).traced(trace)));
/* @internal */
export const trackError = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, metric) => trackErrorWith(self, metric, a => a).traced(trace));
/* @internal */
export const trackErrorWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, metric, f) => Debug.untraced(() => {
  const updater = error => update(metric, restore(f)(error));
  return _effect.tapError(self, updater).traced(trace);
}));
/* @internal */
export const trackSuccess = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, metric) => trackSuccessWith(self, metric, a => a).traced(trace));
/* @internal */
export const trackSuccessWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, metric, f) => Debug.untraced(() => {
  const updater = value => update(metric, restore(f)(value));
  return core.tap(self, updater).traced(trace);
}));
/* @internal */
export const update = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, input) => core.fiberRefGetWith(core.currentTags, tags => core.sync(() => self.unsafeUpdate(input, tags))).traced(trace));
/* @internal */
export const value = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.fiberRefGetWith(core.currentTags, tags => core.sync(() => self.unsafeValue(tags))).traced(trace));
/** @internal */
export const withNow = self => contramap(self, input => [input, Date.now()]);
/** @internal */
export const zip = /*#__PURE__*/dual(2, (self, that) => make([self.keyType, that.keyType], (input, extraTags) => {
  const [l, r] = input;
  self.unsafeUpdate(l, extraTags);
  that.unsafeUpdate(r, extraTags);
}, extraTags => [self.unsafeValue(extraTags), that.unsafeValue(extraTags)]));
/** @internal */
export const unsafeSnapshot = () => globalMetricRegistry.snapshot();
//# sourceMappingURL=metric.mjs.map