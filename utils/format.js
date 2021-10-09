const { parser } = require("@ursamu/core");

const remainder = (str, width, type = "telnet") => {
  let strArray = [];

  str
    .trim()
    .split("")
    .reduce((pre, cur) => {
      if (cur === "%") {
        if (pre) strArray.push(pre);

        return cur;
      } else {
        if (/%c./.test(pre)) {
          strArray.push(pre + cur);
          return "";
        } else if (/%[^cx]/.test(pre)) {
          strArray.push(pre);
          return cur;
        } else {
          return (pre += cur);
        }
      }
    }, "");

  let ret = [];
  for (const el of strArray) {
    if (/%.*/.test(el)) {
      ret.push(el);
    } else {
      ret.push(...el);
    }
  }

  ret = ret.length > 0 ? ret : str.split("");

  return ret.splice(0, width).join("") + "%cn";
};

/**
 * Repeat a string.
 * @param str The string to be releated
 * @param width Width with of the string to repeat
 * @param type The type of subs to perform defaults to 'telnet'.
 * @returns
 */
const repeat = (str, width, type = "telnet") => {
  const reWidth = parser.stripSubs(type ? type : "telnet", str).length;

  const rem = Math.round(width % reWidth);
  return str.repeat(width / reWidth) + remainder(str, rem);
};

/**
 * Break an array into spaced columns
 * @param list The array to be broken up
 * @param width The width of the overall table.
 * @param columns The number of columns.
 * @returns
 */
const columns = (list, width = 78, columns = 4, sep = " ") => {
  let line = "";
  let table = "";
  let ct = -1;
  if (columns <= 1) {
    table = list
      .map((item) => {
        return (
          item + repeat(" ", width - parser.stripSubs("telnet", item).length)
        );
      })
      .join("%r");
  } else {
    for (const idx in list) {
      let cellWidth =
        Math.round(
          width / columns - parser.stripSubs("telnet", list[idx]).length
        ) -
        sep.length -
        1;

      const cell =
        list[idx] +
        repeat(" ", cellWidth) +
        `${ct++ % columns !== 0 ? sep + " " : ""}`;

      if (parser.stripSubs("telnet", line + cell).length <= width) {
        line += cell;
      } else {
        table += line + "%r";
        line = cell;
      }
    }

    table += line;
  }
  return table;
};

const center = (str = "", width = 78, filler = " ", type = "telnet") => {
  const subWords = parser.stripSubs(type, str).length;
  const subFiller = parser.stripSubs(type, filler).length;
  const repWidth = width - subWords;

  return (
    repeat(filler, Math.round(repWidth / 2)) +
    str +
    repeat(filler, Math.floor(repWidth / 2))
  );
};

/**
 * Make a header.
 * @param str The string to be displayed the header
 * @param width the width of the header
 * @param color the color code for the header.
 * @returns
 */
const header = (str, width, color = "%cb") =>
  center(`%cy<%ch<%cn%ch ${str} %cy>%cn%cy>%cn`, width, `${color}=%ch-%cn`);

/**
 *
 * @param str
 * @param width
 * @param color
 * @returns
 */
const headerNarrow = (str, width, color) =>
  center(
    `%cy<%ch<%cn%ch ${str} %cy>%cn%cy>%cn`,
    width,
    `%${color}-%${color}-%cn`
  );

module.exports = {
  header,
  headerNarrow,
  center,
  repeat,
  columns,
};
