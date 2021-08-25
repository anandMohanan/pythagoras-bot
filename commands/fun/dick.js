const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "dick",
  description: "returns the size of your dick",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      let randomNumber = Math.floor(Math.random() * 18);
      const cockSize = randomNumber;
      const balls = "8";
      const shaft = "=".repeat(cockSize);
      const head = "D";
      const cock = balls + shaft + head;
      let pingEmbed = new MessageEmbed()
        .setColor("#cce1f2")
        .setAuthor(`${cockSize} inch(es)`)
        .setDescription(cock);
      message.reply({
        embeds: [pingEmbed],
        allowedMentions: { repliedUser: false },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
