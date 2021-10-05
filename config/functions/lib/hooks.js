const cmdHook = require("../hooks/cmdHook");
const defaultHook = require("../hooks/defaultHook");
const { pipeline } = require("@digibear/middleware");

module.exports = () => {
  const hooks = {
    startup: pipeline(),
    shutdown: pipeline(),
    input: pipeline(),
    connect: pipeline(),
    disconnect: pipeline(),
  };

  hooks.input.use(cmdHook, defaultHook);

  return hooks;
};
