const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "smug",
  description: "smug image",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const body = await fetch("https://api.waifu.pics/sfw/smug");
    const image = await body.json();
    let user = message.mentions.users.first();
    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} has a smug look!`)
      .setImage(image.url)
      .setColor("#cce1f2");

    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
  },
};
