/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseSortedIndex = require('../internal/baseSortedIndex'),
    identity = require('../utility/identity');

/**
 * This method is like `_.sortedIndex` except that it returns the highest
 * index at which a value should be inserted into a given sorted array in
 * order to maintain the sort order of the array.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function|Object|string} [iteratee=identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * _.sortedLastIndex([4, 4, 5, 5, 6, 6], 5);
 * // => 4
 */
function sortedLastIndex(array, value, iteratee, thisArg) {
  iteratee = iteratee == null ? identity : baseCallback(iteratee, thisArg, 1);
  return baseSortedIndex(array, value, iteratee, true);
}

module.exports = sortedLastIndex;
