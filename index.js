/*global module, exports, require, console, _, btoa */
(function (_) {

    var Github = require('github'),
        github = new Github({version: '3.0.0'});

    github.authenticate({
        type: "basic",
        username: 'malas34',
        password: '#Hello$1976#'
    });

    github.issues.repoIssues({user: "malas34", repo: "brackets-code-links", state: "open", sort: "updated", direction: "asc" }, function(err, res){
        console.log(res);
    });



}(require('lodash')));
