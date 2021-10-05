module.exports = ({ server, hooks }) => {
  const io = require("socket.io")(server);
  io.on("connection", (socket) => {
    socket.join(socket.id);

    socket.on("message", (ctx) => {
      ctx = JSON.parse(ctx);
      ctx.strapi = strapi;
      ctx.id = socket.id;
      ctx.socket = socket;
      hooks.input.execute(ctx);
    });
  });

  return io;
};
