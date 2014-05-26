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
          files: ['js/**/*.{js,json}', '!js/**/*.min.js', '!js/site.js'],
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
          expand:true,
          cwd: 'js/',
          src: ['main.js','app.ngmin.js'],
          dest: 'js/',
          ext: '.min.js'
        }
      },
      concat: {
        options: {
          separator: ';',
        },
        files: {
          src: ['js/app.min.js','js/main.min.js','js/fastclick.min.js'],
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
    grunt.registerTask('default', ['compass', 'autoprefixer', 'cssmin', 'uglify', 'concat', 'pngmin', 'jekyll']);
  };

}).call(this);