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
/*global module, exports, require */
(function () {
    'use strict';

    // http://mikedeboer.github.io/node-github/

    var Q = require('q'),
        Fs = require('fs'),
        _ = require('lodash'),
        Path = require('path'),
        AbstractCommand = require('../../../lib/abstracts/AbstractCommand');

    var PREFIX = '[githubissue]';

    var _repositoryName = '',
        options = {
            async: true,
            name: 'issue',
            description: 'Returns issue from Github API'
        };

    var IssueCommand = AbstractCommand.extend({

        init: function () {
            this._super();
            _.extend(this._options, options);
        },

        _getRepositoryName: function(url){
            var str = url.split(Path.sep);
            return str[str.length - 1];
        },

        _getRepoIssues: function(){
            console.log(PREFIX + ' :: ' + this.options().name + ' _issue');

            var $this = this,
                deferred = Q.defer();

            this.getService().issues.repoIssues({
                user: 'malas34',
                repo: _repositoryName
            }, function(err, res) {
                if (err !== null){
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

            return deferred.promise;
        },

        _execute: function (repositoryUrl, errback) {
            console.log(PREFIX + ' :: ' + this.options().name + ' execute command');
            _repositoryName = this._getRepositoryName(repositoryUrl);
            console.log(_repositoryName);
            /*
            this._getRepoIssues()
                .then(function (values) {
                    errback(null, values);
                }, function (err) {
                    errback(err, null);
                });
                */
        }

    });

    module.exports = IssueCommand;

}());
