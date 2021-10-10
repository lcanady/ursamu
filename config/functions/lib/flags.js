const { flags } = require("@ursamu/core");

module.exports = () => {
  flags.add(
    {
      name: "immortal",
      code: "i",
      lvl: 10,
      lock: "immortal",
    },
    {
      name: "wizard",
      code: "w",
      lvl: 9,
      lock: "immortal",
    },
    {
      name: "staff",
      code: "s",
      lvl: 5,
      lock: "wizard+",
    },
    {
      name: "player",
      code: "p",
      lvl: 0,
      lock: "wizard+",
    },
    {
      name: "room",
      code: "r",
      lvl: 0,
      lock: "wizard+",
    },
    {
      name: "exit",
      code: "e",
      lvl: 0,
      lock: "wizard+",
    },
    {
      name: "connected",
      code: "C",
      lvl: 0,
      lock: "wizard+",
    },
    {
      name: "dark",
      code: "D",
      lvl: 0,
      lock: "wizard+",
    },
    {
      name: "newbie",
      code: "n",
      lvl: 0,
      lock: "wizard+",
    },
    {
      name: "fancy",
      code: "~",
      lvl: 0,
      lock: "connected",
    }
  );
};
