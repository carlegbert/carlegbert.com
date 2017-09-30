/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const assert = require('chai').assert;

const BaseFile = require('./BaseFile');

describe('BaseFile unit tests', function () {
  const testFile = new BaseFile('testFile', null, null);

  describe('#getLsEntry()', function () {
    it('Returns correct string', function () {
      const lsString = testFile.getLsEntry();
      const expected = '<span class="inline txt" id="testFile">testFile</span>';
      assert.equal(lsString, expected);
    });
  });

  describe('#getFullPath()', function () {
    it('Returns correct string', function () {
      const fullPath = testFile.getFullPath();
      assert.equal(fullPath, 'testFile');
    });
  });
});
