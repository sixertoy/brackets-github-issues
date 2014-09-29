/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Creates a "_.pluck" style function which returns the `key` value of a
 * given object.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {string} key The name of the property to retrieve.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * var getName = _.property('user');
 *
 * _.map(users, getName);
 * // => ['barney', 'fred']
 *
 * _.sortBy(users, getName);
 * // => [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred',   'age': 40 }]
 */
function property(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = property;
