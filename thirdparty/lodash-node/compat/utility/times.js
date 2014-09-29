/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback');

/** Used as references for the max length and index of an array */
var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

/* Native method references for those with the same name as other `lodash` methods */
var nativeIsFinite = global.isFinite,
    nativeMin = Math.min;

/**
 * Invokes the iteratee function `n` times, returning an array of the results
 * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
 * one argument; (index).
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} [iteratee=identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
 * // => [3, 6, 4]
 *
 * _.times(3, function(n) { mage.castSpell(n); });
 * // => invokes `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
 *
 * _.times(3, function(n) { this.cast(n); }, mage);
 * // => also invokes `mage.castSpell(n)` three times
 */
function times(n, iteratee, thisArg) {
  n = nativeIsFinite(n = +n) && n > -1 ? n : 0;
  iteratee = baseCallback(iteratee, thisArg, 1);

  var index = -1,
      result = Array(nativeMin(n, MAX_ARRAY_LENGTH));

  while (++index < n) {
    if (index < MAX_ARRAY_LENGTH) {
      result[index] = iteratee(index);
    } else {
      iteratee(index);
    }
  }
  return result;
}

module.exports = times;
