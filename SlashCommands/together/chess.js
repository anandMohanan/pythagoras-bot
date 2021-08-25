const {
  Client,

  MessageEmbed,
  MessageActionRow,
  MessageButton,

  CommandInteraction,
} = require("discord.js");

module.exports = {
  name: "chess",
  description: "play chess in discord vc",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    if (!interaction.member.voice.channel)
      return interaction.editReply("join a vc");
    const embed = new MessageEmbed()
      .setTitle("chess")
      .setDescription("Click the button to play chess");

    const ChessLink = await client.discordTogether
      .createTogetherCode(interaction.member.voice.channelId, "chess")
      .then(async (invite) => await invite.code);

    const chessButton = new MessageButton()
      .setURL(ChessLink)
      .setLabel("chess")
      .setStyle("LINK");

    const components = (state) => [
      new MessageActionRow().addComponents(chessButton),
    ];

    await interaction.followUp({
      embeds: [embed],
      components: components(false),
      allowedMentions: { repliedUser: false },
    });
  },
};
