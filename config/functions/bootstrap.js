"use strict";
const { io, hooks, plugins } = require("@ursamu/core");
const defaultHook = require("./hooks/defaultHook");
const cmdHook = require("./hooks/cmdHook");
const { join } = require("path");
/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = () => {
  io.attach(strapi.server);

  require("./lib/subs")();
  require("./telnet")();
  plugins(join(__dirname, "../../commands/"));
  plugins(join(__dirname, "../../hooks/"));

  hooks.input.use(cmdHook, defaultHook);
};
