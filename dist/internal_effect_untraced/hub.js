"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeMakeSubscription = exports.unsafeMakeHub = exports.unbounded = exports.subscribe = exports.sliding = exports.size = exports.shutdown = exports.publishAll = exports.publish = exports.makeHub = exports.isShutdown = exports.isFull = exports.isEmpty = exports.dropping = exports.capacity = exports.bounded = exports.awaitShutdown = exports.SlidingStrategy = exports.DroppingStrategy = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var MutableQueue = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableQueue"));
var MutableRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableRef"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var cause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/cause"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var fiberRuntime = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/fiberRuntime"));
var queue = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/queue"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a, _b;
const addSubscribers = (subscription, pollers) => subscribers => {
  if (!subscribers.has(subscription)) {
    subscribers.set(subscription, new Set());
  }
  const set = subscribers.get(subscription);
  set.add(pollers);
};
const removeSubscribers = (subscription, pollers) => subscribers => {
  if (!subscribers.has(subscription)) {
    return;
  }
  const set = subscribers.get(subscription);
  set.delete(pollers);
  if (set.size === 0) {
    subscribers.delete(subscription);
  }
};
/** @internal */
const bounded = /*#__PURE__*/Debug.methodWithTrace(trace => requestedCapacity => core.flatMap(atomicHub => makeHub(atomicHub, new BackPressureStrategy()))(core.sync(() => makeBoundedHub(requestedCapacity))).traced(trace));
/** @internal */
exports.bounded = bounded;
const dropping = /*#__PURE__*/Debug.methodWithTrace(trace => requestedCapacity => core.flatMap(atomicHub => makeHub(atomicHub, new DroppingStrategy()))(core.sync(() => makeBoundedHub(requestedCapacity))).traced(trace));
/** @internal */
exports.dropping = dropping;
const sliding = /*#__PURE__*/Debug.methodWithTrace(trace => requestedCapacity => core.flatMap(atomicHub => makeHub(atomicHub, new SlidingStrategy()))(core.sync(() => makeBoundedHub(requestedCapacity))).traced(trace));
/** @internal */
exports.sliding = sliding;
const unbounded = /*#__PURE__*/Debug.methodWithTrace(trace => () => core.flatMap(atomicHub => makeHub(atomicHub, new DroppingStrategy()))(core.sync(() => makeUnboundedHub())).traced(trace));
/** @internal */
exports.unbounded = unbounded;
const capacity = self => {
  return self.capacity();
};
/** @internal */
exports.capacity = capacity;
const size = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.size().traced(trace));
/** @internal */
exports.size = size;
const isFull = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.isFull().traced(trace));
/** @internal */
exports.isFull = isFull;
const isEmpty = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.isEmpty().traced(trace));
/** @internal */
exports.isEmpty = isEmpty;
const shutdown = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.shutdown().traced(trace));
/** @internal */
exports.shutdown = shutdown;
const isShutdown = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.isShutdown().traced(trace));
/** @internal */
exports.isShutdown = isShutdown;
const awaitShutdown = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.awaitShutdown().traced(trace));
/** @internal */
exports.awaitShutdown = awaitShutdown;
const publish = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, value) => self.publish(value).traced(trace));
/** @internal */
exports.publish = publish;
const publishAll = /*#__PURE__*/Debug.dualWithTrace(2, trace => (self, elements) => self.publishAll(elements).traced(trace));
/** @internal */
exports.publishAll = publishAll;
const subscribe = /*#__PURE__*/Debug.methodWithTrace(trace => self => self.subscribe().traced(trace));
/** @internal */
exports.subscribe = subscribe;
const makeBoundedHub = requestedCapacity => {
  ensureCapacity(requestedCapacity);
  if (requestedCapacity === 1) {
    return new BoundedHubSingle();
  } else if (nextPow2(requestedCapacity) === requestedCapacity) {
    return new BoundedHubPow2(requestedCapacity);
  } else {
    return new BoundedHubArb(requestedCapacity);
  }
};
/** @internal */
const makeUnboundedHub = () => {
  return new UnboundedHub();
};
/** @internal */
const makeSubscription = /*#__PURE__*/Debug.methodWithTrace(trace => (hub, subscribers, strategy) => core.map(core.deferredMake(), deferred => unsafeMakeSubscription(hub, subscribers, hub.subscribe(), MutableQueue.unbounded(), deferred, MutableRef.make(false), strategy)).traced(trace));
/** @internal */
const unsafeMakeSubscription = (hub, subscribers, subscription, pollers, shutdownHook, shutdownFlag, strategy) => {
  return new SubscriptionImpl(hub, subscribers, subscription, pollers, shutdownHook, shutdownFlag, strategy);
};
/** @internal */
exports.unsafeMakeSubscription = unsafeMakeSubscription;
class BoundedHubArb {
  constructor(requestedCapacity) {
    this.publisherIndex = 0;
    this.subscriberCount = 0;
    this.subscribersIndex = 0;
    this.array = Array.from({
      length: requestedCapacity
    });
    this.subscribers = Array.from({
      length: requestedCapacity
    });
    this.capacity = requestedCapacity;
  }
  isEmpty() {
    return this.publisherIndex === this.subscribersIndex;
  }
  isFull() {
    return this.publisherIndex === this.subscribersIndex + this.capacity;
  }
  size() {
    return this.publisherIndex - this.subscribersIndex;
  }
  publish(value) {
    if (this.isFull()) {
      return false;
    }
    if (this.subscriberCount !== 0) {
      const index = this.publisherIndex % this.capacity;
      this.array[index] = value;
      this.subscribers[index] = this.subscriberCount;
      this.publisherIndex += 1;
    }
    return true;
  }
  publishAll(elements) {
    const chunk = Chunk.fromIterable(elements);
    const n = chunk.length;
    const size = this.publisherIndex - this.subscribersIndex;
    const available = this.capacity - size;
    const forHub = Math.min(n, available);
    if (forHub === 0) {
      return chunk;
    }
    let iteratorIndex = 0;
    const publishAllIndex = this.publisherIndex + forHub;
    while (this.publisherIndex !== publishAllIndex) {
      const a = Chunk.unsafeGet(iteratorIndex++)(chunk);
      const index = this.publisherIndex % this.capacity;
      this.array[index] = a;
      this.subscribers[index] = this.subscriberCount;
      this.publisherIndex += 1;
    }
    return Chunk.drop(iteratorIndex - 1)(chunk);
  }
  slide() {
    if (this.subscribersIndex !== this.publisherIndex) {
      const index = this.subscribersIndex % this.capacity;
      this.array[index] = null;
      this.subscribers[index] = 0;
      this.subscribersIndex += 1;
    }
  }
  subscribe() {
    this.subscriberCount += 1;
    return new BoundedHubArbSubscription(this, this.publisherIndex, false);
  }
}
class BoundedHubArbSubscription {
  constructor(self, subscriberIndex, unsubscribed) {
    this.self = self;
    this.subscriberIndex = subscriberIndex;
    this.unsubscribed = unsubscribed;
  }
  isEmpty() {
    return this.unsubscribed || this.self.publisherIndex === this.subscriberIndex || this.self.publisherIndex === this.self.subscribersIndex;
  }
  size() {
    if (this.unsubscribed) {
      return 0;
    }
    return this.self.publisherIndex - Math.max(this.subscriberIndex, this.self.subscribersIndex);
  }
  poll(default_) {
    if (this.unsubscribed) {
      return default_;
    }
    this.subscriberIndex = Math.max(this.subscriberIndex, this.self.subscribersIndex);
    if (this.subscriberIndex !== this.self.publisherIndex) {
      const index = this.subscriberIndex % this.self.capacity;
      const elem = this.self.array[index];
      this.self.subscribers[index] -= 1;
      if (this.self.subscribers[index] === 0) {
        this.self.array[index] = null;
        this.self.subscribersIndex += 1;
      }
      this.subscriberIndex += 1;
      return elem;
    }
    return default_;
  }
  pollUpTo(n) {
    if (this.unsubscribed) {
      return Chunk.empty();
    }
    this.subscriberIndex = Math.max(this.subscriberIndex, this.self.subscribersIndex);
    const size = this.self.publisherIndex - this.subscriberIndex;
    const toPoll = Math.min(n, size);
    if (toPoll <= 0) {
      return Chunk.empty();
    }
    const builder = [];
    const pollUpToIndex = this.subscriberIndex + toPoll;
    while (this.subscriberIndex !== pollUpToIndex) {
      const index = this.subscriberIndex % this.self.capacity;
      const a = this.self.array[index];
      this.self.subscribers[index] -= 1;
      if (this.self.subscribers[index] === 0) {
        this.self.array[index] = null;
        this.self.subscribersIndex += 1;
      }
      builder.push(a);
      this.subscriberIndex += 1;
    }
    return Chunk.fromIterable(builder);
  }
  unsubscribe() {
    if (!this.unsubscribed) {
      this.unsubscribed = true;
      this.self.subscriberCount -= 1;
      this.subscriberIndex = Math.max(this.subscriberIndex, this.self.subscribersIndex);
      while (this.subscriberIndex !== this.self.publisherIndex) {
        const index = this.subscriberIndex % this.self.capacity;
        this.self.subscribers[index] -= 1;
        if (this.self.subscribers[index] === 0) {
          this.self.array[index] = null;
          this.self.subscribersIndex += 1;
        }
        this.subscriberIndex += 1;
      }
    }
  }
}
/** @internal */
class BoundedHubPow2 {
  constructor(requestedCapacity) {
    this.publisherIndex = 0;
    this.subscriberCount = 0;
    this.subscribersIndex = 0;
    this.array = Array.from({
      length: requestedCapacity
    });
    this.mask = requestedCapacity - 1;
    this.subscribers = Array.from({
      length: requestedCapacity
    });
    this.capacity = requestedCapacity;
  }
  isEmpty() {
    return this.publisherIndex === this.subscribersIndex;
  }
  isFull() {
    return this.publisherIndex === this.subscribersIndex + this.capacity;
  }
  size() {
    return this.publisherIndex - this.subscribersIndex;
  }
  publish(value) {
    if (this.isFull()) {
      return false;
    }
    if (this.subscriberCount !== 0) {
      const index = this.publisherIndex & this.mask;
      this.array[index] = value;
      this.subscribers[index] = this.subscriberCount;
      this.publisherIndex += 1;
    }
    return true;
  }
  publishAll(elements) {
    const chunk = Chunk.fromIterable(elements);
    const n = chunk.length;
    const size = this.publisherIndex - this.subscribersIndex;
    const available = this.capacity - size;
    const forHub = Math.min(n, available);
    if (forHub === 0) {
      return chunk;
    }
    let iteratorIndex = 0;
    const publishAllIndex = this.publisherIndex + forHub;
    while (this.publisherIndex !== publishAllIndex) {
      const elem = Chunk.unsafeGet(iteratorIndex++)(chunk);
      const index = this.publisherIndex & this.mask;
      this.array[index] = elem;
      this.subscribers[index] = this.subscriberCount;
      this.publisherIndex += 1;
    }
    return Chunk.drop(iteratorIndex - 1)(chunk);
  }
  slide() {
    if (this.subscribersIndex !== this.publisherIndex) {
      const index = this.subscribersIndex & this.mask;
      this.array[index] = null;
      this.subscribers[index] = 0;
      this.subscribersIndex += 1;
    }
  }
  subscribe() {
    this.subscriberCount += 1;
    return new BoundedHubPow2Subscription(this, this.publisherIndex, false);
  }
}
/** @internal */
class BoundedHubPow2Subscription {
  constructor(self, subscriberIndex, unsubscribed) {
    this.self = self;
    this.subscriberIndex = subscriberIndex;
    this.unsubscribed = unsubscribed;
  }
  isEmpty() {
    return this.unsubscribed || this.self.publisherIndex === this.subscriberIndex || this.self.publisherIndex === this.self.subscribersIndex;
  }
  size() {
    if (this.unsubscribed) {
      return 0;
    }
    return this.self.publisherIndex - Math.max(this.subscriberIndex, this.self.subscribersIndex);
  }
  poll(default_) {
    if (this.unsubscribed) {
      return default_;
    }
    this.subscriberIndex = Math.max(this.subscriberIndex, this.self.subscribersIndex);
    if (this.subscriberIndex !== this.self.publisherIndex) {
      const index = this.subscriberIndex & this.self.mask;
      const elem = this.self.array[index];
      this.self.subscribers[index] -= 1;
      if (this.self.subscribers[index] === 0) {
        this.self.array[index] = null;
        this.self.subscribersIndex += 1;
      }
      this.subscriberIndex += 1;
      return elem;
    }
    return default_;
  }
  pollUpTo(n) {
    if (this.unsubscribed) {
      return Chunk.empty();
    }
    this.subscriberIndex = Math.max(this.subscriberIndex, this.self.subscribersIndex);
    const size = this.self.publisherIndex - this.subscriberIndex;
    const toPoll = Math.min(n, size);
    if (toPoll <= 0) {
      return Chunk.empty();
    }
    const builder = [];
    const pollUpToIndex = this.subscriberIndex + toPoll;
    while (this.subscriberIndex !== pollUpToIndex) {
      const index = this.subscriberIndex & this.self.mask;
      const elem = this.self.array[index];
      this.self.subscribers[index] -= 1;
      if (this.self.subscribers[index] === 0) {
        this.self.array[index] = null;
        this.self.subscribersIndex += 1;
      }
      builder.push(elem);
      this.subscriberIndex += 1;
    }
    return Chunk.fromIterable(builder);
  }
  unsubscribe() {
    if (!this.unsubscribed) {
      this.unsubscribed = true;
      this.self.subscriberCount -= 1;
      this.subscriberIndex = Math.max(this.subscriberIndex, this.self.subscribersIndex);
      while (this.subscriberIndex !== this.self.publisherIndex) {
        const index = this.subscriberIndex & this.self.mask;
        this.self.subscribers[index] -= 1;
        if (this.self.subscribers[index] === 0) {
          this.self.array[index] = null;
          this.self.subscribersIndex += 1;
        }
        this.subscriberIndex += 1;
      }
    }
  }
}
/** @internal */
class BoundedHubSingle {
  constructor() {
    this.publisherIndex = 0;
    this.subscriberCount = 0;
    this.subscribers = 0;
    this.value = null;
    this.capacity = 1;
  }
  isEmpty() {
    return this.subscribers === 0;
  }
  isFull() {
    return !this.isEmpty();
  }
  size() {
    return this.isEmpty() ? 0 : 1;
  }
  publish(value) {
    if (this.isFull()) {
      return false;
    }
    if (this.subscriberCount !== 0) {
      this.value = value;
      this.subscribers = this.subscriberCount;
      this.publisherIndex += 1;
    }
    return true;
  }
  publishAll(elements) {
    const chunk = Chunk.fromIterable(elements);
    if (Chunk.isEmpty(chunk)) {
      return chunk;
    }
    if (this.publish(Chunk.unsafeHead(chunk))) {
      return Chunk.drop(1)(chunk);
    } else {
      return chunk;
    }
  }
  slide() {
    if (this.isFull()) {
      this.subscribers = 0;
      this.value = null;
    }
  }
  subscribe() {
    this.subscriberCount += 1;
    return new BoundedHubSingleSubscription(this, this.publisherIndex, false);
  }
}
/** @internal */
class BoundedHubSingleSubscription {
  constructor(self, subscriberIndex, unsubscribed) {
    this.self = self;
    this.subscriberIndex = subscriberIndex;
    this.unsubscribed = unsubscribed;
  }
  isEmpty() {
    return this.unsubscribed || this.self.subscribers === 0 || this.subscriberIndex === this.self.publisherIndex;
  }
  size() {
    return this.isEmpty() ? 0 : 1;
  }
  poll(default_) {
    if (this.isEmpty()) {
      return default_;
    }
    const elem = this.self.value;
    this.self.subscribers -= 1;
    if (this.self.subscribers === 0) {
      this.self.value = null;
    }
    this.subscriberIndex += 1;
    return elem;
  }
  pollUpTo(n) {
    if (this.isEmpty() || n < 1) {
      return Chunk.empty();
    }
    const a = this.self.value;
    this.self.subscribers -= 1;
    if (this.self.subscribers === 0) {
      this.self.value = null;
    }
    this.subscriberIndex += 1;
    return Chunk.of(a);
  }
  unsubscribe() {
    if (!this.unsubscribed) {
      this.unsubscribed = true;
      this.self.subscriberCount -= 1;
      if (this.subscriberIndex !== this.self.publisherIndex) {
        this.self.subscribers -= 1;
        if (this.self.subscribers === 0) {
          this.self.value = null;
        }
      }
    }
  }
}
/** @internal */
class Node {
  constructor(value, subscribers, next) {
    this.value = value;
    this.subscribers = subscribers;
    this.next = next;
  }
}
/** @internal */
class UnboundedHub {
  constructor() {
    this.publisherHead = new Node(null, 0, null);
    this.publisherIndex = 0;
    this.subscribersIndex = 0;
    this.capacity = Number.MAX_SAFE_INTEGER;
    this.publisherTail = this.publisherHead;
  }
  isEmpty() {
    return this.publisherHead === this.publisherTail;
  }
  isFull() {
    return false;
  }
  size() {
    return this.publisherIndex - this.subscribersIndex;
  }
  publish(value) {
    const subscribers = this.publisherTail.subscribers;
    if (subscribers !== 0) {
      this.publisherTail.next = new Node(value, subscribers, null);
      this.publisherTail = this.publisherTail.next;
      this.publisherIndex += 1;
    }
    return true;
  }
  publishAll(elements) {
    for (const a of elements) {
      this.publish(a);
    }
    return Chunk.empty();
  }
  slide() {
    if (this.publisherHead !== this.publisherTail) {
      this.publisherHead = this.publisherHead.next;
      this.publisherHead.value = null;
      this.subscribersIndex += 1;
    }
  }
  subscribe() {
    this.publisherTail.subscribers += 1;
    return new UnboundedHubSubscription(this, this.publisherTail, this.publisherIndex, false);
  }
}
/** @internal */
class UnboundedHubSubscription {
  constructor(self, subscriberHead, subscriberIndex, unsubscribed) {
    this.self = self;
    this.subscriberHead = subscriberHead;
    this.subscriberIndex = subscriberIndex;
    this.unsubscribed = unsubscribed;
  }
  isEmpty() {
    if (this.unsubscribed) {
      return true;
    }
    let empty = true;
    let loop = true;
    while (loop) {
      if (this.subscriberHead === this.self.publisherTail) {
        loop = false;
      } else {
        if (this.subscriberHead.next.value !== null) {
          empty = false;
          loop = false;
        } else {
          this.subscriberHead = this.subscriberHead.next;
          this.subscriberIndex += 1;
        }
      }
    }
    return empty;
  }
  size() {
    if (this.unsubscribed) {
      return 0;
    }
    return this.self.publisherIndex - Math.max(this.subscriberIndex, this.self.subscribersIndex);
  }
  poll(default_) {
    if (this.unsubscribed) {
      return default_;
    }
    let loop = true;
    let polled = default_;
    while (loop) {
      if (this.subscriberHead === this.self.publisherTail) {
        loop = false;
      } else {
        const elem = this.subscriberHead.next.value;
        if (elem !== null) {
          polled = elem;
          this.subscriberHead.subscribers -= 1;
          if (this.subscriberHead.subscribers === 0) {
            this.self.publisherHead = this.self.publisherHead.next;
            this.self.publisherHead.value = null;
            this.self.subscribersIndex += 1;
          }
          loop = false;
        }
        this.subscriberHead = this.subscriberHead.next;
        this.subscriberIndex += 1;
      }
    }
    return polled;
  }
  pollUpTo(n) {
    const builder = [];
    const default_ = null;
    let i = 0;
    while (i !== n) {
      const a = this.poll(default_);
      if (a === default_) {
        i = n;
      } else {
        builder.push(a);
        i += 1;
      }
    }
    return Chunk.fromIterable(builder);
  }
  unsubscribe() {
    if (!this.unsubscribed) {
      this.unsubscribed = true;
      this.self.publisherTail.subscribers -= 1;
      while (this.subscriberHead !== this.self.publisherTail) {
        if (this.subscriberHead.next.value !== null) {
          this.subscriberHead.subscribers -= 1;
          if (this.subscriberHead.subscribers === 0) {
            this.self.publisherHead = this.self.publisherHead.next;
            this.self.publisherHead.value = null;
            this.self.subscribersIndex += 1;
          }
        }
        this.subscriberHead = this.subscriberHead.next;
      }
    }
  }
}
/** @internal */
class SubscriptionImpl {
  constructor(hub, subscribers, subscription, pollers, shutdownHook, shutdownFlag, strategy) {
    this.hub = hub;
    this.subscribers = subscribers;
    this.subscription = subscription;
    this.pollers = pollers;
    this.shutdownHook = shutdownHook;
    this.shutdownFlag = shutdownFlag;
    this.strategy = strategy;
    this[_a] = queue.dequeueVariance;
  }
  capacity() {
    return this.hub.capacity;
  }
  size() {
    return Debug.bodyWithTrace(trace => core.suspend(() => MutableRef.get(this.shutdownFlag) ? core.interrupt() : core.succeed(this.subscription.size())).traced(trace));
  }
  isFull() {
    return Debug.bodyWithTrace(trace => core.map(this.size(), size => size === this.capacity()).traced(trace));
  }
  isEmpty() {
    return Debug.bodyWithTrace(trace => core.map(this.size(), size => size === 0).traced(trace));
  }
  shutdown() {
    return Debug.bodyWithTrace(trace => core.uninterruptible(core.withFiberRuntime(state => {
      MutableRef.set(true)(this.shutdownFlag);
      return core.asUnit(core.whenEffect(core.deferredSucceed(this.shutdownHook, void 0))(core.zipRight(core.sync(() => this.strategy.unsafeOnHubEmptySpace(this.hub, this.subscribers)))(core.zipRight(core.sync(() => this.subscription.unsubscribe()))(fiberRuntime.forEachPar(d => core.deferredInterruptWith(d, state.id()))(unsafePollAllQueue(this.pollers))))));
    }).traced(trace)));
  }
  isShutdown() {
    return Debug.bodyWithTrace(trace => core.sync(() => MutableRef.get(this.shutdownFlag)).traced(trace));
  }
  awaitShutdown() {
    return Debug.bodyWithTrace(trace => core.deferredAwait(this.shutdownHook).traced(trace));
  }
  take() {
    return Debug.bodyWithTrace(trace => core.withFiberRuntime(state => {
      if (MutableRef.get(this.shutdownFlag)) {
        return core.interrupt();
      }
      const message = MutableQueue.isEmpty(this.pollers) ? this.subscription.poll(MutableQueue.EmptyMutableQueue) : MutableQueue.EmptyMutableQueue;
      if (message === MutableQueue.EmptyMutableQueue) {
        const deferred = core.deferredUnsafeMake(state.id());
        return core.onInterrupt(() => core.sync(() => unsafeRemove(this.pollers, deferred)))(core.suspend(() => {
          MutableQueue.offer(deferred)(this.pollers);
          addSubscribers(this.subscription, this.pollers)(this.subscribers);
          this.strategy.unsafeCompletePollers(this.hub, this.subscribers, this.subscription, this.pollers);
          return MutableRef.get(this.shutdownFlag) ? core.interrupt() : core.deferredAwait(deferred);
        }));
      } else {
        this.strategy.unsafeOnHubEmptySpace(this.hub, this.subscribers);
        return core.succeed(message);
      }
    }).traced(trace));
  }
  takeAll() {
    return Debug.bodyWithTrace(trace => core.suspend(() => {
      if (MutableRef.get(this.shutdownFlag)) {
        return core.interrupt();
      }
      const as = MutableQueue.isEmpty(this.pollers) ? unsafePollAllSubscription(this.subscription) : Chunk.empty();
      this.strategy.unsafeOnHubEmptySpace(this.hub, this.subscribers);
      return core.succeed(as);
    }).traced(trace));
  }
  takeUpTo(max) {
    return Debug.bodyWithTrace(trace => core.suspend(() => {
      if (MutableRef.get(this.shutdownFlag)) {
        return core.interrupt();
      }
      const as = MutableQueue.isEmpty(this.pollers) ? unsafePollN(this.subscription, max) : Chunk.empty();
      this.strategy.unsafeOnHubEmptySpace(this.hub, this.subscribers);
      return core.succeed(as);
    }).traced(trace));
  }
  takeBetween(min, max) {
    return Debug.bodyWithTrace(trace => core.suspend(() => takeRemainderLoop(this, min, max, Chunk.empty())).traced(trace));
  }
}
_a = queue.DequeueTypeId;
/** @internal */
const takeRemainderLoop = (self, min, max, acc) => {
  if (max < min) {
    return core.succeed(acc);
  }
  return core.flatMap(bs => {
    const remaining = min - bs.length;
    if (remaining === 1) {
      return core.map(b => Chunk.append(b)(Chunk.concat(bs)(acc)))(self.take());
    }
    if (remaining > 1) {
      return core.flatMap(b => takeRemainderLoop(self, remaining - 1, max - bs.length - 1, Chunk.append(b)(Chunk.concat(bs)(acc))))(self.take());
    }
    return core.succeed(Chunk.concat(bs)(acc));
  })(self.takeUpTo(max));
};
/** @internal */
class HubImpl {
  constructor(hub, subscribers, scope, shutdownHook, shutdownFlag, strategy) {
    this.hub = hub;
    this.subscribers = subscribers;
    this.scope = scope;
    this.shutdownHook = shutdownHook;
    this.shutdownFlag = shutdownFlag;
    this.strategy = strategy;
    this[_b] = queue.enqueueVariance;
  }
  capacity() {
    return this.hub.capacity;
  }
  size() {
    return Debug.bodyWithTrace(trace => core.suspend(() => MutableRef.get(this.shutdownFlag) ? core.interrupt() : core.sync(() => this.hub.size())).traced(trace));
  }
  isFull() {
    return Debug.bodyWithTrace(trace => core.map(size => size === this.capacity())(this.size()).traced(trace));
  }
  isEmpty() {
    return Debug.bodyWithTrace(trace => core.map(size => size === 0)(this.size()).traced(trace));
  }
  awaitShutdown() {
    return Debug.bodyWithTrace(trace => core.deferredAwait(this.shutdownHook).traced(trace));
  }
  isShutdown() {
    return Debug.bodyWithTrace(trace => core.sync(() => MutableRef.get(this.shutdownFlag)).traced(trace));
  }
  shutdown() {
    return Debug.bodyWithTrace(trace => core.uninterruptible(core.withFiberRuntime(state => {
      MutableRef.set(true)(this.shutdownFlag);
      return core.asUnit(core.whenEffect(core.deferredSucceed(this.shutdownHook, void 0))(core.zipRight(this.strategy.shutdown())(this.scope.close(core.exitInterrupt(state.id())))));
    })).traced(trace));
  }
  publish(value) {
    return Debug.bodyWithTrace(trace => core.suspend(() => {
      if (MutableRef.get(this.shutdownFlag)) {
        return core.interrupt();
      }
      if (this.hub.publish(value)) {
        this.strategy.unsafeCompleteSubscribers(this.hub, this.subscribers);
        return core.succeed(true);
      }
      return this.strategy.handleSurplus(this.hub, this.subscribers, Chunk.of(value), this.shutdownFlag);
    }).traced(trace));
  }
  publishAll(elements) {
    return Debug.bodyWithTrace(trace => core.suspend(() => {
      if (MutableRef.get(this.shutdownFlag)) {
        return core.interrupt();
      }
      const surplus = unsafePublishAll(this.hub, elements);
      this.strategy.unsafeCompleteSubscribers(this.hub, this.subscribers);
      if (Chunk.isEmpty(surplus)) {
        return core.succeed(true);
      }
      return this.strategy.handleSurplus(this.hub, this.subscribers, surplus, this.shutdownFlag);
    }).traced(trace));
  }
  subscribe() {
    return Debug.bodyWithTrace(trace => fiberRuntime.acquireRelease(core.tap(dequeue => this.scope.addFinalizer(() => dequeue.shutdown()))(makeSubscription(this.hub, this.subscribers, this.strategy)), dequeue => dequeue.shutdown()).traced(trace));
  }
  offer(value) {
    return Debug.bodyWithTrace(trace => this.publish(value).traced(trace));
  }
  offerAll(elements) {
    return Debug.bodyWithTrace(trace => this.publishAll(elements).traced(trace));
  }
}
_b = queue.EnqueueTypeId;
/** @internal */
const makeHub = /*#__PURE__*/Debug.methodWithTrace(trace => (hub, strategy) => core.flatMap(fiberRuntime.scopeMake(), scope => core.map(core.deferredMake(), deferred => unsafeMakeHub(hub, new Map(), scope, deferred, MutableRef.make(false), strategy))).traced(trace));
/** @internal */
exports.makeHub = makeHub;
const unsafeMakeHub = (hub, subscribers, scope, shutdownHook, shutdownFlag, strategy) => {
  return new HubImpl(hub, subscribers, scope, shutdownHook, shutdownFlag, strategy);
};
/** @internal */
exports.unsafeMakeHub = unsafeMakeHub;
const nextPow2 = n => {
  const nextPow = Math.ceil(Math.log(n) / Math.log(2.0));
  return Math.max(Math.pow(2, nextPow), 2);
};
/** @internal */
const ensureCapacity = capacity => {
  if (capacity <= 0) {
    throw cause.InvalidHubCapacityException(`Cannot construct Hub with capacity of ${capacity}`);
  }
};
/** @internal */
const unsafeCompleteDeferred = (deferred, a) => {
  core.deferredUnsafeDone(deferred, core.succeed(a));
};
/** @internal */
const unsafeOfferAll = (queue, as) => {
  return MutableQueue.offerAll(as)(queue);
};
/** @internal */
const unsafePollAllQueue = queue => {
  return MutableQueue.pollUpTo(Number.POSITIVE_INFINITY)(queue);
};
/** @internal */
const unsafePollAllSubscription = subscription => {
  return subscription.pollUpTo(Number.POSITIVE_INFINITY);
};
/** @internal */
const unsafePollN = (subscription, max) => {
  return subscription.pollUpTo(max);
};
/** @internal */
const unsafePublishAll = (hub, as) => {
  return hub.publishAll(as);
};
/** @internal */
const unsafeRemove = (queue, value) => {
  unsafeOfferAll(queue, Chunk.filter(elem => elem !== value)(unsafePollAllQueue(queue)));
};
/**
 * A strategy that applies back pressure to publishers when the hub is at
 * capacity. This guarantees that all subscribers will receive all messages
 * published to the hub while they are subscribed. However, it creates the
 * risk that a slow subscriber will slow down the rate at which messages
 * are published and received by other subscribers.
 *
 * @internal
 */
