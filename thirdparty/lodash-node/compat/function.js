/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

module.exports = {
  'after': require('./function/after'),
  'backflow': require('./function/flowRight'),
  'before': require('./function/before'),
  'bind': require('./function/bind'),
  'bindAll': require('./function/bindAll'),
  'bindKey': require('./function/bindKey'),
  'compose': require('./function/flowRight'),
  'curry': require('./function/curry'),
  'curryRight': require('./function/curryRight'),
  'debounce': require('./function/debounce'),
  'defer': require('./function/defer'),
  'delay': require('./function/delay'),
  'flow': require('./function/flow'),
  'flowRight': require('./function/flowRight'),
  'memoize': require('./function/memoize'),
  'negate': require('./function/negate'),
  'once': require('./function/once'),
  'partial': require('./function/partial'),
  'partialRight': require('./function/partialRight'),
  'throttle': require('./function/throttle'),
  'wrap': require('./function/wrap')
};
