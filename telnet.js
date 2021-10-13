const telnetlib = require("telnetlib");
const io = require("socket.io-client");

const intro = `

 ...    ::::::::::..   .::::::.   :::.     .        :    ...    :::
 ;;     ;;;;;;;'';;;; ;;;'    '   ;;';;    ;;,.    ;;;   ;;     ;;;
[['     [[[ [[[,/[[[' '[==/[[[[, ,[[ '[[,  [[[[, ,[[[[, [['     [[[
$$      $$$ $$$$$$c     '''    $c$$$cc$$$c $$$$$$$$"$$$ $$      $$$
88    .d888 888b "88bo,88b    dP 888   888,888 Y88" 888o88    .d888
 "YmmMMMM"" MMMM   "W"  "YMmMY"  YMM   ""' MMM  M'  "MMM "YmmMMMM""

Type 'create <password>' to register a new account.
Type 'connect <name> <password>' to connect.

Type 'QUIT' to disconnect.
`;

const { NAWS } = telnetlib.options;
const server = telnetlib.createServer(
  {
    localOptions: [NAWS],
    remoteOptions: [NAWS],
  },
  async (c) => {
    let token;
    c.write(intro + "\r\n");

    const naws = c.getOption(NAWS);

    // handle screen resize.
    naws.on("resize", (data) => {
      c.width = data.width;
      c.height = data.height;
    });

    const connect = () => {
      const s = io("http://localhost:1337");
      s.on("message", (ctx) => {
        if (ctx?.data?.token) token = ctx?.data?.token;
        if (ctx.msg) c.write(ctx.msg + "\r\n");
      });

      s.io.on("reconnect", () => {
        s.send({
          data: { token, height: c.height, width: c.width },
          msg: "think ...Reconnected...",
        });
      });

      s.on("disconnect", (reason) => {
        if (reason.includes("close") || reason.includes("timeout")) {
          connect();
        } else {
          c.end();
        }
      });

      s.on("quit", () => c.end());

      s.on("error", (err) => {
        console.error(err);
      });

      c.on("end", () => s.close());

      c.on("error", (err) => console.log(err));

      c.on("data", (data) => {
        s.send({
          data: { token, height: c.height, width: c.width },
          msg: data.toString(),
        });
      });
    };

    connect();
  }
);

server.listen(4202, () => console.log("Telnet server listening on port: 4202"));
