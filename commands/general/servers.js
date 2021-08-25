const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "servers",
  description: "returns the list of servers using the bot",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    // for (const guild of client.guilds.cache.values()) {
    //   console.log(guild.name);
    // }

    let hi = Array.from(client.guilds.cache.values());
    // console.log(hi.join("\n"));

    let serverEmbed = new MessageEmbed()
      .setColor("#cce1f2")
      .setDescription(hi.join("\n"));

    message.reply({
      embeds: [serverEmbed],
      allowedMentions: { repliedUser: false },
    });
  },
};
