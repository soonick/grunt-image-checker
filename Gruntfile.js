/*
 * grunt-image-check
 * https://github.com/soonick/grunt-image-check
 *
 * Copyright (c) 2014 Adrian Ancona Novelo
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  grunt.initConfig({
    eslint: {
      target: ['tasks/', 'Gruntfile.js']
    },

    image_check: {
      retina: {
        baseline: 'images/1x/',
        strict: true,
        compare: [
          {
            path: 'images/2x/',
            proportion: 2
          }
        ]
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-eslint');
};
