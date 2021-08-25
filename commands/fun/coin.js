const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "coin",
  description: "flips a coin and returns the value",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const randomNumber = Math.round(Math.random());
      const ans = ["heads", "tails"];
      const embed = new MessageEmbed()
        .setTitle(ans[randomNumber])

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
