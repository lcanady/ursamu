const { hooks, io } = require("@ursamu/core");

io.on("connect", (socket) =>
  socket.on("disconnect", (err) => {
    if (err.includes("pong")) socket.disconnect(true);
  })
);
