const { addCmd, io, broadcast, hooks } = require("@ursamu/core");
const { execSync } = require("child_process");

module.exports = () => {
  addCmd({
    name: "shutdown",
    pattern: "@shutdown",
    flags: "wizard+",
    render: async (ctx, args) => {
      await hooks.shutdown.execute({});
      execSync("pm2 delete telnet server");
    },
  });
};
