module.exports = () => {
  const { io } = strapi;
  const send = (id, msg, data = {}) =>
    io.to(id).emit(
      "message",
      JSON.stringify({
        msg,
        data,
      })
    );

  return { send };
};
