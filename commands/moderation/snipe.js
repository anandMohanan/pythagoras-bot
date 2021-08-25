const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "snipe",
  description: "shows previously deleted message",

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
    try {
      const snipes = client.snipes.get(message.channel.id);
      if (!snipes) {
        return message.reply({
          content: "no messages deleted",
          allowedMentions: { repliedUser: false },
        });
      }
      const snipe = 0;
      const target = snipes[snipe];
      const { msg } = target;
      let snipedone = new MessageEmbed()
        .setColor("#cce1f2")
        .setDescription(msg.content)
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL());
      await message.reply({
        embeds: [snipedone],
        allowedMentions: { repliedUser: false },
      });
    } catch (e) {
      console.log(e);
      return message.reply({
        content: "error",
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
