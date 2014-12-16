module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    coffee:
      src:
        options:
          bare: true
        files:
          'lib/simditor-autosave.js': 'src/simditor-autosave.coffee'
    watch:
      src:
        files: ['src/*.coffee','demo.html']
        tasks: ['coffee:src', 'umd']

    umd:
      all:
        src: 'lib/simditor-autosave.js'
        template: 'umd'
        amdModuleId: 'simditor-autosave'
        objectToExport: 'SimditorAutosave'
        globalAlias: 'SimditorAutosave'
        deps:
          'default': ['$', 'SimpleModule','Simditor']
          amd: ['jquery', 'simple-module', 'simditor']
          cjs: ['jquery', 'simple-module', 'simditor']
          global:
            items: ['jQuery', 'SimpleModule','Simditor']
            prefix: ''

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-umd'

  grunt.registerTask 'default', ['coffee', 'umd', 'watch']