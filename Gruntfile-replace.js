module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        appName: "dxhnews",
        appPort: 3256,
        pm2_gui_port: 13256,
        webContextPath: "dxhnews",

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
                src: ['config/**/*.*', 'deploy/mock/**/*.*', 'pm2-start.json'],
                overwrite: true,
                replacements: [{
                    from: 'DXHQuestServer',
                    to: '<%= webContextPath %>'
                }]
            },
            port: {
                src: ['deploy/process/**/*.*', 'bin/www', 'pm2-start.json'],
                overwrite: true,
                replacements: [{
                    from: '1738',
                    to: '<%= appPort %>'
                }, {
                    from: '36092',
                    to: '<%= pm2_gui_port %>'
                }, {
                    from: '3000',
                    to: '<%= appPort %>'

                }]
            }

        }

    });

    grunt.registerTask('default', ['replace:appName', 'replace:webContextPath', 'replace:port']);

};