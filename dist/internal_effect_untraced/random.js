"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomTag = exports.make = exports.RandomTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var PCGRandom = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Random"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _a;
/** @internal */
const RandomSymbolKey = "@effect/io/Random";
/** @internal */
const RandomTypeId = /*#__PURE__*/Symbol.for(RandomSymbolKey);
/** @internal */
exports.RandomTypeId = RandomTypeId;
const randomTag = /*#__PURE__*/Context.Tag(RandomTypeId);
/** @internal */
exports.randomTag = randomTag;
class RandomImpl {
  constructor(seed) {
    this.seed = seed;
    this[_a] = RandomTypeId;
    this.PRNG = new PCGRandom.PCGRandom(seed);
  }
  next() {
    return Debug.bodyWithTrace(trace => core.sync(() => this.PRNG.number()).traced(trace));
  }
  nextBoolean() {
    return Debug.bodyWithTrace(trace => core.map(this.next(), n => n > 0.5).traced(trace));
  }
  nextInt() {
    return Debug.bodyWithTrace(trace => core.sync(() => this.PRNG.integer(Number.MAX_SAFE_INTEGER)).traced(trace));
  }
  nextRange(min, max) {
    return Debug.bodyWithTrace(trace => core.map(this.next(), n => (max - min) * n + min).traced(trace));
  }
  nextIntBetween(min, max) {
    return Debug.bodyWithTrace(trace => core.sync(() => this.PRNG.integer(1 + max - min) + min).traced(trace));
  }
  shuffle(elements) {
    return Debug.bodyWithTrace(trace => shuffleWith(elements, n => this.nextIntBetween(0, n)).traced(trace));
  }
}
_a = RandomTypeId;
const shuffleWith = (elements, nextIntBounded) => {
  return core.suspend(() => core.flatMap(buffer => {
    const numbers = [];
    for (let i = buffer.length; i >= 2; i = i - 1) {
      numbers.push(i);
    }
    return core.as(Chunk.fromIterable(buffer))(core.forEachDiscard(n => core.map(k => swap(buffer, n - 1, k))(nextIntBounded(n)))(numbers));
  })(core.sync(() => Array.from(elements))));
};
const swap = (buffer, index1, index2) => {
  const tmp = buffer[index1];
  buffer[index1] = buffer[index2];
  buffer[index2] = tmp;
  return buffer;
};
const make = seed => new RandomImpl(seed);
exports.make = make;
//# sourceMappingURL=random.js.map