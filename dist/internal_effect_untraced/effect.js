"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.descriptorWith = exports.descriptor = exports.delay = exports.continueOrFailEffect = exports.continueOrFail = exports.contextWith = exports.cond = exports.collectWhile = exports.collectFirst = exports.collectAllWithEffect = exports.collectAllWith = exports.collectAllSuccesses = exports.collectAllDiscard = exports.collectAll = exports.clockWith = exports.clock = exports.cause = exports.catchTags = exports.catchTag = exports.catchSomeDefect = exports.catchSomeCause = exports.catchAllDefect = exports.bindValue = exports.bind = exports.attemptSuspend = exports.attemptPromiseInterrupt = exports.attemptPromise = exports.attemptCatchPromiseInterrupt = exports.attemptCatchPromise = exports.attemptCatch = exports.attempt = exports.asyncOption = exports.asSomeError = exports.asSome = exports.asRightError = exports.asRight = exports.asLeftError = exports.asLeft = exports.allowInterrupt = exports.all = exports.absorbWith = exports.absorb = exports.absolveWith = exports.absolve = exports._catch = exports.Do = void 0;
Object.defineProperty(exports, "dieMessage", {
  enumerable: true,
  get: function () {
    return _clock.dieMessage;
  }
});
Object.defineProperty(exports, "dieOnSync", {
  enumerable: true,
  get: function () {
    return _clock.dieOnSync;
  }
});
exports.logSpan = exports.logInfoCauseMessage = exports.logInfoCause = exports.logInfo = exports.logFatalCauseMessage = exports.logFatalCause = exports.logFatal = exports.logErrorCauseMessage = exports.logErrorCause = exports.logError = exports.logDebugCauseMessage = exports.logDebugCause = exports.logDebug = exports.logAnnotations = exports.logAnnotate = exports.log = exports.leftWith = exports.left = exports.iterate = exports.isSuccess = exports.isFailure = exports.inheritFiberRefs = exports.ignoreLogged = exports.ignore = exports.head = exports.getOrFailWith = exports.getOrFailDiscard = exports.getOrFail = exports.getFiberRefs = exports.gen = exports.fromEitherCause = exports.forever = exports.forEachWithIndex = exports.forEachOption = exports.forEachEffect = exports.forAll = exports.flipWith = exports.flattenErrorOption = exports.firstSuccessOf = exports.find = exports.filterOrFail = exports.filterOrElseWith = exports.filterOrElse = exports.filterOrDieMessage = exports.filterOrDie = exports.filterNot = exports.filter = exports.exists = exports.eventually = exports.dropWhile = exports.dropUntil = exports.diffFiberRefs = void 0;
exports.withMetric = exports.whenRef = exports.whenFiberRef = exports.whenCaseEffect = exports.whenCase = exports.when = exports.validateWith = exports.validateFirst = exports.validateAllDiscard = exports.validateAll = exports.validate = exports.updateService = exports.updateFiberRefs = exports.unsandbox = exports.unright = exports.unrefineWith = exports.unrefine = exports.unlessEffect = exports.unless = exports.unleft = exports.unfold = exports.uncause = exports.timedWith = exports.timed = exports.tapSome = exports.tapErrorCause = exports.tapError = exports.tapEither = exports.tapDefect = exports.tapBoth = exports.takeWhile = exports.taggedWithLabels = exports.taggedWithLabelSet = exports.tagged = exports.summarized = exports.succeedSome = exports.succeedRight = exports.succeedNone = exports.succeedLeft = exports.someOrFailException = exports.someOrFail = exports.someOrElseEffect = exports.someOrElse = exports.sleep = exports.setFiberRefs = exports.sandbox = exports.rightWith = exports.right = exports.resurrect = exports.replicateEffectDiscard = exports.replicateEffect = exports.replicate = exports.repeatN = exports.rejectEffect = exports.reject = exports.refineTagOrDieWith = exports.refineTagOrDie = exports.refineOrDieWith = exports.refineOrDie = exports.reduceWhile = exports.reduceRight = exports.reduceAll = exports.reduce = exports.randomWith = exports.random = exports.provideServiceEffect = exports.provideService = exports.promiseInterrupt = exports.promise = exports.patchFiberRefs = exports.partition = exports.parallelErrors = exports.orElseSucceed = exports.orElseOptional = exports.orElseFail = exports.orElseEither = exports.option = exports.once = exports.noneOrFailWith = exports.noneOrFail = exports.none = exports.negate = exports.mergeAll = exports.merge = exports.memoize = exports.match = exports.mapTryCatch = exports.mapErrorCause = exports.mapBoth = exports.mapAccum = exports.loopDiscard = exports.loop = exports.logWarningCauseMessage = exports.logWarningCause = exports.logWarning = exports.logTraceCauseMessage = exports.logTraceCause = exports.logTrace = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var Duration = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Duration"));
var Either = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var _Function = /*#__PURE__*/require("@effect/data/Function");
var HashMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashMap"));
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Clock = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Clock"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var Exit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Exit"));
var FiberId = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Fiber/Id"));
var FiberRefs = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/FiberRefs"));
var internalCause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/cause"));
var _clock = /*#__PURE__*/require("@effect/io/internal_effect_untraced/clock");
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var fiberRefsPatch = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRefs/patch"));
var metricLabel = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/metric/label"));
var SingleShotGen = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/singleShotGen"));
var LogLevel = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Logger/Level"));
var LogSpan = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Logger/Span"));
var Random = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Random"));
var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Ref"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* @internal */

