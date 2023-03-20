/**
 * @since 1.0.0
 */
import * as Context from "@effect/data/Context";
import * as Option from "@effect/data/Option";
import * as Effect from "@effect/io/Effect";
import type * as Exit from "@effect/io/Exit";
/**
 * @since 1.0.0
 */
export declare const TracerTypeId: unique symbol;
/**
 * @since 1.0.0
 */
export type TracerTypeId = typeof TracerTypeId;
/**
 * @since 1.0.0
 */
export interface Tracer {
    readonly [TracerTypeId]: TracerTypeId;
    readonly span: (name: string, parent: Option.Option<ParentSpan>, startTime: number) => Span;
}
/**
 * @since 1.0.0
 */
export declare const make: (options: Omit<Tracer, TracerTypeId>) => Tracer;
/**
 * @since 1.0.0
 */
export declare const Tracer: Context.Tag<Tracer>;
/**
 * @since 1.0.0
 */
export type SpanStatus = {
    _tag: "Started";
    startTime: number;
} | {
    _tag: "Ended";
    startTime: number;
    endTime: number;
    exit: Exit.Exit<unknown, unknown>;
};
/**
 * @since 1.0.0
 */
export type ParentSpan = Span | ExternalSpan;
/**
 * @since 1.0.0
 */
export interface ExternalSpan {
    readonly _tag: "ExternalSpan";
    readonly name: string;
    readonly spanId: string;
    readonly traceId: string;
}
/**
 * @since 1.0.0
 */
export interface Span {
    readonly _tag: "Span";
    readonly name: string;
    readonly spanId: string;
    readonly traceId: string;
    readonly parent: Option.Option<ParentSpan>;
    readonly status: SpanStatus;
    readonly attributes: ReadonlyMap<string, string>;
    readonly end: (endTime: number, exit: Exit.Exit<unknown, unknown>) => void;
    readonly attribute: (key: string, value: string) => void;
}
/**
 * @since 1.0.0
 */
export declare const Span: Context.Tag<Span>;
/**
 * @since 1.0.0
 */
export declare const withSpan: {
    (name: string, options?: {
        attributes?: Record<string, string>;
        parent?: ParentSpan;
        root?: boolean;
    }): <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<Exclude<R, Span>, E, A>;
    <R, E, A>(self: Effect.Effect<R, E, A>, name: string, options?: {
        attributes?: Record<string, string>;
        parent?: ParentSpan;
        root?: boolean;
    }): Effect.Effect<Exclude<R, Span>, E, A>;
};
//# sourceMappingURL=Tracer.d.ts.map