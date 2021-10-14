const axios = require("axios");
const { addCmd, hooks, send, hash } = require("@ursamu/core");
const { nanoid } = require("nanoid");

module.exports = () => {
  addCmd({
    name: "create",
    pattern: "create * *",
    render: async (ctx, args) => {
      const players = await strapi
        .query("objects")
        .model.find({ flags: /player/i });
      const taken = await strapi.query("objects").model.findOne({
        $or: [
          { name: new RegExp(args[1], "i") },
          { alias: new RegExp(args[1], "i") },
        ],
      });

      if (taken) return send(ctx.id, "That name isn't available.");

      const player = await strapi.query("objects").model.create({
        flags: players.length
          ? "player connected"
          : "player connected  immortal",
        password: await hash(args[2]),
        name: args[1],
        dbref: nanoid(),
        location: strapi.config.get("ursamu.startingRoom", "start-0000"),
        lastcommand: Date.now(),
      });

      ctx.socket.cid = player.dbref;
      hooks.connect.execute(ctx);
    },
  });
};
