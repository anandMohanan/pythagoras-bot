const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  CommandInteraction,
} = require("discord.js");

module.exports = {
  name: "youtube",
  description: "watch youtube in discord",
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
      .setTitle("youtube")
      .setDescription("Click the button to watch youtube in vc");

    const YoutubeLink = await client.discordTogether
      .createTogetherCode(interaction.member.voice.channelId, "youtube")
      .then(async (invite) => await invite.code);

    const youtubeButton = new MessageButton()
      .setURL(YoutubeLink)
      .setLabel("youtube")
      .setStyle("LINK");

    const components = (state) => [
      new MessageActionRow().addComponents(youtubeButton),
    ];

    await interaction.followUp({
      embeds: [embed],
      components: components(false),
      allowedMentions: { repliedUser: false },
    });
  },
};
