const ShellCommandResult = require('../Shell/CommandResult');
const { Directory } = require('../FileStructure');

/**
 * List contents of directory/directories
 * @return {ShellCommandResult}
 */
function ls() {
  const res = new ShellCommandResult([]);
  if (this.args.length === 0) {
    res.stdOut.push(this.shell.currentDir.lsHelper());
  } else {
    this.args.forEach((arg) => {
      const dir = this.shell.currentDir.findFile(arg.split('/'), Directory);
      if (!dir) {
        res.stdErr.push(`ls: cannot access ${arg}: no such file or directory`);
      } else {
        let str = '';
        if (this.args.length > 1) str += `${arg}:`;
        str += dir.lsHelper();
        res.stdOut.push(str);
      }
    });
  }
  return res;
}

module.exports = ls;
