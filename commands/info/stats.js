const { Client, Message, MessageEmbed } = require("discord.js");
const os = require("os");
module.exports = {
  name: "stats",
  description: "returns the stats of the bot",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    console.log(client.user.createdAt);
    console.log(client.guilds.cache.size);
    console.log(client.channels.cache.size);
    console.log(client.users.cache.size);
    console.log(client.ws.ping);

    const embed = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle("Bot Stats")
      .setColor("#cce1f2")
      .addFields(
        {
          name: "🌐 Servers",
          value: `Serving ${client.guilds.cache.size} servers.`,
          inline: true,
        },
        {
          name: "📺 Channels",
          value: `Serving ${client.channels.cache.size} channels.`,
          inline: true,
        },
        {
          name: "👥 Server Users",
          value: `Serving ${client.users.cache.size}`,
          inline: true,
        },
        {
          name: "⏳ Ping",
          value: `${Math.round(client.ws.ping)}ms`,
          inline: true,
        },
        {
          name: "Join Date",
          value: client.user.createdAt.toString(),
          inline: true,
        },
        {
          name: "Server Info",
          value: `Cores: ${os.cpus().length}`,
          inline: true,
        }
      )
      .setFooter(`Created By:  KevinWho`);

    await message.reply({
      embeds: [embed],
      allowedMentions: { repliedUser: false },
    });
  },
};
