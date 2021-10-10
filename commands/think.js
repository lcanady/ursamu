const { addCmd, send } = require("@ursamu/core");

module.exports = () => {
  addCmd({
    name: "think",
    pattern: "think *",
    flags: "connected",
    render: async (ctx, args) => await send(ctx.id, args[1]),
  });
};