class BackPressureStrategy {
  constructor() {
    this.publishers = MutableQueue.unbounded();
  }
  shutdown() {
    return core.flatMap(core.fiberId(), fiberId => core.flatMap(core.sync(() => unsafePollAllQueue(this.publishers)), publishers => fiberRuntime.forEachParDiscard(publishers, ([_, deferred, last]) => last ? core.asUnit(core.deferredInterruptWith(deferred, fiberId)) : core.unit())));
  }
  handleSurplus(hub, subscribers, elements, isShutdown) {
    return core.withFiberRuntime(state => {
      const deferred = core.deferredUnsafeMake(state.id());
      return core.onInterrupt(() => core.sync(() => this.unsafeRemove(deferred)))(core.suspend(() => {
        this.unsafeOffer(elements, deferred);
        this.unsafeOnHubEmptySpace(hub, subscribers);
        this.unsafeCompleteSubscribers(hub, subscribers);
        return MutableRef.get(isShutdown) ? core.interrupt() : core.deferredAwait(deferred);
      }));
    });
  }
  unsafeOnHubEmptySpace(hub, subscribers) {
    let keepPolling = true;
    while (keepPolling && !hub.isFull()) {
      const publisher = MutableQueue.poll(MutableQueue.EmptyMutableQueue)(this.publishers);
      if (publisher === MutableQueue.EmptyMutableQueue) {
        keepPolling = false;
      } else {
        const published = hub.publish(publisher[0]);
        if (published && publisher[2]) {
          unsafeCompleteDeferred(publisher[1], true);
        } else if (!published) {
          unsafeOfferAll(this.publishers, Chunk.prepend(publisher)(unsafePollAllQueue(this.publishers)));
        }
        this.unsafeCompleteSubscribers(hub, subscribers);
      }
    }
  }
  unsafeCompletePollers(hub, subscribers, subscription, pollers) {
    return unsafeStrategyCompletePollers(this, hub, subscribers, subscription, pollers);
  }
  unsafeCompleteSubscribers(hub, subscribers) {
    return unsafeStrategyCompleteSubscribers(this, hub, subscribers);
  }
  unsafeOffer(elements, deferred) {
    const iterator = elements[Symbol.iterator]();
    let next = iterator.next();
    if (!next.done) {
      // eslint-disable-next-line no-constant-condition
      while (1) {
        const value = next.value;
        next = iterator.next();
        if (next.done) {
          MutableQueue.offer([value, deferred, true])(this.publishers);
          break;
        }
        MutableQueue.offer([value, deferred, false])(this.publishers);
      }
    }
  }
  unsafeRemove(deferred) {
    unsafeOfferAll(this.publishers, Chunk.filter(([_, a]) => a !== deferred)(unsafePollAllQueue(this.publishers)));
  }
}
/**
 * A strategy that drops new messages when the hub is at capacity. This
 * guarantees that a slow subscriber will not slow down the rate at which
 * messages are published. However, it creates the risk that a slow
 * subscriber will slow down the rate at which messages are received by
 * other subscribers and that subscribers may not receive all messages
 * published to the hub while they are subscribed.
 *
 * @internal
 */
