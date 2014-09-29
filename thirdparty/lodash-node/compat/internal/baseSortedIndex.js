/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used as references for the max length and index of an array */
var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1,
    MAX_ARRAY_INDEX =  MAX_ARRAY_LENGTH - 1;

/** Native method references */
var floor = Math.floor;

/* Native method references for those with the same name as other `lodash` methods */
var nativeMin = Math.min;

/**
 * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` without
 * support for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {boolean} [retHighest=false] Specify returning the highest, instead
 *  of the lowest, index at which a value should be inserted into `array`.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndex(array, value, iteratee, retHighest) {
  var low = 0,
      high = array ? array.length : low;

  value = iteratee(value);

  var valIsNaN = value !== value,
      valIsUndef = typeof value == 'undefined';

  while (low < high) {
    var mid = floor((low + high) / 2),
        computed = iteratee(array[mid]),
        isReflexive = computed === computed;

    if (valIsNaN) {
      var setLow = isReflexive || retHighest;
    } else if (valIsUndef) {
      setLow = isReflexive && (retHighest || typeof computed != 'undefined');
    } else {
      setLow = retHighest ? (computed <= value) : (computed < value);
    }
    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return nativeMin(high, MAX_ARRAY_INDEX);
}

module.exports = baseSortedIndex;
