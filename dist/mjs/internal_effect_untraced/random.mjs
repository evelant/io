var _a;
import * as Chunk from "@effect/data/Chunk";
import * as Context from "@effect/data/Context";
import * as PCGRandom from "@effect/data/Random";
import * as Debug from "@effect/io/Debug";
import * as core from "@effect/io/internal_effect_untraced/core";
/** @internal */
const RandomSymbolKey = "@effect/io/Random";
/** @internal */
export const RandomTypeId = /*#__PURE__*/Symbol.for(RandomSymbolKey);
/** @internal */
export const randomTag = /*#__PURE__*/Context.Tag(RandomTypeId);
/** @internal */
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
export const make = seed => new RandomImpl(seed);
//# sourceMappingURL=random.mjs.map