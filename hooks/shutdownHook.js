const { hooks, io } = require("@ursamu/core");
const { set } = require("../utils/utils");

module.exports = () => {
  hooks.shutdown.use(
    async (_, next) => {
      const chars = await strapi
        .query("objects")
        .model.find({ flags: /connected/i });
      for (const char of chars) {
        await set(char, "!connected");
      }

      (await io.fetchSockets()).forEach((socket) => socket.disconnect(true));

      next();
    },
    () => process.kill(process.pid)
  );
};
