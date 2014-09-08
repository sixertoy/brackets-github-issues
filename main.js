/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
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
        NodeDomain = brackets.getModule('utils/NodeDomain'),
        PanelManager = brackets.getModule('view/PanelManager'),
        EditorManager = brackets.getModule('editor/EditorManager'),
        ExtensionUtils = brackets.getModule('utils/ExtensionUtils'),
        ProjectManager = brackets.getModule('project/ProjectManager'),
        CommandManager = brackets.getModule('command/CommandManager'),
        ExtensionLoader = brackets.getModule('utils/ExtensionLoader'),
        PreferencesManager = brackets.getModule('preferences/PreferencesManager');
    /** ------------------------------------

Globals

*/
    var NODE_PATH = 'node/githubissue/',
        PREFIX = 'malas34',
        EXTENSION_ID = 'brackets-githubissue',
        WINDOWS_MENU_ID = PREFIX + '-brackets.windows.menus',
        SHOWPANEL_COMMAND_ID = PREFIX + '.' + EXTENSION_ID + '.showpanel';
    /* --------------------------

 UI Ressources

*/

    var $appPanel = null,
        $appButton = null;

    var Strings = require('strings');

    var RowHTML = require('text!htmlContent/row.html'),
        PanelHTML = require('text!htmlContent/panel.html'),
        ButtonHTML = require('text!htmlContent/button.html');
    ExtensionUtils.loadStyleSheet(module, 'styles/styles.css');
    /* --------------------------

 Variables

*/
    var _modulePath = ExtensionUtils.getModulePath(module, NODE_PATH + 'GithubIssueController'),
        _extensionPrefs = PreferencesManager.getExtensionPrefs(PREFIX + '.' + EXTENSION_ID),
        _controller = new NodeDomain('githubissue', _modulePath),
        _repositoryUrl = false,
        _module = module;

    // @TODO clear issues panel
    function _clearPanel(){
    }

    function _refreshPanel(issues){

    }

    /**
     * Recupere les issues
     * depuis le repository actuel
     */
    function _getRepositoryIssues(){
        console.log('[' + EXTENSION_ID + '] :: _getRepositoryIssues');
        var _user = 'malas34';
        _controller.exec('issue', _repositoryUrl)
            .done(function(issues){
                console.log('[' + EXTENSION_ID + '] :: _getRepositoryIssues ' + Strings.SUCCESS);
                _refreshPanel(issues);
            })
            .fail(function(err){
                console.log('[' + EXTENSION_ID + '] :: _getRepositoryIssues ' + Strings.FAIL);
                console.error(err);
            });
    }

    /**
     *
     */
    function _authenticate(){
        console.log('[' + EXTENSION_ID + '] :: _authenticate');
        var _login = {
            username: 'toto',
            password: 'toto'
        };
        _controller.exec('authenticate', _login)
            .done(function(bool){
                console.log('[' + EXTENSION_ID + '] :: _authenticate ' + Strings.SUCCESS);
            })
            .fail(function(err){
                console.log('[' + EXTENSION_ID + '] :: _authenticate ' + Strings.FAIL);
                console.error(err);
            });
    }

    /**
     * A l'ouverture d'un projet
     * on supprime les issues dans le paneau existant
     * on recupere le package.json
     * on recupere les infos du repository
     * "repository": "http[s]://github/repo/url"
     * "repository":{ "type":"git", "url":"http[s]://github/repo/url"}
     */
    function _onProjectOpen(){
        console.log('[' + EXTENSION_ID + '] :: _onProjectOpen');
        _clearPanel();
        var uri = ProjectManager.getInitialProjectPath();
        ExtensionUtils.loadPackageJson(uri)
            .done(function (data) {
                if (data.hasOwnProperty('repository')) {
                    if (_.isString(data.repository) && !_.isEmpty(data.repository)) {
                        _repositoryUrl = data.repository;
                    } else if (_.isPlainObject(data.repository)) {
                        data = data.repository;
                        if (data.hasOwnProperty('url') && data.hasOwnProperty('type') && data.type === 'git') {
                            if (_.isString(data.url) && !_.isEmpty(data.url)) {
                                _repositoryUrl = data.url;
                            }
                        }
                    }
                }
                if (_repositoryUrl) {
                    _getRepositoryIssues();
                    $appButton.show();
                } else {
                    var n = '';
                    if (data.hasOwnProperty('name')) {
                        n = data.name;
                    } else if (data.hasOwnProperty('title')) {
                        n = data.title;
                    }
                    console.log('[' + EXTENSION_ID + '] :: Project ' + n + ' has no repository definition. See https://github.com/malas34/brackets-github-issue/blob/master/README.md for more details');
                }
            })
            .fail(function(){
                    console.error('[' + EXTENSION_ID + '] :: Unable to load project\'s package.json');
            });
    }

    function _onBeforeAppClose(){
        $(ProjectManager).off('beforeAppClose');
        $(ProjectManager).off('projectOpen');
    }

    /**
     *
     * Masque/Affiche le panneau
     * MAJ de la class de l'icone du panneau
     *
     */
    function _handlerPanelVisibility() {
        $appButton.toggleClass('active');
        Resizer.toggle($appPanel);
        CommandManager.get(SHOWPANEL_COMMAND_ID).setChecked($appButton.hasClass('active'));
        if (!$appButton.hasClass('active')) {
            EditorManager.focusEditor();
        }
    }

    /*
     *
     * Application template is rendered
     * First App Event Call
     * Before App Ready
     *
     */
    AppInit.htmlReady(function () {
        console.log('[' + EXTENSION_ID + '] :: htmlReady');
        //
        var minHeight = 100;
        _.extend(Strings,{ID_PREFIX:EXTENSION_ID});
        PanelManager.createBottomPanel(EXTENSION_ID + '.panel', $(Mustache.render(PanelHTML, Strings)), minHeight);
        $appPanel = $('#' + EXTENSION_ID + '-panel').on('click', _handlerPanelVisibility);
        //
        $('#main-toolbar .buttons').append(Mustache.render(ButtonHTML, Strings));
        $appButton = $('#' + EXTENSION_ID + '-button').on('click', _handlerPanelVisibility).hide();
    });

    /** ------------------------------------

    Commands and Menus

*/
    function __registerCommands() {
        CommandManager.register(Strings.SHOW_PANEL, SHOWPANEL_COMMAND_ID, _handlerPanelVisibility);
    }

    function __registerWindowsMenu() {
        var menu = Menus.getMenu(WINDOWS_MENU_ID);
        if (menu === null || menu === undefined) {
            menu = Menus.addMenu(Strings.MENU_NAME, WINDOWS_MENU_ID, Menus.AFTER, Menus.AppMenuBar.NAVIGATE_MENU);
        }
        menu.addMenuItem(SHOWPANEL_COMMAND_ID);
    }

    AppInit.appReady(function(){
        console.log('[' + EXTENSION_ID + '] :: appReady');
        __registerCommands();
        __registerWindowsMenu();
        $(ProjectManager).on('beforeAppClose', _onBeforeAppClose );
        $(ProjectManager).on('projectOpen', _onProjectOpen);
        _onProjectOpen();
    });

});
