"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeRoots = exports.unit = exports.succeed = exports.status = exports.roots = exports.pretty = exports.poll = exports.orElseEither = exports.orElse = exports.never = exports.match = exports.mapFiber = exports.mapEffect = exports.map = exports.join = exports.isRuntimeFiber = exports.isFiber = exports.interrupted = exports.interruptAsFork = exports.interruptAllAs = exports.interruptAll = exports.inheritAll = exports.id = exports.getCurrentFiber = exports.fromEffect = exports.fiberVariance = exports.failCause = exports.fail = exports.dumpAll = exports.dump = exports.done = exports.currentFiberURI = exports.children = exports._await = exports.RuntimeFiberTypeId = exports.Order = exports.FiberTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Either = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
var number = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Number"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var order = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/typeclass/Order"));
var Clock = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Clock"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var Exit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Exit"));
var FiberId = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Fiber/Id"));
var FiberStatus = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Fiber/Status"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var fiberScope = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberScope"));
var runtimeFlags = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/runtimeFlags"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const FiberSymbolKey = "@effect/io/Fiber";
/** @internal */
const FiberTypeId = /*#__PURE__*/Symbol.for(FiberSymbolKey);
/** @internal */
exports.FiberTypeId = FiberTypeId;
const fiberVariance = {
  _E: _ => _,
  _A: _ => _
};
/** @internal */
exports.fiberVariance = fiberVariance;
const RuntimeFiberSymbolKey = "@effect/io/Fiber";
/** @internal */
const RuntimeFiberTypeId = /*#__PURE__*/Symbol.for(RuntimeFiberSymbolKey);
/** @internal */
exports.RuntimeFiberTypeId = RuntimeFiberTypeId;
const Order = /*#__PURE__*/order.contramap(fiber => [fiber.id().startTimeMillis, fiber.id().id])( /*#__PURE__*/order.tuple(number.Order, number.Order));
/** @internal */
exports.Order = Order;
const isFiber = u => typeof u === "object" && u != null && FiberTypeId in u;
/** @internal */
exports.isFiber = isFiber;
const isRuntimeFiber = self => RuntimeFiberTypeId in self;
/** @internal */
exports.isRuntimeFiber = isRuntimeFiber;
const _await = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.await().traced(trace));
/** @internal */
exports._await = _await;
const children = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.children().traced(trace));
/** @internal */
exports.children = children;
const done = exit => ({
  [FiberTypeId]: fiberVariance,
  id: () => FiberId.none,
  await: Debug.methodWithTrace(trace => () => core.succeed(exit).traced(trace)),
  children: Debug.methodWithTrace(trace => () => core.succeed(Chunk.empty()).traced(trace)),
  inheritAll: Debug.methodWithTrace(trace => () => core.unit().traced(trace)),
  poll: Debug.methodWithTrace(trace => () => core.succeed(Option.some(exit)).traced(trace)),
  interruptAsFork: Debug.methodWithTrace(trace => () => core.unit().traced(trace))
});
/** @internal */
exports.done = done;
const dump = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.map(self.status(), status => ({
  id: self.id(),
  status
})).traced(trace));
/** @internal */
exports.dump = dump;
const dumpAll = /*#__PURE__*/Debug.methodWithTrace(trace => fibers => core.forEach(fibers, dump).traced(trace));
/** @internal */
exports.dumpAll = dumpAll;
const fail = error => {
  return done(Exit.fail(error));
};
/** @internal */
exports.fail = fail;
const failCause = cause => {
  return done(Exit.failCause(cause));
};
/** @internal */
exports.failCause = failCause;
const fromEffect = /*#__PURE__*/Debug.methodWithTrace(trace => effect => core.map(core.exit(effect), done).traced(trace));
/** @internal */
exports.fromEffect = fromEffect;
const id = self => {
  return self.id();
};
/** @internal */
exports.id = id;
const inheritAll = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.inheritAll().traced(trace));
/** @internal */
exports.inheritAll = inheritAll;
const interrupted = fiberId => {
  return done(Exit.interrupt(fiberId));
};
/** @internal */
exports.interrupted = interrupted;
const interruptAll = /*#__PURE__*/Debug.methodWithTrace(trace => fibers => core.flatMap(core.fiberId(), fiberId => interruptAllAs(fiberId)(fibers)).traced(trace));
/** @internal */
exports.interruptAll = interruptAll;
const interruptAllAs = /*#__PURE__*/Debug.dualWithTrace(2, trace => (fibers, fiberId) => core.zipRight(core.forEachDiscard(_await)(fibers))(core.forEachDiscard(fibers, interruptAsFork(fiberId))).traced(trace));
/** @internal */
exports.interruptAllAs = interruptAllAs;
const interruptAsFork = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, fiberId) => self.interruptAsFork(fiberId).traced(trace));
/** @internal */
exports.interruptAsFork = interruptAsFork;
const join = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.zipLeft(core.flatten(self.await()), self.inheritAll()).traced(trace));
/** @internal */
exports.join = join;
const map = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => mapEffect(self, a => core.sync(() => restore(f)(a))));
/** @internal */
exports.map = map;
const mapEffect = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => ({
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
exports.mapEffect = mapEffect;
const mapFiber = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.map(self.await(), Exit.match(cause => failCause(cause), a => restore(f)(a))).traced(trace));
/** @internal */
exports.mapFiber = mapFiber;
const match = /*#__PURE__*/Debug.untracedDual(3, restore => (self, onFiber, onRuntimeFiber) => {
  if (isRuntimeFiber(self)) {
    return restore(onRuntimeFiber)(self);
  }
  return restore(onFiber)(self);
});
/** @internal */
exports.match = match;
const never = () => ({
  [FiberTypeId]: fiberVariance,
  id: () => FiberId.none,
  await: Debug.methodWithTrace(trace => () => core.never().traced(trace)),
  children: Debug.methodWithTrace(trace => () => core.succeed(Chunk.empty()).traced(trace)),
  inheritAll: Debug.methodWithTrace(trace => () => core.never().traced(trace)),
  poll: Debug.methodWithTrace(trace => () => core.succeed(Option.none()).traced(trace)),
  interruptAsFork: Debug.methodWithTrace(trace => () => core.never().traced(trace))
});
/** @internal */
exports.never = never;
const orElse = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => ({
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
exports.orElse = orElse;
const orElseEither = /*#__PURE__*/(0, _Function.dual)(2, (self, that) => orElse(map(self, Either.left), map(that, Either.right)));
/** @internal */
exports.orElseEither = orElseEither;
const poll = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.poll().traced(trace));
// forked from https://github.com/sindresorhus/parse-ms/blob/4da2ffbdba02c6e288c08236695bdece0adca173/index.js
// MIT License
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
/** @internal */
exports.poll = poll;
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
const pretty = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.flatMap(Clock.currentTimeMillis(), now => core.map(dump(self), dump => {
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
exports.pretty = pretty;
const roots = /*#__PURE__*/Debug.methodWithTrace(trace => () => core.sync(unsafeRoots).traced(trace));
/** @internal */
exports.roots = roots;
const unsafeRoots = () => {
  return Chunk.fromIterable(fiberScope.globalScope.roots);
};
/** @internal */
exports.unsafeRoots = unsafeRoots;
const status = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.status().traced(trace));
/** @internal */
exports.status = status;
const succeed = value => {
  return done(Exit.succeed(value));
};
/** @internal */
exports.succeed = succeed;
const unit = () => succeed(void 0);
/** @internal */
exports.unit = unit;
const currentFiberURI = "@effect/io/Fiber/Current";
/** @internal */
exports.currentFiberURI = currentFiberURI;
const getCurrentFiber = () => Option.fromNullable(globalThis[currentFiberURI]);
exports.getCurrentFiber = getCurrentFiber;
//# sourceMappingURL=fiber.js.map