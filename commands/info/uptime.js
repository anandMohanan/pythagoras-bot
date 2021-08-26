const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "uptime",
  description: "returns the uptime of the bot",
  aliases: ["up"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    let uptimeEmbed = new MessageEmbed()
      .setColor("#cce1f2")
      .setDescription(
        ` Uptime: \`${days} day(s),${hours} hours, ${minutes} minutes, ${seconds} seconds\``
      );
    return message.reply({
      embeds: [uptimeEmbed],
      allowedMentions: { repliedUser: false },
    });
  },
};
