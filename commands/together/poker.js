const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "poker",
  description: "play poker in discord vc",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply("join a vc");
    const embed = new MessageEmbed()
      .setTitle("poker").setColor("#cce1f2")
      .setDescription("Click the button to play poker");

    const PokerLink = await client.discordTogether
      .createTogetherCode(message.member.voice.channelId, "poker")
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