/* @internal */
const absolve = /*#__PURE__*/Debug.methodWithTrace(trace => self => absolveWith(self, _Function.identity).traced(trace));
/* @internal */
exports.absolve = absolve;
const absolveWith = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.flatMap(value => core.fromEither(restore(f)(value)))(self).traced(trace));
/* @internal */
exports.absolveWith = absolveWith;
const absorb = /*#__PURE__*/Debug.methodWithTrace(trace => self => absorbWith(self, _Function.identity).traced(trace));
/* @internal */
exports.absorb = absorb;
const absorbWith = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.matchEffect(sandbox(self), cause => core.fail(internalCause.squashWith(restore(f))(cause)), core.succeed).traced(trace));
/* @internal */
exports.absorbWith = absorbWith;
const allowInterrupt = /*#__PURE__*/Debug.methodWithTrace(trace => () => descriptorWith(descriptor => HashSet.size(descriptor.interruptors) > 0 ? core.interrupt() : core.unit()).traced(trace));
/* @internal */
exports.allowInterrupt = allowInterrupt;
const asLeft = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.map(Either.left)(self).traced(trace));
/* @internal */
exports.asLeft = asLeft;
const asLeftError = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.mapError(Either.left)(self).traced(trace));
/* @internal */
exports.asLeftError = asLeftError;
const asRight = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.map(Either.right)(self).traced(trace));
/* @internal */
exports.asRight = asRight;
const asRightError = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.mapError(Either.right)(self).traced(trace));
/* @internal */
exports.asRightError = asRightError;
const asSome = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.map(Option.some)(self).traced(trace));
/* @internal */
exports.asSome = asSome;
const asSomeError = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.mapError(Option.some)(self).traced(trace));
/* @internal */
exports.asSomeError = asSomeError;
const asyncOption = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (register, blockingOn = FiberId.none) => core.asyncInterruptEither(cb => {
  const option = restore(register)(cb);
  switch (option._tag) {
    case "None":
      {
        return Either.left(core.unit());
      }
    case "Some":
      {
        return Either.right(option.value);
      }
  }
}, blockingOn).traced(trace));
/* @internal */
exports.asyncOption = asyncOption;
const attempt = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => core.sync(() => {
  try {
    return restore(evaluate)();
  } catch (error) {
    throw core.makeEffectError(internalCause.fail(error));
  }
}).traced(trace));
/* @internal */
exports.attempt = attempt;
const _catch = /*#__PURE__*/Debug.dualWithTrace(
// @ts-expect-error - probably a TS bug - infers to never because "DF does not extend (...args: any[]) => any)" but, of course, it does)
4, (trace, restore) => (self, tag, k, f) => core.catchAll(self, e => {
  if (typeof e === "object" && e != null && tag in e && e[tag] === k) {
    return restore(f)(e);
  }
  return core.fail(e);
}).traced(trace));
/* @internal */
exports._catch = _catch;
const catchAllDefect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => catchSomeDefect(self, defect => Option.some(restore(f)(defect))).traced(trace));
/* @internal */
exports.catchAllDefect = catchAllDefect;
const catchSomeCause = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.matchCauseEffect(self, cause => {
  const option = restore(f)(cause);
  switch (option._tag) {
    case "None":
      {
        return core.failCause(cause);
      }
    case "Some":
      {
        return option.value;
      }
  }
}, core.succeed).traced(trace));
/* @internal */
exports.catchSomeCause = catchSomeCause;
const catchSomeDefect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => core.catchAll(s => s)(unrefineWith(self, restore(pf), core.fail)).traced(trace));
/* @internal */
exports.catchSomeDefect = catchSomeDefect;
const catchTag = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, k, f) => core.catchAll(self, e => {
  if ("_tag" in e && e["_tag"] === k) {
    return restore(f)(e);
  }
  return core.fail(e);
}).traced(trace));
/** @internal */
exports.catchTag = catchTag;
const catchTags = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, cases) => core.catchAll(self, e => {
  const keys = Object.keys(cases);
  if ("_tag" in e && keys.includes(e["_tag"])) {
    return restore(cases[e["_tag"]])(e);
  }
  return core.fail(e);
}).traced(trace));
/* @internal */
exports.catchTags = catchTags;
const cause = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.matchCause(_Function.identity, () => internalCause.empty)(self).traced(trace));
/* @internal */
exports.cause = cause;
const clock = /*#__PURE__*/Debug.methodWithTrace(trace => () => clockWith(core.succeed).traced(trace));
/* @internal */
exports.clock = clock;
const clockWith = Clock.clockWith;
/* @internal */
exports.clockWith = clockWith;
const collectAll = /*#__PURE__*/Debug.methodWithTrace(trace => effects => core.forEach(effects, _Function.identity).traced(trace));
/* @internal */
exports.collectAll = collectAll;
const collectAllDiscard = /*#__PURE__*/Debug.methodWithTrace(trace => effects => core.forEachDiscard(effects, _Function.identity).traced(trace));
/* @internal */
exports.collectAllDiscard = collectAllDiscard;
const collectAllWith = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, pf) => core.map(collectAll(elements), Chunk.filterMap(restore(pf))).traced(trace));
/* @internal */
exports.collectAllWith = collectAllWith;
const collectAllWithEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => {
  const array = Array.from(elements);
  // Break out early if there are no elements
  if (array.length === 0) {
    return core.succeed(Chunk.empty()).traced(trace);
  }
  // Break out early if there is only one element
  if (array.length === 1) {
    const option = restore(f)(array[0]);
    switch (option._tag) {
      case "None":
        {
          return core.succeed(Chunk.empty()).traced(trace);
        }
      case "Some":
        {
          return core.map(option.value, Chunk.of).traced(trace);
        }
    }
  }
  // Otherwise create the intermediate result structure
  let result = core.succeed(Chunk.empty());
  for (let i = array.length - 1; i >= 0; i--) {
    const option = restore(f)(array[i]);
    if (option._tag === "Some") {
      result = core.zipWith(result, option.value, (list, b) => Chunk.prepend(b)(list));
    }
  }
  return core.map(result, Chunk.fromIterable).traced(trace);
});
/* @internal */
exports.collectAllWithEffect = collectAllWithEffect;
const collectAllSuccesses = /*#__PURE__*/Debug.methodWithTrace(trace => as => collectAllWith(exit => Exit.isSuccess(exit) ? Option.some(exit.i0) : Option.none())(Array.from(as).map(core.exit)).traced(trace));
/* @internal */
exports.collectAllSuccesses = collectAllSuccesses;
const collectFirst = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.suspend(() => collectFirstLoop(restore, elements[Symbol.iterator](), restore(f))).traced(trace));
exports.collectFirst = collectFirst;
const collectFirstLoop = (restore, iterator, f) => {
  const next = restore(() => iterator.next())();
  return next.done ? core.succeed(Option.none()) : core.flatMap(option => {
    switch (option._tag) {
      case "None":
        {
          return collectFirstLoop(restore, iterator, f);
        }
      case "Some":
        {
          return core.succeed(option);
        }
    }
  })(f(next.value));
};
/* @internal */
const collectWhile = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => {
  const array = Array.from(elements);
  // Break out early if the input is empty
  if (array.length === 0) {
    return core.succeed(Chunk.empty()).traced(trace);
  }
  // Break out early if there is only one element in the list
  if (array.length === 1) {
    const option = restore(f)(array[0]);
    switch (option._tag) {
      case "None":
        {
          return core.succeed(Chunk.empty()).traced(trace);
        }
      case "Some":
        {
          return core.map(option.value, Chunk.of).traced(trace);
        }
    }
  }
  // Otherwise setup our intermediate result
  let result = core.succeed(Chunk.empty());
  for (let i = array.length - 1; i >= 0; i--) {
    const option = restore(f)(array[i]);
    switch (option._tag) {
      case "None":
        {
          return core.map(result, Chunk.fromIterable).traced(trace);
        }
      case "Some":
        {
          result = core.zipWith(result, option.value, (bs, b) => Chunk.prepend(b)(bs));
        }
    }
  }
  return core.map(result, Chunk.fromIterable).traced(trace);
});
/* @internal */
exports.collectWhile = collectWhile;
const cond = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (predicate, result, error) => core.suspend(() => restore(predicate)() ? core.sync(restore(result)) : core.failSync(restore(error))).traced(trace));
/* @internal */
exports.cond = cond;
const continueOrFail = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, error, pf) => continueOrFailEffect(self, error, a => Option.map(restore(pf)(a), core.succeed)).traced(trace));
/* @internal */
exports.continueOrFail = continueOrFail;
const continueOrFailEffect = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, error, pf) => core.flatMap(self, value => Option.getOrElse(restore(pf)(value), () => core.failSync(error))).traced(trace));
/* @internal */
exports.continueOrFailEffect = continueOrFailEffect;
const delay = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, duration) => core.zipRight(Clock.sleep(duration), self).traced(trace));
/* @internal */
exports.delay = delay;
const descriptor = /*#__PURE__*/Debug.methodWithTrace(trace => () => descriptorWith(core.succeed).traced(trace));
/* @internal */
exports.descriptor = descriptor;
const descriptorWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.withFiberRuntime((state, status) => restore(f)({
  id: state.id(),
  status,
  interruptors: internalCause.interruptors(state.getFiberRef(core.interruptedCause))
})).traced(trace));
/* @internal */
exports.descriptorWith = descriptorWith;
const diffFiberRefs = /*#__PURE__*/Debug.methodWithTrace(trace => self => summarized(getFiberRefs(), fiberRefsPatch.diff)(self).traced(trace));
/* @internal */
exports.diffFiberRefs = diffFiberRefs;
const Do = /*#__PURE__*/Debug.methodWithTrace(trace => () => core.succeed({}).traced(trace));
/* @internal */
exports.Do = Do;
const bind = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, tag, f) => core.flatMap(self, k => core.map(restore(f)(k), a => ({
  ...k,
  [tag]: a
}))).traced(trace));
/* @internal */
exports.bind = bind;
const bindValue = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, tag, f) => core.map(self, k => ({
  ...k,
  [tag]: restore(f)(k)
})).traced(trace));
/* @internal */
exports.bindValue = bindValue;
const dropUntil = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, predicate) => core.suspend(() => {
  const iterator = elements[Symbol.iterator]();
  const builder = [];
  let next;
  let dropping = core.succeed(false);
  while ((next = iterator.next()) && !next.done) {
    const a = next.value;
    dropping = core.flatMap(dropping, bool => {
      if (bool) {
        builder.push(a);
        return core.succeed(true);
      }
      return restore(predicate)(a);
    });
  }
  return core.map(dropping, () => Chunk.unsafeFromArray(builder));
}).traced(trace));
/* @internal */
exports.dropUntil = dropUntil;
const dropWhile = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.suspend(() => {
  const iterator = elements[Symbol.iterator]();
  const builder = [];
  let next;
  let dropping = core.succeed(true);
  while ((next = iterator.next()) && !next.done) {
    const a = next.value;
    dropping = core.flatMap(dropping, d => core.map(d ? restore(f)(a) : core.succeed(false), b => {
      if (!b) {
        builder.push(a);
      }
      return b;
    }));
  }
  return core.map(dropping, () => Chunk.unsafeFromArray(builder));
}).traced(trace));
/* @internal */
exports.dropWhile = dropWhile;
const contextWith = /*#__PURE__*/Debug.methodWithTrace(trace => f => core.map(core.context(), f).traced(trace));
/* @internal */
exports.contextWith = contextWith;
const exists = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.suspend(() => existsLoop(restore, elements[Symbol.iterator](), restore(f))).traced(trace));
exports.exists = exists;
const existsLoop = (restore, iterator, f) => {
  const next = restore(() => iterator.next())();
  if (next.done) {
    return core.succeed(false);
  }
  return core.flatMap(b => b ? core.succeed(b) : existsLoop(restore, iterator, f))(f(next.value));
};
/* @internal */
const eventually = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.orElse(self, () => core.flatMap(() => eventually(self))(core.yieldNow())).traced(trace));
/* @internal */
exports.eventually = eventually;
const filter = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.suspend(() => Array.from(elements).reduceRight((effect, a) => core.zipWith(effect, core.suspend(() => restore(f)(a)), (list, b) => b ? Chunk.prepend(a)(list) : list), core.sync(() => Chunk.empty()))).traced(trace));
/* @internal */
exports.filter = filter;
const filterNot = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => filter(elements, a => core.map(restore(f)(a), b => !b)).traced(trace));
/* @internal */
exports.filterNot = filterNot;
const filterOrDie = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, f, defect) => filterOrElse(self, restore(f), () => core.dieSync(restore(defect))).traced(trace));
/* @internal */
exports.filterOrDie = filterOrDie;
const filterOrDieMessage = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, f, message) => filterOrElse(self, restore(f), () => (0, _clock.dieMessage)(message)).traced(trace));
/* @internal */
exports.filterOrDieMessage = filterOrDieMessage;
const filterOrElse = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, f, orElse) => filterOrElseWith(self, restore(f), orElse).traced(trace));
/* @internal */
exports.filterOrElse = filterOrElse;
const filterOrElseWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, f, orElse) => core.flatMap(self, a => restore(f)(a) ? core.succeed(a) : restore(orElse)(a)).traced(trace));
/* @internal */
exports.filterOrElseWith = filterOrElseWith;
const filterOrFail = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, f, error) => filterOrElse(self, restore(f), () => core.failSync(restore(error))).traced(trace));
/* @internal */
exports.filterOrFail = filterOrFail;
const find = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.suspend(() => {
  const array = Array.from(elements);
  const iterator = array[Symbol.iterator]();
  const next = restore(() => iterator.next())();
  if (!next.done) {
    return findLoop(restore, iterator, restore(f), next.value);
  }
  return core.succeed(Option.none());
}).traced(trace));
exports.find = find;
const findLoop = (restore, iterator, f, value) => core.flatMap(f(value), result => {
  if (result) {
    return core.succeed(Option.some(value));
  }
  const next = restore(() => iterator.next())();
  if (!next.done) {
    return findLoop(restore, iterator, f, next.value);
  }
  return core.succeed(Option.none());
});
/* @internal */
const firstSuccessOf = /*#__PURE__*/Debug.methodWithTrace(trace => effects => core.suspend(() => {
  const list = Chunk.fromIterable(effects);
  if (!Chunk.isNonEmpty(list)) {
    return core.dieSync(() => internalCause.IllegalArgumentException(`Received an empty collection of effects`));
  }
  return Chunk.reduce(Chunk.headNonEmpty(list), (left, right) => core.orElse(left, () => right))(Chunk.tailNonEmpty(list));
}).traced(trace));
/* @internal */
exports.firstSuccessOf = firstSuccessOf;
const flattenErrorOption = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, fallback) => core.mapError(self, Option.getOrElse(() => fallback)).traced(trace));
/* @internal */
exports.flattenErrorOption = flattenErrorOption;
const flipWith = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.flip(restore(f)(core.flip(self))).traced(trace));
/* @internal */
exports.flipWith = flipWith;
const match = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, onFailure, onSuccess) => core.matchEffect(self, e => core.succeed(restore(onFailure)(e)), a => core.succeed(restore(onSuccess)(a))).traced(trace));
/* @internal */
exports.match = match;
const forAll = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.suspend(() => forAllLoop(restore, elements[Symbol.iterator](), restore(f))).traced(trace));
exports.forAll = forAll;
const forAllLoop = (restore, iterator, f) => {
  const next = restore(() => iterator.next())();
  return next.done ? core.succeed(true) : core.flatMap(b => b ? forAllLoop(restore, iterator, f) : core.succeed(b))(f(next.value));
};
/* @internal */
const forEachEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.matchCauseEffect(self, () => core.succeed(Option.none()), a => core.map(restore(f)(a), Option.some)).traced(trace));
/* @internal */
exports.forEachEffect = forEachEffect;
const forEachOption = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (option, f) => {
  switch (option._tag) {
    case "None":
      {
        return core.succeed(Option.none()).traced(trace);
      }
    case "Some":
      {
        return core.map(restore(f)(option.value), Option.some).traced(trace);
      }
  }
});
/* @internal */
exports.forEachOption = forEachOption;
const forEachWithIndex = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.suspend(() => {
  let index = 0;
  const acc = [];
  return core.map(() => Chunk.unsafeFromArray(acc))(core.forEachDiscard(elements, a => core.map(restore(f)(a, index), b => {
    acc.push(b);
    index++;
  })));
}).traced(trace));
/* @internal */
exports.forEachWithIndex = forEachWithIndex;
const forever = /*#__PURE__*/Debug.methodWithTrace(trace => self => {
  const loop = core.flatMap(() => loop)(core.flatMap(self, () => core.yieldNow()));
  return loop.traced(trace);
});
/* @internal */
exports.forever = forever;
const fromEitherCause = /*#__PURE__*/Debug.methodWithTrace(trace => either => {
  switch (either._tag) {
    case "Left":
      {
        return core.failCause(either.left).traced(trace);
      }
    case "Right":
      {
        return core.succeed(either.right).traced(trace);
      }
  }
});
/** @internal */
exports.fromEitherCause = fromEitherCause;
class EffectGen {
  constructor(value) {
    this.value = value;
  }
  [Symbol.iterator]() {
    return new SingleShotGen.SingleShotGen(this);
  }
}
/**
 * Inspired by https://github.com/tusharmath/qio/pull/22 (revised)
  @internal */
