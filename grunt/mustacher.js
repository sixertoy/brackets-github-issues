/*jslint indent: 4 */
/*global module */
module.exports = {
    options: {
        partials: {
            src: 'examples/templates/'
        }
    },
    compile: {
        files: [{
            src: 'examples/templates/index.tpl',
            dest: 'examples/html/index.html'
        }]
    }
};
