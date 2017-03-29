module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        appName: "DXHQuestServer",
        appPort: 1738,
        pm2_gui_port: 360923,
        webContextPath: "DXHQuestServer",

        replace: {

            appName: {
                src: ['deploy/**/*.*', 'Gruntfile-deploy.js'],
                overwrite: true,
                replacements: [{
                    from: 'DXHQuestServer',
                    to: '<%= appName %>'
                }]
            },
            webContextPath: {
                src: ['config/**/*.*'],
                overwrite: true,
                replacements: [{
                    from: 'DXHQuestServer',
                    to: '<%= webContextPath %>'
                }]
            },
            port: {
                src: ['deploy/process/**/*.*'],
                overwrite: true,
                replacements: [{
                    from: '1738',
                    to: '<%= appPort %>'
                }, {
                    from: '360923',
                    to: '<%= pm2_gui_port %>'
                }]
            }

        }

    });

    grunt.registerTask('default', ['replace:appName', 'replace:webContextPath', 'replace:port']);

};