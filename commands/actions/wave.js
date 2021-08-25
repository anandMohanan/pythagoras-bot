const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "wave",
  description: "wave image",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.mentions.users.size < 1)
      return message.reply({
        content: " please tag someone",
        allowedMentions: { repliedUser: false },
      });
    const body = await fetch("https://api.waifu.pics/sfw/wave");
    const image = await body.json();
    let user = message.mentions.users.first();
    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} waves at ${user.username}`)
      .setImage(image.url)
      .setColor("#cce1f2");

    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
  },
};
