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
  name: "betrayal",
  description: "play betrayal with friends",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    console.log(args);
    if (!interaction.member.voice.channel)
      return interaction.editReply("join a vc");
    const embed = new MessageEmbed()
      .setTitle("Betrayal")
      .setDescription("Click the button to play betrayal");

    const BetrayalLink = await client.discordTogether
      .createTogetherCode(interaction.member.voice.channelId, "betrayal")
      .then(async (invite) => await invite.code);

    const betrayalButton = new MessageButton()
      .setURL(BetrayalLink)
      .setLabel("betrayal")
      .setStyle("LINK");

    const components = (state) => [
      new MessageActionRow().addComponents(betrayalButton),
    ];

    await interaction.followUp({
      embeds: [embed],
      components: components(false),
      allowedMentions: { repliedUser: false },
    });
  },
};
