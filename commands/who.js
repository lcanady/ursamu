const { addCmd, send } = require("@ursamu/core");
const { header, repeat, center } = require("../utils/format");
const { query, canSee, idleColor } = require("../utils/utils");

module.exports = () => {
  addCmd({
    name: "who",
    pattern: "who",
    flags: "connected",
    render: async (ctx, args) => {
      const formatEntry = (tar) =>
        `%r  ${tar.name.substring(0, 20).padEnd(20, " ")} ${
          tar.alias
            ? tar.alias.substring(0, 8).padEnd(8, " ")
            : " ".padStart(8, " ")
        } ${idleColor(tar.lastcommand).padStart(4, " ")}   ${
          tar.doing
            ? tar.doing
                .substring(0, ctx.data.width - 35)
                .padEnd(ctx.data.width - 35, " ")
            : ""
        }`;

      const en = await query("objects").findOne({ dbref: ctx.socket.cid });
      const chars = (
        await query("objects").find({ flags: /connected/i })
      ).filter((char) => canSee(en, char));

      let output = "";
      output +=
        header("WHO", ctx.data.width) +
        "%r" +
        "  Name".padEnd(20) +
        "Alias".padEnd(8) +
        "Idle".padStart(6, " ") +
        "%b%b%bDoing %ch%cx(@doing to set)%cn%r" +
        repeat("%cb-%cn", ctx.data.width);

      chars.forEach((char) => (output += formatEntry(char)));

      output +=
        "%r" +
        repeat("%cb-%cn", ctx.data.width) +
        "%r" +
        center(
          `There are %ch${chars.length}%cn players connected.`,
          ctx.data.width
        ) +
        "%r" +
        repeat("%cb=%ch-%cn", ctx.data.width);

      await send(ctx.id, output);
    },
  });
};
