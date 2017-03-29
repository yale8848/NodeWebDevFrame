module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        replace: {

            example: {
                src: ['deploy/**/*.*', 'config/**/*.*', 'Gruntfile-deploy.js'],
                overwrite: true,
                replacements: [{
                    from: 'DXHQuestServer',
                    to: 'xxxxxxxxx'
                }]
            }
        }

    });

    grunt.registerTask('default', 'replace');

};