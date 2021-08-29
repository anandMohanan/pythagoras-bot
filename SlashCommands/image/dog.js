const fetch = require("node-fetch");
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "dog",
  description: "returns a random dog image",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const img = (await res.json()).message;
      const embed = new MessageEmbed()

        .setImage(img)

        .setTimestamp()
        .setColor("#cce1f2");

      return interaction.followUp({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } catch (err) {}
  },
};
