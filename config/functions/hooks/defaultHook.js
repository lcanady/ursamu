const { send } = require("@ursamu/core");

module.exports = async (ctx) => {
  if (ctx.msg.trim()) return await send(ctx.id, "Huh? Type 'help' for help.");
};
