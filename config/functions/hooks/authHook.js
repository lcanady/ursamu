const { verify } = require("@ursamu/core");

module.exports = async (ctx, next) => {
  if (ctx.data.token) {
    const dbref = await verify(ctx.data.token, process.env.SECRET);

    const en = await strapi.query("objects").findOne({ dbref });
    ctx.socket.cid = dbref;
    ctx.socket.join(ctx.socket.cid);
    ctx.socket.join(en.location);
  }
  next();
};
