module.exports = function(grunt) {

    grunt.registerTask('svgmin_icons', 'Optimiser for SVG Icons', function() {
        grunt.config.set('svgmin', grunt.config.get('svgmin_icons'));
        grunt.task.run('svgmin');
    });
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        clean: {
            //garbagecss: ['./*.css'], // clean the empty styles created while html_include
            sprite: {
                src: ['icons-svg/compressed']
            }
        },
        
        svgmin_icons: {
            options: {
                plugins: [
                    { removeDimensions: true },
                    { removeTitle: true },
                    { removeAttrs: { attrs: 'fill' } }
                ]
            },
            base: {
                expand: true,
                cwd: 'icons-svg',
                src: ['*.svg'],
                dest: 'icons-svg/compressed'
            }
        },

        svgstore: {
            icons: {
                options: {
                    prefix : 'icon-',
                },
                files: {
                    'images/svg-icons-sprite.svg': ['icons-svg/compressed/*.svg']
                },
            },
            logos: {
                files: {
                    'images/svg-images-sprite.svg': 'img-svg/*.svg'
                }
            }
        },

        
        less: {
            development: {
                options: {
                    paths: ['less'],
                    compress: false,
                    cleancss: true,
                    dumpLineNumbers: 'comments'
                },
                files: {
                    'css/style.css': 'less/style.less'
                }
            }
        },
        
         bake: {
            your_target: {
                options: {
                    // Task-specific options go here.
                },

                files: {
                    // files go here, like so:
                    "templates/page.tpl.php": "dev-templates/page.tpl.php"
                }
            },
        },

        ftp_push: {
            your_target: {
                options: {
		            authKey: "serverA",
    	            host: "fondexx.ftp.ukraine.com.ua",
    	            dest: "/",
    	            port: 21
                },
                files: [
                    {
                  expand: true,
                        //cwd: 'cfc',
                        src: [
                        "js/**",
                        "css/**",
                        "fonts/**",
                        "images/**",
                        "templates/**",
                        "template.php",
                        "fondexx.info"
                        ],
                        dest: '/fondexx.com/www/sites/all/themes/fondexx'
                    }
                ]
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            
            svgstore: {
                files: [
                    'icons-svg/*.svg',
                    'img-svg/*.svg'
                ],
                tasks: ['svgmin_icons', 'svgstore', 'clean:sprite']
            },
            
             bake: {
                files: [
                    'dev-templates/**/*.php'
                ],
                tasks: ['bake']
            },
            
            less: {
                files: [
                    'less/**/*.less'
                ],
                tasks: ['less', 'postcss']
            },

            ftppush: {
                files: [
                    "js/**",
                    "css/**",
                    "fonts/**",
                    "images/**",
                    "templates/**",
                    "template.php",
                    "fondexx.info"
                ],
                tasks: ['ftp_push']
            },
        },
        
        postcss: {
            options: {
              processors: [
                require('autoprefixer')({browsers: ['last 2 versions', 'ie 10']}),
              ]
            },
            dist: {
              src: 'css/style.css'
            }
        }, 

    });

    // load npm modules
    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-ftp-push');

    // register tasks
    grunt.registerTask('default', ['bake', 'clean', 'svgmin_icons', 'svgstore', 'clean:sprite', 'less', 'postcss', 'ftp_push', 'watch']);
    grunt.registerTask('jenkins', ['bake', 'clean', 'svgmin_icons', 'svgstore', 'clean:sprite',  'less', 'postcss', 'ftp_push']);
};