const gen = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.suspend(() => {
  const iterator = restore(() => f(self => new EffectGen(self)))();
  const state = restore(() => iterator.next())();
  const run = state => state.done ? core.succeed(state.value) : core.flatMap(val => run(restore(() => iterator.next(val))()))(state.value.value);
  return run(state);
}).traced(trace));
/* @internal */
exports.gen = gen;
const getFiberRefs = /*#__PURE__*/Debug.methodWithTrace(trace => () => core.withFiberRuntime(state => core.succeed(state.unsafeGetFiberRefs())).traced(trace));
/* @internal */
exports.getFiberRefs = getFiberRefs;
const getOrFail = /*#__PURE__*/Debug.methodWithTrace(trace => option => getOrFailWith(() => internalCause.NoSuchElementException())(option).traced(trace));
/* @internal */
exports.getOrFail = getOrFail;
const getOrFailDiscard = /*#__PURE__*/Debug.methodWithTrace(trace => option => getOrFailWith(option, _Function.constVoid).traced(trace));
/* @internal */
exports.getOrFailDiscard = getOrFailDiscard;
const getOrFailWith = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (option, error) => {
  switch (option._tag) {
    case "None":
      {
        return core.failSync(restore(error)).traced(trace);
      }
    case "Some":
      {
        return core.succeed(option.value).traced(trace);
      }
  }
});
/* @internal */
exports.getOrFailWith = getOrFailWith;
const head = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => self => core.matchEffect(e => core.fail(Option.some(e)), as => {
  const iterator = restore(() => as[Symbol.iterator]())();
  const next = restore(() => iterator.next())();
  if (next.done) {
    return core.fail(Option.none());
  }
  return core.succeed(next.value);
})(self).traced(trace));
/* @internal */
exports.head = head;
const ignore = /*#__PURE__*/Debug.methodWithTrace(trace => self => match(self, _Function.constVoid, _Function.constVoid).traced(trace));
/* @internal */
exports.ignore = ignore;
const ignoreLogged = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.matchCauseEffect(self, cause => logDebugCauseMessage("An error was silently ignored because it is not anticipated to be useful", cause), () => core.unit()).traced(trace));
/* @internal */
exports.ignoreLogged = ignoreLogged;
const inheritFiberRefs = /*#__PURE__*/Debug.methodWithTrace(trace => childFiberRefs => updateFiberRefs((parentFiberId, parentFiberRefs) => FiberRefs.joinAs(parentFiberRefs, parentFiberId, childFiberRefs)).traced(trace));
/* @internal */
exports.inheritFiberRefs = inheritFiberRefs;
const isFailure = /*#__PURE__*/Debug.methodWithTrace(trace => self => match(self, _Function.constTrue, _Function.constFalse).traced(trace));
/* @internal */
exports.isFailure = isFailure;
const isSuccess = /*#__PURE__*/Debug.methodWithTrace(trace => self => match(self, _Function.constFalse, _Function.constTrue).traced(trace));
/* @internal */
exports.isSuccess = isSuccess;
const iterate = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (initial, cont, body) => core.suspend(() => {
  if (restore(cont)(initial)) {
    return core.flatMap(restore(body)(initial), z2 => iterate(z2, restore(cont), restore(body)));
  }
  return core.succeed(initial);
}).traced(trace));
/* @internal */
exports.iterate = iterate;
const left = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.matchEffect(self, e => core.fail(Either.left(e)), either => {
  switch (either._tag) {
    case "Left":
      {
        return core.succeed(either.left);
      }
    case "Right":
      {
        return core.fail(Either.right(either.right));
      }
  }
}).traced(trace));
/* @internal */
exports.left = left;
const leftWith = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.suspend(() => unleft(restore(f)(left(self)))).traced(trace));
/** @internal */
exports.leftWith = leftWith;
const someFatal = /*#__PURE__*/Option.some(LogLevel.Fatal);
/** @internal */
const someError = /*#__PURE__*/Option.some(LogLevel.Error);
/** @internal */
const someWarning = /*#__PURE__*/Option.some(LogLevel.Warning);
/** @internal */
const someTrace = /*#__PURE__*/Option.some(LogLevel.Trace);
/** @internal */
const someInfo = /*#__PURE__*/Option.some(LogLevel.Info);
/** @internal */
const someDebug = /*#__PURE__*/Option.some(LogLevel.Debug);
/* @internal */
const log = /*#__PURE__*/Debug.methodWithTrace(trace => message => core.withFiberRuntime(fiberState => {
  fiberState.log(message, internalCause.empty, Option.none());
  return core.unit();
}).traced(trace));
/* @internal */
exports.log = log;
const logDebug = /*#__PURE__*/Debug.methodWithTrace(trace => message => core.withFiberRuntime(fiberState => {
  fiberState.log(message, internalCause.empty, someDebug);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logDebug = logDebug;
const logDebugCause = /*#__PURE__*/Debug.methodWithTrace(trace => cause => core.withFiberRuntime(fiberState => {
  fiberState.log("", cause, someDebug);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logDebugCause = logDebugCause;
const logDebugCauseMessage = /*#__PURE__*/Debug.methodWithTrace(trace => (message, cause) => core.withFiberRuntime(fiberState => {
  fiberState.log(message, cause, someDebug);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logDebugCauseMessage = logDebugCauseMessage;
const logError = /*#__PURE__*/Debug.methodWithTrace(trace => message => core.withFiberRuntime(fiberState => {
  fiberState.log(message, internalCause.empty, someError);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logError = logError;
const logErrorCause = /*#__PURE__*/Debug.methodWithTrace(trace => cause => core.withFiberRuntime(fiberState => {
  fiberState.log("", cause, someError);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logErrorCause = logErrorCause;
const logErrorCauseMessage = /*#__PURE__*/Debug.methodWithTrace(trace => (message, cause) => core.withFiberRuntime(fiberState => {
  fiberState.log(message, cause, someError);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logErrorCauseMessage = logErrorCauseMessage;
const logFatal = /*#__PURE__*/Debug.methodWithTrace(trace => message => core.withFiberRuntime(fiberState => {
  fiberState.log(message, internalCause.empty, someFatal);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logFatal = logFatal;
const logFatalCause = /*#__PURE__*/Debug.methodWithTrace(trace => cause => core.withFiberRuntime(fiberState => {
  fiberState.log("", cause, someFatal);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logFatalCause = logFatalCause;
const logFatalCauseMessage = /*#__PURE__*/Debug.methodWithTrace(trace => (message, cause) => core.withFiberRuntime(fiberState => {
  fiberState.log(message, cause, someFatal);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logFatalCauseMessage = logFatalCauseMessage;
const logInfo = /*#__PURE__*/Debug.methodWithTrace(trace => message => core.withFiberRuntime(fiberState => {
  fiberState.log(message, internalCause.empty, someInfo);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logInfo = logInfo;
const logInfoCause = /*#__PURE__*/Debug.methodWithTrace(trace => cause => core.withFiberRuntime(fiberState => {
  fiberState.log("", cause, someInfo);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logInfoCause = logInfoCause;
const logInfoCauseMessage = /*#__PURE__*/Debug.methodWithTrace(trace => (message, cause) => core.withFiberRuntime(fiberState => {
  fiberState.log(message, cause, someInfo);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logInfoCauseMessage = logInfoCauseMessage;
const logWarning = /*#__PURE__*/Debug.methodWithTrace(trace => message => core.withFiberRuntime(fiberState => {
  fiberState.log(message, internalCause.empty, someWarning);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logWarning = logWarning;
const logWarningCause = /*#__PURE__*/Debug.methodWithTrace(trace => cause => core.withFiberRuntime(fiberState => {
  fiberState.log("", cause, someWarning);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logWarningCause = logWarningCause;
const logWarningCauseMessage = /*#__PURE__*/Debug.methodWithTrace(trace => (message, cause) => core.withFiberRuntime(fiberState => {
  fiberState.log(message, cause, someWarning);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logWarningCauseMessage = logWarningCauseMessage;
const logTrace = /*#__PURE__*/Debug.methodWithTrace(trace => message => core.withFiberRuntime(fiberState => {
  fiberState.log(message, internalCause.empty, someTrace);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logTrace = logTrace;
const logTraceCause = /*#__PURE__*/Debug.methodWithTrace(trace => cause => core.withFiberRuntime(fiberState => {
  fiberState.log("", cause, someTrace);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logTraceCause = logTraceCause;
const logTraceCauseMessage = /*#__PURE__*/Debug.methodWithTrace(trace => (message, cause) => core.withFiberRuntime(fiberState => {
  fiberState.log(message, cause, someTrace);
  return core.unit();
}).traced(trace));
/* @internal */
exports.logTraceCauseMessage = logTraceCauseMessage;
const logSpan = /*#__PURE__*/Debug.dualWithTrace(2, trace => (effect, label) => core.flatMap(core.fiberRefGet(core.currentLogSpan), stack => core.flatMap(Clock.currentTimeMillis(), now => core.suspend(() => {
  const logSpan = LogSpan.make(label, now);
  return core.fiberRefLocally(core.currentLogSpan, Chunk.prepend(logSpan)(stack))(effect);
}))).traced(trace));
/* @internal */
exports.logSpan = logSpan;
const logAnnotate = /*#__PURE__*/Debug.dualWithTrace(3, trace => (effect, key, value) => core.flatMap(core.fiberRefGet(core.currentLogAnnotations), annotations => core.suspend(() => core.fiberRefLocally(core.currentLogAnnotations, HashMap.set(key, value)(annotations))(effect))).traced(trace));
/* @internal */
exports.logAnnotate = logAnnotate;
const logAnnotations = /*#__PURE__*/Debug.methodWithTrace(trace => () => core.fiberRefGet(core.currentLogAnnotations).traced(trace));
/* @internal */
exports.logAnnotations = logAnnotations;
const loop = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (initial, cont, inc, body) => loopInternal(initial, restore(cont), restore(inc), restore(body)).traced(trace));
exports.loop = loop;
const loopInternal = (initial, cont, inc, body) => {
  return core.suspend(() => {
    return cont(initial) ? core.flatMap(body(initial), a => core.map(loopInternal(inc(initial), cont, inc, body), Chunk.prepend(a))) : core.sync(() => Chunk.empty());
  });
};
/* @internal */
const loopDiscard = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (initial, cont, inc, body) => core.suspend(() => restore(cont)(initial) ? core.flatMap(restore(body)(initial), () => loopDiscard(restore(inc)(initial), restore(cont), restore(inc), restore(body))) : core.unit()).traced(trace));
/* @internal */
exports.loopDiscard = loopDiscard;
const mapAccum = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (elements, zero, f) => core.suspend(() => {
  const iterator = restore(() => elements[Symbol.iterator]())();
  const builder = [];
  let result = core.succeed(zero);
  let next;
  while (!(next = iterator.next()).done) {
    result = core.flatMap(state => core.map(([z, b]) => {
      builder.push(b);
      return z;
    })(restore(f)(state, next.value)))(result);
  }
  return core.map(result, z => [z, Chunk.unsafeFromArray(builder)]);
}).traced(trace));
/* @internal */
exports.mapAccum = mapAccum;
const mapBoth = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, f, g) => core.matchEffect(self, e => core.failSync(() => restore(f)(e)), a => core.sync(() => restore(g)(a))).traced(trace));
/* @internal */
exports.mapBoth = mapBoth;
const mapErrorCause = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.matchCauseEffect(self, c => core.failCauseSync(() => restore(f)(c)), core.succeed).traced(trace));
/* @internal */
exports.mapErrorCause = mapErrorCause;
const mapTryCatch = /*#__PURE__*/Debug.dualWithTrace(3, trace => (self, f, onThrow) => core.flatMap(self, a => attemptCatch(() => f(a), onThrow)).traced(trace));
/* @internal */
exports.mapTryCatch = mapTryCatch;
const memoize = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.flatMap(deferred => core.map(complete => core.zipRight(core.flatMap(([patch, a]) => core.as(a)(patchFiberRefs(patch)))(core.deferredAwait(deferred)))(complete))(once(core.intoDeferred(deferred)(diffFiberRefs(self)))))(core.deferredMake()).traced(trace));
/* @internal */
exports.memoize = memoize;
const merge = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.matchEffect(e => core.succeed(e), core.succeed)(self).traced(trace));
/* @internal */
exports.merge = merge;
const mergeAll = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (elements, zero, f) => Array.from(elements).reduce((acc, a) => core.zipWith(acc, a, restore(f)), core.succeed(zero)).traced(trace));
/* @internal */
exports.mergeAll = mergeAll;
const negate = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.map(b => !b)(self).traced(trace));
/* @internal */
exports.negate = negate;
const none = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.matchEffect(e => core.fail(Option.some(e)), option => {
  switch (option._tag) {
    case "None":
      {
        return core.unit();
      }
    case "Some":
      {
        return core.fail(Option.none());
      }
  }
})(self).traced(trace));
/* @internal */
exports.none = none;
const noneOrFail = /*#__PURE__*/Debug.methodWithTrace(trace => option => core.flip(getOrFailDiscard(option)).traced(trace));
/* @internal */
exports.noneOrFail = noneOrFail;
const noneOrFailWith = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (option, f) => core.mapError(restore(f))(core.flip(getOrFailDiscard(option))).traced(trace));
/* @internal */
exports.noneOrFailWith = noneOrFailWith;
const once = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.map(ref => core.asUnit(core.whenEffect(Ref.getAndSet(ref, false))(self)))(Ref.make(true)).traced(trace));
/* @internal */
exports.once = once;
const option = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.matchEffect(() => core.succeed(Option.none()), a => core.succeed(Option.some(a)))(self).traced(trace));
/* @internal */
exports.option = option;
const orElseEither = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, that) => core.attemptOrElse(self, () => core.map(restore(that)(), Either.right), a => core.succeed(Either.left(a))).traced(trace));
/* @internal */
exports.orElseEither = orElseEither;
const orElseFail = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, evaluate) => core.orElse(self, () => core.failSync(restore(evaluate))).traced(trace));
/* @internal */
exports.orElseFail = orElseFail;
const orElseOptional = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, that) => core.catchAll(self, option => {
  switch (option._tag) {
    case "None":
      {
        return restore(that)();
      }
    case "Some":
      {
        return core.fail(Option.some(option.value));
      }
  }
}).traced(trace));
/* @internal */
exports.orElseOptional = orElseOptional;
const orElseSucceed = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, evaluate) => core.orElse(self, () => core.sync(restore(evaluate))).traced(trace));
/* @internal */
exports.orElseSucceed = orElseSucceed;
const parallelErrors = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.matchCauseEffect(self, cause => {
  const errors = Chunk.fromIterable(internalCause.failures(cause));
  return errors.length === 0 ? core.failCause(cause) : core.fail(errors);
}, core.succeed).traced(trace));
/* @internal */
exports.parallelErrors = parallelErrors;
const partition = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.map(chunk => core.partitionMap(chunk, _Function.identity))(core.forEach(elements, a => core.either(restore(f)(a)))).traced(trace));
/* @internal */
exports.partition = partition;
const patchFiberRefs = /*#__PURE__*/Debug.methodWithTrace(trace => patch => updateFiberRefs((fiberId, fiberRefs) => fiberRefsPatch.patch(fiberId, fiberRefs)(patch)).traced(trace));
/* @internal */
exports.patchFiberRefs = patchFiberRefs;
const promise = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => (0, _clock.dieOnSync)(core.async(resolve => {
  restore(evaluate)().then(a => resolve(core.exitSucceed(a))).catch(e => resolve(core.exitDie(e)));
})).traced(trace));
/* @internal */
exports.promise = promise;
const promiseInterrupt = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => (0, _clock.dieOnSync)(core.asyncInterruptEither(resolve => {
  const controller = new AbortController();
  restore(evaluate)(controller.signal).then(a => resolve(core.exitSucceed(a))).catch(e => resolve(core.exitDie(e)));
  return Either.left(core.sync(() => controller.abort()));
})).traced(trace));
/* @internal */
exports.promiseInterrupt = promiseInterrupt;
const provideService = /*#__PURE__*/Debug.dualWithTrace(3, trace => (self, tag, service) => provideServiceEffect(self, tag, core.succeed(service)).traced(trace));
/* @internal */
exports.provideService = provideService;
const provideServiceEffect = /*#__PURE__*/Debug.dualWithTrace(3, trace => (self, tag, effect) => core.contextWithEffect(env => core.flatMap(effect, service => core.provideContext(self, Context.add(tag, service)(env)))).traced(trace));
/* @internal */
exports.provideServiceEffect = provideServiceEffect;
const random = /*#__PURE__*/Debug.methodWithTrace(trace => () => randomWith(core.succeed).traced(trace));
/* @internal */
exports.random = random;
const randomWith = Random.randomWith;
/* @internal */
exports.randomWith = randomWith;
const reduce = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (elements, zero, f) => Array.from(elements).reduce((acc, el) => core.flatMap(acc, a => restore(f)(a, el)), core.succeed(zero)).traced(trace));
/* @internal */
exports.reduce = reduce;
const reduceAll = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (elements, zero, f) => Array.from(elements).reduce((acc, a) => core.zipWith(acc, a, restore(f)), zero).traced(trace));
/* @internal */
exports.reduceAll = reduceAll;
const reduceRight = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (elements, zero, f) => Array.from(elements).reduceRight((acc, el) => core.flatMap(acc, a => restore(f)(el, a)), core.succeed(zero)).traced(trace));
/* @internal */
exports.reduceRight = reduceRight;
const reduceWhile = /*#__PURE__*/Debug.dualWithTrace(4, (trace, restore) => (elements, zero, predicate, f) => core.flatMap(core.sync(restore(() => elements[Symbol.iterator]())), iterator => reduceWhileLoop(restore, iterator, zero, restore(predicate), restore(f))).traced(trace));
exports.reduceWhile = reduceWhile;
const reduceWhileLoop = (restore, iterator, state, predicate, f) => {
  const next = restore(() => iterator.next())();
  if (!next.done && predicate(state)) {
    return core.flatMap(f(state, next.value), nextState => reduceWhileLoop(restore, iterator, nextState, predicate, f));
  }
  return core.succeed(state);
};
/* @internal */
const refineOrDie = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, pf) => refineOrDieWith(self, pf, _Function.identity).traced(trace));
/* @internal */
exports.refineOrDie = refineOrDie;
const refineOrDieWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, pf, f) => core.catchAll(self, e => {
  const option = restore(pf)(e);
  switch (option._tag) {
    case "None":
      {
        return core.die(restore(f)(e));
      }
    case "Some":
      {
        return core.fail(option.value);
      }
  }
}).traced(trace));
/* @internal */
exports.refineOrDieWith = refineOrDieWith;
const refineTagOrDie = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, k) => refineTagOrDieWith(self, k, _Function.identity).traced(trace));
/* @internal */
exports.refineTagOrDie = refineTagOrDie;
const refineTagOrDieWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, k, f) => core.catchAll(self, e => {
  if ("_tag" in e && e["_tag"] === k) {
    return core.fail(e);
  }
  return core.die(restore(f)(e));
}).traced(trace));
/* @internal */
exports.refineTagOrDieWith = refineTagOrDieWith;
const reject = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => rejectEffect(self, a => Option.map(core.fail)(restore(pf)(a))).traced(trace));
/* @internal */
exports.reject = reject;
const rejectEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => core.flatMap(self, a => {
  const option = restore(pf)(a);
  switch (option._tag) {
    case "None":
      {
        return core.succeed(a);
      }
    case "Some":
      {
        return core.flatMap(core.fail)(option.value);
      }
  }
}).traced(trace));
/* @internal */
exports.rejectEffect = rejectEffect;
const repeatN = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, n) => core.suspend(() => repeatNLoop(self, n)).traced(trace));
/* @internal */
exports.repeatN = repeatN;
const repeatNLoop = /*#__PURE__*/Debug.methodWithTrace(trace => (self, n) => core.flatMap(self, a => n <= 0 ? core.succeed(a) : core.zipRight(core.yieldNow(), repeatNLoop(self, n - 1))).traced(trace));
/* @internal */
const replicate = n => {
  return self => {
    return Chunk.unsafeFromArray(Array.from({
      length: n
    }, () => self));
  };
};
/* @internal */
exports.replicate = replicate;
const replicateEffect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, n) => collectAll(replicate(n)(self)).traced(trace));
/* @internal */
exports.replicateEffect = replicateEffect;
const replicateEffectDiscard = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, n) => collectAllDiscard(replicate(n)(self)).traced(trace));
/* @internal */
exports.replicateEffectDiscard = replicateEffectDiscard;
const resurrect = /*#__PURE__*/Debug.methodWithTrace(trace => self => unrefineWith(self, Option.some, _Function.identity).traced(trace));
/* @internal */
exports.resurrect = resurrect;
const right = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.matchEffect(self, e => core.fail(Either.right(e)), either => {
  switch (either._tag) {
    case "Left":
      {
        return core.fail(Either.left(either.left));
      }
    case "Right":
      {
        return core.succeed(either.right);
      }
  }
}).traced(trace));
/* @internal */
exports.right = right;
const rightWith = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.suspend(() => unright(restore(f)(right(self)))).traced(trace));
/* @internal */
exports.rightWith = rightWith;
const sandbox = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.matchCauseEffect(self, core.fail, core.succeed).traced(trace));
/* @internal */
exports.sandbox = sandbox;
const setFiberRefs = /*#__PURE__*/Debug.methodWithTrace(trace => fiberRefs => core.suspend(() => FiberRefs.setAll(fiberRefs)).traced(trace));
/* @internal */
exports.setFiberRefs = setFiberRefs;
const sleep = Clock.sleep;
/* @internal */
exports.sleep = sleep;
const someOrElse = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, orElse) => core.map(self, option => {
  switch (option._tag) {
    case "None":
      {
        return restore(orElse)();
      }
    case "Some":
      {
        return option.value;
      }
  }
}).traced(trace));
/* @internal */
exports.someOrElse = someOrElse;
const someOrElseEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, orElse) => core.flatMap(self, option => Option.getOrElse(() => restore(orElse)())(Option.map(core.succeed)(option))).traced(trace));
/* @internal */
exports.someOrElseEffect = someOrElseEffect;
const someOrFail = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, orFail) => core.flatMap(self, option => {
  switch (option._tag) {
    case "None":
      {
        return core.flatMap(core.sync(restore(orFail)), core.fail);
      }
    case "Some":
      {
        return core.succeed(option.value);
      }
  }
}).traced(trace));
/* @internal */
exports.someOrFail = someOrFail;
const someOrFailException = /*#__PURE__*/Debug.methodWithTrace(trace => self => someOrFail(self, () => internalCause.NoSuchElementException()).traced(trace));
/* @internal */
exports.someOrFailException = someOrFailException;
const succeedLeft = /*#__PURE__*/Debug.methodWithTrace(trace => value => core.succeed(Either.left(value)).traced(trace));
/* @internal */
exports.succeedLeft = succeedLeft;
const succeedNone = /*#__PURE__*/Debug.methodWithTrace(trace => () => core.succeed(Option.none()).traced(trace));
/* @internal */
exports.succeedNone = succeedNone;
const succeedRight = /*#__PURE__*/Debug.methodWithTrace(trace => value => core.succeed(Either.right(value)).traced(trace));
/* @internal */
exports.succeedRight = succeedRight;
const succeedSome = /*#__PURE__*/Debug.methodWithTrace(trace => value => core.succeed(Option.some(value)).traced(trace));
/* @internal */
exports.succeedSome = succeedSome;
const summarized = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, summary, f) => core.flatMap(summary, start => core.flatMap(self, value => core.map(summary, end => [restore(f)(start, end), value]))).traced(trace));
/* @internal */
exports.summarized = summarized;
const attemptSuspend = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => core.flatMap(attempt(restore(evaluate)), _Function.identity).traced(trace));
/* @internal */
exports.attemptSuspend = attemptSuspend;
const tagged = /*#__PURE__*/Debug.dualWithTrace(3, trace => (self, key, value) => taggedWithLabels(self, [metricLabel.make(key, value)]).traced(trace));
/* @internal */
exports.tagged = tagged;
const taggedWithLabels = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, labels) => taggedWithLabelSet(self, HashSet.fromIterable(labels)).traced(trace));
/* @internal */
exports.taggedWithLabels = taggedWithLabels;
const taggedWithLabelSet = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, labels) => core.fiberRefLocallyWith(core.currentTags, set => HashSet.union(labels)(set))(self).traced(trace));
/* @internal */
exports.taggedWithLabelSet = taggedWithLabelSet;
const takeWhile = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, predicate) => core.suspend(() => {
  const iterator = elements[Symbol.iterator]();
  const builder = [];
  let next;
  let taking = core.succeed(true);
  while ((next = iterator.next()) && !next.done) {
    const a = next.value;
    taking = core.flatMap(taking, taking => core.map(bool => {
      if (bool) {
        builder.push(a);
      }
      return bool;
    })(taking ? restore(predicate)(a) : core.succeed(false)));
  }
  return core.map(taking, () => Chunk.unsafeFromArray(builder));
}).traced(trace));
/* @internal */
exports.takeWhile = takeWhile;
const tapBoth = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, f, g) => core.matchCauseEffect(self, cause => {
  const either = internalCause.failureOrCause(cause);
  switch (either._tag) {
    case "Left":
      {
        return core.zipRight(restore(f)(either.left), core.failCause(cause));
      }
    case "Right":
      {
        return core.failCause(cause);
      }
  }
}, a => core.as(restore(g)(a), a)).traced(trace));
/* @internal */
exports.tapBoth = tapBoth;
const tapDefect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.catchAllCause(self, cause => Option.match(() => core.failCause(cause), a => core.zipRight(restore(f)(a), core.failCause(cause)))(internalCause.keepDefects(cause))).traced(trace));
/* @internal */
exports.tapDefect = tapDefect;
const tapEither = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.matchCauseEffect(self, cause => {
  const either = internalCause.failureOrCause(cause);
  switch (either._tag) {
    case "Left":
      {
        return core.zipRight(restore(f)(either), core.failCause(cause));
      }
    case "Right":
      {
        return core.failCause(cause);
      }
  }
}, a => core.as(restore(f)(Either.right(a)), a)).traced(trace));
/* @internal */
exports.tapEither = tapEither;
const tapError = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.matchCauseEffect(self, cause => {
  const either = internalCause.failureOrCause(cause);
  switch (either._tag) {
    case "Left":
      {
        return core.zipRight(restore(f)(either.left), core.failCause(cause));
      }
    case "Right":
      {
        return core.failCause(cause);
      }
  }
}, core.succeed).traced(trace));
/* @internal */
exports.tapError = tapError;
const tapErrorCause = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, f) => core.matchCauseEffect(self, cause => core.zipRight(restore(f)(cause), core.failCause(cause)), core.succeed).traced(trace));
/* @internal */
exports.tapErrorCause = tapErrorCause;
const tapSome = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => core.tap(self, a => Option.getOrElse(() => core.unit())(Option.map(core.asUnit)(restore(pf)(a)))).traced(trace));
/* @internal */
exports.tapSome = tapSome;
const timed = /*#__PURE__*/Debug.methodWithTrace(trace => self => timedWith(self, Clock.currentTimeMillis()).traced(trace));
/* @internal */
exports.timed = timed;
const timedWith = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, milliseconds) => summarized(self, milliseconds, (start, end) => Duration.millis(end - start)).traced(trace));
/* @internal */
exports.timedWith = timedWith;
const attemptCatch = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (attempt, onThrow) => core.sync(() => {
  try {
    return restore(attempt)();
  } catch (error) {
    throw core.makeEffectError(internalCause.fail(restore(onThrow)(error)));
  }
}).traced(trace));
/* @internal */
exports.attemptCatch = attemptCatch;
const attemptCatchPromise = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (evaluate, onReject) => (0, _clock.dieOnSync)(core.flatMap(attemptCatch(restore(evaluate), restore(onReject)), promise => core.async(resolve => {
  promise.then(a => resolve(core.exitSucceed(a))).catch(e => resolve(core.exitFail(restore(onReject)(e))));
}))).traced(trace));
/* @internal */
exports.attemptCatchPromise = attemptCatchPromise;
const attemptCatchPromiseInterrupt = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (evaluate, onReject) => (0, _clock.dieOnSync)(core.suspend(() => {
  const controller = new AbortController();
  return core.flatMap(promise => core.async(resolve => {
    promise.then(a => resolve(core.exitSucceed(a))).catch(e => resolve(core.exitFail(restore(onReject)(e))));
  }))(attemptCatch(() => restore(evaluate)(controller.signal), restore(onReject)));
})).traced(trace));
/* @internal */
exports.attemptCatchPromiseInterrupt = attemptCatchPromiseInterrupt;
const attemptPromise = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => (0, _clock.dieOnSync)(core.flatMap(restore(attempt)(evaluate), promise => core.async(resolve => {
  promise.then(a => resolve(core.exitSucceed(a))).catch(e => resolve(core.exitFail(e)));
}))).traced(trace));
/* @internal */
exports.attemptPromise = attemptPromise;
const attemptPromiseInterrupt = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => evaluate => (0, _clock.dieOnSync)(core.flatMap(attempt(() => {
  const controller = new AbortController();
  return [controller, restore(evaluate)(controller.signal)];
}), ([controller, promise]) => core.asyncInterruptEither(resolve => {
  promise.then(a => resolve(core.exitSucceed(a))).catch(e => resolve(core.exitFail(e)));
  return Either.left(core.sync(() => controller.abort()));
}))).traced(trace));
/* @internal */
exports.attemptPromiseInterrupt = attemptPromiseInterrupt;
const all = /*#__PURE__*/Debug.methodWithTrace(trace => function () {
  if (arguments.length === 1) {
    if (core.isEffect(arguments[0])) {
      return core.map(arguments[0], x => [x]);
    } else if (Array.isArray(arguments[0])) {
      return core.map(collectAll(arguments[0]), Chunk.toReadonlyArray).traced(trace);
    } else {
      return core.map(values => {
        const res = {};
        for (const [k, v] of values) {
          ;
          res[k] = v;
        }
        return res;
      })(core.forEach(Object.entries(arguments[0]), ([_, e]) => core.map(e, a => [_, a]))).traced(trace);
    }
  }
  return core.map(collectAll(arguments), Chunk.toReadonlyArray).traced(trace);
});
/* @internal */
exports.all = all;
const uncause = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.flatMap(self, cause => internalCause.isEmpty(cause) ? core.unit() : core.failCause(cause)).traced(trace));
/* @internal */
exports.uncause = uncause;
const unfold = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (s, f) => core.map(unfoldLoop(s, restore(f), Chunk.empty()), Chunk.reverse).traced(trace));
/* @internal */
exports.unfold = unfold;
const unfoldLoop = (s, f, builder) => core.flatMap(f(s), option => {
  if (Option.isSome(option)) {
    return unfoldLoop(option.value[1], f, Chunk.prepend(option.value[0])(builder));
  } else {
    return core.succeed(builder);
  }
});
/* @internal */
const unleft = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.matchEffect(self, either => {
  switch (either._tag) {
    case "Left":
      {
        return core.fail(either.left);
      }
    case "Right":
      {
        return core.succeed(either);
      }
  }
}, a => core.succeed(Either.left(a))).traced(trace));
/* @internal */
exports.unleft = unleft;
const unless = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, predicate) => core.suspend(() => restore(predicate)() ? succeedNone() : asSome(self)).traced(trace));
/* @internal */
exports.unless = unless;
const unlessEffect = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, predicate) => core.flatMap(predicate, b => b ? succeedNone() : asSome(self)).traced(trace));
/* @internal */
exports.unlessEffect = unlessEffect;
const unrefine = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => unrefineWith(self, restore(pf), _Function.identity).traced(trace));
/* @internal */
exports.unrefine = unrefine;
const unrefineWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, pf, f) => core.catchAllCause(self, cause => {
  const option = internalCause.find(cause => internalCause.isDieType(cause) ? restore(pf)(cause.defect) : Option.none())(cause);
  switch (option._tag) {
    case "None":
      {
        return core.failCause(internalCause.map(restore(f))(cause));
      }
    case "Some":
      {
        return core.fail(option.value);
      }
  }
}).traced(trace));
/* @internal */
exports.unrefineWith = unrefineWith;
const unright = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.matchEffect(self, either => {
  switch (either._tag) {
    case "Left":
      {
        return core.succeed(Either.left(either.left));
      }
    case "Right":
      {
        return core.fail(either.right);
      }
  }
}, a => core.succeed(Either.right(a))).traced(trace));
/* @internal */
exports.unright = unright;
const unsandbox = /*#__PURE__*/Debug.methodWithTrace(trace => self => mapErrorCause(self, internalCause.flatten).traced(trace));
/* @internal */
exports.unsandbox = unsandbox;
const updateFiberRefs = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => f => core.withFiberRuntime(state => {
  state.setFiberRefs(restore(f)(state.id(), state.unsafeGetFiberRefs()));
  return core.unit();
}).traced(trace));
/* @internal */
exports.updateFiberRefs = updateFiberRefs;
const updateService = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, tag, f) => core.contramapContext(self, context => Context.add(tag, restore(f)(Context.unsafeGet(context, tag)))(context)).traced(trace));
/* @internal */
exports.updateService = updateService;
const validate = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, that) => validateWith(self, that, (a, b) => [a, b]).traced(trace));
/* @internal */
exports.validate = validate;
const validateAll = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.flatMap(partition(elements, restore(f)), ([es, bs]) => Chunk.isEmpty(es) ? core.succeed(bs) : core.fail(es)).traced(trace));
/* @internal */
exports.validateAll = validateAll;
const validateAllDiscard = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.flatMap(partition(elements, restore(f)), ([es, _]) => Chunk.isEmpty(es) ? core.unit() : core.fail(es)).traced(trace));
/* @internal */
exports.validateAllDiscard = validateAllDiscard;
const validateFirst = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (elements, f) => core.flip(core.forEach(elements, a => core.flip(restore(f)(a)))).traced(trace));
/* @internal */
exports.validateFirst = validateFirst;
const validateWith = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, that, f) => core.flatten(core.zipWith(core.exit(self), core.exit(that), (ea, eb) => core.exitZipWith(eb, restore(f), (ca, cb) => internalCause.sequential(ca, cb))(ea))).traced(trace));
/* @internal */
exports.validateWith = validateWith;
const when = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, predicate) => core.suspend(() => restore(predicate)() ? core.map(self, Option.some) : core.succeed(Option.none())).traced(trace));
/* @internal */
exports.when = when;
const whenCase = /*#__PURE__*/Debug.methodWithTrace((trace, restore) => (evaluate, pf) => core.flatMap(core.sync(restore(evaluate)), a => Option.getOrElse(() => succeedNone())(Option.map(asSome)(restore(pf)(a)))).traced(trace));
/* @internal */
exports.whenCase = whenCase;
const whenCaseEffect = /*#__PURE__*/Debug.dualWithTrace(2, (trace, restore) => (self, pf) => core.flatMap(self, a => whenCase(() => a, restore(pf))).traced(trace));
/* @internal */
exports.whenCaseEffect = whenCaseEffect;
const whenFiberRef = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, fiberRef, predicate) => core.flatMap(core.fiberRefGet(fiberRef), s => restore(predicate)(s) ? core.map(self, a => [s, Option.some(a)]) : core.succeed([s, Option.none()])).traced(trace));
/* @internal */
exports.whenFiberRef = whenFiberRef;
const whenRef = /*#__PURE__*/Debug.dualWithTrace(3, (trace, restore) => (self, ref, predicate) => core.flatMap(Ref.get(ref), s => restore(predicate)(s) ? core.map(self, a => [s, Option.some(a)]) : core.succeed([s, Option.none()])).traced(trace));
/* @internal */
exports.whenRef = whenRef;
const withMetric = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, metric) => metric(self).traced(trace));
exports.withMetric = withMetric;
//# sourceMappingURL=effect.js.map