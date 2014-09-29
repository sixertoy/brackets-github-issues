/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createCompounder = require('../internal/createCompounder');

/**
 * Converts `string` to camel case.
 * See [Wikipedia](http://en.wikipedia.org/wiki/CamelCase) for more details.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to camel case.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Hello world');
 * // => 'helloWorld'
 *
 * _.camelCase('--hello-world');
 * // => 'helloWorld'
 *
 * _.camelCase('__hello_world__');
 * // => 'helloWorld'
 */
var camelCase = createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return index ? (result + word.charAt(0).toUpperCase() + word.slice(1)) : word;
});

module.exports = camelCase;
