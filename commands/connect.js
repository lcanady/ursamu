const axios = require("axios");

module.exports = () => {
  const { hooks, addCmd, send } = strapi;

  addCmd({
    name: "connect",
    pattern: "connect * *",
    render: async (args, ctx) => {
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
