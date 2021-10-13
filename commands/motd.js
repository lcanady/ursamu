const { send, addCmd } = require("@ursamu/core");
const { repeat, header } = require("../utils/format");

module.exports = () => {
  addCmd({
    name: "motd",
    pattern: "motd",
    flags: "connected",
    render: async (ctx, args) => {
      try {
        const motd = await strapi.query("motd").find({});

        await send(
          ctx.id,
          `${header("Message of the Day", ctx.data.width)}%r${
            motd[0].content
          }%r${repeat("%cb=%ch-%cn", ctx.data.width)}`
        );
      } catch (error) {
        await send(ctx.id, ">> MotD is unavailable at the moment.");
      }
    },
  });
};
