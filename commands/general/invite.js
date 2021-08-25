const {
  Message,
  Client,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
} = require("discord.js");

module.exports = {
  name: "invite",
  description: "returns an invite link to invite the bot to your server",
  aliases: ["inv"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const InviteLink =
      "https://discord.com/api/oauth2/authorize?client_id=858246719649087509&permissions=8&scope=bot%20applications.commands";
    let button = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Click here to invite me")
        .setStyle("LINK")
        .setURL(InviteLink)
    );

    let inviteEmbed = new MessageEmbed()
      .setTitle("Invite me!")
      .setColor("#cce1f2");
    return message.reply({
      embeds: [inviteEmbed],
      components: [button],
      allowedMentions: { repliedUser: false },
    });
  },
};
