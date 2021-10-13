const { verify } = require("@ursamu/core");
const { set } = require("../../../utils/utils");

module.exports = async (ctx, next) => {
  if (ctx.data.token) {
    const dbref = await verify(ctx.data.token, process.env.SECRET);

    const en = await strapi.query("objects").findOne({ dbref });
    ctx.socket.cid = dbref;
    await set(en, "connected");

    ctx.socket.join(en.location);
    ctx.socket.join(en.dbref);
  }
  next();
};
