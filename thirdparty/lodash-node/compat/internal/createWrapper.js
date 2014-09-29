/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseSetData = require('./baseSetData'),
    baseSlice = require('./baseSlice'),
    composeArgs = require('./composeArgs'),
    composeArgsRight = require('./composeArgsRight'),
    createBindWrapper = require('./createBindWrapper'),
    createHybridWrapper = require('./createHybridWrapper'),
    createPartialWrapper = require('./createPartialWrapper'),
    getData = require('./getData'),
    isFunction = require('../lang/isFunction'),
    replaceHolders = require('./replaceHolders'),
    setData = require('./setData');

/** Used to compose bitmasks for wrapper metadata */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 16,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64;

/** Used as the TypeError message for "Functions" methods */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as the internal argument placeholder */
var PLACEHOLDER = '__lodash_placeholder__';

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of flags.
 *  The bitmask may be composed of the following flags:
 *   1  - `_.bind`
 *   2  - `_.bindKey`
 *   4  - `_.curry`
 *   8  - `_.curryRight`
 *   16 - `_.curry` or `_.curryRight` of a bound function
 *   32 - `_.partial`
 *   64 - `_.partialRight`
 * @param {number} arity The arity of `func`.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partialArgs] The arguments to prepend to those provided to the new function.
 * @param {Array} [partialHolders] The `partialArgs` placeholder indexes.
 * @param {Array} [partialRightArgs] The arguments to append to those provided to the new function.
 * @param {Array} [partialRightHolders] The `partialRightArgs` placeholder indexes.
 * @returns {Function} Returns the new function.
 */
function createWrapper(func, bitmask, arity, thisArg, partialArgs, partialHolders, partialRightArgs, partialRightHolders) {
  var isBindKey = bitmask & BIND_KEY_FLAG;
  if (!isBindKey && !isFunction(func)) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var isPartial = bitmask & PARTIAL_FLAG;
  if (isPartial && !partialArgs.length) {
    bitmask &= ~PARTIAL_FLAG;
    isPartial = false;
    partialArgs = partialHolders = null;
  }
  var isPartialRight = bitmask & PARTIAL_RIGHT_FLAG;
  if (isPartialRight && !partialRightArgs.length) {
    bitmask &= ~PARTIAL_RIGHT_FLAG;
    isPartialRight = false;
    partialRightArgs = partialRightHolders = null;
  }
  var data = (data = !isBindKey && getData(func)) && data !== true && data;
  if (data) {
    var funcBitmask = data[1],
        funcIsBind = funcBitmask & BIND_FLAG,
        isBind = bitmask & BIND_FLAG;

    // use metadata `func` and merge bitmasks
    func = data[0];
    bitmask |= funcBitmask;

    // use metadata `arity` if not provided
    if (arity == null) {
      arity = data[2];
    }
    // use metadata `thisArg` if available
    if (funcIsBind) {
      thisArg = data[3];
    }
    // set if currying a bound function
    if (!isBind && funcIsBind) {
      bitmask |= CURRY_BOUND_FLAG;
    }
    // append partial left arguments
    var funcArgs = data[4];
    if (funcArgs) {
      var funcHolders = data[5];
      partialArgs = isPartial ? composeArgs(funcArgs, funcHolders, partialArgs) : baseSlice(funcArgs);
      partialHolders = isPartial ? replaceHolders(partialArgs, PLACEHOLDER) : baseSlice(funcHolders);
    }
    // prepend partial right arguments
    funcArgs = data[6];
    if (funcArgs) {
      funcHolders = data[7];
      partialRightArgs = isPartialRight ? composeArgsRight(funcArgs, funcHolders, partialRightArgs) : baseSlice(funcArgs);
      partialRightHolders = isPartialRight ? replaceHolders(partialRightArgs, PLACEHOLDER) : baseSlice(funcHolders);
    }
  }
  if (arity == null) {
    arity = isBindKey ? 0 : func.length;
  }
  if (bitmask == BIND_FLAG) {
    var result = createBindWrapper(func, thisArg);
  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !partialHolders.length) {
    result = createPartialWrapper(func, bitmask, partialArgs, thisArg);
  } else {
    result = createHybridWrapper(func, bitmask, arity, thisArg, partialArgs, partialHolders, partialRightArgs, partialRightHolders);
  }
  var setter = data ? baseSetData : setData;
  return setter(result, [func, bitmask, arity, thisArg, partialArgs, partialHolders, partialRightArgs, partialRightHolders]);
}

module.exports = createWrapper;
