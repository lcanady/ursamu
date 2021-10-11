const { addCmd, io, send } = require("@ursamu/core");

module.exports = () => {
  addCmd({
    name: "@reboot",
    pattern: "@reboot",
    flags: "connected",
    render: async (args, ctx) => {
      io.emit("message", {
        msg: "Game @reboot initiated, please wait!",
        data: {},
      });
      strapi.reload();
    },
  });
};
