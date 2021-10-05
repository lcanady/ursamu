module.exports = ({ send, addCmd }) => {
  addCmd({
    name: "test",
    pattern: ".test",
    render: (args, ctx) => {
      send(ctx.id, "This is s test!!");
    },
  });
};
