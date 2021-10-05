const cmds = [];
module.exports = () => {
  const { flags } = strapi;
  /**
   * Add a command to the global command system.
   * @param  {...any} commands The commands to add.
   * @returns
   */
  const addCmd = (...commands) =>
    commands.forEach((cmd) => {
      if (typeof cmd.pattern === "string") {
        const tempPattern = cmd.pattern
          .replace(/([\/\+\(\))])/g, "\\$1")
          .replace(/\*/g, "(.*)")
          .replace(/\s+/, "\\s+")
          .replace(/=/g, "\\s*=\\s*")
          .replace(/^\./, "[\\+@]");
        cmd.pattern = new RegExp("^" + tempPattern, "i");
      }

      cmds.push(cmd);
    });

  const matchCmd = async (ctx) => {
    const command = cmds.find((cmd) => {
      if (ctx.msg?.match(cmd.pattern)) {
        return true;
      }
      return false;
    });
    const match = ctx.msg?.match(command?.pattern || "");
    return { args: Array.from(match || []), cmd: command };
  };

  return { addCmd, matchCmd };
};
