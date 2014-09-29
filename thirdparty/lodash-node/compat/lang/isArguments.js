/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var support = require('../support');

/**
 * Used as the maximum length of an array-like value.
 * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/** `Object#toString` result references */
var argsClass = '[object Arguments]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/** Native method references */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object, else `false`.
 * @example
 *
 * (function() { return _.isArguments(arguments); })();
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  var length = (value && typeof value == 'object') ? value.length : undefined;
  return (typeof length == 'number' && length > -1 && length <= MAX_SAFE_INTEGER &&
    toString.call(value) == argsClass) || false;
}
// fallback for environments without a `[[Class]]` for `arguments` objects
if (!support.argsClass) {
  isArguments = function(value) {
    var length = (value && typeof value == 'object') ? value.length : undefined;
    return (typeof length == 'number' && length > -1 && length <= MAX_SAFE_INTEGER &&
      hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee')) || false;
  };
}

module.exports = isArguments;
