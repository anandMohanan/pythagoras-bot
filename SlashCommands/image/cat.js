const fetch = require("node-fetch");

const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
  name: "cat",
  description: "returns a random cat image",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
      const body = await fetch("https://api.thecatapi.com/v1/images/search");
      const catImage = await body.json();
      const finalImg = await catImage[0].url;
      const catImg = new MessageEmbed()
        .setImage(finalImg)
        .setColor("#cce1f2")
        .setTimestamp();
      return interaction.followUp({
        embeds: [catImg],
        allowedMentions: { repliedUser: false },
      });
    } catch (err) {}
  },
};
