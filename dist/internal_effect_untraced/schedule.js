"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatWhile_Effect = exports.repeatWhileEquals_Effect = exports.repeatWhileEffect_Effect = exports.repeatUntil_Effect = exports.repeatUntilEquals_Effect = exports.repeatUntilEffect_Effect = exports.repeatOrElse_Effect = exports.repeatOrElseEither_Effect = exports.repeatForever = exports.reduceEffect = exports.reduce = exports.recurs = exports.recurWhileEquals = exports.recurWhileEffect = exports.recurWhile = exports.recurUpTo = exports.recurUntilOption = exports.recurUntilEquals = exports.recurUntilEffect = exports.recurUntil = exports.reconsiderEffect = exports.reconsider = exports.provideService = exports.provideContext = exports.passthrough = exports.once = exports.onDecision = exports.nextSecond = exports.nextMinute = exports.nextHour = exports.nextDayOfMonth = exports.nextDay = exports.modifyDelayEffect = exports.modifyDelay = exports.minuteOfHour = exports.mapEffect = exports.map = exports.makeWithState = exports.linear = exports.left = exports.jitteredWith = exports.jittered = exports.intersectWith = exports.intersect = exports.identity = exports.hourOfDay = exports.fromFunction = exports.fromDelays = exports.fromDelay = exports.forever = exports.fixed = exports.findNextMonth = exports.fibonacci = exports.exponential = exports.ensuring = exports.endOfSecond = exports.endOfMinute = exports.endOfHour = exports.endOfDay = exports.elapsed = exports.eitherWith = exports.either = exports.duration = exports.driver = exports.dimapEffect = exports.dimap = exports.delays = exports.delayedSchedule = exports.delayedEffect = exports.delayed = exports.dayOfWeek = exports.dayOfMonth = exports.count = exports.contramapEffect = exports.contramapContext = exports.contramap = exports.compose = exports.collectWhileEffect = exports.collectWhile = exports.collectUntilEffect = exports.collectUntil = exports.collectAllOutputs = exports.collectAllInputs = exports.chooseMerge = exports.choose = exports.checkEffect = exports.check = exports.bothInOut = exports.beginningOfSecond = exports.beginningOfMinute = exports.beginningOfHour = exports.beginningOfDay = exports.asUnit = exports.as = exports.andThenEither = exports.andThen = exports.addDelayEffect = exports.addDelay = exports.ScheduleTypeId = exports.ScheduleDriverTypeId = void 0;
exports.zipWith = exports.zipRight = exports.zipLeft = exports.windowed = exports.whileOutputEffect = exports.whileOutput = exports.whileInputEffect = exports.whileInput = exports.upTo = exports.untilOutputEffect = exports.untilOutput = exports.untilInputEffect = exports.untilInput = exports.unionWith = exports.union = exports.unfold = exports.tapOutput = exports.tapInput = exports.sync = exports.succeed = exports.stop = exports.spaced = exports.secondOfMinute = exports.schedule_Effect = exports.scheduleFrom_Effect = exports.run = exports.right = exports.retry_Effect = exports.retryWhile_Effect = exports.retryWhileEquals_Effect = exports.retryWhileEffect_Effect = exports.retryUntil_Effect = exports.retryUntilEquals_Effect = exports.retryUntilEffect_Effect = exports.retryOrElse_Effect = exports.retryOrElseEither_Effect = exports.retryN_Effect = exports.resetWhen = exports.resetAfter = exports.repetitions = exports.repeat_Effect = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var Duration = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Duration"));
var Either = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Equal"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Clock = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Clock"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var internalCause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/cause"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var effect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/effect"));
var Random = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Random"));
var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Ref"));
var ScheduleDecision = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Schedule/Decision"));
var Interval = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Schedule/Interval"));
var Intervals = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Schedule/Intervals"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a, _b;
/** @internal */
const ScheduleSymbolKey = "@effect/io/Schedule";
/** @internal */
const ScheduleTypeId = /*#__PURE__*/Symbol.for(ScheduleSymbolKey);
/** @internal */
exports.ScheduleTypeId = ScheduleTypeId;
const ScheduleDriverSymbolKey = "@effect/io/Schedule/Driver";
/** @internal */
const ScheduleDriverTypeId = /*#__PURE__*/Symbol.for(ScheduleDriverSymbolKey);
/** @internal */
exports.ScheduleDriverTypeId = ScheduleDriverTypeId;
const scheduleVariance = {
  _Env: _ => _,
  _In: _ => _,
  _Out: _ => _
};
const scheduleDriverVariance = {
  _Env: _ => _,
  _In: _ => _,
  _Out: _ => _
};
/** @internal */
class ScheduleImpl {
  constructor(initial, step) {
    this.initial = initial;
    this.step = step;
    this[_a] = scheduleVariance;
  }
}
_a = ScheduleTypeId;
/** @internal */
class ScheduleDriverImpl {
  constructor(schedule, ref) {
    this.schedule = schedule;
    this.ref = ref;
    this[_b] = scheduleDriverVariance;
  }
  state() {
    return Debug.bodyWithTrace(trace => core.map(Ref.get(this.ref), tuple => tuple[1]).traced(trace));
  }
  last() {
    return Debug.bodyWithTrace(trace => core.flatMap(Ref.get(this.ref), ([element, _]) => {
      switch (element._tag) {
        case "None":
          {
            return core.failSync(() => internalCause.NoSuchElementException());
          }
        case "Some":
          {
            return core.succeed(element.value);
          }
      }
    }).traced(trace));
  }
  reset() {
    return Debug.bodyWithTrace(trace => Ref.set(this.ref, [Option.none(), this.schedule.initial]).traced(trace));
  }
  next(input) {
    return Debug.bodyWithTrace((trace, restore) => core.flatMap(state => core.flatMap(now => core.flatMap(([state, out, decision]) => ScheduleDecision.isDone(decision) ? core.zipRight(core.fail(Option.none()))(Ref.set(this.ref, [Option.some(out), state])) : core.as(out)(core.zipRight(effect.sleep(Duration.millis(Intervals.start(decision.intervals) - now)))(Ref.set(this.ref, [Option.some(out), state]))))(core.suspend(restore(() => this.schedule.step(now, input, state)))))(Clock.currentTimeMillis()))(core.map(Ref.get(this.ref), tuple => tuple[1])).traced(trace));
  }
}
_b = ScheduleDriverTypeId;
/** @internal */
const makeWithState = /*#__PURE__*/Debug.untracedMethod(restore => (initial, step) => new ScheduleImpl(initial, restore(step)));
/** @internal */
exports.makeWithState = makeWithState;
const addDelay = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => addDelayEffect(self, out => core.sync(() => restore(f)(out))));
/** @internal */
exports.addDelay = addDelay;
const addDelayEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => modifyDelayEffect(self, (out, duration) => core.map(restore(f)(out), delay => Duration.millis(duration.millis + delay.millis))));
/** @internal */
exports.addDelayEffect = addDelayEffect;
const andThen = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => map(Either.merge)(andThenEither(self, that)));
/** @internal */
exports.andThen = andThen;
const andThenEither = /*#__PURE__*/Debug.untracedDual(2, restore => (self, that) => makeWithState([self.initial, that.initial, true], (now, input, state) => state[2] ? core.flatMap(restore(self.step)(now, input, state[0]), ([lState, out, decision]) => {
  if (ScheduleDecision.isDone(decision)) {
    return core.map(that.step(now, input, state[1]), ([rState, out, decision]) => [[lState, rState, false], Either.right(out), decision]);
  }
  return core.succeed([[lState, state[1], true], Either.left(out), decision]);
}) : core.map(that.step(now, input, state[1]), ([rState, out, decision]) => [[state[0], rState, false], Either.right(out), decision])));
/** @internal */
exports.andThenEither = andThenEither;
const as = /*#__PURE__*/Debug.untracedDual(2, () => (self, out) => map(self, () => out));
/** @internal */
exports.as = as;
const asUnit = /*#__PURE__*/Debug.untracedMethod(() => self => map(self, _Function.constVoid));
/** @internal */
exports.asUnit = asUnit;
const bothInOut = /*#__PURE__*/Debug.untracedDual(2, restore => (self, that) => makeWithState([self.initial, that.initial], (now, [in1, in2], state) => core.zipWith(restore(self.step)(now, in1, state[0]), restore(that.step)(now, in2, state[1]), ([lState, out, lDecision], [rState, out2, rDecision]) => {
  if (ScheduleDecision.isContinue(lDecision) && ScheduleDecision.isContinue(rDecision)) {
    const interval = Intervals.union(rDecision.intervals)(lDecision.intervals);
    return [[lState, rState], [out, out2], ScheduleDecision.continue(interval)];
  }
  return [[lState, rState], [out, out2], ScheduleDecision.done];
})));
/** @internal */
exports.bothInOut = bothInOut;
const check = /*#__PURE__*/Debug.untracedDual(2, restore => (self, test) => checkEffect(self, (input, out) => core.sync(() => restore(test)(input, out))));
/** @internal */
exports.check = check;
const checkEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, test) => makeWithState(self.initial, (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => {
  if (ScheduleDecision.isDone(decision)) {
    return core.succeed([state, out, ScheduleDecision.done]);
  }
  return core.map(restore(test)(input, out), cont => cont ? [state, out, decision] : [state, out, ScheduleDecision.done]);
})));
/** @internal */
exports.checkEffect = checkEffect;
const choose = /*#__PURE__*/Debug.untracedDual(2, restore => (self, that) => makeWithState([self.initial, that.initial], (now, either, state) => {
  switch (either._tag) {
    case "Left":
      {
        return core.map(restore(self.step)(now, either.left, state[0]), ([lState, out, decision]) => [[lState, state[1]], Either.left(out), decision]);
      }
    case "Right":
      {
        return core.map(([rState, out2, decision]) => [[state[0], rState], Either.right(out2), decision])(that.step(now, either.right, state[1]));
      }
  }
}));
/** @internal */
exports.choose = choose;
const chooseMerge = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => map(choose(self, that), Either.merge));
/** @internal */
exports.chooseMerge = chooseMerge;
const collectAllInputs = /*#__PURE__*/Debug.untracedMethod(() => () => collectAllOutputs(identity()));
/** @internal */
exports.collectAllInputs = collectAllInputs;
const collectAllOutputs = /*#__PURE__*/Debug.untracedMethod(() => self => reduce(self, Chunk.empty(), (outs, out) => Chunk.append(out)(outs)));
/** @internal */
exports.collectAllOutputs = collectAllOutputs;
const collectUntil = /*#__PURE__*/Debug.untracedMethod(restore => f => collectAllOutputs(recurUntil(restore(f))));
/** @internal */
exports.collectUntil = collectUntil;
const collectUntilEffect = /*#__PURE__*/Debug.untracedMethod(restore => f => collectAllOutputs(recurUntilEffect(restore(f))));
/** @internal */
exports.collectUntilEffect = collectUntilEffect;
const collectWhile = /*#__PURE__*/Debug.untracedMethod(restore => f => collectAllOutputs(recurWhile(restore(f))));
/** @internal */
exports.collectWhile = collectWhile;
const collectWhileEffect = /*#__PURE__*/Debug.untracedMethod(restore => f => collectAllOutputs(recurWhileEffect(restore(f))));
/** @internal */
exports.collectWhileEffect = collectWhileEffect;
const compose = /*#__PURE__*/Debug.untracedDual(2, restore => (self, that) => makeWithState([self.initial, that.initial], (now, input, state) => core.flatMap(restore(self.step)(now, input, state[0]), ([lState, out, lDecision]) => core.map(that.step(now, out, state[1]), ([rState, out2, rDecision]) => ScheduleDecision.isDone(lDecision) ? [[lState, rState], out2, ScheduleDecision.done] : ScheduleDecision.isDone(rDecision) ? [[lState, rState], out2, ScheduleDecision.done] : [[lState, rState], out2, ScheduleDecision.continue(Intervals.max(rDecision.intervals)(lDecision.intervals))]))));
/** @internal */
exports.compose = compose;
const contramap = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => contramapEffect(self, input2 => core.sync(() => restore(f)(input2))));
/** @internal */
exports.contramap = contramap;
const contramapContext = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.contramapContext(restore(self.step)(now, input, state), restore(f))));
/** @internal */
exports.contramapContext = contramapContext;
const contramapEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input2, state) => core.flatMap(restore(f)(input2), input => restore(self.step)(now, input, state))));
/** @internal */
exports.contramapEffect = contramapEffect;
const count = /*#__PURE__*/Debug.untracedMethod(() => () => unfold(0, n => n + 1));
/** @internal */
exports.count = count;
const dayOfMonth = /*#__PURE__*/Debug.untracedMethod(() => day => {
  return makeWithState([Number.NEGATIVE_INFINITY, 0], (now, _, state) => {
    if (!Number.isInteger(day) || day < 1 || 31 < day) {
      return core.dieSync(() => internalCause.IllegalArgumentException(`Invalid argument in: dayOfMonth(${day}). Must be in range 1...31`));
    }
    const n = state[1];
    const initial = n === 0;
    const day0 = nextDayOfMonth(now, day, initial);
    const start = beginningOfDay(day0);
    const end = endOfDay(day0);
    const interval = Interval.make(start, end);
    return core.succeed([[end, n + 1], n, ScheduleDecision.continueWith(interval)]);
  });
});
/** @internal */
exports.dayOfMonth = dayOfMonth;
const dayOfWeek = /*#__PURE__*/Debug.untracedMethod(() => day => {
  return makeWithState([Number.MIN_SAFE_INTEGER, 0], (now, _, state) => {
    if (!Number.isInteger(day) || day < 1 || 7 < day) {
      return core.dieSync(() => internalCause.IllegalArgumentException(`Invalid argument in: dayOfWeek(${day}). Must be in range 1 (Monday)...7 (Sunday)`));
    }
    const n = state[1];
    const initial = n === 0;
    const day0 = nextDay(now, day, initial);
    const start = beginningOfDay(day0);
    const end = endOfDay(day0);
    const interval = Interval.make(start, end);
    return core.succeed([[end, n + 1], n, ScheduleDecision.continueWith(interval)]);
  });
});
/** @internal */
exports.dayOfWeek = dayOfWeek;
const delayed = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => delayedEffect(self, duration => core.sync(() => restore(f)(duration))));
/** @internal */
exports.delayed = delayed;
const delayedEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => modifyDelayEffect(self, (_, delay) => restore(f)(delay)));
/** @internal */
exports.delayedEffect = delayedEffect;
const delayedSchedule = /*#__PURE__*/Debug.untracedMethod(() => schedule => addDelay(schedule, x => x));
/** @internal */
exports.delayedSchedule = delayedSchedule;
const delays = /*#__PURE__*/Debug.untracedMethod(restore => self => makeWithState(self.initial, (now, input, state) => core.flatMap(([state, _, decision]) => {
  if (ScheduleDecision.isDone(decision)) {
    return core.succeed([state, Duration.zero, decision]);
  }
  return core.succeed([state, Duration.millis(Intervals.start(decision.intervals) - now), decision]);
})(restore(self.step)(now, input, state))));
/** @internal */
exports.delays = delays;
const dimap = /*#__PURE__*/Debug.untracedDual(3, restore => (self, f, g) => map(restore(g))(contramap(self, restore(f))));
/** @internal */
exports.dimap = dimap;
const dimapEffect = /*#__PURE__*/Debug.untracedDual(3, restore => (self, f, g) => mapEffect(restore(g))(contramapEffect(self, restore(f))));
/** @internal */
exports.dimapEffect = dimapEffect;
const driver = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.map(ref => new ScheduleDriverImpl(self, ref))(Ref.make([Option.none(), self.initial])).traced(trace));
/** @internal */
exports.driver = driver;
const duration = /*#__PURE__*/Debug.untracedMethod(() => duration => makeWithState(true, (now, _, state) => core.succeed(state ? [false, duration, ScheduleDecision.continueWith(Interval.after(now + duration.millis))] : [false, Duration.zero, ScheduleDecision.done])));
/** @internal */
exports.duration = duration;
const either = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => union(self, that));
/** @internal */
exports.either = either;
const eitherWith = /*#__PURE__*/Debug.untracedDual(3, restore => (self, that, f) => unionWith(self, that, restore(f)));
/** @internal */
exports.eitherWith = eitherWith;
const elapsed = /*#__PURE__*/Debug.untracedMethod(() => () => makeWithState(Option.none(), (now, _, state) => {
  switch (state._tag) {
    case "None":
      {
        return core.succeed([Option.some(now), Duration.zero, ScheduleDecision.continueWith(Interval.after(now))]);
      }
    case "Some":
      {
        return core.succeed([Option.some(state.value), Duration.millis(now - state.value), ScheduleDecision.continueWith(Interval.after(now))]);
      }
  }
}));
/** @internal */
exports.elapsed = elapsed;
const ensuring = /*#__PURE__*/Debug.untracedDual(2, restore => (self, finalizer) => makeWithState(self.initial, (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => ScheduleDecision.isDone(decision) ? core.as(finalizer, [state, out, decision]) : core.succeed([state, out, decision]))));
/** @internal */
exports.ensuring = ensuring;
const exponential = /*#__PURE__*/Debug.untracedMethod(() => (base, factor = 2.0) => delayedSchedule(map(i => Duration.millis(base.millis * Math.pow(factor, i)))(forever())));
/** @internal */
exports.exponential = exponential;
const fibonacci = /*#__PURE__*/Debug.untracedMethod(() => one => delayedSchedule(map(out => out[0])(unfold([one, one], ([a, b]) => [b, Duration.sum(a, b)]))));
/** @internal */
exports.fibonacci = fibonacci;
const fixed = /*#__PURE__*/Debug.untracedMethod(() => interval => makeWithState([Option.none(), 0], (now, _, [option, n]) => core.sync(() => {
  const intervalMillis = interval.millis;
  switch (option._tag) {
    case "None":
      {
        return [[Option.some([now, now + intervalMillis]), n + 1], n, ScheduleDecision.continueWith(Interval.after(now + intervalMillis))];
      }
    case "Some":
      {
        const [startMillis, lastRun] = option.value;
        const runningBehind = now > lastRun + intervalMillis;
        const boundary = Equal.equals(interval, Duration.zero) ? interval : Duration.millis(intervalMillis - (now - startMillis) % intervalMillis);
        const sleepTime = Equal.equals(boundary, Duration.zero) ? interval : boundary;
        const nextRun = runningBehind ? now : now + sleepTime.millis;
        return [[Option.some([startMillis, nextRun]), n + 1], n, ScheduleDecision.continueWith(Interval.after(nextRun))];
      }
  }
})));
/** @internal */
exports.fixed = fixed;
const forever = /*#__PURE__*/Debug.untracedMethod(() => () => unfold(0, n => n + 1));
/** @internal */
exports.forever = forever;
const fromDelay = /*#__PURE__*/Debug.untracedMethod(() => delay => duration(delay));
/** @internal */
exports.fromDelay = fromDelay;
const fromDelays = /*#__PURE__*/Debug.untracedMethod(() => (delay, ...delays) => makeWithState([[delay, ...delays], true], (now, _, [durations, cont]) => core.sync(() => {
  if (cont) {
    const x = durations[0];
    const interval = Interval.after(now + x.millis);
    if (durations.length >= 2) {
      return [[durations.slice(1), true], x, ScheduleDecision.continueWith(interval)];
    }
    const y = durations.slice(1);
    return [[[x, ...y], false], x, ScheduleDecision.continueWith(interval)];
  }
  return [[durations, false], Duration.zero, ScheduleDecision.done];
})));
/** @internal */
exports.fromDelays = fromDelays;
const fromFunction = /*#__PURE__*/Debug.untracedMethod(restore => f => map(restore(f))(identity()));
/** @internal */
exports.fromFunction = fromFunction;
const hourOfDay = /*#__PURE__*/Debug.untracedMethod(() => hour => makeWithState([Number.NEGATIVE_INFINITY, 0], (now, _, state) => {
  if (!Number.isInteger(hour) || hour < 0 || 23 < hour) {
    return core.dieSync(() => internalCause.IllegalArgumentException(`Invalid argument in: hourOfDay(${hour}). Must be in range 0...23`));
  }
  const n = state[1];
  const initial = n === 0;
  const hour0 = nextHour(now, hour, initial);
  const start = beginningOfHour(hour0);
  const end = endOfHour(hour0);
  const interval = Interval.make(start, end);
  return core.succeed([[end, n + 1], n, ScheduleDecision.continueWith(interval)]);
}));
/** @internal */
exports.hourOfDay = hourOfDay;
const identity = /*#__PURE__*/Debug.untracedMethod(() => () => makeWithState(void 0, (now, input, state) => core.succeed([state, input, ScheduleDecision.continueWith(Interval.after(now))])));
/** @internal */
exports.identity = identity;
const intersect = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => intersectWith(self, that, (selfIntervals, thatIntervals) => Intervals.intersect(thatIntervals)(selfIntervals)));
/** @internal */
exports.intersect = intersect;
const intersectWith = /*#__PURE__*/Debug.untracedDual(3, restore => (self, that, f) => makeWithState([self.initial, that.initial], (now, input, state) => core.flatMap(([[lState, out, lDecision], [rState, out2, rDecision]]) => {
  if (ScheduleDecision.isContinue(lDecision) && ScheduleDecision.isContinue(rDecision)) {
    return intersectWithLoop(self, that, input, lState, out, lDecision.intervals, rState, out2, rDecision.intervals, restore(f));
  }
  return core.succeed([[lState, rState], [out, out2], ScheduleDecision.done]);
})(core.zipWith(restore(self.step)(now, input, state[0]), restore(that.step)(now, input, state[1]), (a, b) => [a, b]))));
/** @internal */
exports.intersectWith = intersectWith;
const intersectWithLoop = (self, that, input, lState, out, lInterval, rState, out2, rInterval, f) => {
  const combined = f(lInterval, rInterval);
  if (Intervals.isNonEmpty(combined)) {
    return core.succeed([[lState, rState], [out, out2], ScheduleDecision.continue(combined)]);
  }
  if (Intervals.lessThan(rInterval)(lInterval)) {
    return core.flatMap(self.step(Intervals.end(lInterval), input, lState), ([lState, out, decision]) => {
      if (ScheduleDecision.isDone(decision)) {
        return core.succeed([[lState, rState], [out, out2], ScheduleDecision.done]);
      }
      return intersectWithLoop(self, that, input, lState, out, decision.intervals, rState, out2, rInterval, f);
    });
  }
  return core.flatMap(that.step(Intervals.end(rInterval), input, rState), ([rState, out2, decision]) => {
    if (ScheduleDecision.isDone(decision)) {
      return core.succeed([[lState, rState], [out, out2], ScheduleDecision.done]);
    }
    return intersectWithLoop(self, that, input, lState, out, lInterval, rState, out2, decision.intervals, f);
  });
};
/** @internal */
const jittered = /*#__PURE__*/Debug.untracedMethod(() => self => jitteredWith(self, {
  min: 0.8,
  max: 1.2
}));
/** @internal */
exports.jittered = jittered;
const jitteredWith = /*#__PURE__*/Debug.untracedDual(2, () => (self, options) => {
  const {
    max,
    min
  } = Object.assign({
    min: 0.8,
    max: 1.2
  }, options);
  return delayedEffect(self, duration => core.map(Random.next(), random => {
    const d = duration.millis;
    const jittered = d * min * (1 - random) + d * max * random;
    return Duration.millis(jittered);
  }));
});
/** @internal */
exports.jitteredWith = jitteredWith;
const left = /*#__PURE__*/Debug.untracedMethod(() => self => choose(self, identity()));
/** @internal */
exports.left = left;
const linear = /*#__PURE__*/Debug.untracedMethod(() => base => delayedSchedule(map(i => Duration.millis(base.millis * (i + 1)))(forever())));
/** @internal */
exports.linear = linear;
const map = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => mapEffect(self, out => core.sync(() => restore(f)(out))));
/** @internal */
exports.map = map;
const mapEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => core.map(restore(f)(out), out2 => [state, out2, decision]))));
/** @internal */
exports.mapEffect = mapEffect;
const minuteOfHour = /*#__PURE__*/Debug.untracedMethod(() => minute => makeWithState([Number.MIN_SAFE_INTEGER, 0], (now, _, state) => {
  if (!Number.isInteger(minute) || minute < 0 || 59 < minute) {
    return core.dieSync(() => internalCause.IllegalArgumentException(`Invalid argument in: minuteOfHour(${minute}). Must be in range 0...59`));
  }
  const n = state[1];
  const initial = n === 0;
  const minute0 = nextMinute(now, minute, initial);
  const start = beginningOfMinute(minute0);
  const end = endOfMinute(minute0);
  const interval = Interval.make(start, end);
  return core.succeed([[end, n + 1], n, ScheduleDecision.continueWith(interval)]);
}));
/** @internal */
exports.minuteOfHour = minuteOfHour;
const modifyDelay = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => modifyDelayEffect(self, (out, duration) => core.sync(() => restore(f)(out, duration))));
/** @internal */
exports.modifyDelay = modifyDelay;
const modifyDelayEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => {
  if (ScheduleDecision.isDone(decision)) {
    return core.succeed([state, out, decision]);
  }
  const intervals = decision.intervals;
  const delay = Interval.size(Interval.make(now, Intervals.start(intervals)));
  return core.map(restore(f)(out, delay), duration => {
    const oldStart = Intervals.start(intervals);
    const newStart = now + duration.millis;
    const delta = newStart - oldStart;
    const newEnd = Math.min(Math.max(0, Intervals.end(intervals) + delta), Number.MAX_SAFE_INTEGER);
    const newInterval = Interval.make(newStart, newEnd);
    return [state, out, ScheduleDecision.continueWith(newInterval)];
  });
})));
/** @internal */
exports.modifyDelayEffect = modifyDelayEffect;
const onDecision = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => core.as(restore(f)(out, decision), [state, out, decision]))));
/** @internal */
exports.onDecision = onDecision;
const once = /*#__PURE__*/Debug.untracedMethod(() => () => asUnit(recurs(1)));
/** @internal */
exports.once = once;
const passthrough = /*#__PURE__*/Debug.untracedMethod(restore => self => makeWithState(self.initial, (now, input, state) => core.map(([state, _, decision]) => [state, input, decision])(restore(self.step)(now, input, state))));
/** @internal */
exports.passthrough = passthrough;
const provideContext = /*#__PURE__*/Debug.untracedDual(2, restore => (self, context) => makeWithState(self.initial, (now, input, state) => core.provideContext(restore(self.step)(now, input, state), context)));
/** @internal */
exports.provideContext = provideContext;
const provideService = /*#__PURE__*/Debug.untracedDual(3, restore => (self, tag, service) => makeWithState(self.initial, (now, input, state) => core.contextWithEffect(env => core.provideContext(
// @ts-expect-error
restore(self.step)(now, input, state), Context.add(tag, service)(env)))));
/** @internal */
exports.provideService = provideService;
const reconsider = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => reconsiderEffect(self, (out, decision) => core.sync(() => restore(f)(out, decision))));
/** @internal */
exports.reconsider = reconsider;
const reconsiderEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => ScheduleDecision.isDone(decision) ? core.map(restore(f)(out, decision), either => {
  switch (either._tag) {
    case "Left":
      {
        return [state, either.left, ScheduleDecision.done];
      }
    case "Right":
      {
        const [out2] = either.right;
        return [state, out2, ScheduleDecision.done];
      }
  }
}) : core.map(restore(f)(out, decision), either => {
  switch (either._tag) {
    case "Left":
      {
        return [state, either.left, ScheduleDecision.done];
      }
    case "Right":
      {
        const [out2, interval] = either.right;
        return [state, out2, ScheduleDecision.continueWith(interval)];
      }
  }
}))));
/** @internal */
exports.reconsiderEffect = reconsiderEffect;
const recurUntil = /*#__PURE__*/Debug.untracedMethod(restore => f => untilInput(identity(), restore(f)));
/** @internal */
exports.recurUntil = recurUntil;
const recurUntilEffect = /*#__PURE__*/Debug.untracedMethod(restore => f => untilInputEffect(identity(), restore(f)));
/** @internal */
exports.recurUntilEffect = recurUntilEffect;
const recurUntilEquals = /*#__PURE__*/Debug.untracedMethod(() => value => untilInput(identity(), input => Equal.equals(input, value)));
/** @internal */
exports.recurUntilEquals = recurUntilEquals;
const recurUntilOption = /*#__PURE__*/Debug.untracedMethod(restore => pf => untilOutput(Option.isSome)(map(restore(pf))(identity())));
/** @internal */
exports.recurUntilOption = recurUntilOption;
const recurUpTo = /*#__PURE__*/Debug.untracedMethod(() => duration => whileOutput(elapsed(), elapsed => Duration.lessThan(duration)(elapsed)));
/** @internal */
exports.recurUpTo = recurUpTo;
const recurWhile = /*#__PURE__*/Debug.untracedMethod(restore => f => whileInput(identity(), restore(f)));
/** @internal */
exports.recurWhile = recurWhile;
const recurWhileEffect = /*#__PURE__*/Debug.untracedMethod(restore => f => whileInputEffect(identity(), restore(f)));
/** @internal */
exports.recurWhileEffect = recurWhileEffect;
const recurWhileEquals = /*#__PURE__*/Debug.untracedMethod(() => value => whileInput(input => Equal.equals(input, value))(identity()));
/** @internal */
exports.recurWhileEquals = recurWhileEquals;
const recurs = /*#__PURE__*/Debug.untracedMethod(() => n => whileOutput(forever(), out => out < n));
/** @internal */
exports.recurs = recurs;
const reduce = /*#__PURE__*/Debug.untracedDual(3, restore => (self, zero, f) => reduceEffect(self, zero, (z, out) => core.sync(() => restore(f)(z, out))));
/** @internal */
exports.reduce = reduce;
const reduceEffect = /*#__PURE__*/Debug.untracedDual(3, restore => (self, zero, f) => makeWithState([self.initial, zero], (now, input, [s, z]) => core.flatMap(restore(self.step)(now, input, s), ([s, out, decision]) => ScheduleDecision.isDone(decision) ? core.succeed([[s, z], z, decision]) : core.map(restore(f)(z, out), z2 => [[s, z2], z, decision]))));
/** @internal */
exports.reduceEffect = reduceEffect;
const repeatForever = /*#__PURE__*/Debug.untracedMethod(restore => self => makeWithState(self.initial, (now, input, state) => {
  const step = (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => ScheduleDecision.isDone(decision) ? step(now, input, self.initial) : core.succeed([state, out, decision]));
  return step(now, input, state);
}));
/** @internal */
exports.repeatForever = repeatForever;
const repetitions = /*#__PURE__*/Debug.untracedMethod(() => self => reduce(self, 0, (n, _) => n + 1));
/** @internal */
exports.repetitions = repetitions;
const resetAfter = /*#__PURE__*/Debug.untracedDual(2, () => (self, duration) => map(out => out[0])(resetWhen(([, time]) => Duration.greaterThanOrEqualTo(duration)(time))(intersect(elapsed())(self))));
/** @internal */
exports.resetAfter = resetAfter;
const resetWhen = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => restore(f)(out) ? restore(self.step)(now, input, self.initial) : core.succeed([state, out, decision]))));
/** @internal */
exports.resetWhen = resetWhen;
const right = /*#__PURE__*/Debug.untracedMethod(() => self => choose(identity(), self));
/** @internal */
exports.right = right;
const run = /*#__PURE__*/Debug.dualWithTrace(3, trace => (self, now, input) => core.map(list => Chunk.reverse(list))(runLoop(self, now, Chunk.fromIterable(input), self.initial, Chunk.empty())).traced(trace));
/** @internal */
exports.run = run;
const runLoop = (self, now, inputs, state, acc) => {
  if (!Chunk.isNonEmpty(inputs)) {
    return core.succeed(acc);
  }
  const input = Chunk.headNonEmpty(inputs);
  const nextInputs = Chunk.tailNonEmpty(inputs);
  return core.flatMap(self.step(now, input, state), ([state, out, decision]) => {
    if (ScheduleDecision.isDone(decision)) {
      return core.sync(() => Chunk.prepend(out)(acc));
    }
    return runLoop(self, Intervals.start(decision.intervals), nextInputs, state, Chunk.prepend(out)(acc));
  });
};
/** @internal */
const secondOfMinute = /*#__PURE__*/Debug.untracedMethod(() => second => makeWithState([Number.NEGATIVE_INFINITY, 0], (now, _, state) => {
  if (!Number.isInteger(second) || second < 0 || 59 < second) {
    return core.dieSync(() => internalCause.IllegalArgumentException(`Invalid argument in: secondOfMinute(${second}). Must be in range 0...59`));
  }
  const n = state[1];
  const initial = n === 0;
  const second0 = nextSecond(now, second, initial);
  const start = beginningOfSecond(second0);
  const end = endOfSecond(second0);
  const interval = Interval.make(start, end);
  return core.succeed([[end, n + 1], n, ScheduleDecision.continueWith(interval)]);
}));
/** @internal */
exports.secondOfMinute = secondOfMinute;
const spaced = /*#__PURE__*/Debug.untracedMethod(() => duration => addDelay(forever(), () => duration));
/** @internal */
exports.spaced = spaced;
const stop = /*#__PURE__*/Debug.untracedMethod(() => () => asUnit(recurs(0)));
/** @internal */
exports.stop = stop;
const succeed = /*#__PURE__*/Debug.untracedMethod(() => value => map(forever(), () => value));
/** @internal */
exports.succeed = succeed;
const sync = /*#__PURE__*/Debug.untracedMethod(restore => evaluate => map(forever(), restore(evaluate)));
/** @internal */
exports.sync = sync;
const tapInput = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.zipRight(restore(f)(input), restore(self.step)(now, input, state))));
/** @internal */
exports.tapInput = tapInput;
const tapOutput = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.tap(restore(self.step)(now, input, state), ([, out]) => restore(f)(out))));
/** @internal */
exports.tapOutput = tapOutput;
const unfold = /*#__PURE__*/Debug.untracedMethod(restore => (initial, f) => makeWithState(initial, (now, _, state) => core.sync(() => [restore(f)(state), state, ScheduleDecision.continueWith(Interval.after(now))])));
/** @internal */
exports.unfold = unfold;
const union = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => unionWith(self, that, (selfIntervals, thatIntervals) => Intervals.union(thatIntervals)(selfIntervals)));
/** @internal */
exports.union = union;
const unionWith = /*#__PURE__*/Debug.untracedDual(3, restore => (self, that, f) => makeWithState([self.initial, that.initial], (now, input, state) => core.zipWith(restore(self.step)(now, input, state[0]), restore(that.step)(now, input, state[1]), ([lState, l, lDecision], [rState, r, rDecision]) => {
  if (ScheduleDecision.isDone(lDecision) && ScheduleDecision.isDone(rDecision)) {
    return [[lState, rState], [l, r], ScheduleDecision.done];
  }
  if (ScheduleDecision.isDone(lDecision) && ScheduleDecision.isContinue(rDecision)) {
    return [[lState, rState], [l, r], ScheduleDecision.continue(rDecision.intervals)];
  }
  if (ScheduleDecision.isContinue(lDecision) && ScheduleDecision.isDone(rDecision)) {
    return [[lState, rState], [l, r], ScheduleDecision.continue(lDecision.intervals)];
  }
  if (ScheduleDecision.isContinue(lDecision) && ScheduleDecision.isContinue(rDecision)) {
    const combined = restore(f)(lDecision.intervals, rDecision.intervals);
    return [[lState, rState], [l, r], ScheduleDecision.continue(combined)];
  }
  throw new Error("BUG: Schedule.unionWith - please report an issue at https://github.com/Effect-TS/io/issues");
})));
/** @internal */
exports.unionWith = unionWith;
const untilInput = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => check(self, (input, _) => !restore(f)(input)));
/** @internal */
exports.untilInput = untilInput;
const untilInputEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => checkEffect(self, (input, _) => effect.negate(restore(f)(input))));
/** @internal */
exports.untilInputEffect = untilInputEffect;
const untilOutput = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => check(self, (_, out) => !restore(f)(out)));
/** @internal */
exports.untilOutput = untilOutput;
const untilOutputEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => checkEffect(self, (_, out) => effect.negate(restore(f)(out))));
/** @internal */
exports.untilOutputEffect = untilOutputEffect;
const upTo = /*#__PURE__*/Debug.untracedDual(2, () => (self, duration) => zipLeft(self, recurUpTo(duration)));
/** @internal */
exports.upTo = upTo;
const whileInput = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => check(self, (input, _) => restore(f)(input)));
/** @internal */
exports.whileInput = whileInput;
const whileInputEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => checkEffect(self, (input, _) => restore(f)(input)));
/** @internal */
exports.whileInputEffect = whileInputEffect;
const whileOutput = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => check(self, (_, out) => restore(f)(out)));
/** @internal */
exports.whileOutput = whileOutput;
const whileOutputEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => checkEffect(self, (_, out) => restore(f)(out)));
/** @internal */
exports.whileOutputEffect = whileOutputEffect;
const windowed = /*#__PURE__*/Debug.untracedMethod(() => interval => {
  const millis = interval.millis;
  return makeWithState([Option.none(), 0], (now, _, [option, n]) => {
    switch (option._tag) {
      case "None":
        {
          return core.succeed([[Option.some(now), n + 1], n, ScheduleDecision.continueWith(Interval.after(now + millis))]);
        }
      case "Some":
        {
          return core.succeed([[Option.some(option.value), n + 1], n, ScheduleDecision.continueWith(Interval.after(now + (millis - (now - option.value) % millis)))]);
        }
    }
  });
});
/** @internal */
exports.windowed = windowed;
const zipLeft = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => map(out => out[0])(intersect(self, that)));
/** @internal */
exports.zipLeft = zipLeft;
const zipRight = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => map(out => out[1])(intersect(self, that)));
/** @internal */
exports.zipRight = zipRight;
const zipWith = /*#__PURE__*/Debug.untracedDual(3, restore => (self, that, f) => map(([out, out2]) => restore(f)(out, out2))(intersect(self, that)));
// -----------------------------------------------------------------------------
// Seconds
// -----------------------------------------------------------------------------
/** @internal */
exports.zipWith = zipWith;
const beginningOfSecond = now => {
  const date = new Date(now);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0).getTime();
};
/** @internal */
exports.beginningOfSecond = beginningOfSecond;
const endOfSecond = now => {
  const date = new Date(beginningOfSecond(now));
  return date.setSeconds(date.getSeconds() + 1);
};
/** @internal */
exports.endOfSecond = endOfSecond;
const nextSecond = (now, second, initial) => {
  const date = new Date(now);
  if (date.getSeconds() === second && initial) {
    return now;
  }
  if (date.getSeconds() < second) {
    return date.setSeconds(second);
  }
  // Set seconds to the provided value and add one minute
  const newDate = new Date(date.setSeconds(second));
  return newDate.setTime(newDate.getTime() + 1000 * 60);
};
// -----------------------------------------------------------------------------
// Minutes
// -----------------------------------------------------------------------------
/** @internal */
exports.nextSecond = nextSecond;
const beginningOfMinute = now => {
  const date = new Date(now);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0).getTime();
};
/** @internal */
exports.beginningOfMinute = beginningOfMinute;
const endOfMinute = now => {
  const date = new Date(beginningOfMinute(now));
  return date.setMinutes(date.getMinutes() + 1);
};
/** @internal */
exports.endOfMinute = endOfMinute;
const nextMinute = (now, minute, initial) => {
  const date = new Date(now);
  if (date.getMinutes() === minute && initial) {
    return now;
  }
  if (date.getMinutes() < minute) {
    return date.setMinutes(minute);
  }
  // Set minutes to the provided value and add one hour
  const newDate = new Date(date.setMinutes(minute));
  return newDate.setTime(newDate.getTime() + 1000 * 60 * 60);
};
// -----------------------------------------------------------------------------
// Hours
// -----------------------------------------------------------------------------
/** @internal */
exports.nextMinute = nextMinute;
const beginningOfHour = now => {
  const date = new Date(now);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0, 0, 0).getTime();
};
/** @internal */
exports.beginningOfHour = beginningOfHour;
const endOfHour = now => {
  const date = new Date(beginningOfHour(now));
  return date.setHours(date.getHours() + 1);
};
/** @internal */
exports.endOfHour = endOfHour;
const nextHour = (now, hour, initial) => {
  const date = new Date(now);
  if (date.getHours() === hour && initial) {
    return now;
  }
  if (date.getHours() < hour) {
    return date.setHours(hour);
  }
  // Set hours to the provided value and add one day
  const newDate = new Date(date.setHours(hour));
  return newDate.setTime(newDate.getTime() + 1000 * 60 * 60 * 24);
};
// -----------------------------------------------------------------------------
// Days
// -----------------------------------------------------------------------------
/** @internal */
exports.nextHour = nextHour;
const beginningOfDay = now => {
  const date = new Date(now);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0).getTime();
};
/** @internal */
exports.beginningOfDay = beginningOfDay;
const endOfDay = now => {
  const date = new Date(beginningOfDay(now));
  return date.setDate(date.getDate() + 1);
};
/** @internal */
exports.endOfDay = endOfDay;
const nextDay = (now, dayOfWeek, initial) => {
  const date = new Date(now);
  if (date.getDay() === dayOfWeek && initial) {
    return now;
  }
  const nextDayOfWeek = (7 + dayOfWeek - date.getDay()) % 7;
  return date.setDate(date.getDate() + (nextDayOfWeek === 0 ? 7 : nextDayOfWeek));
};
/** @internal */
exports.nextDay = nextDay;
const nextDayOfMonth = (now, day, initial) => {
  const date = new Date(now);
  if (date.getDate() === day && initial) {
    return now;
  }
  if (date.getDate() < day) {
    return date.setDate(day);
  }
  return findNextMonth(now, day, 1);
};
/** @internal */
exports.nextDayOfMonth = nextDayOfMonth;
const findNextMonth = (now, day, months) => {
  const d = new Date(now);
  const tmp1 = new Date(d.setDate(day));
  const tmp2 = new Date(tmp1.setMonth(tmp1.getMonth() + months));
  if (tmp2.getDate() === day) {
    const d2 = new Date(now);
    const tmp3 = new Date(d2.setDate(day));
    return tmp3.setMonth(tmp3.getMonth() + months);
  }
  return findNextMonth(now, day, months + 1);
};
// circular with Effect
/** @internal */
exports.findNextMonth = findNextMonth;
const repeat_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, schedule) => repeatOrElse_Effect(self, schedule, (e, _) => core.fail(e)).traced(trace));
/** @internal */
exports.repeat_Effect = repeat_Effect;
const repeatOrElse_Effect = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, schedule, orElse) => core.map(repeatOrElseEither_Effect(self, schedule, restore(orElse)), Either.merge).traced(trace));
/** @internal */
exports.repeatOrElse_Effect = repeatOrElse_Effect;
const repeatOrElseEither_Effect = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, schedule, orElse) => core.flatMap(driver(schedule), driver => core.matchEffect(self, error => core.map(Either.left)(restore(orElse)(error, Option.none())), value => repeatOrElseEitherEffectLoop(self, driver, restore(orElse), value))).traced(trace));
/** @internal */
exports.repeatOrElseEither_Effect = repeatOrElseEither_Effect;
const repeatOrElseEitherEffectLoop = (self, driver, orElse, value) => {
  return core.matchEffect(() => core.map(Either.right)(core.orDie(driver.last())), b => core.matchEffect(error => core.map(Either.left)(orElse(error, Option.some(b))), value => repeatOrElseEitherEffectLoop(self, driver, orElse, value))(self))(driver.next(value));
};
/** @internal */
const repeatUntil_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => repeatUntilEffect_Effect(self, a => core.sync(() => restore(f)(a))).traced(trace));
/** @internal */
exports.repeatUntil_Effect = repeatUntil_Effect;
const repeatUntilEffect_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.flatMap(self, a => core.flatMap(f(a), result => result ? core.succeed(a) : core.zipRight(core.yieldNow(), repeatUntilEffect_Effect(self, restore(f))))).traced(trace));
/** @internal */
exports.repeatUntilEffect_Effect = repeatUntilEffect_Effect;
const repeatUntilEquals_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => repeatUntil_Effect(self, a => Equal.equals(a, value)).traced(trace));
/** @internal */
exports.repeatUntilEquals_Effect = repeatUntilEquals_Effect;
const repeatWhile_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => repeatWhileEffect_Effect(self, a => core.sync(() => restore(f)(a))).traced(trace));
/** @internal */
exports.repeatWhile_Effect = repeatWhile_Effect;
const repeatWhileEffect_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => repeatUntilEffect_Effect(self, a => effect.negate(restore(f)(a))).traced(trace));
/** @internal */
exports.repeatWhileEffect_Effect = repeatWhileEffect_Effect;
const repeatWhileEquals_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => repeatWhile_Effect(self, a => Equal.equals(a, value)).traced(trace));
/** @internal */
exports.repeatWhileEquals_Effect = repeatWhileEquals_Effect;
const retry_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, policy) => retryOrElse_Effect(self, policy, (e, _) => core.fail(e)).traced(trace));
/** @internal */
exports.retry_Effect = retry_Effect;
const retryN_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, n) => retryN_EffectLoop(self, n).traced(trace));
/** @internal */
exports.retryN_Effect = retryN_Effect;
const retryN_EffectLoop = (self, n) => {
  return core.catchAll(self, e => n < 0 ? core.fail(e) : core.flatMap(core.yieldNow(), () => retryN_EffectLoop(self, n - 1)));
};
/** @internal */
const retryOrElse_Effect = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, policy, orElse) => core.map(retryOrElseEither_Effect(self, policy, restore(orElse)), Either.merge).traced(trace));
/** @internal */
exports.retryOrElse_Effect = retryOrElse_Effect;
const retryOrElseEither_Effect = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, policy, orElse) => core.flatMap(driver(policy), driver => retryOrElseEither_EffectLoop(self, driver, restore(orElse))).traced(trace));
/** @internal */
exports.retryOrElseEither_Effect = retryOrElseEither_Effect;
const retryOrElseEither_EffectLoop = (self, driver, orElse) => {
  return core.catchAll(e => core.matchEffect(() => core.flatMap(out => core.map(Either.left)(orElse(e, out)))(core.orDie(driver.last())), () => retryOrElseEither_EffectLoop(self, driver, orElse))(driver.next(e)))(core.map(Either.right)(self));
};
/** @internal */
const retryUntil_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => retryUntilEffect_Effect(self, e => core.sync(() => restore(f)(e))).traced(trace));
/** @internal */
exports.retryUntil_Effect = retryUntil_Effect;
const retryUntilEffect_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.catchAll(self, e => core.flatMap(restore(f)(e), b => b ? core.fail(e) : core.flatMap(core.yieldNow(), () => retryUntilEffect_Effect(self, restore(f))))).traced(trace));
/** @internal */
exports.retryUntilEffect_Effect = retryUntilEffect_Effect;
const retryUntilEquals_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, e) => retryUntil_Effect(self, _ => Equal.equals(_, e)).traced(trace));
/** @internal */
exports.retryUntilEquals_Effect = retryUntilEquals_Effect;
const retryWhile_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => retryWhileEffect_Effect(self, e => core.sync(() => restore(f)(e))).traced(trace));
/** @internal */
exports.retryWhile_Effect = retryWhile_Effect;
const retryWhileEffect_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => retryUntilEffect_Effect(self, e => effect.negate(restore(f)(e))).traced(trace));
/** @internal */
exports.retryWhileEffect_Effect = retryWhileEffect_Effect;
const retryWhileEquals_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, e) => retryWhile_Effect(self, err => Equal.equals(e, err)).traced(trace));
/** @internal */
exports.retryWhileEquals_Effect = retryWhileEquals_Effect;
const schedule_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, schedule) => scheduleFrom_Effect(self, void 0, schedule).traced(trace));
/** @internal */
exports.schedule_Effect = schedule_Effect;
const scheduleFrom_Effect = /*#__PURE__*/Debug.dualWithTrace(3, trace => (self, initial, schedule) => core.flatMap(driver(schedule), driver => scheduleFrom_EffectLoop(self, initial, driver)).traced(trace));
/** @internal */
exports.scheduleFrom_Effect = scheduleFrom_Effect;
const scheduleFrom_EffectLoop = (self, initial, driver) => core.matchEffect(() => core.orDie(driver.last()), () => core.flatMap(a => scheduleFrom_EffectLoop(self, a, driver))(self))(driver.next(initial));
//# sourceMappingURL=schedule.js.map