const { hooks, send, force } = require("@ursamu/core");

module.exports = () => {
  hooks.connect.use(async (ctx, next) => {
    await send(ctx.id, ">> Last Connect: " + new Date().toLocaleString());
    ctx.socket.join(ctx.socket.cid);
    ctx.socket.token = ctx.data.token;
    await force(ctx, "motd");
    await force(ctx, "look");
    next();
  });
};
