const axios = require("axios");
const { hooks, addCmd, send } = require("@ursamu/core");

module.exports = () => {
  addCmd({
    name: "connect",
    pattern: "connect * *",
    render: async (ctx, args) => {
      try {
        const res = await axios.post("http://localhost:1337/auth/local", {
          identifier: args[1],
          password: args[2],
        });

        if (!res.data.blocked) {
          ctx.cid = res.data.id;
          ctx.socket.cid = res.data.id;
          ctx.data.token = res.data.jwt;
          await hooks.connect.execute(ctx);
        } else {
          await send(ctx.id, "Permission denied.");
        }
      } catch (error) {
        console.log(error);
        await send(ctx.id, "Access denied.");
      }
    },
  });
};
