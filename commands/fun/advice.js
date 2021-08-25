const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "advice",
  description: "returns an advice",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const body = await fetch("http://api.adviceslip.com/advice");
      const advice = await body.json();
      const ans = advice.slip.advice;
      let adviceEmbed = new MessageEmbed()
        .setAuthor("Advice")
        .setColor("#cce1f2 ")
        .setDescription(ans);
      message.reply({
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
