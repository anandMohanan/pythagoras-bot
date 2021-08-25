const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "purge",
  aliases: ["prune"],
  description: "deletes the messages",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.reply(
        "you do not have enough permissions to run this command"
      );
    const amount = parseInt(args[0]);
    if (isNaN(amount)) {
      return message.reply({
        content: `that doesn't seem to be a valid number.`,
        allowedMentions: { repliedUser: false },
      });
    } else if (amount <= 1 || amount > 100) {
      return message.reply({
        content: `you need to input a number between 1 and 99.`,
        allowedMentions: { repliedUser: false },
      });
    }

    message.channel.bulkDelete(amount, true);
    try {
      let purgedone = new MessageEmbed()
        .setColor("#cce1f2")
        .setDescription(`${amount} messages deleted`);
      message.reply({
        embeds: [purgedone],
        allowedMentions: { repliedUser: false },
      });
    } catch (err) {
      message.reply({
        content: `there was an error trying to prune messages in this channel!`,
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