class DroppingStrategy {
  shutdown() {
    return core.unit();
  }
  handleSurplus(_hub, _subscribers, _elements, _isShutdown) {
    return core.succeed(false);
  }
  unsafeOnHubEmptySpace(_hub, _subscribers) {
    //
  }
  unsafeCompletePollers(hub, subscribers, subscription, pollers) {
    return unsafeStrategyCompletePollers(this, hub, subscribers, subscription, pollers);
  }
  unsafeCompleteSubscribers(hub, subscribers) {
    return unsafeStrategyCompleteSubscribers(this, hub, subscribers);
  }
}
/**
 * A strategy that adds new messages and drops old messages when the hub is
 * at capacity. This guarantees that a slow subscriber will not slow down
 * the rate at which messages are published and received by other
 * subscribers. However, it creates the risk that a slow subscriber will
 * not receive some messages published to the hub while it is subscribed.
 *
 * @internal
 */
exports.DroppingStrategy = DroppingStrategy;
class SlidingStrategy {
  shutdown() {
    return core.unit();
  }
  handleSurplus(hub, subscribers, elements, _isShutdown) {
    return core.sync(() => {
      this.unsafeSlidingPublish(hub, elements);
      this.unsafeCompleteSubscribers(hub, subscribers);
      return true;
    });
  }
  unsafeOnHubEmptySpace(_hub, _subscribers) {
    //
  }
  unsafeCompletePollers(hub, subscribers, subscription, pollers) {
    return unsafeStrategyCompletePollers(this, hub, subscribers, subscription, pollers);
  }
  unsafeCompleteSubscribers(hub, subscribers) {
    return unsafeStrategyCompleteSubscribers(this, hub, subscribers);
  }
  unsafeSlidingPublish(hub, elements) {
    const it = elements[Symbol.iterator]();
    let next = it.next();
    if (!next.done && hub.capacity > 0) {
      let a = next.value;
      let loop = true;
      while (loop) {
        hub.slide();
        const pub = hub.publish(a);
        if (pub && (next = it.next()) && !next.done) {
          a = next.value;
        } else if (pub) {
          loop = false;
        }
      }
    }
  }
}
/** @internal */
exports.SlidingStrategy = SlidingStrategy;
const unsafeStrategyCompletePollers = (strategy, hub, subscribers, subscription, pollers) => {
  let keepPolling = true;
  while (keepPolling && !subscription.isEmpty()) {
    const poller = MutableQueue.poll(MutableQueue.EmptyMutableQueue)(pollers);
    if (poller === MutableQueue.EmptyMutableQueue) {
      removeSubscribers(subscription, pollers)(subscribers);
      if (MutableQueue.isEmpty(pollers)) {
        keepPolling = false;
      } else {
        addSubscribers(subscription, pollers)(subscribers);
      }
    } else {
      const pollResult = subscription.poll(MutableQueue.EmptyMutableQueue);
      if (pollResult === MutableQueue.EmptyMutableQueue) {
        unsafeOfferAll(pollers, Chunk.prepend(poller)(unsafePollAllQueue(pollers)));
      } else {
        unsafeCompleteDeferred(poller, pollResult);
        strategy.unsafeOnHubEmptySpace(hub, subscribers);
      }
    }
  }
};
/** @internal */
const unsafeStrategyCompleteSubscribers = (strategy, hub, subscribers) => {
  for (const [subscription, pollersSet] of subscribers) {
    for (const pollers of pollersSet) {
      strategy.unsafeCompletePollers(hub, subscribers, subscription, pollers);
    }
  }
};
//# sourceMappingURL=hub.js.map