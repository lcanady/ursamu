module.exports = async (ctx, next) => {
  const { matchCmd } = ctx.strapi;

  const { args, cmd } = await matchCmd(ctx);
  let player;

  if (ctx.cid) {
    player = ctx.strapi.query("objects").findOne({ id: ctx.cid });
  }

  try {
    if (cmd) {
      return cmd.render(args, ctx);
    }

    next();
  } catch (error) {}
};
