const { hooks, send } = require("@ursamu/core");

module.exports = () => {
  hooks.connect.use(async (ctx, next) => {
    await send(ctx.id, ">> Last Connect: " + new Date().toLocaleString());
    next();
  });
};
