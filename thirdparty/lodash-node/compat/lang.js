/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

module.exports = {
  'clone': require('./lang/clone'),
  'cloneDeep': require('./lang/cloneDeep'),
  'isArguments': require('./lang/isArguments'),
  'isArray': require('./lang/isArray'),
  'isBoolean': require('./lang/isBoolean'),
  'isDate': require('./lang/isDate'),
  'isElement': require('./lang/isElement'),
  'isEmpty': require('./lang/isEmpty'),
  'isEqual': require('./lang/isEqual'),
  'isError': require('./lang/isError'),
  'isFinite': require('./lang/isFinite'),
  'isFunction': require('./lang/isFunction'),
  'isNaN': require('./lang/isNaN'),
  'isNative': require('./lang/isNative'),
  'isNull': require('./lang/isNull'),
  'isNumber': require('./lang/isNumber'),
  'isObject': require('./lang/isObject'),
  'isPlainObject': require('./lang/isPlainObject'),
  'isRegExp': require('./lang/isRegExp'),
  'isString': require('./lang/isString'),
  'isUndefined': require('./lang/isUndefined')
};
