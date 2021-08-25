const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "neko",
  description: "neko image",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const body = await fetch("https://api.waifu.pics/sfw/neko");
    const image = await body.json();

    const embed = new MessageEmbed()
      .setImage(image.url)

      .setColor("#cce1f2");
    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
  },
};
