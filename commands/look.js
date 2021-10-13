const { send, parser, addCmd, flags } = require("@ursamu/core");
const { target, canSee, idleColor } = require("../utils/utils");
const { repeat, header, headerNarrow } = require("../utils/format");

module.exports = () => {
  const charStatus = (char, width) => {
    let tag = "%r%b%b";

    if (char.flags.includes("immortal")) tag = "%r%ch%cy*%cn%b";

    return `${tag}${
      char.name + " ".repeat(15 - parser.stripSubs("telnet", char.name).length)
    } ${
      " ".repeat(
        5 - parser.stripSubs("telnet", idleColor(char.lastcommand)).length
      ) + idleColor(char.lastcommand)
    }   ${
      char.shortdesc
        ? char.shortdesc.substring(0, width - 30)
        : "%ch%cxUse '+shortdesc me=<desc>' to set.%cn".substring(0, width - 30)
    }`;
  };

  addCmd({
    name: "look",
    pattern: /^l[ook]{0,3}\r\n$|^l[ook]{0,3}\s+(.*)\r\n$/i,
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
      if (tar) {
        const name = `${tar.moniker ? tar.moniker : tar.name}`;

        desc +=
          header(name, ctx.data.width) + "%r%r%t" + tar.description + "%r%r";

        if (chars.length > 0) {
          desc += headerNarrow("Characters", ctx.data.width);
          desc +=
            chars.map((char) => charStatus(char, ctx.data.width)).join("") +
            "%r";
        }
        desc += repeat("%cb=%ch-%cn", ctx.data.width);
        await send(ctx.id, desc);
      } else {
        send(ctx.id, "I can't find that here.");
      }
    },
  });
};
