/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createWrapper = require('../internal/createWrapper'),
    replaceHolders = require('../internal/replaceHolders'),
    slice = require('../array/slice');

/** Used to compose bitmasks for wrapper metadata */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2;

/**
 * Creates a function that invokes the method at `object[key]` and prepends
 * any additional `bindKey` arguments to those provided to the bound function.
 * This method differs from `_.bind` by allowing bound functions to reference
 * methods that may be redefined or don't yet exist.
 * See [Peter Michaux's article](http://michaux.ca/articles/lazy-function-definition-pattern)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Object} object The object the method belongs to.
 * @param {string} key The key of the method.
 * @param {...*} [args] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * var object = {
 *   'user': 'fred',
 *   'greet': function(greeting) {
 *     return greeting + ' ' + this.user;
 *   }
 * };
 *
 * var func = _.bindKey(object, 'greet', 'hi');
 * func();
 * // => 'hi fred'
 *
 * object.greet = function(greeting) {
 *   return greeting + 'ya ' + this.user + '!';
 * };
 *
 * func();
 * // => 'hiya fred!'
 */
function bindKey(object, key) {
  var bitmask = BIND_FLAG | BIND_KEY_FLAG;
  if (arguments.length > 2) {
    var args = slice(arguments, 2),
        holders = replaceHolders(args, bindKey.placeholder);
  }
  return args
    ? createWrapper(key, bitmask, null, object, args, holders)
    : createWrapper(key, bitmask, null, object);
}

// assign default placeholders
bindKey.placeholder = {};

module.exports = bindKey;
