/*
 * grunt-image-check
 * https://github.com/soonick/grunt-image-check
 *
 * Copyright (c) 2014 Adrian Ancona Novelo
 * Licensed under the MIT license.
 */

var checker = require('./checker');

module.exports = function(grunt) {
  grunt.registerMultiTask(
    'image_check',
    'Verifies that your images are resized correctly for different resolutions',
    function() {
      if (this.data.negateOutput) {
        return !checker.check(this.data);
      } else {
        return checker.check(this.data);
      }
    }
  );
};
