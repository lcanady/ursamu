const { send } = require("@ursamu/core");

module.exports = (ctx) => {
  if (ctx.msg.trim()) send(ctx.id, "Huh? Type 'help' for help.");
};
