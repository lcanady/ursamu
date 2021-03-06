const { hooks, send, force, io } = require("@ursamu/core");
const { set } = require("../utils/utils");
module.exports = () => {
  hooks.connect.use(async (ctx, next) => {
    await send(ctx.id, ">> Last Connect: " + new Date().toLocaleString());
    const player = await strapi
      .query("objects")
      .findOne({ dbref: ctx.socket.cid });
    await send(player.location, `${player.name} has connected.`);
    ctx.socket.join(ctx.socket.cid);
    ctx.socket.join(player.location);
    ctx.socket.join(player.dbref);
    ctx.socket.token = ctx.data.token;
    if (!ctx.data.reboot) {
      await set(player, "connected");
      await force(ctx, "motd");
      await force(ctx, "look\r\n");
    }
    next();
  });
};
