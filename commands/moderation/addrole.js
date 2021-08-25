const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "addrole",
  description: "adds the role to the mentioned user",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.reply(
        "you do not have enough permissions to run this command"
      );
    if (!args[0] || !args[1]) {
      return message.reply({
        content: "usage: <username || user id> <role name || id>",
        allowedMentions: { repliedUser: false },
      });
    }
    try {
      const member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      const roleName = message.guild.roles.cache.find(
        (r) =>
          r.name === args[1].toString() ||
          r.id === args[1].toString().replace(/[^\w\s]/gi, "")
      );

      const alreadyHasRole = member._roles.includes(roleName.id);

      if (alreadyHasRole) {
        return message.reply({
          content: "User already has that role",
          allowedMentions: { repliedUser: false },
        });
      }
      const embed = new MessageEmbed()
        .setTitle(`Role Name: ${roleName.name}`)
        .setDescription(
          `${message.author} has successfully given the role ${roleName} to ${member.user}`
        )
        .setColor("#cce1f2");

      return member.roles
        .add(roleName)
        .then(() => message.reply({ embeds: [embed] }));
    } catch (e) {
      return message.reply({
        content: "give a role that exists in your server",
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
