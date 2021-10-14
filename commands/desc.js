const { addCmd, send } = require("@ursamu/core");
const { query, target, set } = require("../utils/utils");

module.exports = () => {
  addCmd({
    name: "description",
    pattern: /^[\+@]?desc[ription]*?\s+(.*)\s*=\s*(.*)/i,
    flags: "connected",
    render: async (ctx, args) => {
      const en = await query("objects").findOne({ dbref: ctx.socket.cid });
      const tar = await target(en, args[1]);

      if (tar) {
        await set(tar, "", { description: args[2] });
        await send(ctx.id, `Done. Description set for %ch${tar.name}%cn.`);
      } else {
        await send(ctx.id, "I can't find that here.");
      }
    },
  });
};
