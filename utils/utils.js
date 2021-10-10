const { flags } = require("@ursamu/core");
const pm2 = require("pm2");
const { promisify } = require("util");

const set = async (player, flgs, props = {}) => {
  const { tags, data: flgData } = flags.set(
    player.flags,
    JSON.parse(player.data || "{}"),
    flgs
  );

  return await strapi.query("objects").model.updateOne(
    { dbref: player.dbref },
    {
      ...props,
      ...{ flags: tags },
      ...{
        data: JSON.stringify({
          ...(props.data || {}),
          ...flgData,
        }),
      },
    }
  );
};

const target = async (en, tar = "") => {
  switch (tar.trim().toLowerCase()) {
    case "me":
      return en;
    case "here" || "":
      return await strapi.query("objects").model.findOne({
        dbref: en.location,
      });
    default:
      // When all else fails, search for an object in the players location.
      return await strapi.query("objects").model.findOne({
        $and: [
          {
            $or: [
              { name: new RegExp(tar, "i") },
              { alias: new RegExp(tar, "i") },
              { dbref: tar },
            ],
          },
          {
            location: en.location,
          },
        ],
      });
  }
};

const canEdit = (en, tar) => {
  return (
    en.superuser ||
    tar.owner === en.dbref ||
    flags.check(en.flags, "wizard+") ||
    tar.dbref === en.dbref
  );
};

const canSee = (en, tar) => {
  return (
    en.superuser ||
    (tar.flags.includes("dark") &&
      flags.lvl(en.flags) >= flags.lvl(tar.flags)) ||
    (flags.check(en.flags, "staff+") && tar.flags.includes("dark")) ||
    flags.check(tar.flags, "!dark")
  );
};

const idle = (secs) => {
  const curr = Date.now();
  const past = secs;
  secs = Math.floor((curr - secs) / 1000);
  const mins = Math.floor((curr - past) / (1000 * 60));
  const hrs = Math.floor((curr - past) / (1000 * 60 * 60));

  if (hrs) return hrs + "h";
  if (mins) return mins + "m";
  return secs + "s";
};

const idleColor = (idleTime) => {
  const str = idle(idleTime);
  const match = str.match(/(\d{1,3})(\w)/);
  if (match) {
    let [_, time, mark] = match;
    let currTime = parseInt(time, 10);
    if (mark === "s") return `%ch%cg${str}%cn`;
    if (mark === "m" && currTime < 15) return `%cg${str}%cn`;
    if (mark === "m" && currTime > 14 && currTime < 30)
      return `%ch%cy${str}%cn`;
    if (mark === "m" && currTime > 30) return `%ch%cr${str}%cn`;
    if (mark === "h") return `%ch%cx${str}%cn`;
  }
  return str;
};

class ProcessManager {
  constructor() {}

  connect() {
    return promisify(pm2.connect);
  }

  start(name, script) {
    return new Promise((resolve, reject) =>
      pm2.start({ name, script }, (err, proc) => {
        if (err) reject(err);
        pm2.disconnect();
        resolve(proc);
      })
    );
  }

  delete(name) {
    return new Promise((resolve, reject) =>
      pm2.delete(name, (err) => {
        if (err) reject(err);
        resolve();
      })
    );
  }

  disconnect() {
    pm2.disconnect();
    return this;
  }
}

const pm = new ProcessManager();

module.exports = {
  pm,
  set,
  target,
  canEdit,
  canSee,
  idle,
  idleColor,
};
