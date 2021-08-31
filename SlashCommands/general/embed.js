const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "embed",
  description: "returns websocket pingsends an embed message to a channel",
  options: [
    {
      name: "channel",
      description: "channel to send to",
      required: true,
      type: "CHANNEL",
    },
    {
      name: "message",
      description: "your message",
      required: true,
      type: "STRING",
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const [channel, message] = args;
    const embed = new MessageEmbed().setDescription(message);
    const channelToSend = interaction.guild.channels.cache.get(channel);
    channelToSend
      .send({ embeds: [embed] })
      .then(() => interaction.followUp({ content: "message sent" }));
  },
};
