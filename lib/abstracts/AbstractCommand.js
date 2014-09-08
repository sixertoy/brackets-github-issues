/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Matthieu Lassalvy <malas34.github@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/
/*global module, exports, require, $ */
(function () {
    'use strict';

    var _ = require('lodash'),
        Class = require('./Class');

    var COMMAND_RESULT = [],
        COMMAND_PARAMS = [],
        PREFIX = '[githubissue]';

    var defaultOptions = {
        // required
        async: true,
        name: 'abstract',
        description: 'Abstract NodeDomain command',
        // private
        domain: null,
        controller: null,
        domainManager: null
    };

    var AbstractCommand = Class.extend({

        init: function () {
            _.extend(this._options, defaultOptions);
        },

        getController: function(){
            return this.options('controller');
        },

        getService: function(){
            return this.getController().getService();
        },

        /**
         * Ajouter les args en tableau d'objects
         * Ajouter les args en object use _.extend(this._options, opts)
         */
        options: function (key, value) {
            if (arguments.length > 1 && _.isString(key)) {
                this._options[key] = value;
                return this;
            } else if (arguments.length === 1 && _.isString(key)) {
                if (this._options[key] !== undefined) {
                    return this._options[key];
                } else {
                    console.error(PREFIX + ' :: ' + this.options().name + ' unable to find ' + key + ' option');
                }
            }
            return this._options;
        },

        register: function (domain, domainManager, controller) {
            console.log(PREFIX + ' :: ' + this.options().name + ' command register');
            this.options('domain', domain);
            this.options('controller', controller);
            this.options('domainManager', domainManager);
            // Command Delegate
            var fn = function () {
                var args = _.toArray(arguments);
                return this._execute.apply(this, arguments);
            }.bind(this);
            domainManager.registerCommand(domain, this.options().name, fn, this.options().async, this.options().description, COMMAND_PARAMS, COMMAND_RESULT);
        }

    });

    module.exports = AbstractCommand;

}());
