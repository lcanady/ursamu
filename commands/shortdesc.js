const { addCmd, send } = require("@ursamu/core");
const { target, canEdit, query } = require("../utils/utils");

module.exports = () => {
  addCmd({
    name: "shortdesc",
    pattern: ".shortdesc *=*",
    flags: "connected",
    render: async (ctx, args) => {
      const en = await query("objects").findOne({ dbref: ctx.socket.cid });
      const tar = await target(en, args[1]);

      if (tar) {
        if (canEdit(en, tar)) {
          await query("objects").updateOne(
            { dbref: tar.dbref },
            { shortdesc: args[2] }
          );

          return await send(
            ctx.id,
            `Done. Shortdesc set for %ch${tar.name}%cn`
          );
        }

        return await send(ctx.id, "Permission denied.");
      }

      return await send(ctx.id, "I can't find that.");
    },
  });
};
