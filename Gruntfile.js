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

    // Integration tests
    image_check: {
      allFilesHaveCorrectSize: {
        baseline: 'tests/integration/data/success/baseline',
        compare: [
          {
            path: 'tests/integration/data/success/compare',
            proportion: 2
          }
        ]
      },

      fileMissing: {
        baseline: 'tests/integration/data/notStrictFileMissing/baseline',
        compare: [
          {
            path: 'tests/integration/data/notStrictFileMissing/compare',
            proportion: 2
          }
        ],
        negateOutput: true
      },

      oneFileWithIncorrectSize: {
        baseline: 'tests/integration/data/wrongSize/baseline',
        compare: [
          {
            path: 'tests/integration/data/wrongSize/compare',
            proportion: 2
          }
        ],
        negateOutput: true
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-eslint');
};
