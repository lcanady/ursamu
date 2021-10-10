const { cmds, send, flags } = require("@ursamu/core");
const { set } = require("../../../utils/utils");

module.exports = async (ctx, next) => {
  for (const cmd of cmds) {
    const args = ctx.msg.match(cmd.pattern);
    const player = await strapi
      .query("objects")
      .model.findOne({ dbref: ctx.socket.cid });

    if (
      args &&
      (!cmd.flags || flags.check(player?.flags || "", cmd.flags || ""))
    ) {
      try {
        if (ctx.socket.cid) {
          let player = await strapi
            .query("objects")
            .findOne({ dbref: ctx.socket.cid });

          await set(player, "", { lastcommand: Date.now() });

          player = await strapi
            .query("objects")
            .findOne({ dbref: ctx.socket.cid });
        }

        return await cmd.render(ctx, args);
      } catch (error) {
        console.log(error);
        return send(ctx.id, "%crD'oh! Error found:%cn  " + error.message);
      }
    }
  }
  next();
};
