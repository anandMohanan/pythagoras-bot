const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "snipe",
  description: "shows previously deleted message",
  userPermissions: ["MANAGE_MESSAGES"],
  botPermissions: ["MANAGE_MESSAGES"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
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
