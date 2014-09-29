/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to match latin-1 supplement letters (excluding mathematical operators) */
var reLatin1 = /[\xC0-\xD6\xD8-\xDE\xDF-\xF6\xF8-\xFF]/g;

/** Used to map latin-1 supplementary letters to basic latin letters */
var deburredLetters = {
  '\xC0': 'A',  '\xC1': 'A', '\xC2': 'A', '\xC3': 'A', '\xC4': 'A', '\xC5': 'A',
  '\xE0': 'a',  '\xE1': 'a', '\xE2': 'a', '\xE3': 'a', '\xE4': 'a', '\xE5': 'a',
  '\xC7': 'C',  '\xE7': 'c',
  '\xD0': 'D',  '\xF0': 'd',
  '\xC8': 'E',  '\xC9': 'E', '\xCA': 'E', '\xCB': 'E',
  '\xE8': 'e',  '\xE9': 'e', '\xEA': 'e', '\xEB': 'e',
  '\xCC': 'I',  '\xCD': 'I', '\xCE': 'I', '\xCF': 'I',
  '\xEC': 'i',  '\xED': 'i', '\xEE': 'i', '\xEF': 'i',
  '\xD1': 'N',  '\xF1': 'n',
  '\xD2': 'O',  '\xD3': 'O', '\xD4': 'O', '\xD5': 'O', '\xD6': 'O', '\xD8': 'O',
  '\xF2': 'o',  '\xF3': 'o', '\xF4': 'o', '\xF5': 'o', '\xF6': 'o', '\xF8': 'o',
  '\xD9': 'U',  '\xDA': 'U', '\xDB': 'U', '\xDC': 'U',
  '\xF9': 'u',  '\xFA': 'u', '\xFB': 'u', '\xFC': 'u',
  '\xDD': 'Y',  '\xFD': 'y', '\xFF': 'y',
  '\xC6': 'Ae', '\xE6': 'ae',
  '\xDE': 'Th', '\xFE': 'th',
  '\xDF': 'ss'
};

/**
 * Used by `deburr` to convert latin-1 to basic latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
function deburrLetter(letter) {
  return deburredLetters[letter];
}

/**
 * Deburrs `string` by converting latin-1 supplementary letters to basic latin letters.
 * See [Wikipedia](http://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the beburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = string == null ? '' : String(string);
  return string ? string.replace(reLatin1, deburrLetter) : string;
}

module.exports = deburr;
