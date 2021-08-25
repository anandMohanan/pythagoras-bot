const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  description: "kicks the mentioned user",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("KICK_MEMBERS"))
      return message.reply(
        "you do not have enough permissions to run this command"
      );
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
