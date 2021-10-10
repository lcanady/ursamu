const { send, hooks, addCmd, compare, flags, sign } = require("@ursamu/core");

module.exports = () => {
  addCmd({
    name: "connect",
    pattern: "connect * *",
    render: async (ctx, args) => {
      const player = await strapi.query("objects").model.findOne({
        name: new RegExp(args[1], "i"),
      });
      if (player && (await compare(args[2], player.password))) {
        ctx.socket.cid = player.dbref;

        const { tags } = flags.set(player.flags, {}, "connected");
        await strapi
          .query("objects")
          .update({ dbref: player.dbref }, { flags: tags });
        const token = await sign(player.dbref, process.env.SECRET);
        await send(ctx.id, "", { token });
        await hooks.connect.execute(ctx);
      } else {
        await send(ctx.id, "Permission denied.");
      }
    },
  });
};
