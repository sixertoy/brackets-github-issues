/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createWrapper = require('./createWrapper');

/* Native method references for those with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * The base implementation of `_.curry` and `_.curryRight` which handles
 * resolving the default arity of `func`.
 *
 * @private
 * @param {Function} func The function to curry.
 * @param {number} bitmask The bitmask of flags to compose.
 * @param {number} [arity=func.length] The arity of `func`.
 * @returns {Function} Returns the new curried function.
 */
function baseCurry(func, bitmask, arity) {
  if (typeof arity != 'number') {
    arity = arity == null ? (func ? func.length : 0) : nativeMax(+arity || 0, 0);
  }
  return createWrapper(func, bitmask, arity);
}

module.exports = baseCurry;
