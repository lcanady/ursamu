module.exports = () => {
  const { addCmd, send } = strapi;
  addCmd({
    name: "test",
    pattern: ".test",
    render: async (args, ctx) => await send(ctx.id, "This is s test!!"),
  });
};
