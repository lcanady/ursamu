const { flags } = require("@ursamu/core");

const set = async (player, flgs, data = {}) => {
  const playerData = JSON.parse(player.data);
  const { tags, data: flgData } = flags.set(playerData.flags, playerData, flgs);
  const combData = JSON.stringify({ ...playerData, ...flgData, ...data });
  combData.flags = tags;

  return await strapi
    .query("objects")
    .update({ dbref: player.dbref }, { data: combData });
};

module.exports = {
  set,
};
