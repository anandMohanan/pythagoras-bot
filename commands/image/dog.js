const fetch = require("node-fetch");
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "god",
  description: "random dog image",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const img = (await res.json()).message;
      const embed = new MessageEmbed()

        .setImage(img)

        .setTimestamp()
        .setColor("#cce1f2");
      message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } catch (err) {}
  },
};
