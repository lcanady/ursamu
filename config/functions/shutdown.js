const { hooks } = require("@ursamu/core");

process.on("SIGINT", async () => hooks.shutdown.execute({}));
