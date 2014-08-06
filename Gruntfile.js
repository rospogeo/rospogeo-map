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
       * Minify the sources!
       */
      useminPrepare: {
          concat: { },
          cssmin: { },
          html: project.buildDir + '/app.html',
          options: {
              dest: project.distDir,
              staging: project.buildDir
          }
      },
      uglify: { options: { mangle: false } },
      usemin: { html: project.distDir + '/app.html' },
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
                  //usemin: project.buildDir+'/concat/js/app.js',
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
                  //module: 'app.templates'
                  bootstrap: function (module, script) {
                      return "angular.module('rospogeo.maptemplates', []).run(['$templateCache', function($templateCache) { " + script.replace('"assets', '"/assets') + " }]);";
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

};