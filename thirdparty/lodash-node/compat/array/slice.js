/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseSlice = require('../internal/baseSlice'),
    isIterateeCall = require('../internal/isIterateeCall');

/**
 * Slices `array` from the `start` index up to, but not including, the `end` index.
 *
 * **Note:** This function is used instead of `Array#slice` to support node lists
 * in IE < 9 and to ensure dense arrays are returned.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start index.
 * @param {number} [end=array.length] The end index.
 * @returns {Array} Returns the slice of `array`.
 */
function slice(array, start, end) {
  var index = -1,
      length = array ? array.length : 0,
      endType = typeof end;

  if (end && endType != 'number' && isIterateeCall(array, start, end)) {
    start = 0;
    end = length;
  }
  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (endType == 'undefined' || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  if (end && end == length && !start) {
    return baseSlice(array);
  }
  length = start > end ? 0 : (end - start);

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = slice;
