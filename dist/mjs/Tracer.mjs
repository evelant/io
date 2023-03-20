/**
 * @since 1.0.0
 */
import * as Context from "@effect/data/Context";
import { globalValue } from "@effect/data/Global";
import * as MutableRef from "@effect/data/MutableRef";
import * as Option from "@effect/data/Option";
import * as Clock from "@effect/io/Clock";
import { dualWithTrace } from "@effect/io/Debug";
import * as Effect from "@effect/io/Effect";
/**
 * @since 1.0.0
 */
export const TracerTypeId = /*#__PURE__*/Symbol.for("@effect/io/Tracer");
/**
 * @since 1.0.0
 */
export const make = options => ({
  [TracerTypeId]: TracerTypeId,
  ...options
});
/**
 * @since 1.0.0
 */
export const Tracer = /*#__PURE__*/Context.Tag();
const ids = /*#__PURE__*/globalValue("@effect/io/Tracer/SpanId.ids", () => MutableRef.make(0));
class NativeSpan {
  constructor(name, parent, startTime) {
    this.name = name;
    this.parent = parent;
    this.startTime = startTime;
    this._tag = "Span";
    this.traceId = "native";
    this.end = (endTime, exit) => {
      this.status = {
        _tag: "Ended",
        endTime,
        exit,
        startTime: this.status.startTime
      };
    };
    this.attribute = (key, value) => {
      this.attributes.set(key, value);
    };
    this.status = {
      _tag: "Started",
      startTime
    };
    this.attributes = new Map();
    this.spanId = `span${MutableRef.incrementAndGet(ids)}`;
  }
}
const nativeTracer = /*#__PURE__*/make({
  span: (name, parent, startTime) => new NativeSpan(name, parent, startTime)
});
/**
 * @since 1.0.0
 */
export const Span = /*#__PURE__*/Context.Tag();
/**
 * @since 1.0.0
 */
export const withSpan = /*#__PURE__*/dualWithTrace(args => typeof args[0] !== "string", () => (self, name, options) => Effect.acquireUseRelease(Effect.flatMap(Clock.currentTimeMillis(), startTime => Effect.contextWith(context => {
  const tracer = Option.getOrElse(Context.getOption(context, Tracer), () => nativeTracer);
  const parent = Option.orElse(Option.fromNullable(options?.parent), () => options?.root === true ? Option.none() : Context.getOption(context, Span));
  const span = tracer.span(name, parent, startTime);
  Object.entries(options?.attributes ?? {}).forEach(([k, v]) => {
    span.attribute(k, v);
  });
  return span;
})), span => Effect.provideService(Span, span)(self), (span, exit) => Effect.flatMap(Clock.currentTimeMillis(), endTime => Effect.sync(() => span.end(endTime, exit)))));
//# sourceMappingURL=Tracer.mjs.map