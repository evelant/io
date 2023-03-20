"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.within = exports.upperCase = exports.unnested = exports.snakeCase = exports.orElse = exports.nested = exports.makeFlat = exports.make = exports.lowerCase = exports.kebabCase = exports.fromMap = exports.fromFlat = exports.fromEnv = exports.contramapPath = exports.constantCase = exports.configProviderTag = exports.FlatConfigProviderTypeId = exports.ConfigProviderTypeId = void 0;
var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Chunk"));
var Context = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Context"));
var Either = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Either"));
var HashMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashMap"));
var HashSet = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/HashSet"));
var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/data/Option"));
var Debug = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/Debug"));
var _config = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/config"));
var configError = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/configError"));
var pathPatch = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/configProvider/pathPatch"));
var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/core"));
var OpCodes = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/opCodes/config"));
var StringUtils = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect/io/internal_effect_untraced/string-utils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @internal */
const ConfigProviderSymbolKey = "@effect/io/Config/Provider";
/** @internal */
const ConfigProviderTypeId = /*#__PURE__*/Symbol.for(ConfigProviderSymbolKey);
/** @internal */
exports.ConfigProviderTypeId = ConfigProviderTypeId;
const configProviderTag = /*#__PURE__*/Context.Tag(ConfigProviderTypeId);
/** @internal */
exports.configProviderTag = configProviderTag;
const FlatConfigProviderSymbolKey = "@effect/io/Config/Provider/Flat";
/** @internal */
const FlatConfigProviderTypeId = /*#__PURE__*/Symbol.for(FlatConfigProviderSymbolKey);
/** @internal */
exports.FlatConfigProviderTypeId = FlatConfigProviderTypeId;
const make = /*#__PURE__*/Debug.untracedMethod(restore => (load, flattened) => ({
  [ConfigProviderTypeId]: ConfigProviderTypeId,
  load: Debug.methodWithTrace(trace => config => restore(load)(config).traced(trace)),
  flattened
}));
/** @internal */
exports.make = make;
const makeFlat = /*#__PURE__*/Debug.untracedMethod(restore => (load, enumerateChildren, patch) => ({
  [FlatConfigProviderTypeId]: FlatConfigProviderTypeId,
  patch,
  load: Debug.methodWithTrace(trace => (path, config, split = true) => restore(load)(path, config, split).traced(trace)),
  enumerateChildren: Debug.methodWithTrace(trace => path => restore(enumerateChildren)(path).traced(trace))
}));
/** @internal */
exports.makeFlat = makeFlat;
const fromFlat = /*#__PURE__*/Debug.untracedMethod(() => flat => make(config => core.flatMap(fromFlatLoop(flat, Chunk.empty(), config, false), chunk => Option.match(() => core.fail(configError.MissingData(Chunk.empty(), `Expected a single value having structure: ${config}`)), core.succeed)(Chunk.head(chunk))), flat));
/** @internal */
exports.fromFlat = fromFlat;
const fromEnv = /*#__PURE__*/Debug.untracedMethod(() => (config = {}) => {
  const {
    pathDelim,
    seqDelim
  } = Object.assign({}, {
    pathDelim: "_",
    seqDelim: ","
  }, config);
  const makePathString = path => Chunk.join(pathDelim)(path);
  const unmakePathString = pathString => pathString.split(pathDelim);
  const getEnv = () => typeof process !== "undefined" && "env" in process && typeof process.env === "object" ? process.env : {};
  const load = (path, primitive, split = true) => {
    const pathString = makePathString(path);
    const current = getEnv();
    const valueOpt = pathString in current ? Option.some(current[pathString]) : Option.none();
    return core.flatMap(value => parsePrimitive(value, path, primitive, seqDelim, split))(core.mapError(() => configError.MissingData(path, `Expected ${pathString} to exist in the process context`))(core.fromOption(valueOpt)));
  };
  const enumerateChildren = path => core.sync(() => {
    const current = getEnv();
    const keys = Object.keys(current);
    const keyPaths = Array.from(keys).map(value => unmakePathString(value.toUpperCase()));
    const filteredKeyPaths = keyPaths.filter(keyPath => {
      for (let i = 0; i < path.length; i++) {
        const pathComponent = Chunk.unsafeGet(i)(path);
        const currentElement = keyPath[i];
        if (currentElement === undefined || pathComponent !== currentElement) {
          return false;
        }
      }
      return true;
    }).flatMap(keyPath => keyPath.slice(path.length, path.length + 1));
    return HashSet.fromIterable(filteredKeyPaths);
  });
  return fromFlat(makeFlat(load, enumerateChildren, pathPatch.empty));
});
/** @internal */
exports.fromEnv = fromEnv;
const fromMap = /*#__PURE__*/Debug.untracedMethod(() => (map, config = {}) => {
  const {
    pathDelim,
    seqDelim
  } = Object.assign({}, {
    seqDelim: ",",
    pathDelim: "."
  }, config);
  const makePathString = path => Chunk.join(pathDelim)(path);
  const unmakePathString = pathString => pathString.split(pathDelim);
  const load = (path, primitive, split = true) => {
    const pathString = makePathString(path);
    const valueOpt = map.has(pathString) ? Option.some(map.get(pathString)) : Option.none();
    return core.flatMap(value => parsePrimitive(value, path, primitive, seqDelim, split))(core.mapError(() => configError.MissingData(path, `Expected ${pathString} to exist in the provided map`))(core.fromOption(valueOpt)));
  };
  const enumerateChildren = path => core.sync(() => {
    const keyPaths = Array.from(map.keys()).map(unmakePathString);
    const filteredKeyPaths = keyPaths.filter(keyPath => {
      for (let i = 0; i < path.length; i++) {
        const pathComponent = Chunk.unsafeGet(i)(path);
        const currentElement = keyPath[i];
        if (currentElement === undefined || pathComponent !== currentElement) {
          return false;
        }
      }
      return true;
    }).flatMap(keyPath => keyPath.slice(path.length, path.length + 1));
    return HashSet.fromIterable(filteredKeyPaths);
  });
  return fromFlat(makeFlat(load, enumerateChildren, pathPatch.empty));
});
exports.fromMap = fromMap;
const extend = (leftDef, rightDef, left, right) => {
  const leftPad = Chunk.unfold(left.length, index => index >= right.length ? Option.none() : Option.some([leftDef(index), index + 1]));
  const rightPad = Chunk.unfold(right.length, index => index >= left.length ? Option.none() : Option.some([rightDef(index), index + 1]));
  const leftExtension = Chunk.concat(leftPad)(left);
  const rightExtension = Chunk.concat(rightPad)(right);
  return [leftExtension, rightExtension];
};
const fromFlatLoop = (flat, prefix, config, split) => {
  const op = config;
  switch (op._tag) {
    case OpCodes.OP_CONSTANT:
      {
        return core.succeed(Chunk.of(op.value));
      }
    case OpCodes.OP_DESCRIBED:
      {
        return core.suspend(() => fromFlatLoop(flat, prefix, op.config, split));
      }
    case OpCodes.OP_FAIL:
      {
        return core.fail(configError.MissingData(prefix, op.message));
      }
    case OpCodes.OP_FALLBACK:
      {
        return core.catchAll(error1 => {
          if (op.condition(error1)) {
            return core.catchAll(error2 => core.fail(configError.Or(error1, error2)))(fromFlatLoop(flat, prefix, op.second, split));
          }
          return core.fail(error1);
        })(core.suspend(() => fromFlatLoop(flat, prefix, op.first, split)));
      }
    case OpCodes.OP_LAZY:
      {
        return core.suspend(() => fromFlatLoop(flat, prefix, op.config(), split));
      }
    case OpCodes.OP_MAP_OR_FAIL:
      {
        return core.suspend(() => core.flatMap(core.forEach(a => core.mapError(configError.prefixed(prefix))(core.fromEither(op.mapOrFail(a)))))(fromFlatLoop(flat, prefix, op.original, split)));
      }
    case OpCodes.OP_NESTED:
      {
        return core.suspend(() => fromFlatLoop(flat, Chunk.concat(Chunk.of(op.name))(prefix), op.config, split));
      }
    case OpCodes.OP_PRIMITIVE:
      {
        return core.flatMap(prefix => core.flatMap(values => {
          if (Chunk.isEmpty(values)) {
            const name = Option.getOrElse(() => "<n/a>")(Chunk.last(prefix));
            return core.fail(_config.missingError(name));
          }
          return core.succeed(values);
        })(flat.load(prefix, op, split)))(core.fromEither(pathPatch.patch(prefix, flat.patch)));
      }
    case OpCodes.OP_SEQUENCE:
      {
        return core.suspend(() => core.map(Chunk.of)(fromFlatLoop(flat, prefix, op.config, true)));
      }
    case OpCodes.OP_TABLE:
      {
        return core.suspend(() => core.flatMap(prefix => core.flatMap(keys => {
          return core.map(values => {
            if (values.length === 0) {
              return Chunk.of(HashMap.empty());
            }
            const matrix = Chunk.toReadonlyArray(values).map(Chunk.toReadonlyArray);
            return Chunk.map(values => HashMap.fromIterable(Chunk.zip(Chunk.fromIterable(keys), values)))(Chunk.unsafeFromArray(transpose(matrix).map(Chunk.unsafeFromArray)));
          })(core.forEach(key => fromFlatLoop(flat, Chunk.concat(Chunk.of(key))(prefix), op.valueConfig, split))(keys));
        })(flat.enumerateChildren(prefix)))(core.fromEither(pathPatch.patch(prefix, flat.patch))));
      }
    case OpCodes.OP_ZIP_WITH:
      {
        return core.suspend(() => core.flatMap(left => core.flatMap(right => {
          if (Either.isLeft(left) && Either.isLeft(right)) {
            return core.fail(configError.And(left.left, right.left));
          }
          if (Either.isLeft(left) && Either.isRight(right)) {
            return core.fail(left.left);
          }
          if (Either.isRight(left) && Either.isLeft(right)) {
            return core.fail(right.left);
          }
          if (Either.isRight(left) && Either.isRight(right)) {
            const path = Chunk.join(".")(prefix);
            const fail = fromFlatLoopFail(prefix, path);
            const [lefts, rights] = extend(fail, fail, Chunk.map(Either.right)(left.right), Chunk.map(Either.right)(right.right));
            return core.forEach(([left, right]) => core.map(([left, right]) => op.zip(left, right))(core.zip(core.fromEither(right))(core.fromEither(left))))(Chunk.zip(rights)(lefts));
          }
          throw new Error("BUG: ConfigProvider.fromFlatLoop - please report an issue at https://github.com/Effect-TS/io/issues");
        })(core.either(fromFlatLoop(flat, prefix, op.right, split))))(core.either(fromFlatLoop(flat, prefix, op.left, split))));
      }
  }
};
const fromFlatLoopFail = (prefix, path) => index => Either.left(configError.MissingData(prefix, `The element at index ${index} in a sequence at path "${path}" was missing`));
/** @internal */
const contramapPath = /*#__PURE__*/Debug.untracedDual(2, restore => (self, f) => fromFlat(contramapPathFlat(self.flattened, restore(f))));
exports.contramapPath = contramapPath;
const contramapPathFlat = (self, f) => makeFlat((path, config, split = true) => self.load(path, config, split), path => self.enumerateChildren(path), pathPatch.mapName(self.patch, f));
/** @internal */
const nested = /*#__PURE__*/Debug.untracedDual(2, () => (self, name) => fromFlat(makeFlat((path, config) => self.flattened.load(path, config, true), path => self.flattened.enumerateChildren(Chunk.prepend(name)(path)), pathPatch.nested(self.flattened.patch, name))));
/** @internal */
exports.nested = nested;
const unnested = /*#__PURE__*/Debug.untracedDual(2, () => (self, name) => fromFlat(makeFlat((path, config) => self.flattened.load(path, config, true), path => self.flattened.enumerateChildren(path), pathPatch.unnested(self.flattened.patch, name))));
/** @internal */
exports.unnested = unnested;
const orElse = /*#__PURE__*/Debug.untracedDual(2, restore => (self, that) => fromFlat(orElseFlat(self.flattened, () => restore(that)().flattened)));
exports.orElse = orElse;
const orElseFlat = (self, that) => makeFlat((path, config, split) => core.catchAll(error1 => core.flatMap(that => core.catchAll(error2 => core.fail(configError.Or(error1, error2)))(core.flatMap(patch => that.load(patch, config, split))(core.fromEither(pathPatch.patch(path, that.patch)))))(core.sync(that)))(core.flatMap(patch => self.load(patch, config, split))(core.fromEither(pathPatch.patch(path, self.patch)))), path => core.flatMap(left => core.flatMap(that => core.flatMap(right => {
  if (Either.isLeft(left) && Either.isLeft(right)) {
    return core.fail(configError.And(left.left, right.left));
  }
  if (Either.isLeft(left) && Either.isRight(right)) {
    return core.fail(left.left);
  }
  if (Either.isRight(left) && Either.isLeft(right)) {
    return core.fail(right.left);
  }
  if (Either.isRight(left) && Either.isRight(right)) {
    return core.succeed(HashSet.union(right.right)(left.right));
  }
  throw new Error("BUG: ConfigProvider.orElseFlat - please report an issue at https://github.com/Effect-TS/io/issues");
})(core.either(core.flatMap(patch => that.enumerateChildren(patch))(core.fromEither(pathPatch.patch(path, that.patch))))))(core.sync(that)))(core.either(core.flatMap(patch => self.enumerateChildren(patch))(core.fromEither(pathPatch.patch(path, self.patch))))), pathPatch.empty);
/** @internal */
const constantCase = self => contramapPath(self, StringUtils.constantCase);
/** @internal */
exports.constantCase = constantCase;
const kebabCase = self => contramapPath(self, StringUtils.kebabCase);
/** @internal */
exports.kebabCase = kebabCase;
const lowerCase = self => contramapPath(self, StringUtils.lowerCase);
/** @internal */
exports.lowerCase = lowerCase;
const snakeCase = self => contramapPath(self, StringUtils.snakeCase);
/** @internal */
exports.snakeCase = snakeCase;
const upperCase = self => contramapPath(self, StringUtils.upperCase);
/** @internal */
exports.upperCase = upperCase;
const within = /*#__PURE__*/Debug.untracedDual(3, () => (self, path, f) => {
  const unnest = Chunk.reduce(path, self, (provider, name) => unnested(provider, name));
  const nest = Chunk.reduceRight(path, f(unnest), (provider, name) => nested(provider, name));
  return orElse(nest, () => self);
});
exports.within = within;
const splitPathString = (text, delim) => {
  const split = text.split(new RegExp(`\\s*${escapeRegex(delim)}\\s*`));
  return Chunk.unsafeFromArray(split);
};
const parsePrimitive = (text, path, primitive, delimiter, split) => {
  if (!split) {
    return core.mapError(configError.prefixed(path))(core.map(Chunk.of)(core.fromEither(primitive.parse(text))));
  }
  return core.mapError(configError.prefixed(path))(core.forEach(char => core.fromEither(primitive.parse(char.trim())))(splitPathString(text, delimiter)));
};
const transpose = array => {
  return Object.keys(array[0]).map(column => array.map(row => row[column]));
};
const escapeRegex = string => {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
};
//# sourceMappingURL=configProvider.js.map