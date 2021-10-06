const { existsSync, readdirSync } = require("fs");
const bcrypt = require("bcrypt");

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

/**
 * Hash a string.
 * @param pass The password to hash
 * @returns
 */
module.exports.hash = (pass) =>
  new Promise((resolve, reject) =>
    bcrypt.hash(pass, 10, (err, encr) => {
      if (err) reject(err);
      resolve(encr);
    })
  );

/**
 * Compare a hashed string to it's plantext counterpart.
 * @param data The plan text representation of the hashed string
 * @param pass Hashed string
 * @returns
 */
module.exports.compare = (data, pass) =>
  new Promise((resolve, reject) =>
    bcrypt.compare(data, pass, (err, comp) => {
      if (err) reject(err);
      resolve(comp);
    })
  );
