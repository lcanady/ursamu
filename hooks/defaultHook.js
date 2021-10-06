module.exports = (ctx) => {
  const { send } = strapi;
  send(ctx.id, "Huh? Type 'Help' for help.");
};
