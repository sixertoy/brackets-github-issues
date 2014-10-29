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
/*global module, exports, require, process, __dirname*/
(function () {

    'use strict';

    var Fs = require('fs'),
        Path = require('path');

    // Q = require('../../thirdparty/q'), // https://coderwall.com/p/ijy61g
    var _ = require('../../thirdparty/lodash'),
        GitHubApi = require('node-gitlab');

    var PREFIX = '[githubissues]';

    var _service,
        _domainManager,
        _commandsMap = {},
        _defaultsOptions = {},
        _domain = "githubissues";

    var GitlabController = function () {
        _service = new GitHubApi({
            debug: false,
            version: "3.0.0",
            protocol: "https"
        });
        this.options = {};
        _.extend(this.options, _defaultsOptions);
    };

    _.extend(GithubIssuesController.prototype, {

        _isCommandFile: function (file) {
            if (file.indexOf('Command') !== -1) {
                if (file.indexOf('.js') !== -1) {
                    return true;
                }
            }
            return false;
        },


        getService: function () {
            return _service;
        },

        /**
         *
         * Recupere tous les fichiers de commandes dans le dossier 'commands./'
         * Enregistre la commande
         * Stocke la commande dans un objet
         *
         */
        _registerCommands: function () {
            // console.log(PREFIX + ' :: [GithubIssuesController] _registerCommands');
            var $this = this,
                name,
                Command;
            Fs.readdirSync(__dirname + '/commands')
                .filter(function (file) {
                    return $this._isCommandFile(file);
                })
                .forEach(function (file) {
                    name = (file.split('.')[0].toLocaleLowerCase());
                    Command = require('./commands/' + name);
                    var instance = new Command();
                    instance.register(_domain, _domainManager, $this);
                    _commandsMap[name] = instance;
                });
        },

        // @TODO create delegate func
        init: function (domainManager) {
            // console.log(PREFIX + ' :: [GithubIssuesController] init');
            _domainManager = domainManager;
            if (!_domainManager.hasDomain(_domain)) {
                _domainManager.registerDomain(_domain, {major: 0, minor: 1});
            }
            this._registerCommands();
        }

    });

    module.exports = new GithubIssuesController();

}());
