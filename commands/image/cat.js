const fetch = require("node-fetch");

const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "cat",
  description: "random cat image",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const body = await fetch("https://api.thecatapi.com/v1/images/search");
      const catImage = await body.json();
      const finalImg = await catImage[0].url;
      const catImg = new MessageEmbed()
        .setImage(finalImg)
        .setColor("#cce1f2")
        .setTimestamp();
      message.reply({
        embeds: [catImg],
        allowedMentions: { repliedUser: false },
      });
    } catch (err) {}
  },
};
