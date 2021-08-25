const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
module.exports = {
  name: "servers",
  description: "returns the list of servers using the bot",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    // for (const guild of client.guilds.cache.values()) {
    //   console.log(guild.name);
    // }

    let hi = Array.from(client.guilds.cache.values());
    // console.log(hi.join("\n"));

    let serverEmbed = new MessageEmbed()
      .setColor("#cce1f2")
      .setDescription(hi.join("\n"));

    interaction.editReply({ embeds: [serverEmbed] });
  },
};
