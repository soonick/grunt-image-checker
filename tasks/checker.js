/*
 * grunt-image-check
 * https://github.com/soonick/grunt-image-check
 *
 * Copyright (c) 2014 Adrian Ancona Novelo
 * Licensed under the MIT license.
 */

module.exports = {
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
  }
};
