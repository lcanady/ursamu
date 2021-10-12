const { nanoid } = require("nanoid");

const create = (en, name, { flags, dbref, owner, location, ...params }) => {
  await strapi.query("objects").create({
    ...{
      name,
      flags: flags ? flags : "thing",
      dbref: nanoid(),
      owner: owner ? owner : en.dbref,
      location: location ? location : en.dbref,
    },
    ...params,
  });
};

module.exports = { create };
