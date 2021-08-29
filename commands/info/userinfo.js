const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "userinfo",
  description: "shows information about the user",
  aliases: ["info"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let mentionedMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]).user ||
      message.member;
    var status = mentionedMember.presence.status;
    if (status == "dnd") status = "Do Not Disturb";
    if (status == "online") status = "Online";
    if (status == "offline") status = "Offline";
    if (status === "idle") status = "Idle";
    const roles = mentionedMember.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);

    let displayRoles;
    if (roles.length < 20) {
      displayRoles = roles.join(" ");
      if (roles.length < 1) displayRoles = "None";
    } else {
      displayRoles = roles.slice(20).join(" ");
    }

    const embed = new MessageEmbed()
      .setAuthor(
        `User information of ${mentionedMember.user.username}`,
        mentionedMember.user.displayAvatarURL()
      )
      .addField(`Tag: `, `\`${mentionedMember.user.tag}\``)
      .addField(`Username:`, `\`${mentionedMember.user.username}\`` || "None")
      .addField(`ID:`, `\`${mentionedMember.id}\``)
      .addField(
        `Avatar:`,
        `[Click here to view Avatar](${mentionedMember.user.displayAvatarURL({
          dynamic: true,
        })})`
      )
      .addField(`Status:`, `\`${status}\``)
      .addField(`Account Created At:`, `\`${mentionedMember.user.createdAt}\``)
      .addField(`**Joined The Server At: **`, `\`${mentionedMember.joinedAt}\``)
      .addField(`Roles: \`[${roles.length}]\``, `${displayRoles}`)

      .setColor("#cce1f2");
    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
  },
};
