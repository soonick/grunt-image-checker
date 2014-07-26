var assert = require('assert');
var sinon = require('sinon');

var checker = require('../../tasks/checker');

describe('checker', function() {
  describe('check', function() {
    beforeEach(function() {
      this.sb = sinon.sandbox.create();
      this.sb.stub(checker, 'populateBaseline');
      this.sb.stub(checker, 'compare');
    });

    afterEach(function() {
      this.sb.restore();
    });

    it('returns false if any compare fails', function() {
      var opts = {
        baseline: null,
        compare: ['hello', 'world']
      };

      assert.ok(!checker.check(opts));
    });

    it('returns true if all compares pass', function() {
      checker.compare.returns(true);
      var opts = {
        baseline: null,
        compare: ['hello', 'world']
      };

      assert.ok(checker.check(opts));
    });
  });

  describe('saveFileInHashmap', function() {
    it('saves file in given array', function() {
      var hash = {};
      sinon.stub(checker, 'getImageSize').returns('size');
      checker.baselinePath = '/hello/world/';

      checker.saveFileInHashmap(hash, '/hello/world', {name: 'green.txt'});

      var expected = {
        'green.txt': 'size'
      };
      assert.deepEqual(hash, expected);

      checker.getImageSize.restore();
    });
  });

  describe('compareFile', function() {
    beforeEach(function() {
      sinon.stub(checker, 'getImageSize');
    });

    afterEach(function() {
      checker.getImageSize.restore();
    });

    it('does\'nt change success flag if everything went fine', function() {
      checker.getImageSize.returns({
        width: 90,
        height: 150
      });
      checker.success = true;
      var opts = {
        path: '/hello',
        proportion: 3
      };
      checker.baselineFiles['/planet/hola'] = {
        width: 30,
        height: 50
      };

      checker.compareFile(opts, '/hello/planet', {name: 'hola'});

      assert.ok(checker.success);
    });

    it('sets success flag to false if check fails', function() {
      checker.getImageSize.returns({
        width: 91,
        height: 150
      });
      checker.success = true;
      var opts = {
        path: '/hello',
        proportion: 3
      };
      checker.baselineFiles['/planet/hola'] = {
        width: 30,
        height: 50
      };

      checker.compareFile(opts, '/hello/planet', {name: 'hola'});

      assert.ok(!checker.success);
    });
  });
});
