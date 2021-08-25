// const Discord = require("discord.js");
// const { MessageEmbed } = require("discord.js");

// exports.run = async (client, message, args) => {
//   let user;
//   if (message.mentions.users.first()) {
//     user = message.mentions.users.first();
//   } else if (args[0]) {
//     user = message.guild.members.cache.get(args[0]).user;
//   } else {
//     user = message.author;
//   }

//   let avatar = user.displayAvatarURL({ size: 4096, dynamic: true });
//   let avatarEmbed = new MessageEmbed()
//     .setImage(avatar)
//     .setColor("#A348A6")
//     .setFooter(
//       message.member.displayName,
//       message.author.displayAvatarURL({ dynamic: true })
//     )
//     .setTimestamp();
//   return message.lineReplyNoMention(avatarEmbed);
// };

// exports.help = {
//   name: "avatar",
//   description: "Shows avatar of a User",
//   usage: "avatar [@user]",
//   example: "avatar @user",
// };

// exports.conf = {
//   aliases: ["icon"],
//   cooldown: 0,
// };
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "returns avatar of the mentioned user",
  aliases: ["av"],
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

    let avatar = user.displayAvatarURL({ size: 4096, dynamic: true });
    let avatarEmbed = new MessageEmbed()
      .setImage(avatar)
      .setColor("#cce1f2")
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();
    return message.reply({
      embeds: [avatarEmbed],
      allowedMentions: { repliedUser: false },
    });
  },
};
