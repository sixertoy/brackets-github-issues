/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var composeArgs = require('./composeArgs'),
    composeArgsRight = require('./composeArgsRight'),
    createCtorWrapper = require('./createCtorWrapper'),
    replaceHolders = require('./replaceHolders'),
    setData = require('./setData');

/** Used to compose bitmasks for wrapper metadata */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_FLAG = 4,
    CURRY_RIGHT_FLAG = 8,
    CURRY_BOUND_FLAG = 16,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64;

/* Native method references for those with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * Creates a function that wraps `func` and invokes it with optional `this`
 * binding of, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
 * @param {number} arity The arity of `func`.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partialArgs] The arguments to prepend to those provided to the new function.
 * @param {Array} [partialHolders] The `partialArgs` placeholder indexes.
 * @param {Array} [partialRightArgs] The arguments to append to those provided to the new function.
 * @param {Array} [partialRightHolders] The `partialRightArgs` placeholder indexes.
 * @returns {Function} Returns the new function.
 */
function createHybridWrapper(func, bitmask, arity, thisArg, partialArgs, partialHolders, partialRightArgs, partialRightHolders) {
  var isBind = bitmask & BIND_FLAG,
      isBindKey = bitmask & BIND_KEY_FLAG,
      isCurry = bitmask & CURRY_FLAG,
      isCurryRight = bitmask & CURRY_RIGHT_FLAG,
      isCurryBound = bitmask & CURRY_BOUND_FLAG;

  var Ctor = !isBindKey && createCtorWrapper(func),
      key = func;

  function wrapper() {
    var length = arguments.length,
        index = length,
        args = Array(length);

    while (index--) {
      args[index] = arguments[index];
    }
    if (partialArgs) {
      args = composeArgs(partialArgs, partialHolders, args);
    }
    if (partialRightArgs) {
      args = composeArgsRight(partialRightArgs, partialRightHolders, args);
    }
    if (isCurry || isCurryRight) {
      var placeholder = wrapper.placeholder,
          holders = replaceHolders(args, placeholder);

      length -= holders.length;
      if (length < arity) {
        var newArity = nativeMax(arity - length, 0),
            newPartialArgs = isCurry ? args : null,
            newPartialHolders = isCurry ? holders : null,
            newPartialRightArgs = isCurry ? null : args,
            newPartialRightHolders = isCurry ? null : holders;

        bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
        bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

        if (!isCurryBound) {
          bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
        }
        var result = createHybridWrapper(func, bitmask, newArity, thisArg, newPartialArgs, newPartialHolders, newPartialRightArgs, newPartialRightHolders);
        result.placeholder = placeholder;
        return setData(result, [func, bitmask, newArity, thisArg, newPartialArgs, newPartialHolders, newPartialRightArgs, newPartialRightHolders]);
      }
    }
    var thisBinding = isBind ? thisArg : this;
    if (isBindKey) {
      func = thisBinding[key];
    }
    return (this instanceof wrapper ? (Ctor || createCtorWrapper(func)) : func).apply(thisBinding, args);
  }
  return wrapper;
}

module.exports = createHybridWrapper;
