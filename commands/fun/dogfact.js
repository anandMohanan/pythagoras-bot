const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "dogfact",
  description: "returns a dogfact",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const res = await fetch("https://dog-api.kinduff.com/api/facts");
      const fact = (await res.json()).facts[0];
      const embed = new MessageEmbed()
        .setTitle("Dog Fact")
        .setDescription(fact)
        .setColor("#cce1f2");
      message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
