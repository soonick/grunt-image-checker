/*
 * grunt-image-check
 * https://github.com/soonick/grunt-image-check
 *
 * Copyright (c) 2014 Adrian Ancona Novelo
 * Licensed under the MIT license.
 */

var walk = require('walk');
var sizeOf = require('image-size');

module.exports = {
  /**
   * Path where the baseline files live
   * @type {string}
   */
  baselinePath: null,

  /**
   * Files that will be used as baseline. The key is the path to the file and
   * the value is the dimension
   * @type {array}
   */
  baselineFiles: {},

  /**
   * Entry point for the checker.
   * @param {object} opts - Configuration object: {
   *    baseline: 'Path to the folder where the images we will use as baseline live',
   *    strict: 'If true, then the script will also check that all images exist'
   *    compare: [
   *      {
   *        path: 'Path to folder where the images we want to compare live',
   *        proportion: 'Number with the proportion we expect this images to have
   *            compared to the baseline. If 2, then we expect images in this
   *            folder to be twice as large'
   *      },
   *      ...
   *    ]
   *  }
   * @returns {boolean} True if check is successful, false otherwise
   */
  check: function(opts) {
    this.baselinePath = opts.baseline;
    this.populateBaseline();

    for (var i in opts.compare) {
      if (!this.compare(opts.compare[i])) {
        return false;
      }
    }

    return true;
  },

  /**
   * Populates baselineFiles array
   * @param {string} path - path to baseline folder
   */
  populateBaseline: function(path) {
    var walkerOptions = {
      listeners: {
        file: this.saveFileInArray.bind(this, this.baselineFiles)
      }
    };

    walk.walkSync(this.baselinePath, walkerOptions);
  },

  /**
   * Adds a given file to the given array
   * @param {array} files - The hashmap where files will be stored
   * @param {string} folder - Folder where the file lives
   * @param {string} file - File name
   */
  saveFileInArray: function(files, folder, file) {
    var name = folder + '/' + file.name;
    files[name.substring(this.baselinePath.length)] = sizeOf(name);
  },

  /**
   * Compares against baseline
   * @param {object} opts - Object with information about the images we will
   *        compare against: {
   *          path: 'Path to the folder with the images to compare',
   *          proportion: 'How large compared to the baseline we expect images
   *              to be'
   *        }
   * @returns {boolean} true if everything compared correctly. False otherwise.
   */
  compare: function(opts) {
    var success = true;
    var self = this;

    var walkerOptions = {
      listeners: {
        file: function(folder, file) {
          var name = folder + '/' + file.name;
          var dimensions = sizeOf(name);
          var relativeName = name.substring(opts.path.length);
          var baselineDimensions = self.baselineFiles[relativeName];

          if (baselineDimensions.width * opts.proportion !== dimensions.width ||
              baselineDimensions.height * opts.proportion !== dimensions.height) {
            success = false;
          }
        }
      }
    };

    walk.walkSync(opts.path, walkerOptions);

    return success;
  }
};
