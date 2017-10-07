/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { assert } = require('chai');
const { testShellFactory } = require('../util/test-helpers');
const { Directory, File } = require('../FileStructure');
const ShellCommandResult = require('../Shell/CommandResult');

describe('mkdir', function () {
  const testShell = testShellFactory();
  const children = testShell.fileStructure.children;

  beforeEach(function () {
    testShell.fileStructure.children.splice(0, 9);
  });

  it('creates directory', function () {
    const res = testShell.executeCommand('mkdir testDir');
    assert.instanceOf(res, ShellCommandResult);
    assert.empty(res.stdErr);
    assert.empty(res.stdOut);
    assert.equal(children.length, 1);
    assert.instanceOf(children[0], Directory);
    assert.equal(children[0].name, 'testDir');
    assert.equal(res.data[0], children[0]);
  });

  it('does nothing when called with directory name that already exists', function () {
    testShell.fileStructure.createChild(['testDir'], 'dir');
    const res = testShell.executeCommand('mkdir testDir');
    assert.instanceOf(res, ShellCommandResult);
    assert.empty(res.stdErr);
    assert.empty(res.stdOut);
    assert.empty(res.data);
  });

  it('creates multiple directories', function () {
    const res = testShell.executeCommand('mkdir testDir secondTestDir');
    assert.instanceOf(res, ShellCommandResult);
    assert.empty(res.stdErr);
    assert.empty(res.stdOut);
    assert.equal(res.data.length, 2);
    assert.equal(children.length, 2);
    assert.include(children, res.data[0]);
    assert.include(children, res.data[1]);
    assert.instanceOf(res.data[0], Directory);
  });

  it('creates nested directory', function () {
    const testDir = testShell.fileStructure.createChild(['testDir'], 'dir');
    const res = testShell.executeCommand('mkdir testDir/nestedTestDir');
    assert.instanceOf(res, ShellCommandResult);
    assert.empty(res.stdErr);
    assert.empty(res.stdOut);
    assert.equal(testDir.children.length, 1);
    assert.instanceOf(res.data[0], Directory);
    assert.include(testDir.children, res.data[0]);
    assert.equal(res.data[0].name, 'nestedTestDir');
  });

  it('fails to create directory when called with bad path', function () {
    const res = testShell.executeCommand('mkdir x/y/z');
    assert.equal(children.length, 0);
    assert.instanceOf(res, ShellCommandResult);
    assert.empty(res.stdOut);
    assert.equal(res.stdErr.length, 1);
    assert.equal(res.stdErr[0], 'mkdir: cannot create directory x/y/z: No such file or directory');
  });

  it('fails to create directory when called with non-dir existing filepath', function () {
    testShell.fileStructure.createChild(['testFile']);
    const res = testShell.executeCommand('mkdir testFile');
    assert.equal(children.length, 1);
    assert.instanceOf(res, ShellCommandResult);
    assert.instanceOf(children[0], File);
    assert.empty(res.stdOut);
    assert.empty(res.data);
    assert.equal(res.stdErr.length, 1);
    assert.equal(res.stdErr[0], 'mkdir: cannot create directory \'testFile\': File exists');
  });

  it('creates dir and returns error message when called with both good and bad arguments', function () {
    const res = testShell.executeCommand('mkdir testDir x/y/z');
    assert.equal(children.length, 1);
    assert.instanceOf(res, ShellCommandResult);
    assert.empty(res.stdOut);
    assert.equal(res.stdErr.length, 1);
    assert.equal(res.stdErr[0], 'mkdir: cannot create directory x/y/z: No such file or directory');
    assert.equal(res.data.length, 1);
    assert.include(children, res.data[0]);
  });
});