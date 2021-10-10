const { hooks } = require("@ursamu/core");
const { nanoid } = require("nanoid");

module.exports = async (ctx, next) => {
  const rooms = await strapi.query("objects").find({
    flags: /room/i,
  });

  if (rooms.length <= 0) {
    const room = await strapi.query("objects").create({
      dbref: strapi.config.get("ursamu.startroom", "start-0000"),
      name: "Limbo",
      flags: "room",
      location: strapi.config.get("ursamu.startroom", "start-0000"),
    });

    await strapi
      .query("objects")
      .model.updateOne({ dbref: room.dbref }, { owner: room.dbref });
  }

  next();
};
