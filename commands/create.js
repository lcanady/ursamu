const axios = require("axios");
const { addCmd, hooks, send, hash } = require("@ursamu/core");
const { nanoid } = require("nanoid");

module.exports = () => {
  addCmd({
    name: "register",
    pattern: "create * *",
    render: async (ctx, args) => {
      const taken = await strapi.query("objects").model.findOne({
        $or: [
          { name: new RegExp(args[1], "i") },
          { alias: new RegExp(args[1], "i") },
        ],
      });

      if (taken) return send(ctx.id, "That name isn't available.");

      const data = JSON.stringify({
        password: await hash(args[2]),
        flags: "player connected",
      });

      const player = await strapi.query("objects").model.create({
        name: args[1],
        dbref: nanoid(),
        data,
      });

      ctx.socket.cid = player.dbref;
      hooks.connect.execute(ctx);
    },
  });
};
