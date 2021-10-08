const { matchCmd, cmds } = require("@ursamu/core");

module.exports = async (ctx, next) => {
  for (const cmd of cmds) {
    const args = ctx.msg.match(cmd.pattern);
    if (args) {
      return await cmd.render(ctx, args);
    }
  }
  next();
};
