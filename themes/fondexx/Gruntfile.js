module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bake: {
            your_target: {
                options: {
                    // Task-specific options go here.
                },

                files: {
                    // files go here, like so:
                    "templates/page.tpl.php": "dev-templates/page.php",
                    "templates/page--front.tpl.php": "dev-templates/page--front.php",
                    "templates/page--type-page.tpl.php": "dev-templates/page--type-page.php",
                    "templates/page--type-webform.tpl.php": "dev-templates/page--type-webform.php"
                }
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            
             bake: {
                files: [
                    'dev-templates/**/*.php'
                ],
                tasks: ['bake']
            },

        },

    });

    // load npm modules
    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // register tasks
    grunt.registerTask('default', [/*'clean', 'svgmin_icons', 'svgstore', 'clean:sprite', 'less', 'postcss', */ 'bake', 'watch']);
  //  grunt.registerTask('jenkins', ['bake', 'clean', 'svgmin_icons', 'svgstore', 'clean:sprite',  /*'less', */ 'postcss', 'ftp_push:your_target']);
};
