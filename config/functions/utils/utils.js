const { existsSync, readdirSync } = require("fs");

/**
 * Load all js files from a directory.
 * @param path The path to the files to handle.
 * @param cb optional callback function.
 */
module.exports.loaddir = async (path, cb) => {
  if (existsSync(path)) {
    const dirent = readdirSync(path, {
      withFileTypes: true,
    });
    for (const file of dirent) {
      if (cb) {
        await cb(file, path);
      } else {
        if (file.name.endsWith(".js")) {
          await require(path + file.name)(strapi);
        } else if (file.isDirectory()) {
          await require(join(path, file.name, "index"))(strapi);
        }
      }
    }
  }
};
