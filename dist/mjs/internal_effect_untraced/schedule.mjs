var _a, _b;
import * as Chunk from "@effect/data/Chunk";
import * as Context from "@effect/data/Context";
import * as Duration from "@effect/data/Duration";
import * as Either from "@effect/data/Either";
import * as Equal from "@effect/data/Equal";
import { constVoid } from "@effect/data/Function";
import * as Option from "@effect/data/Option";
import * as Clock from "@effect/io/Clock";
import * as Debug from "@effect/io/Debug";
import * as internalCause from "@effect/io/internal_effect_untraced/cause";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as effect from "@effect/io/internal_effect_untraced/effect";
import * as Random from "@effect/io/Random";
import * as Ref from "@effect/io/Ref";
import * as ScheduleDecision from "@effect/io/Schedule/Decision";
import * as Interval from "@effect/io/Schedule/Interval";
import * as Intervals from "@effect/io/Schedule/Intervals";
/** @internal */
const ScheduleSymbolKey = "@effect/io/Schedule";
/** @internal */
export const ScheduleTypeId = /*#__PURE__*/Symbol.for(ScheduleSymbolKey);
/** @internal */
const ScheduleDriverSymbolKey = "@effect/io/Schedule/Driver";
/** @internal */
export const ScheduleDriverTypeId = /*#__PURE__*/Symbol.for(ScheduleDriverSymbolKey);
/** @internal */
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
export const makeWithState = /*#__PURE__*/Debug.untracedMethod(restore => (initial, step) => new ScheduleImpl(initial, restore(step)));
/** @internal */
export const addDelay = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => addDelayEffect(self, out => core.sync(() => restore(f)(out))));
/** @internal */
export const addDelayEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => modifyDelayEffect(self, (out, duration) => core.map(restore(f)(out), delay => Duration.millis(duration.millis + delay.millis))));
/** @internal */
export const andThen = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => map(Either.merge)(andThenEither(self, that)));
/** @internal */
export const andThenEither = /*#__PURE__*/Debug.untracedDual(2, restore => (self, that) => makeWithState([self.initial, that.initial, true], (now, input, state) => state[2] ? core.flatMap(restore(self.step)(now, input, state[0]), ([lState, out, decision]) => {
  if (ScheduleDecision.isDone(decision)) {
    return core.map(that.step(now, input, state[1]), ([rState, out, decision]) => [[lState, rState, false], Either.right(out), decision]);
  }
  return core.succeed([[lState, state[1], true], Either.left(out), decision]);
}) : core.map(that.step(now, input, state[1]), ([rState, out, decision]) => [[state[0], rState, false], Either.right(out), decision])));
/** @internal */
export const as = /*#__PURE__*/Debug.untracedDual(2, () => (self, out) => map(self, () => out));
/** @internal */
export const asUnit = /*#__PURE__*/Debug.untracedMethod(() => self => map(self, constVoid));
/** @internal */
export const bothInOut = /*#__PURE__*/Debug.untracedDual(2, restore => (self, that) => makeWithState([self.initial, that.initial], (now, [in1, in2], state) => core.zipWith(restore(self.step)(now, in1, state[0]), restore(that.step)(now, in2, state[1]), ([lState, out, lDecision], [rState, out2, rDecision]) => {
  if (ScheduleDecision.isContinue(lDecision) && ScheduleDecision.isContinue(rDecision)) {
    const interval = Intervals.union(rDecision.intervals)(lDecision.intervals);
    return [[lState, rState], [out, out2], ScheduleDecision.continue(interval)];
  }
  return [[lState, rState], [out, out2], ScheduleDecision.done];
})));
/** @internal */
export const check = /*#__PURE__*/Debug.untracedDual(2, restore => (self, test) => checkEffect(self, (input, out) => core.sync(() => restore(test)(input, out))));
/** @internal */
export const checkEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, test) => makeWithState(self.initial, (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => {
  if (ScheduleDecision.isDone(decision)) {
    return core.succeed([state, out, ScheduleDecision.done]);
  }
  return core.map(restore(test)(input, out), cont => cont ? [state, out, decision] : [state, out, ScheduleDecision.done]);
})));
/** @internal */
export const choose = /*#__PURE__*/Debug.untracedDual(2, restore => (self, that) => makeWithState([self.initial, that.initial], (now, either, state) => {
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
export const chooseMerge = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => map(choose(self, that), Either.merge));
/** @internal */
export const collectAllInputs = /*#__PURE__*/Debug.untracedMethod(() => () => collectAllOutputs(identity()));
/** @internal */
export const collectAllOutputs = /*#__PURE__*/Debug.untracedMethod(() => self => reduce(self, Chunk.empty(), (outs, out) => Chunk.append(out)(outs)));
/** @internal */
export const collectUntil = /*#__PURE__*/Debug.untracedMethod(restore => f => collectAllOutputs(recurUntil(restore(f))));
/** @internal */
export const collectUntilEffect = /*#__PURE__*/Debug.untracedMethod(restore => f => collectAllOutputs(recurUntilEffect(restore(f))));
/** @internal */
export const collectWhile = /*#__PURE__*/Debug.untracedMethod(restore => f => collectAllOutputs(recurWhile(restore(f))));
/** @internal */
export const collectWhileEffect = /*#__PURE__*/Debug.untracedMethod(restore => f => collectAllOutputs(recurWhileEffect(restore(f))));
/** @internal */
export const compose = /*#__PURE__*/Debug.untracedDual(2, restore => (self, that) => makeWithState([self.initial, that.initial], (now, input, state) => core.flatMap(restore(self.step)(now, input, state[0]), ([lState, out, lDecision]) => core.map(that.step(now, out, state[1]), ([rState, out2, rDecision]) => ScheduleDecision.isDone(lDecision) ? [[lState, rState], out2, ScheduleDecision.done] : ScheduleDecision.isDone(rDecision) ? [[lState, rState], out2, ScheduleDecision.done] : [[lState, rState], out2, ScheduleDecision.continue(Intervals.max(rDecision.intervals)(lDecision.intervals))]))));
/** @internal */
export const contramap = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => contramapEffect(self, input2 => core.sync(() => restore(f)(input2))));
/** @internal */
export const contramapContext = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.contramapContext(restore(self.step)(now, input, state), restore(f))));
/** @internal */
export const contramapEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input2, state) => core.flatMap(restore(f)(input2), input => restore(self.step)(now, input, state))));
/** @internal */
export const count = /*#__PURE__*/Debug.untracedMethod(() => () => unfold(0, n => n + 1));
/** @internal */
export const dayOfMonth = /*#__PURE__*/Debug.untracedMethod(() => day => {
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
export const dayOfWeek = /*#__PURE__*/Debug.untracedMethod(() => day => {
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
export const delayed = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => delayedEffect(self, duration => core.sync(() => restore(f)(duration))));
/** @internal */
export const delayedEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => modifyDelayEffect(self, (_, delay) => restore(f)(delay)));
/** @internal */
export const delayedSchedule = /*#__PURE__*/Debug.untracedMethod(() => schedule => addDelay(schedule, x => x));
/** @internal */
export const delays = /*#__PURE__*/Debug.untracedMethod(restore => self => makeWithState(self.initial, (now, input, state) => core.flatMap(([state, _, decision]) => {
  if (ScheduleDecision.isDone(decision)) {
    return core.succeed([state, Duration.zero, decision]);
  }
  return core.succeed([state, Duration.millis(Intervals.start(decision.intervals) - now), decision]);
})(restore(self.step)(now, input, state))));
/** @internal */
export const dimap = /*#__PURE__*/Debug.untracedDual(3, restore => (self, f, g) => map(restore(g))(contramap(self, restore(f))));
/** @internal */
export const dimapEffect = /*#__PURE__*/Debug.untracedDual(3, restore => (self, f, g) => mapEffect(restore(g))(contramapEffect(self, restore(f))));
/** @internal */
export const driver = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.map(ref => new ScheduleDriverImpl(self, ref))(Ref.make([Option.none(), self.initial])).traced(trace));
/** @internal */
export const duration = /*#__PURE__*/Debug.untracedMethod(() => duration => makeWithState(true, (now, _, state) => core.succeed(state ? [false, duration, ScheduleDecision.continueWith(Interval.after(now + duration.millis))] : [false, Duration.zero, ScheduleDecision.done])));
/** @internal */
export const either = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => union(self, that));
/** @internal */
export const eitherWith = /*#__PURE__*/Debug.untracedDual(3, restore => (self, that, f) => unionWith(self, that, restore(f)));
/** @internal */
export const elapsed = /*#__PURE__*/Debug.untracedMethod(() => () => makeWithState(Option.none(), (now, _, state) => {
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
export const ensuring = /*#__PURE__*/Debug.untracedDual(2, restore => (self, finalizer) => makeWithState(self.initial, (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => ScheduleDecision.isDone(decision) ? core.as(finalizer, [state, out, decision]) : core.succeed([state, out, decision]))));
/** @internal */
export const exponential = /*#__PURE__*/Debug.untracedMethod(() => (base, factor = 2.0) => delayedSchedule(map(i => Duration.millis(base.millis * Math.pow(factor, i)))(forever())));
/** @internal */
export const fibonacci = /*#__PURE__*/Debug.untracedMethod(() => one => delayedSchedule(map(out => out[0])(unfold([one, one], ([a, b]) => [b, Duration.sum(a, b)]))));
/** @internal */
export const fixed = /*#__PURE__*/Debug.untracedMethod(() => interval => makeWithState([Option.none(), 0], (now, _, [option, n]) => core.sync(() => {
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
export const forever = /*#__PURE__*/Debug.untracedMethod(() => () => unfold(0, n => n + 1));
/** @internal */
export const fromDelay = /*#__PURE__*/Debug.untracedMethod(() => delay => duration(delay));
/** @internal */
export const fromDelays = /*#__PURE__*/Debug.untracedMethod(() => (delay, ...delays) => makeWithState([[delay, ...delays], true], (now, _, [durations, cont]) => core.sync(() => {
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
export const fromFunction = /*#__PURE__*/Debug.untracedMethod(restore => f => map(restore(f))(identity()));
/** @internal */
export const hourOfDay = /*#__PURE__*/Debug.untracedMethod(() => hour => makeWithState([Number.NEGATIVE_INFINITY, 0], (now, _, state) => {
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
export const identity = /*#__PURE__*/Debug.untracedMethod(() => () => makeWithState(void 0, (now, input, state) => core.succeed([state, input, ScheduleDecision.continueWith(Interval.after(now))])));
/** @internal */
export const intersect = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => intersectWith(self, that, (selfIntervals, thatIntervals) => Intervals.intersect(thatIntervals)(selfIntervals)));
/** @internal */
export const intersectWith = /*#__PURE__*/Debug.untracedDual(3, restore => (self, that, f) => makeWithState([self.initial, that.initial], (now, input, state) => core.flatMap(([[lState, out, lDecision], [rState, out2, rDecision]]) => {
  if (ScheduleDecision.isContinue(lDecision) && ScheduleDecision.isContinue(rDecision)) {
    return intersectWithLoop(self, that, input, lState, out, lDecision.intervals, rState, out2, rDecision.intervals, restore(f));
  }
  return core.succeed([[lState, rState], [out, out2], ScheduleDecision.done]);
})(core.zipWith(restore(self.step)(now, input, state[0]), restore(that.step)(now, input, state[1]), (a, b) => [a, b]))));
/** @internal */
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
export const jittered = /*#__PURE__*/Debug.untracedMethod(() => self => jitteredWith(self, {
  min: 0.8,
  max: 1.2
}));
/** @internal */
export const jitteredWith = /*#__PURE__*/Debug.untracedDual(2, () => (self, options) => {
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
export const left = /*#__PURE__*/Debug.untracedMethod(() => self => choose(self, identity()));
/** @internal */
export const linear = /*#__PURE__*/Debug.untracedMethod(() => base => delayedSchedule(map(i => Duration.millis(base.millis * (i + 1)))(forever())));
/** @internal */
export const map = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => mapEffect(self, out => core.sync(() => restore(f)(out))));
/** @internal */
export const mapEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => core.map(restore(f)(out), out2 => [state, out2, decision]))));
/** @internal */
export const minuteOfHour = /*#__PURE__*/Debug.untracedMethod(() => minute => makeWithState([Number.MIN_SAFE_INTEGER, 0], (now, _, state) => {
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
export const modifyDelay = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => modifyDelayEffect(self, (out, duration) => core.sync(() => restore(f)(out, duration))));
/** @internal */
export const modifyDelayEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => {
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
export const onDecision = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => core.as(restore(f)(out, decision), [state, out, decision]))));
/** @internal */
export const once = /*#__PURE__*/Debug.untracedMethod(() => () => asUnit(recurs(1)));
/** @internal */
export const passthrough = /*#__PURE__*/Debug.untracedMethod(restore => self => makeWithState(self.initial, (now, input, state) => core.map(([state, _, decision]) => [state, input, decision])(restore(self.step)(now, input, state))));
/** @internal */
export const provideContext = /*#__PURE__*/Debug.untracedDual(2, restore => (self, context) => makeWithState(self.initial, (now, input, state) => core.provideContext(restore(self.step)(now, input, state), context)));
/** @internal */
export const provideService = /*#__PURE__*/Debug.untracedDual(3, restore => (self, tag, service) => makeWithState(self.initial, (now, input, state) => core.contextWithEffect(env => core.provideContext(
// @ts-expect-error
restore(self.step)(now, input, state), Context.add(tag, service)(env)))));
/** @internal */
export const reconsider = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => reconsiderEffect(self, (out, decision) => core.sync(() => restore(f)(out, decision))));
/** @internal */
export const reconsiderEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => ScheduleDecision.isDone(decision) ? core.map(restore(f)(out, decision), either => {
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
export const recurUntil = /*#__PURE__*/Debug.untracedMethod(restore => f => untilInput(identity(), restore(f)));
/** @internal */
export const recurUntilEffect = /*#__PURE__*/Debug.untracedMethod(restore => f => untilInputEffect(identity(), restore(f)));
/** @internal */
export const recurUntilEquals = /*#__PURE__*/Debug.untracedMethod(() => value => untilInput(identity(), input => Equal.equals(input, value)));
/** @internal */
export const recurUntilOption = /*#__PURE__*/Debug.untracedMethod(restore => pf => untilOutput(Option.isSome)(map(restore(pf))(identity())));
/** @internal */
export const recurUpTo = /*#__PURE__*/Debug.untracedMethod(() => duration => whileOutput(elapsed(), elapsed => Duration.lessThan(duration)(elapsed)));
/** @internal */
export const recurWhile = /*#__PURE__*/Debug.untracedMethod(restore => f => whileInput(identity(), restore(f)));
/** @internal */
export const recurWhileEffect = /*#__PURE__*/Debug.untracedMethod(restore => f => whileInputEffect(identity(), restore(f)));
/** @internal */
export const recurWhileEquals = /*#__PURE__*/Debug.untracedMethod(() => value => whileInput(input => Equal.equals(input, value))(identity()));
/** @internal */
export const recurs = /*#__PURE__*/Debug.untracedMethod(() => n => whileOutput(forever(), out => out < n));
/** @internal */
export const reduce = /*#__PURE__*/Debug.untracedDual(3, restore => (self, zero, f) => reduceEffect(self, zero, (z, out) => core.sync(() => restore(f)(z, out))));
/** @internal */
export const reduceEffect = /*#__PURE__*/Debug.untracedDual(3, restore => (self, zero, f) => makeWithState([self.initial, zero], (now, input, [s, z]) => core.flatMap(restore(self.step)(now, input, s), ([s, out, decision]) => ScheduleDecision.isDone(decision) ? core.succeed([[s, z], z, decision]) : core.map(restore(f)(z, out), z2 => [[s, z2], z, decision]))));
/** @internal */
export const repeatForever = /*#__PURE__*/Debug.untracedMethod(restore => self => makeWithState(self.initial, (now, input, state) => {
  const step = (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => ScheduleDecision.isDone(decision) ? step(now, input, self.initial) : core.succeed([state, out, decision]));
  return step(now, input, state);
}));
/** @internal */
export const repetitions = /*#__PURE__*/Debug.untracedMethod(() => self => reduce(self, 0, (n, _) => n + 1));
/** @internal */
export const resetAfter = /*#__PURE__*/Debug.untracedDual(2, () => (self, duration) => map(out => out[0])(resetWhen(([, time]) => Duration.greaterThanOrEqualTo(duration)(time))(intersect(elapsed())(self))));
/** @internal */
export const resetWhen = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.flatMap(restore(self.step)(now, input, state), ([state, out, decision]) => restore(f)(out) ? restore(self.step)(now, input, self.initial) : core.succeed([state, out, decision]))));
/** @internal */
export const right = /*#__PURE__*/Debug.untracedMethod(() => self => choose(identity(), self));
/** @internal */
export const run = /*#__PURE__*/Debug.dualWithTrace(3, trace => (self, now, input) => core.map(list => Chunk.reverse(list))(runLoop(self, now, Chunk.fromIterable(input), self.initial, Chunk.empty())).traced(trace));
/** @internal */
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
export const secondOfMinute = /*#__PURE__*/Debug.untracedMethod(() => second => makeWithState([Number.NEGATIVE_INFINITY, 0], (now, _, state) => {
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
export const spaced = /*#__PURE__*/Debug.untracedMethod(() => duration => addDelay(forever(), () => duration));
/** @internal */
export const stop = /*#__PURE__*/Debug.untracedMethod(() => () => asUnit(recurs(0)));
/** @internal */
export const succeed = /*#__PURE__*/Debug.untracedMethod(() => value => map(forever(), () => value));
/** @internal */
export const sync = /*#__PURE__*/Debug.untracedMethod(restore => evaluate => map(forever(), restore(evaluate)));
/** @internal */
export const tapInput = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.zipRight(restore(f)(input), restore(self.step)(now, input, state))));
/** @internal */
export const tapOutput = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => makeWithState(self.initial, (now, input, state) => core.tap(restore(self.step)(now, input, state), ([, out]) => restore(f)(out))));
/** @internal */
export const unfold = /*#__PURE__*/Debug.untracedMethod(restore => (initial, f) => makeWithState(initial, (now, _, state) => core.sync(() => [restore(f)(state), state, ScheduleDecision.continueWith(Interval.after(now))])));
/** @internal */
export const union = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => unionWith(self, that, (selfIntervals, thatIntervals) => Intervals.union(thatIntervals)(selfIntervals)));
/** @internal */
export const unionWith = /*#__PURE__*/Debug.untracedDual(3, restore => (self, that, f) => makeWithState([self.initial, that.initial], (now, input, state) => core.zipWith(restore(self.step)(now, input, state[0]), restore(that.step)(now, input, state[1]), ([lState, l, lDecision], [rState, r, rDecision]) => {
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
export const untilInput = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => check(self, (input, _) => !restore(f)(input)));
/** @internal */
export const untilInputEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => checkEffect(self, (input, _) => effect.negate(restore(f)(input))));
/** @internal */
export const untilOutput = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => check(self, (_, out) => !restore(f)(out)));
/** @internal */
export const untilOutputEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => checkEffect(self, (_, out) => effect.negate(restore(f)(out))));
/** @internal */
export const upTo = /*#__PURE__*/Debug.untracedDual(2, () => (self, duration) => zipLeft(self, recurUpTo(duration)));
/** @internal */
export const whileInput = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => check(self, (input, _) => restore(f)(input)));
/** @internal */
export const whileInputEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => checkEffect(self, (input, _) => restore(f)(input)));
/** @internal */
export const whileOutput = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => check(self, (_, out) => restore(f)(out)));
/** @internal */
export const whileOutputEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => checkEffect(self, (_, out) => restore(f)(out)));
/** @internal */
export const windowed = /*#__PURE__*/Debug.untracedMethod(() => interval => {
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
export const zipLeft = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => map(out => out[0])(intersect(self, that)));
/** @internal */
export const zipRight = /*#__PURE__*/Debug.untracedDual(2, () => (self, that) => map(out => out[1])(intersect(self, that)));
/** @internal */
export const zipWith = /*#__PURE__*/Debug.untracedDual(3, restore => (self, that, f) => map(([out, out2]) => restore(f)(out, out2))(intersect(self, that)));
// -----------------------------------------------------------------------------
// Seconds
// -----------------------------------------------------------------------------
/** @internal */
export const beginningOfSecond = now => {
  const date = new Date(now);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0).getTime();
};
/** @internal */
export const endOfSecond = now => {
  const date = new Date(beginningOfSecond(now));
  return date.setSeconds(date.getSeconds() + 1);
};
/** @internal */
export const nextSecond = (now, second, initial) => {
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
export const beginningOfMinute = now => {
  const date = new Date(now);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0).getTime();
};
/** @internal */
export const endOfMinute = now => {
  const date = new Date(beginningOfMinute(now));
  return date.setMinutes(date.getMinutes() + 1);
};
/** @internal */
export const nextMinute = (now, minute, initial) => {
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
export const beginningOfHour = now => {
  const date = new Date(now);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0, 0, 0).getTime();
};
/** @internal */
export const endOfHour = now => {
  const date = new Date(beginningOfHour(now));
  return date.setHours(date.getHours() + 1);
};
/** @internal */
export const nextHour = (now, hour, initial) => {
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
export const beginningOfDay = now => {
  const date = new Date(now);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0).getTime();
};
/** @internal */
export const endOfDay = now => {
  const date = new Date(beginningOfDay(now));
  return date.setDate(date.getDate() + 1);
};
/** @internal */
export const nextDay = (now, dayOfWeek, initial) => {
  const date = new Date(now);
  if (date.getDay() === dayOfWeek && initial) {
    return now;
  }
  const nextDayOfWeek = (7 + dayOfWeek - date.getDay()) % 7;
  return date.setDate(date.getDate() + (nextDayOfWeek === 0 ? 7 : nextDayOfWeek));
};
/** @internal */
export const nextDayOfMonth = (now, day, initial) => {
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
export const findNextMonth = (now, day, months) => {
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
export const repeat_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, schedule) => repeatOrElse_Effect(self, schedule, (e, _) => core.fail(e)).traced(trace));
/** @internal */
export const repeatOrElse_Effect = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, schedule, orElse) => core.map(repeatOrElseEither_Effect(self, schedule, restore(orElse)), Either.merge).traced(trace));
/** @internal */
export const repeatOrElseEither_Effect = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, schedule, orElse) => core.flatMap(driver(schedule), driver => core.matchEffect(self, error => core.map(Either.left)(restore(orElse)(error, Option.none())), value => repeatOrElseEitherEffectLoop(self, driver, restore(orElse), value))).traced(trace));
/** @internal */
const repeatOrElseEitherEffectLoop = (self, driver, orElse, value) => {
  return core.matchEffect(() => core.map(Either.right)(core.orDie(driver.last())), b => core.matchEffect(error => core.map(Either.left)(orElse(error, Option.some(b))), value => repeatOrElseEitherEffectLoop(self, driver, orElse, value))(self))(driver.next(value));
};
/** @internal */
export const repeatUntil_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => repeatUntilEffect_Effect(self, a => core.sync(() => restore(f)(a))).traced(trace));
/** @internal */
export const repeatUntilEffect_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.flatMap(self, a => core.flatMap(f(a), result => result ? core.succeed(a) : core.zipRight(core.yieldNow(), repeatUntilEffect_Effect(self, restore(f))))).traced(trace));
/** @internal */
export const repeatUntilEquals_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => repeatUntil_Effect(self, a => Equal.equals(a, value)).traced(trace));
/** @internal */
export const repeatWhile_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => repeatWhileEffect_Effect(self, a => core.sync(() => restore(f)(a))).traced(trace));
/** @internal */
export const repeatWhileEffect_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => repeatUntilEffect_Effect(self, a => effect.negate(restore(f)(a))).traced(trace));
/** @internal */
export const repeatWhileEquals_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => repeatWhile_Effect(self, a => Equal.equals(a, value)).traced(trace));
/** @internal */
export const retry_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, policy) => retryOrElse_Effect(self, policy, (e, _) => core.fail(e)).traced(trace));
/** @internal */
export const retryN_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, n) => retryN_EffectLoop(self, n).traced(trace));
/** @internal */
const retryN_EffectLoop = (self, n) => {
  return core.catchAll(self, e => n < 0 ? core.fail(e) : core.flatMap(core.yieldNow(), () => retryN_EffectLoop(self, n - 1)));
};
/** @internal */
export const retryOrElse_Effect = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, policy, orElse) => core.map(retryOrElseEither_Effect(self, policy, restore(orElse)), Either.merge).traced(trace));
/** @internal */
export const retryOrElseEither_Effect = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, policy, orElse) => core.flatMap(driver(policy), driver => retryOrElseEither_EffectLoop(self, driver, restore(orElse))).traced(trace));
/** @internal */
const retryOrElseEither_EffectLoop = (self, driver, orElse) => {
  return core.catchAll(e => core.matchEffect(() => core.flatMap(out => core.map(Either.left)(orElse(e, out)))(core.orDie(driver.last())), () => retryOrElseEither_EffectLoop(self, driver, orElse))(driver.next(e)))(core.map(Either.right)(self));
};
/** @internal */
export const retryUntil_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => retryUntilEffect_Effect(self, e => core.sync(() => restore(f)(e))).traced(trace));
/** @internal */
export const retryUntilEffect_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.catchAll(self, e => core.flatMap(restore(f)(e), b => b ? core.fail(e) : core.flatMap(core.yieldNow(), () => retryUntilEffect_Effect(self, restore(f))))).traced(trace));
/** @internal */
export const retryUntilEquals_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, e) => retryUntil_Effect(self, _ => Equal.equals(_, e)).traced(trace));
/** @internal */
export const retryWhile_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => retryWhileEffect_Effect(self, e => core.sync(() => restore(f)(e))).traced(trace));
/** @internal */
export const retryWhileEffect_Effect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => retryUntilEffect_Effect(self, e => effect.negate(restore(f)(e))).traced(trace));
/** @internal */
export const retryWhileEquals_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, e) => retryWhile_Effect(self, err => Equal.equals(e, err)).traced(trace));
/** @internal */
export const schedule_Effect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, schedule) => scheduleFrom_Effect(self, void 0, schedule).traced(trace));
/** @internal */
export const scheduleFrom_Effect = /*#__PURE__*/Debug.dualWithTrace(3, trace => (self, initial, schedule) => core.flatMap(driver(schedule), driver => scheduleFrom_EffectLoop(self, initial, driver)).traced(trace));
/** @internal */
const scheduleFrom_EffectLoop = (self, initial, driver) => core.matchEffect(() => core.orDie(driver.last()), () => core.flatMap(a => scheduleFrom_EffectLoop(self, a, driver))(self))(driver.next(initial));
//# sourceMappingURL=schedule.mjs.map