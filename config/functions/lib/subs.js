const { parser } = require("@ursamu/core");

module.exports = () => {
  // Markdown substitutions
  parser.addSubs(
    "telnet",
    {
      before: /\*\*([^\*]+)\*\*/g,
      after: "%ch$1%cn",
      strip: "$1",
    },
    {
      before: /[#]+\s+(.*)/g,
      after: "%ch%u$1%cn",
      strip: "$1",
    },
    {
      before: /^>\s+([\s|\S]+)/g,
      after: "$1",
      strip: "$1",
    },
    {
      before: /_([^_]+)_/g,
      after: "%u$1%cn",
      strip: "$1",
    },
    {
      before: /\[(.*)\]\(([^\)]+)\)/g,
      after: "%ch%u$1%cn",
      strip: "$1",
    },
    {
      before: /`{1,3}([^`]+)`{1,3}/g,
      after: "%ch$1%cn",
      strip: "$1",
    },
    {
      before: /\n/g,
      after: "%r",
    },

    {
      before: /\t/g,
      after: "%t",
    }
  );

  // Ansi substitutions
  parser.addSubs(
    "telnet",
    {
      before: /%[cx]x/g,
      after: "\u001b[30m",
    },
    {
      before: /%[cx]r/g,
      after: "\u001b[31m",
    },
    {
      before: /%[cx]g/g,
      after: "\u001b[32m",
    },
    {
      before: /%[cx]y/g,
      after: "\u001b[33m",
    },
    {
      before: /%[cx]b/g,
      after: "\u001b[34m",
    },
    {
      before: /%[cx]m/g,
      after: "\u001b[35m",
    },
    {
      before: /%[cx]c/g,
      after: "\u001b[36m",
    },
    {
      before: /%[cx]w/g,
      after: "\u001b[37m",
    },
    {
      before: /%[cx]n/g,
      after: "\u001b[0m",
    },
    {
      before: /%[cx]h/g,
      after: "\u001b[1m",
    },
    {
      before: /%u/g,
      after: "\u001b[4m",
    },
    {
      before: /\s/g,
      after: " ",
      strip: ".",
    },
    {
      before: "%cX",
      after: "\u001b[40m",
    },
    {
      before: "%cR",
      after: "\u001b[41m",
    },
    {
      before: "%cG",
      after: "\u001b[42m",
    },
    {
      before: "%cY",
      after: "\u001b[43m",
    },
    {
      before: "%cB",
      after: "\u001b[44m",
    },
    {
      before: "%cM",
      after: "\u001b[45m",
    },
    {
      before: "%cC",
      after: "\u001b[46m",
    },
    {
      before: "%cW",
      after: "\u001b[47m",
    },
    {
      before: "%t",
      after: "\t",
    },
    {
      before: "%r",
      after: "\n",
    },
    {
      before: "%b",
      after: " ",
      strip: " ",
    },
    {
      before: /%[cx]#(\d{1,3})/g,
      after: "\u001b[38;5;$1m",
    }
  );

  parser.addSubs(
    "pre",
    {
      before: /%\(/g,
      after: "&lpar",
      strip: " ",
    },
    {
      before: /%\)/g,
      after: "&rpar",
      strip: " ",
    },
    {
      before: /%\[/g,
      after: "&lbrac",
      strip: " ",
    },
    {
      before: /%\]/g,
      after: "&rbrac",
      strip: " ",
    }
  );

  parser.addSubs(
    "post",
    {
      before: /&lpar/g,
      after: "(",
    },
    {
      before: /&rpar/g,
      after: ")",
    },
    {
      before: /&lbrac/g,
      after: "[",
    },
    {
      before: /&rbrac/g,
      after: "]",
    }
  );
};
