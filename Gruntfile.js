'use strict';

module.exports = function(grunt) {
    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    var proto = grunt.file.readJSON('bower.json');
    /**
     * Define projet properties
     */
    var project = {
        name: proto.name,
        version: proto.version,
        finalName: proto.name + '-' + proto.version,
        outDir: 'target',
        buildDir: 'target/build',
        distDir: 'target/dist',
        srcDir: 'src',
        mainDir: 'src/main',
        vendorDir: 'src/vendors',
        testDir: 'src/test'
    };
    /**
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     */
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-usemin');

  grunt.initConfig({
    pkg: project,

      /**
       * Install Bower packages.
       */
      bower: { install: true, cleanup: true, options: {targetDir: project.outDir+'/vendors'} },

      /**
       * The directory to delete when `grunt clean` is executed.
       */
      clean: [project.vendorDir, project.outDir],

      /**
       * Copy HTML files.
       */
      copy: {
          build: { expand: true, cwd: project.mainDir, src: ['**/*.js', '**/*.css', '**/*.html'], dest: project.buildDir, filter: 'isFile' },
          dist: { expand: true, cwd: project.mainDir, src: ['**/*', '!**/*.tpl.html', '!**/*.js'], dest: project.distDir, filter: 'isFile' },
          //vendors: { expand: true, cwd: project.vendorDir, src: ['**/*'], dest: project.outDir+'/vendors', filter: 'isFile' }
      },

      /**
       * Minify the sources!
       */
      useminPrepare: {
          concat: { },
          cssmin: { },
          html: project.buildDir + '/idx-*.html',
          options: {
              dest: project.distDir,
              staging: project.buildDir
          }
      },
      uglify: { options: { mangle: false } },
      usemin: { html: project.distDir + '/idx-*.html' },
      ngmin: {
          dist: {
              files: [
                  { expand: true, cwd: project.buildDir + '/concat/', src: ['**/*.js'], dest: project.buildDir + '/concat/' }
              ]
          }
      },

      /**
       * Speed up your AngularJS app by automatically minifying, combining, and automatically caching your HTML templates with $templateCache.
       */
      ngtemplates: {
          app: {
              src: [project.mainDir + '/**/*.tpl.html'],
              dest: project.buildDir + '/template.js',
              options: {
                  htmlmin: {
                      collapseBooleanAttributes: true,
                      collapseWhitespace: true,
                      removeAttributeQuotes: true,
                      removeComments: true, // Only if you don't use comment directives!
                      //removeEmptyAttributes:          true,
                      //removeRedundantAttributes:      true,
                      removeScriptTypeAttributes: true,
                      removeStyleLinkTypeAttributes: true
                  },
                  url: function (url) {
                      return url.replace(project.mainDir + '/', '').replace(project.srcDir, '');
                  },
                  bootstrap: function (module, script) {
                      //return "angular.module('rospogeo.map', []).run(['$templateCache', function($templateCache) { " + script + " }]);";
                      var templ_ = '(function(ng, app) { "use strict";';
                      templ_ += "app.run(['$templateCache', function($templateCache) { " + script + " }]);";
                      templ_ += "})(angular, geoMap);";
                      return templ_;
                  }
              }
          }
      },

      /**
       * Compress artifacts to ZIP file.
       */
      compress: {
          main: {
              options: {
                  mode: 'zip',
                  archive: project.outDir + '/' + project.finalName + '.zip'
              },
              files: [
                  {expand: true, cwd: project.distDir + '/', src: ['**/*']}
              ]
          }
      }
  });

    /**
     * In order to make it safe to just compile or copy *only* what was changed,
     * we need to ensure we are starting from a clean, fresh build. So we rename
     * the `watch` task to `delta` (that's why the configuration var above is
     * `delta`) and then add a new task called `watch` that does a clean build
     * before watching for changes.
     */

    grunt.registerTask('init', [
        'clean',
        'resolve'
    ]);

    grunt.registerTask('build-dev', [
        'copy',
        'ngtemplates'
    ]);

    grunt.registerTask('build-all', [
        'copy',
        'ngtemplates',
        'optimize'
    ]);

    grunt.registerTask('resolve', [
        'bower'
    ]);


    grunt.registerTask('release', [
        'init',
        'build-all',
        'compress'
    ]);

    grunt.registerTask('test', [
        'build-all',
        'karma'
    ]);

    // simple build task
    grunt.registerTask('optimize', [
        'useminPrepare',
        'concat',
        //'ngmin',
        'uglify',
        //'cssmin',
        //'filerev',
        'usemin'
    ]);

    /**
     * The default task is to build.
     */
    grunt.registerTask('default', [
        'init',
        'build-all'
    ]);

};