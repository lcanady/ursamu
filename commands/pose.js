const { addCmd, send } = require("@ursamu/core");

module.exports = () => {
  addCmd({
    name: "pose",
    pattern: /(^pose\s+|^:|^;)(.*)/i,
    flags: "connected",
    render: async (ctx, args) => {
      const en = await strapi
        .query("objects")
        .model.findOne({ dbref: ctx.socket.cid });

      switch (args[1]) {
        case ";":
          return await send(en.location, `${en.name}${args[2]}`);
        default:
          return await send(en.location, `${en.name} ${args[2]}`);
      }
    },
  });
};
