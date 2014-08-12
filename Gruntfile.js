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
      target: ['tasks/', 'Gruntfile.js', 'tests/']
    },

    // Unit tests
    mochaTest: {
      test: {
        src: ['tests/unit/**/*.js']
      }
    },

    // Integration tests
    imageCheck: {
      allFilesHaveCorrectSize: {
        baseline: 'tests/integration/data/success/baseline',
        compare: [
          {
            path: 'tests/integration/data/success/compare',
            proportion: 2
          }
        ]
      },

      baselineFileMissing: {
        baseline: 'tests/integration/data/baselineFileMissing/baseline',
        compare: [
          {
            path: 'tests/integration/data/baselineFileMissing/compare',
            proportion: 2
          }
        ],
        negateOutput: true
      },

      compareFileMissing: {
        baseline: 'tests/integration/data/compareFileMissing/baseline',
        compare: [
          {
            path: 'tests/integration/data/compareFileMissing/compare',
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
      },

      filesInFolders: {
        baseline: 'tests/integration/data/filesInFolders/baseline',
        compare: [
          {
            path: 'tests/integration/data/filesInFolders/compare',
            proportion: 2
          }
        ],
        negateOutput: true
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['eslint', 'mochaTest', 'imageCheck']);
};
