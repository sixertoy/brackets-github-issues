/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCurry = require('../internal/baseCurry');

/** Used to compose bitmasks for wrapper metadata */
var CURRY_RIGHT_FLAG = 8;

/**
 * This method is like `_.curry` except that arguments are applied to `func`
 * in the manner of `_.partialRight` instead of `_.partial`.
 *
 * **Note:** This method does not set the `length` property of curried functions.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to curry.
 * @param {number} [arity=func.length] The arity of `func`.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Function} Returns the new curried function.
 * @example
 *
 * var curried = _.curryRight(function(a, b, c) {
 *   console.log([a, b, c]);
 * });
 *
 * curried(3)(2)(1);
 * // => [1, 2, 3]
 *
 * curried(2, 3)(1);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 */
function curryRight(func, arity, guard) {
  var result = baseCurry(func, CURRY_RIGHT_FLAG, guard ? null : arity);
  result.placeholder = curryRight.placeholder;
  return result;
}

// assign default placeholders
curryRight.placeholder = {};

module.exports = curryRight;
