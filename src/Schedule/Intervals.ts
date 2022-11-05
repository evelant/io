/**
 * @since 1.0.0
 */
import * as internal from "@effect/io/internal/schedule/intervals"
import type * as Interval from "@effect/io/Schedule/Interval"
import type * as List from "@fp-ts/data/List"

/**
 * @since 1.0.0
 * @category symbols
 */
export const IntervalsTypeId: unique symbol = internal.IntervalsTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type IntervalsTypeId = typeof IntervalsTypeId

/**
 * An `Intervals` represents a list of several `Interval`s.
 *
 * @since 1.0.0
 * @category models
 */
export interface Intervals {
  readonly [IntervalsTypeId]: IntervalsTypeId
  readonly intervals: List.List<Interval.Interval>
}

/**
 * Creates a new `Intervals` from a `List` of `Interval`s.
 *
 * @since 1.0.0
 * @category constructors
 */
export const make = internal.make

/**
 * Constructs an empty list of `Interval`s.
 *
 * @since 1.0.0
 * @category constructors
 */
export const empty = internal.empty

/**
 * Constructs `Intervals` from the specified `Iterable<Interval>`.
 *
 * @since 1.0.0
 * @category constructors
 */
export const fromIterable = internal.fromIterable

/**
 * Computes the union of this `Intervals` and  that `Intervals`
 *
 * @since 1.0.0
 * @category mutations
 */
export const union = internal.union

/**
 * Produces the intersection of this `Intervals` and that `Intervals`.
 *
 * @since 1.0.0
 * @category mutations
 */
export const intersect = internal.intersect

/**
 * The start of the earliest interval in the specified `Intervals`.
 *
 * @since 1.0.0
 * @category getters
 */
export const start = internal.start

/**
 * The end of the latest interval in the specified `Intervals`.
 *
 * @since 1.0.0
 * @category getters
 */
export const end = internal.end

/**
 * Returns `true` if the start of this `Intervals` is before the start of that
 * `Intervals`, `false` otherwise.
 *
 * @since 1.0.0
 * @category ordering
 */
export const lessThan = internal.lessThan

/**
 * Returns `true` if this `Intervals` is non-empty, `false` otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export const isNonEmpty = internal.isNonEmpty

/**
 * Returns the maximum of the two `Intervals` (i.e. which has the latest start).
 *
 * @since 1.0.0
 * @category ordering
 */
export const max = internal.max