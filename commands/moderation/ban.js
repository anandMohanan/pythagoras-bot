const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Bans the mentioned user",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.reply({
        content: "`You dont have enough permissions to ban members`",
        allowedMentions: { repliedUser: false },
      });
    }
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
      await member.ban();
      let bandone = new MessageEmbed()
        .setColor("#cce1f2")
        .setDescription(`${member} has been banned!`);
      await message.reply({
        embeds: [bandone],
        allowedMentions: { repliedUser: false },
      });
    } catch (e) {
      console.log(e);
    }
  },
};
