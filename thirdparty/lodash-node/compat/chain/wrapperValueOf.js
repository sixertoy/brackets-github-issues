/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used for native method references */
var arrayProto = Array.prototype;

/** Native method references */
var push = arrayProto.push;

/**
 * Extracts the unwrapped value from its wrapper.
 *
 * @name valueOf
 * @memberOf _
 * @alias toJSON, value
 * @category Chain
 * @returns {*} Returns the unwrapped value.
 * @example
 *
 * _([1, 2, 3]).valueOf();
 * // => [1, 2, 3]
 */
function wrapperValueOf() {
  var index = -1,
      queue = this.__queue__,
      length = queue.length,
      result = this.__wrapped__;

  while (++index < length) {
    var args = [result],
        data = queue[index],
        object = data[1];

    push.apply(args, data[2]);
    result = object[data[0]].apply(object, args);
  }
  return result;
}

module.exports = wrapperValueOf;
