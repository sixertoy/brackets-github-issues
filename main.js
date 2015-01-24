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
/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets, window, $, Mustache, JSON */
define(function (require, exports, module) {
    'use strict';
    /* --------------------------

 Modules

*/
    var _ = brackets.getModule('thirdparty/lodash'),
        Menus = brackets.getModule('command/Menus'),
        AppInit = brackets.getModule('utils/AppInit'),
        Resizer = brackets.getModule('utils/Resizer'),
        Commands = brackets.getModule('command/Commands'),
        NodeDomain = brackets.getModule('utils/NodeDomain'),
        EditorManager = brackets.getModule('editor/EditorManager'),
        ExtensionUtils = brackets.getModule('utils/ExtensionUtils'),
        ProjectManager = brackets.getModule('project/ProjectManager'),
        CommandManager = brackets.getModule('command/CommandManager'),
        ExtensionLoader = brackets.getModule('utils/ExtensionLoader'),
        WorkspaceManager = brackets.getModule('view/WorkspaceManager'),
        PreferencesManager = brackets.getModule('preferences/PreferencesManager');

    /** ------------------------------------

Globals

*/
    var NODE_PATH = './app/node/githubissues/',
        PREFIX = 'malas34',
        EXTENSION_ID = 'brackets-githubissues',
        SHOWPANEL_COMMAND_ID = PREFIX + '.' + EXTENSION_ID + '.showpanel';


    /* --------------------------

 UI Ressources

*/
    var _command = null,
        $appPanel = null,
        $appButton = null,
        $issuesList = null;

    var Strings = require('./strings');

    var RowHTML = require('text!app/htmlContent/row.html'),
        PanelHTML = require('text!app/htmlContent/panel.html'),
        ButtonHTML = require('text!app/htmlContent/button.html');
    ExtensionUtils.loadStyleSheet(module, 'app/htmlContent/css/styles.css');

    /* --------------------------

 Variables

*/
    /*
    var _modulePath = ExtensionUtils.getModulePath(module, NODE_PATH + 'GithubIssuesController'),
        _extensionPrefs = PreferencesManager.getExtensionPrefs(PREFIX + '.' + EXTENSION_ID),
        _controller = new NodeDomain('githubissues', _modulePath),
        _repositoryUrl = false,
        _module = module;
        */

    /**
     *
     * Masque/Affiche le panneau
     * MAJ de la class de l'icone du panneau
     *
     */
    function _handlerPanelVisibility() {
        $appButton.toggleClass('active');
        Resizer.toggle($appPanel);
        _command.setChecked($appButton.hasClass('active'));
        if (!$appButton.hasClass('active')) {
            EditorManager.focusEditor();
        }
    }

    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    /*
    function _refreshPanel(data) {
        var i, j,
            $row,
            string,
            prefix = '',
            issues = data;
        // @TODO remove row events click on _clearPanel
        $issuesList = $('#' + EXTENSION_ID + '-panel .table-container .box .list');
        if (_.isArray(issues) && (issues.length > 0)) {
            $appButton.show();
            _command.setEnabled(true);
            for (i = 0; i < issues.length; i++) {

                string = {};
                string.id = issues[i].id;
                string.body = false;
                // string.body = issues[i].body;
                string.state = issues[i].state;
                string.title = issues[i].title;
                string.number = issues[i].number;
                string.labels = issues[i].labels;
                string.comments = issues[i].comments;
                string.html_url = issues[i].html_url;
                string.milestone = issues[i].milestone;
                var d = new Date(issues[i].created_at);
                string.created_at = d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
                string.comments_url = issues[i].comments_url;
                string.classes = '';
                string.classes += prefix + string.state;
                string = _.extend(string, {even: (i % 2) ? 'odd' : ''});
                $row = $(Mustache.render(RowHTML, string));
                // $row.find('.issue-more a').first().on('click', $row.toggleClass('show'));
                $issuesList.append($row);
            }
            var width = (($issuesList.find('.issue').first().width() + 20) * issues.length);
            $issuesList.css('width', (width + 20) + 'px');
        } else {
            // @TODO Si aucune entree pour le repository
        }
    }
    */

    /**
     *
     * Recupere les issues
     * depuis le repository actuel
     *
     */
    /*
    function _getRepositoryIssues() {
        // console.log('[' + EXTENSION_ID + '] :: _getRepositoryIssues');
        if (_repositoryUrl) {
            var _user = '';
            _controller.exec('issue', _repositoryUrl)
                .done(function (issues) {
                    // console.log('[' + EXTENSION_ID + '] :: _getRepositoryIssues ' + Strings.SUCCESS);
                    _refreshPanel(issues);
                })
                .fail(function (err) {
                    // console.log('[' + EXTENSION_ID + '] :: _getRepositoryIssues ' + Strings.FAIL);
                    console.error(err);
                });
        }
    }
    */

    /**
     *
     * Si un package JSON est charge
     * on parse l'url du repo git
     * si le repo est un objet
     * on verifie qu'il s'agit d'un repo git
     *
     */
    /*
    function _getRepositoryURL(data) {
        var result = false;
        // Si le champs repository est une string
        if (_.isString(data.repository) && !_.isEmpty(data.repository)) {
            result = data.repository;
        } else if (_.isPlainObject(data.repository)) {
            data = data.repository;
            // Si le champs url existe
            // et que le champs type est egal a 'git'
            if (data.hasOwnProperty('url') && data.hasOwnProperty('type') && data.type === 'git') {
                if (_.isString(data.url) && !_.isEmpty(data.url)) {
                    result = data.url;
                }
            }
        }
        return result;
    }
    */

    /**
     * A l'ouverture d'un projet
     * on supprime les issues dans le paneau existant
     * on recupere le package.json
     * on recupere les infos du repository
     * "repository": "http[s]://github/repo/url"
     * "repository":{ "type":"git", "url":"http[s]://github/repo/url"}
     */
    function _onProjectOpen() {
        console.log('[' + EXTENSION_ID + '] :: _onProjectOpen');
        /*
        var uri = ProjectManager.getInitialProjectPath();
        // Chargement du JSON du projet
        ExtensionUtils.loadPackageJson(uri)
            .done(function (data) {
                // Si le package.json contient un champs repository
                if (data.hasOwnProperty('repository')) {
                    _repositoryUrl = _getRepositoryURL(data);
                    _getRepositoryIssues();
                } else {
                    var n = '';
                    if (data.hasOwnProperty('name')) {
                        n = data.name;
                    } else if (data.hasOwnProperty('title')) {
                        n = data.title;
                    }
                    console.log('[' + EXTENSION_ID + '] :: Project ' + n + ' has no repository definition. See https://github.com/malas34/brackets-github-issue for more details');
                }
            })
            .fail(function () {
                console.log('[' + EXTENSION_ID + '] :: Unable to load project\'s package.json');
            });
        */
    }

    /**
     *
     * A la fermeture d'un projet
     * on ferme le panneau
     * on desactive le bouton
     * on cache le bouton
     * on supprime les issues dans la liste
     * on reinitialize les variables
     *
     */
    function _onProjectClose() {
        console.log('[' + EXTENSION_ID + '] :: _onProjectClose');
        /*
        if ($appButton.hasClass('active')) {
            Resizer.toggle($appPanel);
            _command.setChecked(false);
            _command.setEnabled(false);
            $appButton.removeClass('active');
        }
        if (!_.isNull($issuesList) && $issuesList.length) {
            $issuesList.html('');
        }
        $appButton.hide();
        $issuesList = null;
        _repositoryUrl = false;
        */
    }


    function _removeAppListeners() {
        $(ProjectManager).off('projectOpen', _onProjectOpen);
        $(ProjectManager).off('projectClose', _onProjectClose);
        $(ProjectManager).off('beforeAppClose', _removeAppListeners);
    }

    function _addAppListeners() {
        $(ProjectManager).on('beforeAppClose', _removeAppListeners);
        $(ProjectManager).on('projectClose', _onProjectClose);
        $(ProjectManager).on('projectOpen', _onProjectOpen);
    }

    /**
     *
     */
    /*
    function _authenticate() {
        console.log('[' + EXTENSION_ID + '] :: _authenticate');
        var _login = {
            username: '',
            password: ''
        };
        _controller.exec('authenticate', _login)
            .done(function (bool) {
                console.log('[' + EXTENSION_ID + '] :: _authenticate ' + Strings.SUCCESS);
                _initListeners();
            })
            .fail(function (err) {
                console.log('[' + EXTENSION_ID + '] :: _authenticate ' + Strings.FAIL);
                console.error(err);
            });
    }
    */

    /*
     *
     * Application template is rendered
     * First App Event Call
     * Before App Ready
     *
     */
    /*
    AppInit.htmlReady(function () {
        // console.log('[' + EXTENSION_ID + '] :: htmlReady');
        //
        var minHeight = 290;
        _.extend(Strings, {ID_PREFIX: EXTENSION_ID});
        WorkspaceManager.createBottomPanel(EXTENSION_ID + '.panel', $(Mustache.render(PanelHTML, Strings)), minHeight);
        $appPanel = $('#' + EXTENSION_ID + '-panel');
        $('#' + EXTENSION_ID + '-panel .toolbar .actions .close').on('click', _handlerPanelVisibility);
        //
        $('#main-toolbar .buttons').append(Mustache.render(ButtonHTML, Strings));
        $appButton = $('#' + EXTENSION_ID + '-button').on('click', _handlerPanelVisibility).hide();
    });
    */

    /** ------------------------------------

    Commands and Menus

*/
    function __registerCommands() {
        _command = CommandManager.register(Strings.SHOW_PANEL, SHOWPANEL_COMMAND_ID, _handlerPanelVisibility);
        _command.setEnabled(false);
        _command.setChecked(false);
    }

    function __registerWindowsMenu() {
        var menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);
        menu.addMenuItem(SHOWPANEL_COMMAND_ID, null, Menus.AFTER, Commands.VIEW_TOGGLE_INSPECTION);
    }

    AppInit.appReady(function () {
        console.log('[' + EXTENSION_ID + '] :: appReady');
        __registerCommands();
        __registerWindowsMenu();
        //
        _addAppListeners();
        // _onProjectOpen();
    });

});
