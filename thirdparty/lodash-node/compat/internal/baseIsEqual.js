/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isArguments = require('../lang/isArguments'),
    isHostObject = require('./isHostObject'),
    keys = require('../object/keys'),
    support = require('../support');

/** `Object#toString` result references */
var argsClass = '[object Arguments]',
    arrayClass = '[object Array]',
    boolClass = '[object Boolean]',
    dateClass = '[object Date]',
    errorClass = '[object Error]',
    funcClass = '[object Function]',
    mapClass = '[object Map]',
    numberClass = '[object Number]',
    objectClass = '[object Object]',
    regexpClass = '[object RegExp]',
    setClass = '[object Set]',
    stringClass = '[object String]',
    weakMapClass = '[object WeakMap]';

var arrayBufferClass = '[object ArrayBuffer]',
    float32Class = '[object Float32Array]',
    float64Class = '[object Float64Array]',
    int8Class = '[object Int8Array]',
    int16Class = '[object Int16Array]',
    int32Class = '[object Int32Array]',
    uint8Class = '[object Uint8Array]',
    uint8ClampedClass = '[object Uint8ClampedArray]',
    uint16Class = '[object Uint16Array]',
    uint32Class = '[object Uint32Array]';

/** Used to identify object classifications that are treated like arrays */
var arrayLikeClasses = {};
arrayLikeClasses[argsClass] =
arrayLikeClasses[arrayClass] = arrayLikeClasses[float32Class] =
arrayLikeClasses[float64Class] = arrayLikeClasses[int8Class] =
arrayLikeClasses[int16Class] = arrayLikeClasses[int32Class] =
arrayLikeClasses[uint8Class] = arrayLikeClasses[uint8ClampedClass] =
arrayLikeClasses[uint16Class] = arrayLikeClasses[uint32Class] = true;
arrayLikeClasses[arrayBufferClass] = arrayLikeClasses[boolClass] =
arrayLikeClasses[dateClass] = arrayLikeClasses[errorClass] =
arrayLikeClasses[funcClass] = arrayLikeClasses[mapClass] =
arrayLikeClasses[numberClass] = arrayLikeClasses[objectClass] =
arrayLikeClasses[regexpClass] = arrayLikeClasses[setClass] =
arrayLikeClasses[stringClass] = arrayLikeClasses[weakMapClass] = false;

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/**
 * The base implementation of `_.isEqual`, without support for `thisArg`
 * binding, which allows partial "_.where" style comparisons.
 *
 * @private
 * @param {*} value The value to compare to `other`.
 * @param {*} other The value to compare to `value`.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere=false] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isWhere, stackA, stackB) {
  var result = customizer && !stackA ? customizer(value, other) : undefined;
  if (typeof result != 'undefined') {
    return !!result;
  }
  // exit early for identical values
  if (value === other) {
    // treat `+0` vs. `-0` as not equal
    return value !== 0 || (1 / value == 1 / other);
  }
  var valType = typeof value,
      othType = typeof other;

  // exit early for unlike primitive values
  if (!(valType == 'number' && othType == 'number') && (value == null || other == null ||
      (valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object'))) {
    return false;
  }
  var valClass = toString.call(value),
      valIsArg = valClass == argsClass,
      othClass = toString.call(other),
      othIsArg = othClass == argsClass;

  if (valIsArg) {
    valClass = objectClass;
  }
  if (othIsArg) {
    othClass = objectClass;
  }
  var valIsArr = arrayLikeClasses[valClass],
      valIsErr = valClass == errorClass,
      valIsObj = valClass == objectClass && !isHostObject(value),
      othIsObj = othClass == objectClass && !isHostObject(other);

  var isSameClass = valClass == othClass;
  if (isSameClass && valIsArr) {
    var valLength = value.length,
        othLength = other.length;

    if (valLength != othLength && !(isWhere && othLength > valLength)) {
      return false;
    }
  }
  else {
    // unwrap any `lodash` wrapped values
    var valWrapped = valIsObj && hasOwnProperty.call(value, '__wrapped__'),
        othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (valWrapped || othWrapped) {
      return baseIsEqual(valWrapped ? value.value() : value, othWrapped ? other.value() : other, customizer, isWhere, stackA, stackB);
    }
    if (!isSameClass) {
      return false;
    }
    if (valIsErr || valIsObj) {
      if (!support.argsClass) {
        valIsArg = isArguments(value);
        othIsArg = isArguments(other);
      }
      // in older versions of Opera, `arguments` objects have `Array` constructors
      var valCtor = valIsArg ? Object : value.constructor,
          othCtor = othIsArg ? Object : other.constructor;

      if (valIsErr) {
        // error objects of different types are not equal
        if (valCtor.prototype.name != othCtor.prototype.name) {
          return false;
        }
      }
      else {
        var valHasCtor = !valIsArg && hasOwnProperty.call(value, 'constructor'),
            othHasCtor = !othIsArg && hasOwnProperty.call(other, 'constructor');

        if (valHasCtor != othHasCtor) {
          return false;
        }
        if (!valHasCtor) {
          // non `Object` object instances with different constructors are not equal
          if (valCtor != othCtor && ('constructor' in value && 'constructor' in other) &&
              !(typeof valCtor == 'function' && valCtor instanceof valCtor &&
                typeof othCtor == 'function' && othCtor instanceof othCtor)) {
            return false;
          }
        }
      }
      var valProps = valIsErr ? ['message', 'name'] : keys(value),
          othProps = valIsErr ? valProps : keys(other);

      if (valIsArg) {
        valProps.push('length');
      }
      if (othIsArg) {
        othProps.push('length');
      }
      valLength = valProps.length;
      othLength = othProps.length;
      if (valLength != othLength && !isWhere) {
        return false;
      }
    }
    else {
      switch (valClass) {
        case boolClass:
        case dateClass:
          // coerce dates and booleans to numbers, dates to milliseconds and booleans
          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
          return +value == +other;

        case numberClass:
          // treat `NaN` vs. `NaN` as equal
          return (value != +value)
            ? other != +other
            // but treat `-0` vs. `+0` as not equal
            : (value == 0 ? ((1 / value) == (1 / other)) : value == +other);

        case regexpClass:
        case stringClass:
          // coerce regexes to strings (http://es5.github.io/#x15.10.6.4) and
          // treat strings primitives and string objects as equal
          return value == String(other);
      }
      return false;
    }
  }
  // assume cyclic structures are equal
  // the algorithm for detecting cyclic structures is adapted from ES 5.1
  // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
  stackA || (stackA = []);
  stackB || (stackB = []);

  var index = stackA.length;
  while (index--) {
    if (stackA[index] == value) {
      return stackB[index] == other;
    }
  }
  // add `value` and `other` to the stack of traversed objects
  stackA.push(value);
  stackB.push(other);

  // recursively compare objects and arrays (susceptible to call stack limits)
  result = true;
  if (valIsArr) {
    // deep compare the contents, ignoring non-numeric properties
    while (result && ++index < valLength) {
      var valValue = value[index];
      if (isWhere) {
        var othIndex = othLength;
        while (othIndex--) {
          result = baseIsEqual(valValue, other[othIndex], customizer, isWhere, stackA, stackB);
          if (result) {
            break;
          }
        }
      } else {
        var othValue = other[index];
        result = customizer ? customizer(valValue, othValue, index) : undefined;
        if (typeof result == 'undefined') {
          result = baseIsEqual(valValue, othValue, customizer, isWhere, stackA, stackB);
        }
      }
    }
  }
  else {
    while (result && ++index < valLength) {
      var key = valProps[index];
      result = valIsErr || hasOwnProperty.call(other, key);

      if (result) {
        valValue = value[key];
        othValue = other[key];
        result = customizer ? customizer(valValue, othValue, key) : undefined;
        if (typeof result == 'undefined') {
          result = baseIsEqual(valValue, othValue, customizer, isWhere, stackA, stackB);
        }
      }
    }
  }
  stackA.pop();
  stackB.pop();

  return !!result;
}

module.exports = baseIsEqual;
