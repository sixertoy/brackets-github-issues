module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compress: {
            main: {
                options: {
                    archive: 'releases/malas34.brackets-github-issues_<%= pkg.version %>.zip'
                },
                files: [
                    {
                        src: '<%= pkg.files %>',
                        dest: 'malas34.brackets-github-issues/'
                    }
                ]
            }
        },
        qunit: {
            files: []
        },
        jshint: {
            file: []
        }
    });

    // grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('package', ['jshint', 'compress']);
    grunt.registerTask('default', ['jshint']);

};
