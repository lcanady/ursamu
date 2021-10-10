const { addCmd, hooks, send, io } = require("@ursamu/core");

module.exports = () => {
  addCmd({
    name: "quit",
    pattern: "quit",
    render: async (ctx) => {
      await send(ctx.id, "...See You Space Cowboy...");
      await io.to(ctx.id).emit("quit");
    },
  });
};
