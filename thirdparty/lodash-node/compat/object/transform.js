/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayEach = require('../internal/arrayEach'),
    baseCallback = require('../internal/baseCallback'),
    baseCreate = require('../internal/baseCreate'),
    baseForOwn = require('../internal/baseForOwn'),
    isArrayLike = require('../internal/isArrayLike'),
    isObject = require('../lang/isObject');

/**
 * An alternative to `_.reduce`; this method transforms `object` to a new
 * `accumulator` object which is the result of running each of its own
 * enumerable properties through `iteratee`, with each invocation potentially
 * mutating the `accumulator` object. The `iteratee` is bound to `thisArg`
 * and invoked with four arguments; (accumulator, value, key, object). Iterator
 * functions may exit iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Array|Object} object The object to iterate over.
 * @param {Function} [iteratee=identity] The function invoked per iteration.
 * @param {*} [accumulator] The custom accumulator value.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * var squares = _.transform([1, 2, 3, 4, 5, 6], function(result, n) {
 *   n *= n;
 *   if (n % 2) {
 *     return result.push(n) < 3;
 *   }
 * });
 * // => [1, 9, 25]
 *
 * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, n, key) {
 *   result[key] = n * 3;
 * });
 * // => { 'a': 3, 'b': 6, 'c': 9 }
 */
function transform(object, iteratee, accumulator, thisArg) {
  iteratee = baseCallback(iteratee, thisArg, 4);

  var isArr = isArrayLike(object);
  if (accumulator == null) {
    if (isArr) {
      accumulator = [];
    } else if (isObject(object)) {
      var Ctor = object.constructor;
      accumulator = baseCreate(typeof Ctor == 'function' && Ctor.prototype);
    } else {
      accumulator = {};
    }
  }
  (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
    return iteratee(accumulator, value, index, object);
  });
  return accumulator;
}

module.exports = transform;
