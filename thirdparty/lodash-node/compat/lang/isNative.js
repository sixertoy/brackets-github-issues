/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var escapeRegExp = require('../string/escapeRegExp'),
    isFunction = require('./isFunction'),
    isHostObject = require('../internal/isHostObject');

/** Used to detect host constructors (Safari > 5) */
var reHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions */
var fnToString = Function.prototype.toString;

/** Used to resolve the internal `[[Class]]` of values */
var toString = objectProto.toString;

/** Used to detect if a method is native */
var reNative = RegExp('^' +
  escapeRegExp(toString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (isFunction(value)) {
    return reNative.test(fnToString.call(value));
  }
  return (value && typeof value == 'object' &&
    (isHostObject(value) ? reNative : reHostCtor).test(value)) || false;
}

module.exports = isNative;
