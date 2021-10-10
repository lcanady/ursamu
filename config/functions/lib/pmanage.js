const { spawn } = require("child_process");
const { readFileSync, writeFileSync, existsSync } = require("fs");
const { join } = require("path");

module.exports = async () => {
  let pid = "";
  if (existsSync(join(process.cwd(), "tel.pid")))
    pid = readFileSync(join(process.cwd(), "tel.pid"), "utf-8");
  if (!pid) {
    const child = spawn(`node ${join(process.cwd(), "telnet.js")}`, {
      detached: true,
    });
    child.on("error", (err) => console.log(err));
    writeFileSync(join(process.cwd(), "tel.pid"), `${child.pid}`, "utf-8");
  }
};
