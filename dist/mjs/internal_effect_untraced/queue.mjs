var _a, _b, _c, _d, _e;
import * as Chunk from "@effect/data/Chunk";
import * as MutableQueue from "@effect/data/MutableQueue";
import * as MutableRef from "@effect/data/MutableRef";
import * as ReadonlyArray from "@effect/data/ReadonlyArray";
import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
import * as fiberRuntime from "@effect/io/internal_effect_untraced/fiberRuntime";
/** @internal */
const EnqueueSymbolKey = "@effect/io/Queue/Enqueue";
/** @internal */
export const EnqueueTypeId = /*#__PURE__*/Symbol.for(EnqueueSymbolKey);
/** @internal */
const DequeueSymbolKey = "@effect/io/Queue/Dequeue";
/** @internal */
export const DequeueTypeId = /*#__PURE__*/Symbol.for(DequeueSymbolKey);
/** @internal */
const QueueStrategySymbolKey = "@effect/io/Queue/Strategy";
/** @internal */
export const QueueStrategyTypeId = /*#__PURE__*/Symbol.for(QueueStrategySymbolKey);
/** @internal */
const queueStrategyVariance = {
  _A: _ => _
};
/** @internal */
export const enqueueVariance = {
  _In: _ => _
};
/** @internal */
export const dequeueVariance = {
  _Out: _ => _
};
/** @internal */
class QueueImpl {
  constructor( /** @internal */
  queue, /** @internal */
  takers, /** @internal */
  shutdownHook, /** @internal */
  shutdownFlag, /** @internal */
  strategy) {
    this.queue = queue;
    this.takers = takers;
    this.shutdownHook = shutdownHook;
    this.shutdownFlag = shutdownFlag;
    this.strategy = strategy;
    this[_a] = enqueueVariance;
    this[_b] = dequeueVariance;
  }
  capacity() {
    return MutableQueue.capacity(this.queue);
  }
  size() {
    return Debug.bodyWithTrace(trace => core.suspend(() => MutableRef.get(this.shutdownFlag) ? core.interrupt() : core.succeed(MutableQueue.length(this.queue) - MutableQueue.length(this.takers) + this.strategy.surplusSize())).traced(trace));
  }
  isEmpty() {
    return Debug.bodyWithTrace(trace => core.map(this.size(), size => size <= 0).traced(trace));
  }
  isFull() {
    return Debug.bodyWithTrace(trace => core.map(this.size(), size => size >= this.capacity()).traced(trace));
  }
  shutdown() {
    return Debug.bodyWithTrace(trace => core.uninterruptible(core.withFiberRuntime(state => {
      MutableRef.set(true)(this.shutdownFlag);
      return core.asUnit(core.whenEffect(core.deferredSucceed(this.shutdownHook, void 0))(core.zipRight(this.strategy.shutdown())(fiberRuntime.forEachParDiscard(d => core.deferredInterruptWith(d, state.id()))(unsafePollAll(this.takers)))));
    })).traced(trace));
  }
  isShutdown() {
    return Debug.bodyWithTrace(trace => core.sync(() => MutableRef.get(this.shutdownFlag)).traced(trace));
  }
  awaitShutdown() {
    return Debug.bodyWithTrace(trace => core.deferredAwait(this.shutdownHook).traced(trace));
  }
  offer(value) {
    return Debug.bodyWithTrace(trace => core.suspend(() => {
      if (MutableRef.get(this.shutdownFlag)) {
        return core.interrupt();
      }
      let noRemaining;
      if (MutableQueue.isEmpty(this.queue)) {
        const taker = MutableQueue.poll(MutableQueue.EmptyMutableQueue)(this.takers);
        if (taker !== MutableQueue.EmptyMutableQueue) {
          unsafeCompleteDeferred(taker, value);
          noRemaining = true;
        } else {
          noRemaining = false;
        }
      } else {
        noRemaining = false;
      }
      if (noRemaining) {
        return core.succeed(true);
      }
      // Not enough takers, offer to the queue
      const succeeded = MutableQueue.offer(value)(this.queue);
      unsafeCompleteTakers(this.strategy, this.queue, this.takers);
      return succeeded ? core.succeed(true) : this.strategy.handleSurplus([value], this.queue, this.takers, this.shutdownFlag);
    }).traced(trace));
  }
  offerAll(iterable) {
    return Debug.bodyWithTrace(trace => core.suspend(() => {
      if (MutableRef.get(this.shutdownFlag)) {
        return core.interrupt();
      }
      const values = ReadonlyArray.fromIterable(iterable);
      const pTakers = MutableQueue.isEmpty(this.queue) ? ReadonlyArray.fromIterable(unsafePollN(this.takers, values.length)) : ReadonlyArray.empty;
      const [forTakers, remaining] = ReadonlyArray.splitAt(pTakers.length)(values);
      for (let i = 0; i < pTakers.length; i++) {
        const taker = pTakers[i];
        const item = forTakers[i];
        unsafeCompleteDeferred(taker, item);
      }
      if (remaining.length === 0) {
        return core.succeed(true);
      }
      // Not enough takers, offer to the queue
      const surplus = unsafeOfferAll(this.queue, remaining);
      unsafeCompleteTakers(this.strategy, this.queue, this.takers);
      return Chunk.isEmpty(surplus) ? core.succeed(true) : this.strategy.handleSurplus(surplus, this.queue, this.takers, this.shutdownFlag);
    }).traced(trace));
  }
  take() {
    return Debug.bodyWithTrace(trace => core.withFiberRuntime(state => {
      if (MutableRef.get(this.shutdownFlag)) {
        return core.interrupt();
      }
      const item = MutableQueue.poll(MutableQueue.EmptyMutableQueue)(this.queue);
      if (item !== MutableQueue.EmptyMutableQueue) {
        this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers);
        return core.succeed(item);
      } else {
        // Add the deferred to takers, then:
        // - Try to take again in case a value was added since
        // - Wait for the deferred to be completed
        // - Clean up resources in case of interruption
        const deferred = core.deferredUnsafeMake(state.id());
        return core.onInterrupt(() => {
          return core.sync(() => unsafeRemove(this.takers, deferred));
        })(core.suspend(() => {
          MutableQueue.offer(deferred)(this.takers);
          unsafeCompleteTakers(this.strategy, this.queue, this.takers);
          return MutableRef.get(this.shutdownFlag) ? core.interrupt() : core.deferredAwait(deferred);
        }));
      }
    }).traced(trace));
  }
  takeAll() {
    return Debug.bodyWithTrace(trace => core.suspend(() => {
      return MutableRef.get(this.shutdownFlag) ? core.interrupt() : core.sync(() => {
        const values = unsafePollAll(this.queue);
        this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers);
        return Chunk.fromIterable(values);
      });
    }).traced(trace));
  }
  takeUpTo(max) {
    return Debug.bodyWithTrace(trace => core.suspend(() => MutableRef.get(this.shutdownFlag) ? core.interrupt() : core.sync(() => {
      const values = unsafePollN(this.queue, max);
      this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers);
      return Chunk.fromIterable(values);
    })).traced(trace));
  }
  takeBetween(min, max) {
    return Debug.bodyWithTrace(trace => core.suspend(() => takeRemainderLoop(this, min, max, Chunk.empty())).traced(trace));
  }
}
_a = EnqueueTypeId, _b = DequeueTypeId;
/** @internal */
const takeRemainderLoop = (self, min, max, acc) => {
  if (max < min) {
    return core.succeed(acc);
  }
  return core.flatMap(bs => {
    const remaining = min - bs.length;
    if (remaining === 1) {
      return core.map(b => Chunk.append(b)(Chunk.concat(bs)(acc)))(take(self));
    }
    if (remaining > 1) {
      return core.flatMap(b => takeRemainderLoop(self, remaining - 1, max - bs.length - 1, Chunk.append(b)(Chunk.concat(bs)(acc))))(take(self));
    }
    return core.succeed(Chunk.concat(bs)(acc));
  })(takeUpTo(self, max));
};
/** @internal */
export const isQueue = u => {
  return isEnqueue(u) && isDequeue(u);
};
/** @internal */
export const isEnqueue = u => {
  return typeof u === "object" && u != null && EnqueueTypeId in u;
};
/** @internal */
export const isDequeue = u => {
  return typeof u === "object" && u != null && DequeueTypeId in u;
};
/** @internal */
export const bounded = /*#__PURE__*/Debug.methodWithTrace(trace => requestedCapacity => core.flatMap(queue => make(queue, backPressureStrategy()))(core.sync(() => MutableQueue.bounded(requestedCapacity))).traced(trace));
/** @internal */
export const dropping = /*#__PURE__*/Debug.methodWithTrace(trace => requestedCapacity => core.flatMap(queue => make(queue, droppingStrategy()))(core.sync(() => MutableQueue.bounded(requestedCapacity))).traced(trace));
/** @internal */
export const sliding = /*#__PURE__*/Debug.methodWithTrace(trace => requestedCapacity => core.flatMap(queue => make(queue, slidingStrategy()))(core.sync(() => MutableQueue.bounded(requestedCapacity))).traced(trace));
/** @internal */
export const unbounded = /*#__PURE__*/Debug.methodWithTrace(trace => () => core.flatMap(queue => make(queue, droppingStrategy()))(core.sync(() => MutableQueue.unbounded())).traced(trace));
/** @internal */
const unsafeMake = (queue, takers, shutdownHook, shutdownFlag, strategy) => {
  return new QueueImpl(queue, takers, shutdownHook, shutdownFlag, strategy);
};
/** @internal */
const make = /*#__PURE__*/Debug.methodWithTrace(trace => (queue, strategy) => core.map(deferred => unsafeMake(queue, MutableQueue.unbounded(), deferred, MutableRef.make(false), strategy))(core.deferredMake()).traced(trace));
/** @internal */
export const capacity = self => {
  return self.capacity();
};
/** @internal */
export const size = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.size().traced(trace));
/** @internal */
export const isFull = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.isFull().traced(trace));
/** @internal */
export const isEmpty = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.isEmpty().traced(trace));
/** @internal */
export const isShutdown = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.isShutdown().traced(trace));
/** @internal */
export const awaitShutdown = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.awaitShutdown().traced(trace));
/** @internal */
export const shutdown = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.shutdown().traced(trace));
/** @internal */
export const offer = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => self.offer(value).traced(trace));
/** @internal */
export const offerAll = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, iterable) => self.offerAll(iterable).traced(trace));
/** @internal */
export const poll = /*#__PURE__*/Debug.methodWithTrace(trace => self => core.map(Chunk.head)(self.takeUpTo(1)).traced(trace));
/** @internal */
export const take = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.take().traced(trace));
/** @internal */
export const takeAll = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.takeAll().traced(trace));
/** @internal */
export const takeUpTo = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, max) => self.takeUpTo(max).traced(trace));
/** @internal */
export const takeBetween = /*#__PURE__*/Debug.dualWithTrace(3, trace => (self, min, max) => self.takeBetween(min, max).traced(trace));
/** @internal */
export const takeN = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, n) => self.takeBetween(n, n).traced(trace));
// -----------------------------------------------------------------------------
// Strategy
// -----------------------------------------------------------------------------
/** @internal */
export const backPressureStrategy = () => {
  return new BackPressureStrategy();
};
/** @internal */
export const droppingStrategy = () => {
  return new DroppingStrategy();
};
/** @internal */
export const slidingStrategy = () => {
  return new SlidingStrategy();
};
/** @internal */
class BackPressureStrategy {
  constructor() {
    this[_c] = queueStrategyVariance;
    this.putters = MutableQueue.unbounded();
  }
  surplusSize() {
    return MutableQueue.length(this.putters);
  }
  shutdown() {
    return core.flatMap(fiberId => core.flatMap(fiberRuntime.forEachParDiscard(([_, deferred, isLastItem]) => isLastItem ? core.asUnit(core.deferredInterruptWith(deferred, fiberId)) : core.unit()))(core.sync(() => unsafePollAll(this.putters))))(core.fiberId());
  }
  handleSurplus(iterable, queue, takers, isShutdown) {
    return core.withFiberRuntime(state => {
      const deferred = core.deferredUnsafeMake(state.id());
      return core.onInterrupt(() => core.sync(() => this.unsafeRemove(deferred)))(core.suspend(() => {
        this.unsafeOffer(iterable, deferred);
        this.unsafeOnQueueEmptySpace(queue, takers);
        unsafeCompleteTakers(this, queue, takers);
        return MutableRef.get(isShutdown) ? core.interrupt() : core.deferredAwait(deferred);
      }));
    });
  }
  unsafeOnQueueEmptySpace(queue, takers) {
    let keepPolling = true;
    while (keepPolling && !MutableQueue.isFull(queue)) {
      const putter = MutableQueue.poll(MutableQueue.EmptyMutableQueue)(this.putters);
      if (putter === MutableQueue.EmptyMutableQueue) {
        keepPolling = false;
      } else {
        const offered = MutableQueue.offer(putter[0])(queue);
        if (offered && putter[2]) {
          unsafeCompleteDeferred(putter[1], true);
        } else if (!offered) {
          unsafeOfferAll(this.putters, Chunk.prepend(putter)(unsafePollAll(this.putters)));
        }
        unsafeCompleteTakers(this, queue, takers);
      }
    }
  }
  unsafeOffer(iterable, deferred) {
    const iterator = iterable[Symbol.iterator]();
    let next = iterator.next();
    if (!next.done) {
      // eslint-disable-next-line no-constant-condition
      while (1) {
        const value = next.value;
        next = iterator.next();
        if (next.done) {
          MutableQueue.offer([value, deferred, true])(this.putters);
          break;
        }
        MutableQueue.offer([value, deferred, false])(this.putters);
      }
    }
  }
  unsafeRemove(deferred) {
    unsafeOfferAll(this.putters, Chunk.filter(([, _]) => _ !== deferred)(unsafePollAll(this.putters)));
  }
}
_c = QueueStrategyTypeId;
/** @internal */
class DroppingStrategy {
  constructor() {
    this[_d] = queueStrategyVariance;
  }
  surplusSize() {
    return 0;
  }
  shutdown() {
    return core.unit();
  }
  handleSurplus(_iterable, _queue, _takers, _isShutdown) {
    return core.succeed(false);
  }
  unsafeOnQueueEmptySpace(_queue, _takers) {
    //
  }
}
_d = QueueStrategyTypeId;
/** @internal */
class SlidingStrategy {
  constructor() {
    this[_e] = queueStrategyVariance;
  }
  surplusSize() {
    return 0;
  }
  shutdown() {
    return core.unit();
  }
  handleSurplus(iterable, queue, takers, _isShutdown) {
    return core.sync(() => {
      this.unsafeOffer(queue, iterable);
      unsafeCompleteTakers(this, queue, takers);
      return true;
    });
  }
  unsafeOnQueueEmptySpace(_queue, _takers) {
    //
  }
  unsafeOffer(queue, iterable) {
    const iterator = iterable[Symbol.iterator]();
    let next;
    let offering = true;
    while (!(next = iterator.next()).done && offering) {
      if (MutableQueue.capacity(queue) === 0) {
        return;
      }
      // Poll 1 and retry
      MutableQueue.poll(MutableQueue.EmptyMutableQueue)(queue);
      offering = MutableQueue.offer(next.value)(queue);
    }
  }
}
_e = QueueStrategyTypeId;
/** @internal */
const unsafeCompleteDeferred = (deferred, a) => {
  return core.deferredUnsafeDone(deferred, core.succeed(a));
};
/** @internal */
const unsafeOfferAll = (queue, as) => {
  return MutableQueue.offerAll(as)(queue);
};
/** @internal */
const unsafePollAll = queue => {
  return MutableQueue.pollUpTo(Number.POSITIVE_INFINITY)(queue);
};
/** @internal */
const unsafePollN = (queue, max) => {
  return MutableQueue.pollUpTo(max)(queue);
};
/** @internal */
export const unsafeRemove = (queue, a) => {
  unsafeOfferAll(queue, Chunk.filter(b => a !== b)(unsafePollAll(queue)));
};
/** @internal */
export const unsafeCompleteTakers = (strategy, queue, takers) => {
  // Check both a taker and an item are in the queue, starting with the taker
  let keepPolling = true;
  while (keepPolling && !MutableQueue.isEmpty(queue)) {
    const taker = MutableQueue.poll(MutableQueue.EmptyMutableQueue)(takers);
    if (taker !== MutableQueue.EmptyMutableQueue) {
      const element = MutableQueue.poll(MutableQueue.EmptyMutableQueue)(queue);
      if (element !== MutableQueue.EmptyMutableQueue) {
        unsafeCompleteDeferred(taker, element);
        strategy.unsafeOnQueueEmptySpace(queue, takers);
      } else {
        unsafeOfferAll(takers, Chunk.prepend(taker)(unsafePollAll(takers)));
      }
      keepPolling = true;
    } else {
      keepPolling = false;
    }
  }
};
//# sourceMappingURL=queue.mjs.map