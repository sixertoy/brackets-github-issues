/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * This method is like `_.tap` except that it returns the result of `interceptor`.
 *
 * @static
 * @memberOf _
 * @category Chain
 * @param {*} value The value to provide to `interceptor`.
 * @param {Function} interceptor The function to invoke.
 * @param {*} [thisArg] The `this` binding of `interceptor`.
 * @returns {*} Returns the result of `interceptor`.
 * @example
 *
 * _([1, 2, 3])
 *  .last()
 *  .thru(function(value) { return [value]; })
 *  .value();
 * // => [3]
 */
function thru(value, interceptor, thisArg) {
  return interceptor.call(thisArg, value);
}

module.exports = thru;
