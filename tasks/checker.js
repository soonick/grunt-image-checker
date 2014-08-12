/*
 * grunt-image-check
 * https://github.com/soonick/grunt-image-check
 *
 * Copyright (c) 2014 Adrian Ancona Novelo
 * Licensed under the MIT license.
 */

var minimatch = require('minimatch');
var sizeOf = require('image-size');
var walk = require('walk');

module.exports = {
  /**
   * Path where the baseline files live
   * @type {string}
   */
  baselinePath: null,

  /**
   * Keeps the status of the checks. If this becomes false it means there was
   * an error.
   * @type {boolean}
   */
  success: true,

  /**
   * Files that will be used as baseline. The key is the path to the file and
   * the value is the dimension
   * @type {array}
   */
  baselineFiles: {},

  /**
   * Only files matching this pattern will be compared
   * @type {string}
   */
  matchPattern: null,

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
    this.baselineFiles = {};
    this.baselinePath = opts.baseline;
    this.matchPattern = opts.match;
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
   */
  populateBaseline: function() {
    var walkerOptions = {
      listeners: {
        file: this.saveFileInHashmap.bind(this, this.baselineFiles)
      }
    };

    walk.walkSync(this.baselinePath, walkerOptions);
  },

  /**
   * Adds a given file to the given hashmap
   * @param {array} files - The hashmap where files will be stored
   * @param {string} folder - Folder where the file lives
   * @param {object} file - Object with information about the file. We just care
   *        about the name attribute
   */
  saveFileInHashmap: function(files, folder, file) {
    var name = folder + '/' + file.name;
    var relativePath = name.substring(this.baselinePath.length);

    if (this.matchPattern) {
      if (minimatch(relativePath, this.matchPattern)) {
        files[relativePath] = this.getImageSize(name);
      }
    } else {
      files[relativePath] = this.getImageSize(name);
    }
  },

  /**
   * Wrapper for sizeOf
   * @param {string} path - Path of the image
   * @returns {object} dimensions object
   */
  getImageSize: function(path) {
    return sizeOf(path);
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
    this.success = true;

    var walkerOptions = {
      listeners: {
        file: this.compareFile.bind(this, opts)
      }
    };

    walk.walkSync(opts.path, walkerOptions);

    return this.success;
  },

  /**
   * Compares a file against the baseline
   * @param {object} opts - Object with information about the images we will
   *        compare against: {
   *          path: 'Path to the folder with the images to compare',
   *          proportion: 'How large compared to the baseline we expect images
   *              to be'
   *        }
   * @param {string} folder - Name of the folder where the file lives
   * @param {object} file - Information about the file. We just care about the
   *        name attribute
   */
  compareFile: function(opts, folder, file) {
    var name = folder + '/' + file.name;
    var relativeName = name.substring(opts.path.length);

    if (this.matchPattern) {
      if (!minimatch(relativeName, this.matchPattern)) {
        return;
      }
    }

    var baselineDimensions = this.baselineFiles[relativeName];

    var dimensions = this.getImageSize(name);
    if (!baselineDimensions ||
        baselineDimensions.width * opts.proportion !== dimensions.width ||
        baselineDimensions.height * opts.proportion !== dimensions.height) {
      this.success = false;
    }
  }
};
