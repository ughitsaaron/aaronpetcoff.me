module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    watch:
      compass:
        files: ['**/*.scss','!**/_site/**','!**/node_modules/**']
        tasks: ['compass', 'autoprefixer', 'cssmin', 'jekyll']
      jekyll:
        files: ['**/*.html','**/_posts/*.**','!**/_site/**','!**/node_modules/**']
        tasks: ['build']
      js:
        files: ['**/*.js','!**/*.min.js','!**/_site/**','!**/node_modules/**']
        tasks: ['build']
      options:
        livereload: true
        
    compass:
      build:
        options:
          config: 'config.rb'
          trace: true

    jekyll:
      build:
        config: '_config.yml'

    autoprefixer:
      build:
        options:
          browsers: ['last 2 versions']
        files: 'assets/*.css'

    uglify:
      options:
        report: 'gzip'
        mangle: true
        compress: true
        preserveComments: false
      files:
        expand: true
        cwd: 'assets/js/'
        src: ['*.js', '!*.min.js']
        dest: 'assets/js/'
        ext: '.min.js'

    cssmin:
      minify:
        expand: true
        cwd: 'assets/css/'
        src: ['*.css', '!*.min.css']
        dest: 'assets/css/'
        ext: '.css'           

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-jekyll'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-autoprefixer'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.registerTask 'default', ['build']
  grunt.registerTask 'build', ['compass', 'autoprefixer', 'uglify', 'cssmin', 'jekyll']