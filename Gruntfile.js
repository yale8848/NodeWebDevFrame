module.exports = function(grunt) {

    var path = require('path');
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);



    // LiveReload的默认端口号，你也可以改成你想要的端口号
    var lrPort = 35728;
    // 使用connect-livereload模块，生成一个与LiveReload脚本
    // <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
    var lrSnippet = require('connect-livereload')({ port: lrPort });

    // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');

    // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
    var lrMiddleware = function(connect, options) {
        return [
            // 把脚本，注入到静态文件中
            lrSnippet,
            // 静态文件服务器的路径 原先写法：connect.static(options.base[0])
            serveStatic(options.base[0]),
            // 启用目录浏览(相当于IIS中的目录浏览) 原先写法：connect.directory(options.base[0])
            serveIndex(options.base[0])
        ];
    };



    const DIR = __dirname; // path.resolve(__dirname, "..");
    var config = {
        tmp: '.tmp',
        src: DIR + '/src',
        dist: DIR + '/public'
    };

    const mockTestPath = "./deploy/mock/test.json";
    const mockBuildPath = "./deploy/mock/build.json";


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.src %>/',
                    dest: '<%= config.dist %>/',
                    src: [
                        //  '**/*.html',
                        //  '!node_modules/**/*.html',
                        //   '!static/**/*.html',
                        'pages/**/*.html',
                        'img/{,*/}*.*',
                        '*.ico'
                    ]
                }]
            },
            static: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.src %>/static/',
                    dest: '<%= config.dist %>/',
                    src: [
                        '**/*.*'
                    ]
                }]
            },
            views: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.src %>/views/',
                    dest: './views/',
                    src: [
                        '**/*.*'
                    ]
                }]
            }

        },


        browserify: {
            dist: {
                options: {
                    transform: [
                        ['babelify', { presets: ['es2015'] }]
                    ],
                    force: true
                },
                files: {
                    // if the source file has an extension of es6 then
                    // we change the name of the source file accordingly.
                    // The result file's extension is always .js
                    "<%= config.dist %>/js/dxhnews.js": ["<%= config.src %>/js/*.js"]
                }
            }
        },
        concat: {
            base: {
                files: {
                    '<%= config.dist %>/js/test.js': ['<%= config.dist %>/js/*.js']
                }
            }
        },
        uglify: {
            target: {
                files: {
                    '<%= config.dist %>/js/dxhnews.js': ['<%= config.dist %>/js/dxhnews.js']
                }
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ["babel-preset-es2015"]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.src %>/js',
                    dest: '<%= config.dist %>/js',
                    src: [
                        '*.js'
                    ]
                }]
            }
        },

        less: {
            dist: {
                options: {
                    paths: ['<%= config.src %>/css'],
                    plugins: [
                        new(require('less-plugin-autoprefix'))({ browsers: ["> 1%", "last 5 versions"] })
                    ],
                },
                files: [{
                    expand: true,
                    dot: true,
                    ext: '.css',
                    cwd: '<%= config.src %>/less',
                    dest: '<%= config.dist %>/css',
                    src: [
                        '*.less'
                    ]
                }]
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= config.dist %>/js/{,*/}*.js',
                    '<%= config.dist %>/css/{,*/}*.css',
                    '<%= config.dist %>/img/{,*/}*.*',
                    '<%= config.dist %>/*.ico',
                ]
            }
        },

        useminPrepare: {
            html: [
                '<%= config.src %>/**/*.html',
            ],
            options: {
                dest: '<%= config.dist %>',
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/img',

                ],
                patterns: {
                    css: [
                        [/(img\/.*?\.png)/gm, 'Replacing reference to revved images'],
                    ],
                    js: [
                        [/(img\/.*?\.png)/gm, 'Update the JS to reference our revved images']
                    ],
                }

            },
            html: [
                '<%= config.dist %>/**/*.html',
            ],

            js: '<%= config.dist %>/js/*.js',
            css: ['<%= config.dist %>/css/*.css'],
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    // true would impact styles with attribute selectors
                    removeRedundantAttributes: false,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>/'
                }]
            }
        },

        cssmin: {
            dist: {
                files: [{
                    expand: true, // Enable dynamic expansion.
                    cwd: '<%= config.dist %>/', // Src matches are relative to this path.
                    src: 'css/*.css', // Actual pattern(s) to match.
                    dest: '<%= config.dist %>/', // Destination path prefix.
                }, ]
            }
        },


        watch: {
            css: {
                // We watch and compile less files as normal but don't live reload here
                files: ['<%= config.src %>/less/**/*.less'],
                tasks: ['less'],
            },
            // html: {
            //     files: ['<%= config.src %>/views/**/*.html'],
            //     tasks: ['copy:dist'],
            // },
            js: {
                files: ['<%= config.src %>/js/**/*.js'],

                tasks: ['browserify'],
            },
            mock: {
                files: [mockTestPath],
                tasks: ['nunjucksMutil:static']
            },
            dev: {
                files: [mockBuildPath],
                tasks: ['nunjucksMutil:dev']
            },
            nunjucks: {
                files: ['<%= config.src %>/views/**/*.html', '<%= config.src %>/pages/**/*.html'],
                tasks: ['nunjucksMutil:static']
            },
            views: {
                files: ['<%= config.src %>/views/**/*.html'],
                tasks: ['copy:views']
            },
            options: {
                livereload: lrPort
            },
            // '**' 表示包含所有的子目录
            // '*' 表示包含所有的文件
            files: ['<%=config.dist%>/**/*.html', '<%=config.dist%>/css/*', '<%=config.dist%>/js/*', '<%=config.dist%>/img/**/*']
        },
        jshint: {
            all: [
                '<%=config.src%>/js/*.js'
            ],
            options: {
                globals: {
                    $: false,
                    jQuery: false
                },
                esversion: 6,
                // browser: true, // browser environment
                // devel: true // 
            },

        },
        clean: {
            dist: {
                options: {
                    force: true
                },
                src: ['<%= config.dist %>/**/*', '<%= config.tmp %>/**/*']
            },
            views: {
                options: {
                    force: true
                },
                src: ['./views/**/*']
            }
        },
        // 通过connect任务，创建一个静态服务器
        connect: {
            options: {
                // 服务器端口号
                port: 8002,
                // 服务器地址(可以使用主机名localhost，也能使用IP)
                hostname: 'localhost',
                // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
                base: ['<%=config.dist%>'],
                open: true
            },
            livereload: {
                options: {
                    // 通过LiveReload脚本，让页面重新加载。
                    middleware: lrMiddleware
                }
            }
        },
        replace: {
            path: {
                src: ['<%= config.dist %>/pages/*.html'],
                overwrite: true,
                //dest: '<%= config.dist %>/pages/*.html',
                replacements: [{
                    pattern: '<img src="',
                    replacement: '<img src="\<\\%\= CCCC \%\>'
                }]
            }
        },
        nunjucksMutil: {
            static: {
                options: {
                    data: grunt.file.readJSON(mockTestPath)
                },
                render: {
                    files: [{
                        expand: true,
                        cwd: "./src/views/",
                        src: "**/*.html",
                        dest: "<%=config.dist%>/views/",
                        ext: ".html"
                    }, {
                        expand: true,
                        cwd: "./src/pages/",
                        src: "**/*.html",
                        dest: "<%=config.dist%>/pages/",
                        ext: ".html"
                    }]
                }
            },
            dev: {
                options: {
                    data: grunt.file.readJSON(mockBuildPath)
                },
                render: {
                    files: [{
                        expand: true,
                        cwd: "./src/pages/",
                        src: "**/*.html",
                        dest: "./public/pages/",
                        ext: ".html"
                    }]
                },
            }
        }

    });

    grunt.registerTask('static', [
        'clean:dist',
        'copy:dist',
        'copy:static',
        'less',
        'browserify',
        'nunjucksMutil:static',
        'connect',
        'watch'
    ]);
    grunt.registerTask('build', [

        'clean:dist',
        'clean:views',
        'copy:dist',
        'copy:static',
        'nunjucksMutil:dev',
        'copy:views',
        'less',
        'browserify',
        'useminPrepare',
        'uglify',
        'cssmin'
    ]);
    grunt.registerTask('dev', [
        'clean:dist',
        'clean:views',
        'copy:dist',
        'copy:static',
        'nunjucksMutil:dev',
        'copy:views',
        'less',
        'browserify',
        'watch'
    ]);


    grunt.registerTask('default', 'build');

};