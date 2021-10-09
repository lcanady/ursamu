const { cmds, send } = require("@ursamu/core");

module.exports = async (ctx, next) => {
  for (const cmd of cmds) {
    const args = ctx.msg.match(cmd.pattern);
    if (args) {
      try {
        return await cmd.render(ctx, args);
      } catch (error) {
        console.log(error);
        send(ctx.id, "%crD'oh! Error found:%cn  " + error.message);
      }
    }
  }
  next();
};
