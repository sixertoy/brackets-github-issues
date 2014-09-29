/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseClone = require('../internal/baseClone'),
    baseIsEqual = require('../internal/baseIsEqual'),
    isStrictComparable = require('../internal/isStrictComparable'),
    keys = require('../object/keys');

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates a "_.where" style predicate function which performs a deep comparison
 * between a given object and the `source` object, returning `true` if the given
 * object has equivalent property values, else `false`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * var matchesAge = _.matches({ 'age': 36 });
 *
 * _.filter(users, matchesAge);
 * // => [{ 'user': 'barney', 'age': 36 }]
 *
 * _.find(users, matchesAge);
 * // => { 'user': 'barney', 'age': 36 }
 */
function matches(source) {
  var props = keys(source),
      length = props.length;

  if (length == 1) {
    var key = props[0],
        value = source[key];

    if (isStrictComparable(value)) {
      return function(object) {
        return object != null && value === object[key] && hasOwnProperty.call(object, key);
      };
    }
  }
  var index = length,
      flags = Array(length),
      vals = Array(length);

  while (index--) {
    value = source[props[index]];
    var isStrict = isStrictComparable(value);

    flags[index] = isStrict;
    vals[index] = isStrict ? value : baseClone(value);
  }
  return function(object) {
    index = length;
    if (object == null) {
      return !index;
    }
    while (index--) {
      if (flags[index] ? vals[index] !== object[props[index]] : !hasOwnProperty.call(object, props[index])) {
        return false;
      }
    }
    index = length;
    while (index--) {
      if (flags[index] ? !hasOwnProperty.call(object, props[index]) : !baseIsEqual(vals[index], object[props[index]], null, true)) {
        return false;
      }
    }
    return true;
  };
}

module.exports = matches;
