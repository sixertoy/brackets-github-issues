/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isArray = require('../lang/isArray');

/**
 * Creates an object composed from arrays of property names and values. Provide
 * either a single two dimensional array, e.g. `[[key1, value1], [key2, value2]]`
 * or two arrays, one of property names and one of corresponding values.
 *
 * @static
 * @memberOf _
 * @alias object
 * @category Array
 * @param {Array} props The property names.
 * @param {Array} [vals=[]] The property values.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.zipObject(['fred', 'barney'], [30, 40]);
 * // => { 'fred': 30, 'barney': 40 }
 */
function zipObject(props, vals) {
  var index = -1,
      length = props ? props.length : 0,
      result = {};

  if (!vals && length && !isArray(props[0])) {
    vals = [];
  }
  while (++index < length) {
    var key = props[index];
    if (vals) {
      result[key] = vals[index];
    } else if (key) {
      result[key[0]] = key[1];
    }
  }
  return result;
}

module.exports = zipObject;
