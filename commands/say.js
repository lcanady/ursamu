const { addCmd, send } = require("@ursamu/core");
module.exports = () => {
  addCmd({
    name: "say",
    pattern: /(?:^say\s+|^")(.*)/i,
    flags: "connected",
    render: async (ctx, args) => {
      const en = await strapi
        .query("objects")
        .model.findOne({ dbref: ctx.socket.cid });

      await send(en.location, `${en.name} says, "${args[1]}"`);
    },
  });
};
