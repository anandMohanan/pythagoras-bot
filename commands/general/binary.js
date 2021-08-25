module.exports = {
  name: "binary",
  description: "encode and decode binary",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.reply(
        "`Unknown parameter. Please choose the method first, either decode or encode it.`"
      );
    }
    let choice = ["encode", "decode"];
    if (!choice.includes(args[0].toLowerCase())) {
      return message.reply(
        "`Unknown parameter. Please choose the method first, either decode or encode it.`"
      );
    }
    let text = args.slice(1).join(" ");
    // binary <encode | decode> <text>
    // binary encode blob development

    if (!text) {
      return message.reply(
        "`Unknown parameter. Please choose the method first, either decode or encode it.`"
      );
    }

    // Do this because more than that, the binary code wouldn't be fit anymore.
    if (text.length > 1024) {
      return message.reply(
        "`That is way too much. The maximum character was 1,024.`"
      );
    }
    function encode(char) {
      return char
        .split("")
        .map((str) => {
          const converted = str.charCodeAt(0).toString(2);
          return converted.padStart(8, "0");
        })
        .join(" ");
    }

    function decode(char) {
      return char
        .split(" ")
        .map((str) => String.fromCharCode(Number.parseInt(str, 2)))
        .join("");
    }

    if (args[0].toLowerCase() === "encode") {
      return message.reply(encode(text));
    } else if (args[0].toLowerCase() === "decode") {
      return message.reply(decode(text));
    }
  },
};
