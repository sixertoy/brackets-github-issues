/*jslint indent: 4 */
/*global module */
module.exports = {
    all: {
        files: [{
            expand: true,
            src: './docs/src/*.md',
            dest: './docs/html/',
            flatten: true,
            ext: '.html'
        }],
        options: {
            template: './docs/src/template.tpl'
        }
    }
};
