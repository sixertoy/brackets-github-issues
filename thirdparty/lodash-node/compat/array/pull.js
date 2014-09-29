/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseIndexOf = require('../internal/baseIndexOf');

/** Used for native method references */
var arrayProto = Array.prototype;

/** Native method references */
var splice = arrayProto.splice;

/**
 * Removes all provided values from `array` using `SameValueZero` for equality
 * comparisons.
 *
 * **Notes:**
 *  - Unlike `_.without`, this method mutates `array`.
 *  - `SameValueZero` is like strict equality, e.g. `===`, except that `NaN` matches `NaN`.
 *    See the [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 *    for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...*} [values] The values to remove.
 * @returns {Array} Returns `array`.
 * @example
 *
 * var array = [1, 2, 3, 1, 2, 3];
 * _.pull(array, 2, 3);
 * console.log(array);
 * // => [1, 1]
 */
function pull() {
  var array = arguments[0];
  if (!(array && array.length)) {
    return array;
  }
  var index = 0,
      indexOf = baseIndexOf,
      length = arguments.length;

  while (++index < length) {
    var fromIndex = 0,
        value = arguments[index];

    while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
      splice.call(array, fromIndex, 1);
    }
  }
  return array;
}

module.exports = pull;
