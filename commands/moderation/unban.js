const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "unban",
  description: "unbans a user",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.reply(
        "you do not have enough permissions to run this command"
      );
    if (!args[0]) {
      return message.reply({
        content: `Please mention a user!`,
        allowedMentions: { repliedUser: false },
      });
    }
    let member;

    try {
      member = await client.users.fetch(args[0]);
    } catch (e) {
      return message.reply({
        content: "User is not in this server!",
        allowedMentions: { repliedUser: false },
      });
    }

    const reason = args[1] ? args.slice(1).join(" ") : "no reason";

    const embed = new MessageEmbed();

    message.guild.bans
      .fetch()

      .then((bans) => {
        const user = bans.find((ban) => ban.user.id === member.id);

        if (user) {
          embed.setTitle(`Unbanned ${user.user.tag}`).setColor("#cce1f2");

          message.guild.members.unban(user.user.id, reason).then(() =>
            message.reply({
              embeds: [embed],
              allowedMentions: { repliedUser: false },
            })
          );
        } else {
          message.reply({
            content: `User ${member.tag} isn't banned!`,
            allowedMentions: { repliedUser: false },
          });
        }
      })
      .catch((e) => {
        console.log(e);

        message.reply({
          content: "An error has occurred!",
          allowedMentions: { repliedUser: false },
        });
      });
  },
};
