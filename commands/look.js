const { send, parser, addCmd, flags } = require("@ursamu/core");
const { target, canEdit, canSee } = require("../utils/utils");
const { center, header, headerNarrow } = require("../utils/format");

module.exports = () => {
  const charStatus = (char, width) => {
    let tag = "%r%b%b";

    if (char.flags.includes("immortal")) tag = "%r%ch%cy*%cn%b";

    return `${tag}${
      char.name + " ".repeat(25 - parser.stripSubs("telnet", char.name).length)
    } ${
      char.shortdesc
        ? char.shortdesc
        : "%ch%cxUse '+shortdesc me=<desc>' to set.%cn"
    }`;
  };

  addCmd({
    name: "look",
    pattern: /(?:^l|lo|loo|look)(?:\s+?(.*))?/i,
    flags: "connected",
    render: async (ctx, args) => {
      let desc = "";
      const en = await strapi.query("objects").model.findOne({
        dbref: ctx.socket.cid,
      });

      const chars = (
        await strapi
          .query("objects")
          .model.find({ $and: [{ flags: /connected/i }, { flags: /player/i }] })
      ).filter((tar) => canSee(en, tar));

      const tar = await target(en, args[1] || "");

      const name = `${tar.moniker ? tar.moniker : tar.name}`;

      desc +=
        header(name, ctx.data.width) + "%r%r%t" + tar.description + "%r%r";

      if (chars.length > 0) {
        desc += headerNarrow("Characters", ctx.data.width);
        desc += chars.map((char) => charStatus(char, ctx.data.width)).join("");
      }
      await send(ctx.id, desc);
    },
  });
};
