const {
  Client,

  MessageEmbed,
  MessageActionRow,
  MessageButton,

  CommandInteraction,
} = require("discord.js");

module.exports = {
  name: "poker",
  description: "play poker in discord vc",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    if (!interaction.member.voice.channel) return interaction.editReply("join a vc");
    const embed = new MessageEmbed()
      .setTitle("poker")
      .setDescription("Click the button to play poker");

    const PokerLink = await client.discordTogether
      .createTogetherCode(interaction.member.voice.channelId, "poker")
      .then(async (invite) => await invite.code);

    const pokerButton = new MessageButton()
      .setURL(PokerLink)
      .setLabel("poker")
      .setStyle("LINK");

    const components = (state) => [
      new MessageActionRow().addComponents(pokerButton),
    ];

    await message.reply({
      embeds: [embed],
      components: components(false),
      allowedMentions: { repliedUser: false },
    });
  },
};
