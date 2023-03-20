"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withSpan = exports.make = exports.TracerTypeId = exports.Tracer = exports.Span = void 0;
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var _Global = /*#__PURE__*/require("@effect/data/Global");
var MutableRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/MutableRef"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Clock = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Clock"));
var _Debug = /*#__PURE__*/require("@effect/io/Debug");
var Effect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Effect"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @since 1.0.0
 */

/**
 * @since 1.0.0
 */
const TracerTypeId = /*#__PURE__*/Symbol.for("@effect/io/Tracer");
/**
 * @since 1.0.0
 */
exports.TracerTypeId = TracerTypeId;
const make = options => ({
  [TracerTypeId]: TracerTypeId,
  ...options
});
/**
 * @since 1.0.0
 */
exports.make = make;
const Tracer = /*#__PURE__*/Context.Tag();
exports.Tracer = Tracer;
const ids = /*#__PURE__*/(0, _Global.globalValue)("@effect/io/Tracer/SpanId.ids", () => MutableRef.make(0));
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
const Span = /*#__PURE__*/Context.Tag();
/**
 * @since 1.0.0
 */
exports.Span = Span;
const withSpan = /*#__PURE__*/(0, _Debug.dualWithTrace)(args => typeof args[0] !== "string", () => (self, name, options) => Effect.acquireUseRelease(Effect.flatMap(Clock.currentTimeMillis(), startTime => Effect.contextWith(context => {
  const tracer = Option.getOrElse(Context.getOption(context, Tracer), () => nativeTracer);
  const parent = Option.orElse(Option.fromNullable(options?.parent), () => options?.root === true ? Option.none() : Context.getOption(context, Span));
  const span = tracer.span(name, parent, startTime);
  Object.entries(options?.attributes ?? {}).forEach(([k, v]) => {
    span.attribute(k, v);
  });
  return span;
})), span => Effect.provideService(Span, span)(self), (span, exit) => Effect.flatMap(Clock.currentTimeMillis(), endTime => Effect.sync(() => span.end(endTime, exit)))));
exports.withSpan = withSpan;
//# sourceMappingURL=Tracer.js.map