const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "returns websocket ping",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    message.reply("ping").then(async (sent) => {
      const created = message.createdTimestamp;
      sent.delete();
      let pingEmbed = new MessageEmbed()
        .setColor("#cce1f2")
        .setTitle("Pong!")
        .addField(" Latency", `${sent.createdTimestamp - created}ms`)
        .addField("Discord API Latency", `${Math.round(client.ws.ping)}ms`);
      return message.reply({
        embeds: [pingEmbed],
        allowedMentions: { repliedUser: false },
      });
    });
  },
};
