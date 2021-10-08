const { hash } = require("../utils/utils");
const axios = require("axios");
const { addCmd, hooks, send } = require("@ursamu/core");

module.exports = () => {
  addCmd({
    name: "register",
    pattern: "register * * *",
    render: async (ctx, args) => {
      try {
        const res = await axios.post(
          "http://localhost:1337/auth/local/register",
          {
            username: args[1],
            email: args[2],
            password: args[3],
          }
        );
        ctx.cid = res.data.id;
        ctx.socket.cid = res.data.id;
        ctx.data.token = res.data.jwt;
        await hooks.connect.execute(ctx);
      } catch (error) {
        await send(ctx.id, "Unable to process your account.");
      }
    },
  });
};
