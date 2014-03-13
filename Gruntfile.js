(function() {
  module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),
      watch: {
        jekyll: {
          files: ['**/*.html','{_layouts,_posts}/**','!_site/**'],
          tasks: ['jekyll']
        },
        compass: {
          files: '**/*.scss',
          tasks: ['compass','autoprefixer','cssmin','jekyll']
        },
        js: {
          files: ['js/**/*.js', '!js/**/*.min.js', '!js/site.js'],
          tasks: ['uglify','concat','jekyll']
        },
        img: {
          files: ['images/unopt/**/*.png', '!images/*.png'],
          tasks: 'pngmin'
        },
        options: {
          livereload: true
        }
      },
      jekyll: {
        build: {
          options: {
            config: '_config.yml',
            dest: '_site/'
          }
        }
      },
      compass: {
        build: {
          options: {
            config: 'config.rb',
            trace: true
          }
        }
      },
      autoprefixer: {
        options: {
          browsers: ['last 2 versions']
        },
        files: {
          src: 'css/main.css',
          dest: 'css/main.css'
        }
      },
      cssmin: {
        files: {
          src: 'css/main.css',
          dest: 'css/main.css'
        }
      },
      uglify: {
        files: {
          src: 'js/main.js',
          dest: 'js/main.min.js'
        }
      },
      concat: {
        options: {
          separator: ';',
        },
        files: {
          src: ['js/fastclick.min.js','js/nav.js','js/main.min.js'],
          dest: 'js/site.min.js',
        }
      },
      pngmin: {
        compile: {
          options: {
            ext: '.png'
          },
          files: [
            {
              expand: true,
              src: ['**/*.png'],
              cwd: 'img/unopt/',
              dest: 'img/'
            }
          ]
        }
      }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-pngmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.registerTask('default', ['jekyll','compass', 'autoprefixer', 'cssmin', 'uglify', 'concat', 'pngmin']);
  };

}).call(this);