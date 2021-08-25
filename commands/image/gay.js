const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const DIG = require("discord-image-generation");
module.exports = {
  name: "gay",
  description: "gay image",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]).user;
    } else {
      user = message.author;
    }

    let avatar = await user.displayAvatarURL({ dynamic: false, format: "png" });
    //let level = 5;
    let image = await new DIG.Gay().getImage(avatar);
    let attach = new MessageAttachment(image, "gay.png");
    const embed = new MessageEmbed()
      .setTimestamp()
      .setColor("#cce1f2")
      .setImage("attachment://gay.png");
    return await message.reply({
      files: [attach],
      embeds: [embed],
      allowedMentions: { repliedUser: false },
    });
  },
};
