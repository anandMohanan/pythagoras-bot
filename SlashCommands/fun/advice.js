const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "advice",
  description: "returns an advice",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
      const body = await fetch("http://api.adviceslip.com/advice");
      const advice = await body.json();
      const ans = advice.slip.advice;
      let adviceEmbed = new MessageEmbed()
        .setAuthor("Advice")
        .setColor("#cce1f2 ")
        .setDescription(ans);
      interaction.followUp({
        embeds: [adviceEmbed],
        allowedMentions: { repliedUser: false },
      });
    } catch (err) {
      message.channel.send(
        `An error occurred: \`${err.message}\`. Try again later!`
      );
    }
  },
};
