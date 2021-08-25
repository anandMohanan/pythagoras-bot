const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "lock",
  description: "locks the whole server",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS")) {
      return message.reply({
        content: `You dont have enough permissions to kick members`,
        allowedMentions: { repliedUser: false },
      });
    }
    const channels = message.guild.channels.cache.filter(
      (ch) => ch.type !== "category"
    );
    if (args[0] === "on") {
      channels.forEach((channel) => {
        channel.permissionOverwrites
          .edit(message.guild.roles.everyone, {
            SEND_MESSAGES: false,
          })
          .then(() => {
            channel.setName((channel.name += `🔒`));
          });
      });
      let lockdone = new MessageEmbed()
        .setColor("#cce1f2")
        .setDescription(`locked all channels`);
      return message.reply({
        embeds: [lockdone],
        allowedMentions: { repliedUser: false },
      });
    } else if (args[0] === "off") {
      channels.forEach((channel) => {
        channel.permissionOverwrites
          .edit(message.guild.roles.everyone, {
            SEND_MESSAGES: true,
          })
          .then(() => {
            channel.setName(channel.name.replace("🔒", ""));
          });
      });
      let unlockdone = new MessageEmbed()
        .setColor("#cce1f2")
        .setDescription(`unlocked all channels`);
      return message.reply({
        embeds: [unlockdone],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
