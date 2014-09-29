/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseSetData = require('./baseSetData'),
    getData = require('./getData'),
    identity = require('../utility/identity'),
    isNative = require('../lang/isNative'),
    matches = require('../utility/matches'),
    property = require('../utility/property'),
    support = require('../support');

/** Used to compose bitmasks for wrapper metadata */
var BIND_FLAG = 1;

/** Used to detect named functions */
var reFuncName = /^\s*function[ \n\r\t]+\w/;

/** Used to detect functions containing a `this` reference */
var reThis = /\bthis\b/;

/** Used to resolve the decompiled source of functions */
var fnToString = Function.prototype.toString;

/**
 * The base implementation of `_.callback` without support for creating
 * "_.pluck" and "_.where" style callbacks.
 *
 * @private
 * @param {*} [func=identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of the created callback.
 * @param {number} [argCount] The number of arguments the callback accepts.
 * @returns {Function} Returns the new function.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;

  if (type == 'function') {
    if (typeof thisArg == 'undefined') {
      return func;
    }
    var data = getData(func);
    if (typeof data == 'undefined') {
      if (support.funcNames) {
        data = !func.name;
      }
      data = data || !support.funcDecomp;
      if (!data) {
        var source = fnToString.call(func);
        if (!support.funcNames) {
          data = !reFuncName.test(source);
        }
        if (!data) {
          // checks if `func` references the `this` keyword and stores the result
          data = reThis.test(source) || isNative(func);
          baseSetData(func, data);
        }
      }
    }
    // exit early if there are no `this` references or `func` is bound
    if (data === false || (data !== true && data[1] & BIND_FLAG)) {
      return func;
    }
    switch (argCount) {
      case 1: return function(value) {
        return func.call(thisArg, value);
      };
      case 3: return function(value, index, collection) {
        return func.call(thisArg, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(thisArg, accumulator, value, index, collection);
      };
      case 5: return function(value, other, key, object, source) {
        return func.call(thisArg, value, other, key, object, source);
      };
    }
    return function() {
      return func.apply(thisArg, arguments);
    };
  }
  if (func == null) {
    return identity;
  }
  // handle "_.pluck" and "_.where" style callback shorthands
  return type == 'object' ? matches(func) : property(func);
}

module.exports = baseCallback;
