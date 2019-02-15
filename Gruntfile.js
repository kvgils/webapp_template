module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        watch: {
            browserify: {
                files: ['src/**/**/*.js'],
                tasks: ['browserify']
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        minified : {
            files: {
                src: [
                    '/src/**/*.css',
                    '/src/*.css'
                ],
                dest: '/dist/min/'
            },
            options : {
                sourcemap: true,
                allinone: false
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: [['babelify', {presets: ['es2015']}]]
                },
                src: ['src/**/js.js'],
                dest: 'dist/**/es2015.js',
            }
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-minified');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify', 'minified', 'browserify']);

};