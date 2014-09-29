/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var slice = require('./slice');

/* Native method references for those with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `collection` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to process.
 * @param {numer} [size=1] The length of each chunk.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Array} Returns the new array containing chunks.
 * @example
 *
 * _.chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 *
 * _.chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size, guard) {
  var index = 0,
      length = array ? array.length : 0,
      resIndex = -1,
      result = [];

  size = (guard || size == null) ? 1 : nativeMax(+size || 1, 1);
  while (index < length) {
    result[++resIndex] = slice(array, index, (index += size));
  }
  return result;
}

module.exports = chunk;
