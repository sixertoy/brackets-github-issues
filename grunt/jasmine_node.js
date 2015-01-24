/*jslint indent: 4 */
/*global module */
module.exports = {
    options: {
        match: '.',
        forceExit: false,
        extensions: 'js',
        keepRunner: true,
        specNameMatcher: 'spec',
        includeStackTrace: false,
        jUnit: {
            report: true,
            savePath: './build/reports/jasmine/',
            useDotNotation: true,
            consolidate: true
        }
    },
    all: ['./tests/']
};
