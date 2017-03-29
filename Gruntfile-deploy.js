module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);


    let zipFilter = ["node_modules", "\\.zip$", "\\.md$", "^\\.", "\\.bat$"]

    const APP = "DXHQuestServer"
    const TEST = "test";
    const PROD = "prod"
    let deployFile = APP + '.zip';
    let remtoePath = '/home/server/' + APP;
    let version = 'v1.0';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        secret: grunt.file.readJSON('./deploy/grunt/secret.json'),
        compress: {
            main: {
                options: {
                    archive: deployFile
                },
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['./**/*'],
                    dest: './',
                    filter: function(filepath) {

                        for (let i in zipFilter) {
                            let p = new RegExp(zipFilter[i], 'g');
                            if (p.test(filepath)) {
                                return null;
                            }
                        }
                        return filepath;
                    }
                }]
            }
        },
        clean: [deployFile],
        environments: {
            options: {
                local_path: './' + deployFile,
                deploy_path: remtoePath,
                current_symlink: version,
                releases_to_keep: '5'
            },
            test: {
                options: {
                    host: '<%= secret.test.host %>',
                    username: '<%= secret.test.username %>',
                    password: '<%= secret.test.password %>',
                    port: '<%= secret.test.port %>',
                    debug: true
                }
            },
            prod0: {
                options: {
                    host: '<%= secret.prod.hosts[0] %>',
                    username: '<%= secret.prod.username %>',
                    password: '<%= secret.prod.password %>',
                    port: '<%= secret.prod.port %>',
                    debug: true
                }
            },
            prod1: {
                options: {
                    host: '<%= secret.prod.hosts[1] %>',
                    username: '<%= secret.prod.username %>',
                    password: '<%= secret.prod.password %>',
                    port: '<%= secret.prod.port %>',
                    debug: true
                }
            }

        },
        async_ssh_exec: {
            test: {
                async: false,
                server: {
                    host: ["<%= secret.test.host %>"],
                    port: '<%= secret.test.port %>',
                    username: '<%= secret.test.username %>',
                    password: '<%= secret.test.password %>'
                },
                exeCommands: [{
                        exe: "cd " + remtoePath + "/" + version + " && unzip -o -q " + deployFile + " -d " + remtoePath,
                        silent: false,
                        interrupt: false
                    },
                    { exe: "cd " + remtoePath + "/deploy/shell/" + TEST + " && chmod 777 *", silent: false, interrupt: false },
                    { exe: "bash " + remtoePath + "/deploy/shell/" + TEST + "/start.sh", silent: false, interrupt: false }
                ]
            },
            prod: {
                async: false,
                server: {
                    host: "<%= secret.prod.hosts %>",
                    port: '<%= secret.prod.port %>',
                    username: '<%= secret.prod.username %>',
                    password: '<%= secret.prod.password %>'
                },
                exeCommands: [{
                        exe: "cd " + remtoePath + "/" + version + " && unzip -o -q " + deployFile + " -d " + remtoePath,
                        silent: false,
                        interrupt: false
                    },
                    { exe: "cd " + remtoePath + "/deploy/shell/" + PROD + " && chmod 777 *", silent: false, interrupt: false },
                    { exe: "bash " + remtoePath + "/deploy/shell/" + PROD + "/start.sh", silent: false, interrupt: false }
                ]
            },
        }
    });

    grunt.registerTask('test', [
        'compress:main',
        'ssh_deploy:test',
        'async_ssh_exec:test',
        'clean'
    ]);
    grunt.registerTask('prod', [
        'compress:main',
        'ssh_deploy:prod0',
        'ssh_deploy:prod1',
        'async_ssh_exec:prod',
        'clean'
    ]);
    grunt.registerTask('default', 'test');

};