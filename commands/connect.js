const { send, hooks, addCmd, compare } = require("@ursamu/core");
const { set } = require("../utils/utils");
module.exports = () => {
  addCmd({
    name: "connect",
    pattern: "connect * *",
    render: async (ctx, args) => {
      const player = await strapi.query("objects").model.findOne({
        name: new RegExp(args[1], "i"),
      });
      const { password } = JSON.parse(player?.data);

      if (player && (await compare(args[2], password))) {
        ctx.socket.cid = player.dbref;

        await set(player, "connected");
        hooks.connect.execute(ctx);
      } else {
        await send(ctx.id, "Permission denied.");
      }
    },
  });
};
