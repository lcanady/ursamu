const { addCmd, send } = require("@ursamu/core");

module.exports = () => {
  addCmd({
    name: "test",
    pattern: "@test",
    render: async (ctx) => {
      console.log("made it!");
      await send(ctx.id, "This is s test!!");
    },
  });
};
