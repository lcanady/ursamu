const { hooks, send } = require("@ursamu/core");
const { set } = require("../utils/utils");
module.exports = () => {
  hooks.disconnect.use(async (dbref, next) => {
    const player = await strapi.query("objects").model.findOne({ dbref });
    await set(player, "!connected");
    await send(player.location, `${player.name} has disconnected.`);
    next();
  });
};
