const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "blush",
  description: "blush image",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const body = await fetch("https://api.waifu.pics/sfw/blush");
    const image = await body.json();
    let user = message.mentions.users.first();
    const embed = new MessageEmbed().setImage(image.url).setColor("#cce1f2");

    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
  },
};
