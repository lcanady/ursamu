const telnetlib = require("telnetlib");
const io = require("socket.io-client");

module.exports = () => {
  const { NAWS } = telnetlib.options;
  const server = telnetlib.createServer(
    {
      localOptions: [NAWS],
      remoteOptions: [NAWS],
    },
    async (c) => {
      let token;
      const s = io("http://localhost:1337");

      const naws = c.getOption(NAWS);

      // handle screen resize.
      naws.on("resize", (data) => {
        c.width = data.width;
        c.height = data.height;
      });

      s.on("message", (data) => {
        const ctx = JSON.parse(data);
        const { token: tkn, command } = ctx.data;
        if (tkn) token = tkn;
        if (ctx.msg) c.write(ctx.msg + "\r\n");
        if (command === "quit") c.end();
      });

      s.on("error", (err) => {
        console.error(err);
      });

      c.on("end", () => s.close());

      c.on("error", (err) => console.log(err));

      c.on("data", (data) => {
        s.send(
          JSON.stringify({
            data: { token, height: c.height, width: c.width },
            msg: data.toString(),
          })
        );
      });
    }
  );

  server.listen(4202, () =>
    console.log("Telnet server listening on port: 4202")
  );
};
