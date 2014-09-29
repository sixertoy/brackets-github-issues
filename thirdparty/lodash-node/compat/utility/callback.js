/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback');

/**
 * Creates a function bound to an optional `thisArg`. If `func` is a property
 * name the created callback returns the property value for a given element.
 * If `func` is an object the created callback returns `true` for elements
 * that contain the equivalent object properties, otherwise it returns `false`.
 *
 * @static
 * @memberOf _
 * @alias iteratee
 * @category Utility
 * @param {*} [func=identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of the created callback.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 }
 * ];
 *
 * // wrap to create custom callback shorthands
 * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
 *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
 *   if (!match) {
 *     return callback(func, thisArg);
 *   }
 *   return function(object) {
 *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
 *   };
 * });
 *
 * _.filter(users, 'age__gt38');
 * // => [{ 'user': 'fred', 'age': 40 }]
 */
function callback(func, thisArg, guard) {
  return baseCallback(func, guard ? undefined : thisArg);
}

module.exports = callback;
