"use strict";
const { Tags } = require("@digibear/tags");
const { loaddir } = require("../../utils/utils");
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
  // modify the global strapi object.
  strapi.flags = new Tags();
  const cmds = require("./lib/commands")();
  strapi.addCmd = cmds.addCmd;
  strapi.matchCmd = cmds.matchCmd;
  strapi.hooks = require("./lib/hooks")();
  strapi.io = require("./lib/socket")(strapi);
  const comms = require("./lib/broadcast")(strapi.io);
  strapi.send = comms.send;
  loaddir(join(__dirname, "../../commands/"));

  require("./telnet")();
};
