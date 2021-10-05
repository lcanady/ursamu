const { hash } = require("../config/functions/utils/utils");

module.exports = ({ services, addCmd, send, hooks }) => {
  addCmd({
    name: "register",
    pattern: "register * *",
    render: async (args, ctx) => {
      const taken = await services.accounts.findOne({ email: args[1] });
      if (taken) return send(ctx.id, "That email is already registered.");

      try {
        const acct = await services.accounts.create({
          email: args[1],
          password: await hash(args[2]),
          admin: false,
          superuser: false,
        });

        ctx.socket.uid = acct.id;
        await hooks.connect.execute(ctx);
      } catch (error) {
        for (const err of error.data.errors) {
          await send(ctx.id, err.key().toString());
        }
      }
    },
  });
};
