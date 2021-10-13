const { hooks, io, broadcast } = require("@ursamu/core");
const { set } = require("../utils/utils");

module.exports = () => {
  hooks.shutdown.use(async (_, next) => {
    const chars = await strapi
      .query("objects")
      .model.find({ flags: /connected/i });
    for (const char of chars) {
      await set(char, "!connected");
    }

    await broadcast(
      "%ch%cyNOTICE!!%cn Game is shutting down. %rSee You Space Cowboy..."
    );
  });
};
