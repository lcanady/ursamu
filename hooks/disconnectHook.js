const { hooks, send, io } = require("@ursamu/core");
const { set, query } = require("../utils/utils");
module.exports = () => {
  hooks.disconnect.use(async (socket, next) => {
    const player = await query("objects").findOne({ dbref: socket.cid });
    await set(player, "!connected");

    io.to(socket.cid).emit("quit", false);
    await send(player.location, `${player.name} has disconnected.`);
    next();
  });
};
