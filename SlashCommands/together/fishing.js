const {
  Client,

  MessageEmbed,
  MessageActionRow,
  MessageButton,

  CommandInteraction,
} = require("discord.js");

module.exports = {
  name: "fishing",
  description: "play fishing with friends",
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
      .setTitle("fishing")
      .setDescription("Click the button to play fishing");

    const FishingLink = await client.discordTogether
      .createTogetherCode(interaction.member.voice.channelId, "fishing")
      .then(async (invite) => await invite.code);

    const fishingButton = new MessageButton()
      .setURL(FishingLink)
      .setLabel("fishing")
      .setStyle("LINK");

    const components = (state) => [
      new MessageActionRow().addComponents(fishingButton),
    ];

    await interaction.followUp({
      embeds: [embed],
      components: components(false),
      allowedMentions: { repliedUser: false },
    });
  },
};
