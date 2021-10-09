const { hooks, send, force } = require("@ursamu/core");

module.exports = () => {
  hooks.connect.use(async (ctx, next) => {
    await send(ctx.id, ">> Last Connect: " + new Date().toLocaleString());
    ctx.socket.join(ctx.cid);
    await force(ctx, "motd");
    await force(ctx, "look");
    next();
  });
};
