/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createWrapper = require('./createWrapper'),
    getData = require('./getData');

/** Used to compose bitmasks for wrapper metadata */
var PARTIAL_FLAG = 32;

/* Native method references for those with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * The base implementation of `_.partial` and `_.partialRight` which accepts
 * an array of arguments to partially apply and handles resolving the arity
 * of `func`.
 *
 * @private
 * @param {Function} func The function to partially apply arguments to.
 * @param {number} bitmask The bitmask of flags to compose.
 * @param {Array} args The arguments to be partially applied.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new partially applied function.
 */
function basePartial(func, bitmask, args, holders, thisArg) {
  if (func) {
    var data = getData(func),
        arity = data ? data[2] : func.length;

    arity = nativeMax(arity - args.length, 0);
  }
  return (bitmask & PARTIAL_FLAG)
    ? createWrapper(func, bitmask, arity, thisArg, args, holders)
    : createWrapper(func, bitmask, arity, thisArg, null, null, args, holders);
}

module.exports = basePartial;
