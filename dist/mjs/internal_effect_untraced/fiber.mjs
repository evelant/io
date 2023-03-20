import * as Chunk from "@effect/data/Chunk";
import * as Either from "@effect/data/Either";
import { dual } from "@effect/data/Function";
import * as HashSet from "@effect/data/HashSet";
import * as number from "@effect/data/Number";
import * as Option from "@effect/data/Option";
import * as order from "@effect/data/typeclass/Order";
import * as Clock from "@effect/io/Clock";
import * as Debug from "@effect/io/Debug";
import * as Exit from "@effect/io/Exit";
import * as FiberId from "@effect/io/Fiber/Id";
import * as FiberStatus from "@effect/io/Fiber/Status";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as fiberScope from "@effect/io/internal_effect_untraced/fiberScope";
import * as runtimeFlags from "@effect/io/internal_effect_untraced/runtimeFlags";
/** @internal */
const FiberSymbolKey = "@effect/io/Fiber";
/** @internal */
export const FiberTypeId = /*#__PURE__*/Symbol.for(FiberSymbolKey);
/** @internal */
export const fiberVariance = {
  _E: _ => _,
  _A: _ => _
};
/** @internal */
const RuntimeFiberSymbolKey = "@effect/io/Fiber";
/** @internal */
export const RuntimeFiberTypeId = /*#__PURE__*/Symbol.for(RuntimeFiberSymbolKey);
/** @internal */
export const Order = /*#__PURE__*/order.contramap(fiber => [fiber.id().startTimeMillis, fiber.id().id])( /*#__PURE__*/order.tuple(number.Order, number.Order));
/** @internal */
export const isFiber = u => typeof u === "object" && u != null && FiberTypeId in u;
/** @internal */
export const isRuntimeFiber = self => RuntimeFiberTypeId in self;
/** @internal */
export const _await = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.await().traced(trace));
/** @internal */
export const children = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.children().traced(trace));
/** @internal */
export const done = exit => ({
  [FiberTypeId]: fiberVariance,
  id: () => FiberId.none,
  await: Debug.methodWithTrace(trace => () => core.succeed(exit).traced(trace)),
  children: Debug.methodWithTrace(trace => () => core.succeed(Chunk.empty()).traced(trace)),
  inheritAll: Debug.methodWithTrace(trace => () => core.unit().traced(trace)),
  poll: Debug.methodWithTrace(trace => () => core.succeed(Option.some(exit)).traced(trace)),
  interruptAsFork: Debug.methodWithTrace(trace => () => core.unit().traced(trace))
});
/** @internal */
export const dump = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.map(self.status(), status => ({
  id: self.id(),
  status
})).traced(trace));
/** @internal */
export const dumpAll = /*#__PURE__*/Debug.methodWithTrace(trace => fibers => core.forEach(fibers, dump).traced(trace));
/** @internal */
export const fail = error => {
  return done(Exit.fail(error));
};
/** @internal */
export const failCause = cause => {
  return done(Exit.failCause(cause));
};
/** @internal */
export const fromEffect = /*#__PURE__*/Debug.methodWithTrace(trace => effect => core.map(core.exit(effect), done).traced(trace));
/** @internal */
export const id = self => {
  return self.id();
};
/** @internal */
export const inheritAll = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.inheritAll().traced(trace));
/** @internal */
export const interrupted = fiberId => {
  return done(Exit.interrupt(fiberId));
};
/** @internal */
export const interruptAll = /*#__PURE__*/Debug.methodWithTrace(trace => fibers => core.flatMap(core.fiberId(), fiberId => interruptAllAs(fiberId)(fibers)).traced(trace));
/** @internal */
export const interruptAllAs = /*#__PURE__*/Debug.dualWithTrace(2, trace => (fibers, fiberId) => core.zipRight(core.forEachDiscard(_await)(fibers))(core.forEachDiscard(fibers, interruptAsFork(fiberId))).traced(trace));
/** @internal */
export const interruptAsFork = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, fiberId) => self.interruptAsFork(fiberId).traced(trace));
/** @internal */
export const join = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.zipLeft(core.flatten(self.await()), self.inheritAll()).traced(trace));
/** @internal */
export const map = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => mapEffect(self, a => core.sync(() => restore(f)(a))));
/** @internal */
export const mapEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => ({
  [FiberTypeId]: fiberVariance,
  id: () => self.id(),
  await: Debug.methodWithTrace(trace => () => core.flatMap(self.await(), Exit.forEachEffect(f)).traced(trace)),
  children: Debug.methodWithTrace(trace => () => self.children().traced(trace)),
  inheritAll: Debug.methodWithTrace(trace => () => self.inheritAll().traced(trace)),
  poll: Debug.methodWithTrace(trace => () => core.flatMap(self.poll(), result => {
    switch (result._tag) {
      case "None":
        {
          return core.succeed(Option.none());
        }
      case "Some":
        {
          return core.map(Option.some)(Exit.forEachEffect(result.value, restore(f)));
        }
    }
  }).traced(trace)),
  interruptAsFork: Debug.methodWithTrace(trace => id => self.interruptAsFork(id).traced(trace))
}));
/** @internal */
export const mapFiber = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.map(self.await(), Exit.match(cause => failCause(cause), a => restore(f)(a))).traced(trace));
/** @internal */
export const match = /*#__PURE__*/Debug.untracedDual(3, restore => (self, onFiber, onRuntimeFiber) => {
  if (isRuntimeFiber(self)) {
    return restore(onRuntimeFiber)(self);
  }
  return restore(onFiber)(self);
});
/** @internal */
export const never = () => ({
  [FiberTypeId]: fiberVariance,
  id: () => FiberId.none,
  await: Debug.methodWithTrace(trace => () => core.never().traced(trace)),
  children: Debug.methodWithTrace(trace => () => core.succeed(Chunk.empty()).traced(trace)),
  inheritAll: Debug.methodWithTrace(trace => () => core.never().traced(trace)),
  poll: Debug.methodWithTrace(trace => () => core.succeed(Option.none()).traced(trace)),
  interruptAsFork: Debug.methodWithTrace(trace => () => core.never().traced(trace))
});
/** @internal */
export const orElse = /*#__PURE__*/dual(2, (self, that) => ({
  [FiberTypeId]: fiberVariance,
  id: () => FiberId.getOrElse(self.id(), that.id()),
  await: Debug.methodWithTrace(trace => () => core.zipWith(self.await(), that.await(), (exit1, exit2) => Exit.isSuccess(exit1) ? exit1 : exit2).traced(trace)),
  children: Debug.methodWithTrace(trace => () => self.children().traced(trace)),
  inheritAll: Debug.methodWithTrace(trace => () => core.zipRight(that.inheritAll(), self.inheritAll()).traced(trace)),
  poll: Debug.methodWithTrace(trace => () => core.zipWith(self.poll(), that.poll(), (option1, option2) => {
    switch (option1._tag) {
      case "None":
        {
          return Option.none();
        }
      case "Some":
        {
          return Exit.isSuccess(option1.value) ? option1 : option2;
        }
    }
  }).traced(trace)),
  interruptAsFork: Debug.methodWithTrace(trace => id => core.asUnit(core.zipRight(core.interruptAsFiber(id)(that))(core.interruptAsFiber(self, id))).traced(trace))
}));
/** @internal */
export const orElseEither = /*#__PURE__*/dual(2, (self, that) => orElse(map(self, Either.left), map(that, Either.right)));
/** @internal */
export const poll = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.poll().traced(trace));
// forked from https://github.com/sindresorhus/parse-ms/blob/4da2ffbdba02c6e288c08236695bdece0adca173/index.js
// MIT License
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
/** @internal */
const parseMs = milliseconds => {
  const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
  return {
    days: roundTowardsZero(milliseconds / 86400000),
    hours: roundTowardsZero(milliseconds / 3600000) % 24,
    minutes: roundTowardsZero(milliseconds / 60000) % 60,
    seconds: roundTowardsZero(milliseconds / 1000) % 60,
    milliseconds: roundTowardsZero(milliseconds) % 1000,
    microseconds: roundTowardsZero(milliseconds * 1000) % 1000,
    nanoseconds: roundTowardsZero(milliseconds * 1e6) % 1000
  };
};
/** @internal */
const renderStatus = status => {
  if (FiberStatus.isDone(status)) {
    return "Done";
  }
  if (FiberStatus.isRunning(status)) {
    return "Running";
  }
  const isInterruptible = runtimeFlags.interruptible(status.runtimeFlags) ? "interruptible" : "uninterruptible";
  return `Suspended(${isInterruptible})`;
};
/** @internal */
export const pretty = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.flatMap(Clock.currentTimeMillis(), now => core.map(dump(self), dump => {
  const time = now - dump.id.startTimeMillis;
  const {
    days,
    hours,
    milliseconds,
    minutes,
    seconds
  } = parseMs(time);
  const lifeMsg = (days === 0 ? "" : `${days}d`) + (days === 0 && hours === 0 ? "" : `${hours}h`) + (days === 0 && hours === 0 && minutes === 0 ? "" : `${minutes}m`) + (days === 0 && hours === 0 && minutes === 0 && seconds === 0 ? "" : `${seconds}s`) + `${milliseconds}ms`;
  const waitMsg = FiberStatus.isSuspended(dump.status) ? (() => {
    const ids = FiberId.ids(dump.status.blockingOn);
    return HashSet.size(ids) > 0 ? `waiting on ` + Array.from(ids).map(id => `${id}`).join(", ") : "";
  })() : "";
  const statusMsg = renderStatus(dump.status);
  return `[Fiber](#${dump.id.id}) (${lifeMsg}) ${waitMsg}\n   Status: ${statusMsg}`;
})).traced(trace));
/** @internal */
export const roots = /*#__PURE__*/Debug.methodWithTrace(trace => () => core.sync(unsafeRoots).traced(trace));
/** @internal */
export const unsafeRoots = () => {
  return Chunk.fromIterable(fiberScope.globalScope.roots);
};
/** @internal */
export const status = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.status().traced(trace));
/** @internal */
export const succeed = value => {
  return done(Exit.succeed(value));
};
/** @internal */
export const unit = () => succeed(void 0);
/** @internal */
export const currentFiberURI = "@effect/io/Fiber/Current";
/** @internal */
export const getCurrentFiber = () => Option.fromNullable(globalThis[currentFiberURI]);
//# sourceMappingURL=fiber.mjs.map