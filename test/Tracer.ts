import * as Context from "@effect/data/Context"
import { millis, seconds } from "@effect/data/Duration"
import { identity } from "@effect/data/Function"
import * as Option from "@effect/data/Option"
import * as Effect from "@effect/io/Effect"
import * as Fiber from "@effect/io/Fiber"
import * as FiberId from "@effect/io/FiberId"
import * as TestClock from "@effect/io/internal/testing/testClock"
import type { NativeSpan } from "@effect/io/internal/tracer"
import * as Layer from "@effect/io/Layer"
import * as it from "@effect/io/test/utils/extend"
import type { Span } from "@effect/io/Tracer"
import { assert, describe } from "vitest"

const currentSpan = Effect.flatMap(Effect.currentSpan, identity)

describe("Tracer", () => {
  describe("withSpan", () => {
    it.effect("no parent", () =>
      Effect.gen(function*($) {
        const span = yield* $(
          Effect.withSpan("A")(currentSpan)
        )

        assert.deepEqual(span.name, "A")
        assert.deepEqual(span.parent, Option.none())
      }))

    it.effect("parent", () =>
      Effect.gen(function*($) {
        const span = yield* $(
          Effect.withSpan("B")(
            Effect.withSpan("A")(currentSpan)
          )
        )

        assert.deepEqual(span.name, "A")
        assert.deepEqual(Option.map(span.parent, (span) => (span as Span).name), Option.some("B"))
      }))

    it.effect("parent when root is set", () =>
      Effect.gen(function*($) {
        const span = yield* $(
          Effect.withSpan("B")(Effect.withSpan("A", { root: true })(currentSpan))
        )

        assert.deepEqual(span.name, "A")
        assert.deepEqual(span.parent, Option.none())
      }))

    it.effect("external parent", () =>
      Effect.gen(function*($) {
        const span = yield* $(
          Effect.withSpan("A", {
            parent: {
              _tag: "ExternalSpan",
              spanId: "000",
              traceId: "111",
              context: Context.empty()
            }
          })(currentSpan)
        )
        assert.deepEqual(span.name, "A")
        assert.deepEqual(Option.map(span.parent, (span) => span.spanId), Option.some("000"))
      }))

    it.effect("correct time", () =>
      Effect.gen(function*($) {
        const spanFiber = yield* $(
          Effect.fork(Effect.withSpan("A")(Effect.delay(seconds(1))(currentSpan)))
        )

        yield* $(TestClock.adjust(seconds(2)))

        const span = yield* $(Fiber.join(spanFiber))

        assert.deepEqual(span.name, "A")
        assert.deepEqual(span.status.startTime, 0n)
        assert.deepEqual((span.status as any)["endTime"], 1000000000n)
        assert.deepEqual(span.status._tag, "Ended")
      }))

    it.effect("annotateSpans", () =>
      Effect.gen(function*($) {
        const span = yield* $(
          Effect.annotateSpans(
            Effect.withSpan("A")(currentSpan),
            "key",
            "value"
          )
        )

        assert.deepEqual(span.name, "A")
        assert.deepEqual(span.parent, Option.none())
        assert.deepEqual(span.attributes.get("key"), "value")
      }))

    it.effect("annotateSpans record", () =>
      Effect.gen(function*($) {
        const span = yield* $(
          Effect.annotateSpans(
            Effect.withSpan("A")(currentSpan),
            { key: "value", key2: "value2" }
          )
        )

        assert.deepEqual(span.attributes.get("key"), "value")
        assert.deepEqual(span.attributes.get("key2"), "value2")
      }))

    it.effect("logger", () =>
      Effect.gen(function*($) {
        yield* $(TestClock.adjust(millis(0.01)))

        const [span, fiberId] = yield* $(
          Effect.log("event"),
          Effect.zipRight(Effect.all([currentSpan, Effect.fiberId])),
          Effect.withSpan("A")
        )

        assert.deepEqual(span.name, "A")
        assert.deepEqual(span.parent, Option.none())
        assert.deepEqual((span as NativeSpan).events, [["event", 10000n, {
          "effect.fiberId": FiberId.threadName(fiberId),
          "effect.logLevel": "INFO"
        }]])
      }))

    it.effect("withTracerTiming false", () =>
      Effect.gen(function*($) {
        yield* $(TestClock.adjust(millis(1)))

        const span = yield* $(
          Effect.withSpan("A")(currentSpan),
          Effect.withTracerTiming(false)
        )

        assert.deepEqual(span.status.startTime, 0n)
      }))

    it.effect("useSpanScoped", () =>
      Effect.gen(function*(_) {
        const span = yield* _(Effect.scoped(Effect.useSpanScoped("A")))
        assert.deepEqual(span.status._tag, "Ended")
      }))

    it.effect("annotateCurrentSpan", () =>
      Effect.gen(function*(_) {
        yield* _(Effect.annotateCurrentSpan("key", "value"))
        const span = yield* _(Effect.currentSpan)
        assert.deepEqual(
          Option.map(span, (span) => span.attributes.get("key")),
          Option.some("value")
        )
      }).pipe(
        Effect.withSpan("A")
      ))

    it.effect("withParentSpan", () =>
      Effect.gen(function*(_) {
        const span = yield* _(Effect.currentSpan)
        assert.deepEqual(
          span.pipe(
            Option.flatMap((_) => _.parent),
            Option.map((_) => _.spanId)
          ),
          Option.some("456")
        )
      }).pipe(
        Effect.withSpan("A"),
        Effect.withParentSpan({
          _tag: "ExternalSpan",
          traceId: "123",
          spanId: "456",
          context: Context.empty()
        })
      ))

    it.effect("setParentSpan", () =>
      Effect.gen(function*(_) {
        const span = yield* _(Effect.makeSpan("child"))
        assert.deepEqual(
          span.parent.pipe(
            Option.filter((span): span is Span => span._tag === "Span"),
            Option.map((span) => span.name)
          ),
          Option.some("parent")
        )
      }).pipe(
        Effect.provideLayer(Layer.unwrapScoped(
          Effect.map(
            Effect.useSpanScoped("parent"),
            (span) => Effect.setParentSpan(span)
          )
        ))
      ))

    it.effect("setSpan", () =>
      Effect.gen(function*(_) {
        const span = yield* _(Effect.makeSpan("child"))
        assert.deepEqual(
          span.parent.pipe(
            Option.filter((span): span is Span => span._tag === "Span"),
            Option.map((span) => span.name)
          ),
          Option.some("parent")
        )
      }).pipe(
        Effect.provideLayer(Effect.setSpan("parent"))
      ))

    it.effect("linkSpans", () =>
      Effect.gen(function*(_) {
        const childA = yield* _(Effect.makeSpan("childA"))
        const childB = yield* _(Effect.makeSpan("childB"))
        const currentSpan = yield* _(
          Effect.currentSpan,
          Effect.withSpan("A", { links: [{ _tag: "SpanLink", span: childB, attributes: {} }] }),
          Effect.linkSpans(childA)
        )
        assert.includeMembers(
          currentSpan.pipe(
            Option.map((span) => span.links.map((_) => _.span)),
            Option.getOrElse(() => [])
          ),
          [childB, childA]
        )
      }))
  })
})
