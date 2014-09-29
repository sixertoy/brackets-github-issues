/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCallback = require('../internal/baseCallback'),
    baseEach = require('../internal/baseEach'),
    charAtCallback = require('../internal/charAtCallback'),
    isArray = require('../lang/isArray'),
    isIterateeCall = require('../internal/isIterateeCall'),
    isString = require('../lang/isString'),
    toIterable = require('../internal/toIterable');

/**
 * Retrieves the minimum value of `collection`. If the collection is empty
 * or falsey `Infinity` is returned. If an iteratee function is provided it
 * is invoked for each value in the collection to generate the criterion by
 * which the value is ranked. The `iteratee` is bound to `thisArg` and invoked
 * with three arguments; (value, index, collection).
 *
 * If a property name is provided for `iteratee` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `iteratee` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
 *  If a property name or object is provided it is used to create a "_.pluck"
 *  or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * _.min([4, 2, 8, 6]);
 * // => 2
 *
 * _.min([]);
 * // => Infinity
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 }
 * ];
 *
 * _.min(users, function(chr) { return chr.age; });
 * // => { 'user': 'barney', 'age': 36 };
 *
 * // using "_.pluck" callback shorthand
 * _.min(users, 'age');
 * // => { 'user': 'barney', 'age': 36 };
 */
function min(collection, iteratee, thisArg) {
  iteratee = isIterateeCall(collection, iteratee, thisArg) ? null : iteratee;

  var computed = Infinity,
      noIteratee = iteratee == null,
      isArr = noIteratee && isArray(collection),
      isStr = !isArr && isString(collection),
      result = computed;

  if (noIteratee && !isStr) {
    var index = -1,
        iterable = toIterable(collection),
        length = iterable.length;

    while (++index < length) {
      var value = iterable[index];
      if (value < result) {
        result = value;
      }
    }
  } else {
    iteratee = (noIteratee && isStr)
      ? charAtCallback
      : baseCallback(iteratee, thisArg, 3);

    baseEach(collection, function(value, index, collection) {
      var current = iteratee(value, index, collection);
      if (current < computed || (current === Infinity && current === result)) {
        computed = current;
        result = value;
      }
    });
  }
  return result;
}

module.exports = min;
