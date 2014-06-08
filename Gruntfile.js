(function() {
  module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),
      watch: {
        jekyll: {
          files: ['**/*.html','{_layouts,_posts}/**','!_site/**'],
          tasks: ['jekyll']
        },
        sass: {
          files: '**/*.scss',
          tasks: ['sass','autoprefixer','cssmin','jekyll']
        },
        js: {
          files: ['js/**/*.{js,json}', '!js/**/*.min.js', '!js/site.js'],
          tasks: ['uglify','concat','jekyll']
        },
        img: {
          files: ['img/unopt/**/*.png', '!img/*.png'],
          tasks: 'pngmin'
        },
        sprites: {
          files: ['img/sprites/**/*.png'],
          tasks: 'sprite'
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
      sass: {
        options: {
          includePaths: ['bower_components/foundation/scss']
        },
        dist: {
          expand:true,
          cwd: 'scss',
          src: '**/*.scss',
          dest: 'css',
          ext: '.css'
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
            ext: '.png',
            force: true
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
      },
      sprite: {
        thumbs: {
          src: ['img/sprites/thumbs/*.png'],
          destImg: 'img/unopt/thumbs.png',
          cssFormat:'scss',
          destCSS: 'scss/_sprite-thumbs.scss'
        },
        callouts: {
          src: ['img/sprites/callouts/*.png'],
          destImg: 'img/unopt/callouts.png',
          cssFormat:'scss',
          destCSS: 'scss/_sprite-callouts.scss'
        }
      }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-pngmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'uglify', 'concat', 'pngmin', 'sprite', 'jekyll']);
  };

}).call(this);