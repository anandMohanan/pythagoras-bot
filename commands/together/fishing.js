const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "fishing",
  description: "play fishing with friends",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply("join a vc");
    const embed = new MessageEmbed()
      .setTitle("fishing")
      .setColor("#cce1f2")
      .setDescription("Click the button to play fishing");

    const FishingLink = await client.discordTogether
      .createTogetherCode(message.member.voice.channelId, "fishing")
      .then(async (invite) => await invite.code);

    const fishingButton = new MessageButton()
      .setURL(FishingLink)
      .setLabel("fishing")
      .setStyle("LINK");

    const components = (state) => [
      new MessageActionRow().addComponents(fishingButton),
    ];

    await message.reply({
      embeds: [embed],
      components: components(false),
      allowedMentions: { repliedUser: false },
    });
  },
};
