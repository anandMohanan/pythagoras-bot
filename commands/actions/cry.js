const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "cry",
  description: "cry image ",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const body = await fetch("https://api.waifu.pics/sfw/cry");
    const image = await body.json();

    const embed = new MessageEmbed()
      .setImage(image.url)

      .setColor("#cce1f2");
    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
  },
};
