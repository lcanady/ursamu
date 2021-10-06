const cmdHook = require("../../../hooks/cmdHook");
const defaultHook = require("../../../hooks/defaultHook");
const { pipeline } = require("@digibear/middleware");

module.exports = () => {
  const hooks = {
    startup: pipeline(),
    shutdown: pipeline(),
    input: pipeline(),
    connect: pipeline(),
    disconnect: pipeline(),
  };

  message = `  
> ./Machina.exe 
> Last connect: ${new Date().toLocaleString()}
> [10/10] Core Loaded ...
> [03/03] Module System Update ...
> [88/88] (M/pH) Flux Capacitor ...
> Loading Characters ...`;

  hooks.connect.use((ctx, next) => {
    ctx.strapi.send(ctx.id, message, {
      token: ctx.token,
    });
    next();
  });

  hooks.input.use(cmdHook, defaultHook);

  return hooks;
};
