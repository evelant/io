import * as Context from "@effect/data/Context"
import * as Duration from "@effect/data/Duration"
import * as Either from "@effect/data/Either"
import { constFalse } from "@effect/data/Function"
import type * as Clock from "@effect/io/Clock"
import type * as Effect from "@effect/io/Effect"
import * as core from "@effect/io/internal/core"

/** @internal */
const ClockSymbolKey = "@effect/io/Clock"

/** @internal */
export const ClockTypeId: Clock.ClockTypeId = Symbol.for(ClockSymbolKey) as Clock.ClockTypeId

/** @internal */
export const clockTag: Context.Tag<Clock.Clock, Clock.Clock> = Context.Tag(ClockTypeId)

/** @internal */
export const MAX_TIMER_MILLIS = 2 ** 31 - 1

/** @internal */
export const globalClockScheduler: Clock.ClockScheduler = {
  unsafeSchedule(task: Clock.Task, duration: Duration.Duration): Clock.CancelToken {
    const millis = Duration.toMillis(duration)
    // If the duration is greater than the value allowable by the JS timer
    // functions, treat the value as an infinite duration
    if (millis > MAX_TIMER_MILLIS) {
      return constFalse
    }
    let completed = false
    const handle = setTimeout(() => {
      completed = true
      task()
    }, millis)
    return () => {
      clearTimeout(handle)
      return !completed
    }
  }
}

const performanceNowNanos = (function() {
  const bigint1e6 = BigInt(1_000_000)

  if (typeof performance === "undefined") {
    return () => BigInt(Date.now()) * bigint1e6
  }

  const origin = "timeOrigin" in performance && typeof performance.timeOrigin === "number" ?
    BigInt(Math.round(performance.timeOrigin * 1_000_000)) :
    BigInt(Date.now()) * bigint1e6

  return () => origin + BigInt(Math.round(performance.now() * 1_000_000))
})()
const processOrPerformanceNow = (function() {
  const processHrtime =
    typeof process === "object" && "hrtime" in process && typeof process.hrtime.bigint === "function" ?
      process.hrtime :
      undefined
  if (!processHrtime) {
    return performanceNowNanos
  }
  const origin = performanceNowNanos() - processHrtime.bigint()
  return () => origin + processHrtime.bigint()
})()

/** @internal */
class ClockImpl implements Clock.Clock {
  readonly [ClockTypeId]: Clock.ClockTypeId = ClockTypeId

  unsafeCurrentTimeMillis(): number {
    return Date.now()
  }

  unsafeCurrentTimeNanos(): bigint {
    return processOrPerformanceNow()
  }

  currentTimeMillis: Effect.Effect<never, never, number> = core.sync(() => this.unsafeCurrentTimeMillis())

  currentTimeNanos: Effect.Effect<never, never, bigint> = core.sync(() => this.unsafeCurrentTimeNanos())

  scheduler(): Effect.Effect<never, never, Clock.ClockScheduler> {
    return core.succeed(globalClockScheduler)
  }

  sleep(duration: Duration.Duration): Effect.Effect<never, never, void> {
    return core.asyncEither<never, never, void>((cb) => {
      const canceler = globalClockScheduler.unsafeSchedule(() => cb(core.unit), duration)
      return Either.left(core.asUnit(core.sync(canceler)))
    })
  }
}

/** @internal */
export const make = (): Clock.Clock => new ClockImpl()
