const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "purge",
  aliases: ["prune"],
  description: "deletes the messages",
  userPermissions: ["MANAGE_MESSAGES"],
  botPermissions: ["MANAGE_MESSAGES"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    // const amount = parseInt(args[0]);
    // if (isNaN(amount)) {
    //   return message.reply({
    //     content: `that doesn't seem to be a valid number.`,
    //     allowedMentions: { repliedUser: false },
    //   });
    // } else if (amount <= 1 || amount > 100) {
    //   return message.reply({
    //     content: `you need to input a number between 1 and 99.`,
    //     allowedMentions: { repliedUser: false },
    //   });
    // }

    // message.channel.bulkDelete(amount, true);
    // try {
    //   let purgedone = new MessageEmbed()
    //     .setColor("#cce1f2")
    //     .setDescription(`${amount} messages deleted`);
    //   message.reply({
    //     embeds: [purgedone],
    //     allowedMentions: { repliedUser: false },
    //   });
    // } catch (err) {
    //   message.reply({
    //     content: `there was an error trying to prune messages in this channel!`,
    //     allowedMentions: { repliedUser: false },
    //   });
    // }
    let int = args[0];
    if (int > 100) int = 100;

    try {
      await message.delete();
      const fetch = await message.channel.messages.fetch({ limit: int });
      const deletedMessages = await message.channel.bulkDelete(fetch, true);

      const results = {};
      for (const [, deleted] of deletedMessages) {
        const user = `${deleted.author.username}#${deleted.author.discriminator}`;
        if (!results[user]) results[user] = 0;
        results[user]++;
      }

      const userMessageMap = Object.entries(results);

      const finalResult = `${deletedMessages.size} message${
        deletedMessages.size > 1 ? "s" : ""
      } were removed!\n\n${userMessageMap
        .map(([user, messages]) => `**${user}** : ${messages}`)
        .join("\n")}`;
      await message.channel
        .send({ content: finalResult })
        .then(async (msg) => setTimeout(() => msg.delete(), 5000));
    } catch (err) {
      if (String(err).includes("Unknown Message"))
        return console.log("[ERROR!] Unknown Message");
    }
  },
};
