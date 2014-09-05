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
 *  http://sequelizejs.com
 *
 * http://www.freshdesignweb.com/css-jquery-graph-bar-pie-chart.html
 * http://codepen.io/githiro/pen/ICfFE
 * http://codepen.io/ejsado/pen/cLrlm/
 * https://github.com/nnnick/Chart.js
 *
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, browser: true */
/*global define, module, exports, require, brackets, $, Mustache, Date, JSON*/
define(function (require, exports, module) {
    'use strict';
// Modules
    var _ = brackets.getModule('thirdparty/lodash'),
        Menus = brackets.getModule('command/Menus'),
        Resizer = brackets.getModule('utils/Resizer'),
        AppInit = brackets.getModule('utils/AppInit'),
        Commands = brackets.getModule('command/Commands'),
        PanelManager = brackets.getModule('view/PanelManager'),
        EditorManager = brackets.getModule('editor/EditorManager'),
        ExtensionUtils = brackets.getModule('utils/ExtensionUtils'),
        CommandManager = brackets.getModule('command/CommandManager'),
        ExtensionLoader = brackets.getModule('utils/ExtensionLoader'),
        ProjectManager = brackets.getModule('project/ProjectManager'),
        DocumentManager = brackets.getModule('document/DocumentManager'), // [http://brackets.io/docs/current/modules/document/DocumentManager.html]
        PreferencesManager = brackets.getModule('preferences/PreferencesManager');
// Node Modules
    var NodeDomain = brackets.getModule('utils/NodeDomain');

// Globals
    var PREFIX = 'malas34',
        EXTENSION_ID = 'brackets-github-issue',
        WINDOWS_MENU_ID = PREFIX + '-brackets.windows.menus',
        SHOWPANEL_COMMAND_ID = PREFIX + '.' + EXTENSION_ID + '.showpanel';
// Requires
    var in18 = require('strings'),
        template = require('text!htmlContent/MyExtensionDialog.html');
// Variables
    var _module = module;
        extensionPrefs = PreferencesManager.getExtensionPrefs(PREFIX + '.' + EXTENSION_ID);

    var $appPanel = null,
        $appButton = null;

/* --------------------------

 Functions

*/
    ExtensionUtils.loadStyleSheet(module, 'styles/styles.css');

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

    /**
     *
     * Application template is rendered
     * First App Event Call
     * Before App Ready
     *
     */
    AppInit.htmlReady(function () {
        var minHeight = 100;
        PanelManager.createBottomPanel(EXTENSION_ID + '.panel', $(Mustache.render(PanelHTML, in18)), minHeight);
        $appPanel = $('#brackets-clocktrack-panel').on('click', _handlerPanelVisibility);
        $('#main-toolbar .buttons').append(Mustache.render(ButtonHTML, in18));
        $appButton = $('#brackets-clocktrack-button').on('click', _handlerPanelVisibility).hide();
        $appButton.show();
    });


    function __registerCommands() {
        CommandManager.register(in18.SHOW_PANEL, SHOWPANEL_COMMAND_ID, _handlerPanelVisibility);
    }

    function __registerWindowsMenu() {
        var menu = Menus.getMenu(WINDOWS_MENU_ID);
        if (menu === null || menu === undefined) {
            menu = Menus.addMenu(in18.MENU_NAME, WINDOWS_MENU_ID, Menus.AFTER, Menus.AppMenuBar.NAVIGATE_MENU);
        }
        menu.addMenuItem(SHOWPANEL_COMMAND_ID);
    }

    // Initialize extension
    AppInit.appReady(function () {
        __registerCommands();
        __registerWindowsMenu();
        var $this = this;
        // Creation du folder
        // et parse la config du package.json
        sqliteDomain.exec('name', config)
            .done(function (err) {
                console.log(in18.SETUP_SUCESS);
            })
            .fail(function (err) {
                console.log(in18.SETUP_FAIL);
                console.log(err);
            });
    });

});
