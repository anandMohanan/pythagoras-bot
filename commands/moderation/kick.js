const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  description: "kicks the mentioned user",
  userPermissions: ["KICK_MEMBERS"],
  botPermissions: ["KICK_MEMBERS"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.reply({
        content: `Please mention a user!`,
        allowedMentions: { repliedUser: false },
      });
    }
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    try {
      await member.kick();
      let kickdone = new MessageEmbed()
        .setColor("#cce1f2")
        .setDescription(`${member} has been kicked!`);
      await message.reply({
        embeds: [kickdone],
        allowedMentions: { repliedUser: false },
      });
    } catch (e) {
      return message.reply({
        content: "User is not in this server!",
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
