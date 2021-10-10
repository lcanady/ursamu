"use strict";
const { io, hooks, plugins } = require("@ursamu/core");
const defaultHook = require("./hooks/defaultHook");
const cmdHook = require("./hooks/cmdHook");
const { join } = require("path");
const startupHook = require("./hooks/startupHook");
const authHook = require("./hooks/authHook");
const { pm } = require("../../utils/utils");
/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = async () => {
  io.attach(strapi.server);

  require("./lib/subs")();
  require("./lib/flags")();
  plugins(join(__dirname, "../../commands/"));
  plugins(join(__dirname, "../../hooks/"));

  hooks.startup.use(startupHook);
  hooks.input.use(authHook, cmdHook, defaultHook);
  await hooks.startup.execute({});

  io.on("connect", (socket) => {
    socket.on("disconnect", () => hooks.disconnect.execute(socket.cid || ""));
  });
};
