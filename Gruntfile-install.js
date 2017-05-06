module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);


    const version = 'v1.0';
    const INSTALL_PATH = '/home/server/install';
    const INSTALL_SHELL_NAME = 'install.sh';
    const TEST = 'test';
    const PROD = 'prod';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        secret: grunt.file.readJSON('./deploy/secret/secret.json'),
        environments: {
            test: {
                options: {
                    host: '<%= secret.test.host %>',
                    username: '<%= secret.test.username %>',
                    password: '<%= secret.test.password %>',
                    port: '<%= secret.test.port %>',
                    debug: true,
                    local_path: './deploy/shell/' + TEST + '/' + INSTALL_SHELL_NAME,
                    deploy_path: INSTALL_PATH,
                    current_symlink: version

                }
            },
            install_prod0: {
                options: {
                    host: '<%= secret.prod.hosts[0] %>',
                    username: '<%= secret.prod.username %>',
                    password: '<%= secret.prod.password %>',
                    port: '<%= secret.prod.port %>',
                    debug: true,
                    local_path: './deploy/shell/' + PROD + '/' + INSTALL_SHELL_NAME,
                    deploy_path: INSTALL_PATH,
                    current_symlink: version

                }
            },
            install_prod1: {
                options: {
                    host: '<%= secret.prod.hosts[1] %>',
                    username: '<%= secret.prod.username %>',
                    password: '<%= secret.prod.password %>',
                    port: '<%= secret.prod.port %>',
                    debug: true,
                    local_path: './deploy/shell/' + PROD + '/' + INSTALL_SHELL_NAME,
                    deploy_path: INSTALL_PATH,
                    current_symlink: version

                }
            }

        },
        async_ssh_exec: {
            install_test: {
                async: false,
                server: {
                    host: ["<%= secret.test.host %>"],
                    port: '<%= secret.test.port %>',
                    username: '<%= secret.test.username %>',
                    password: '<%= secret.test.password %>'
                },
                exeCommands: [
                    { exe: "mkdir -p " + INSTALL_PATH }
                ]
            },
            install_test_start: {
                async: false,
                server: {
                    host: ["<%= secret.test.host %>"],
                    port: '<%= secret.test.port %>',
                    username: '<%= secret.test.username %>',
                    password: '<%= secret.test.password %>'
                },
                exeCommands: [
                    { exe: "cd " + INSTALL_PATH + " && cd " + version + " && chmod 777 " + INSTALL_SHELL_NAME + " && bash -x " + INSTALL_SHELL_NAME }
                ]
            },
            install_prod: {
                async: false,
                server: {
                    host: "<%= secret.prod.hosts %>",
                    port: '<%= secret.prod.port %>',
                    username: '<%= secret.prod.username %>',
                    password: '<%= secret.prod.password %>'
                },
                exeCommands: [
                    { exe: "mkdir -p " + INSTALL_PATH }
                ]
            },
            install_prod_start: {
                async: false,
                server: {
                    host: "<%= secret.prod.hosts %>",
                    port: '<%= secret.prod.port %>',
                    username: '<%= secret.prod.username %>',
                    password: '<%= secret.prod.password %>'
                },
                exeCommands: [
                    { exe: "cd " + INSTALL_PATH + " && cd " + version + " && chmod 777 " + INSTALL_SHELL_NAME + " && bash -x " + INSTALL_SHELL_NAME }
                ]
            }
        }
    });

    grunt.registerTask('install_test', [
        'async_ssh_exec:install_test',
        'ssh_deploy:test',
        'async_ssh_exec:install_test_start'
    ]);
    grunt.registerTask('install_prod', [
        'async_ssh_exec:install_prod',
        'ssh_deploy:install_prod0',
        'ssh_deploy:install_prod1',
        'async_ssh_exec:install_prod_start'
    ]);

    grunt.registerTask('default', 'install_test');

};