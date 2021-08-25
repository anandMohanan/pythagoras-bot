const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "chess",
  description: "play chess in discord vc",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply("join a vc");
    const embed = new MessageEmbed()
      .setTitle("chess")
      .setColor("#cce1f2")
      .setDescription("Click the button to play chess");

    const ChessLink = await client.discordTogether
      .createTogetherCode(message.member.voice.channelId, "chess")
      .then(async (invite) => await invite.code);

    const chessButton = new MessageButton()
      .setURL(ChessLink)
      .setLabel("chess")
      .setStyle("LINK");

    const components = (state) => [
      new MessageActionRow().addComponents(chessButton),
    ];

    await message.reply({
      embeds: [embed],
      components: components(false),
      allowedMentions: { repliedUser: false },
    });
  },
};
