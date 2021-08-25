const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "betrayal",
  description: "play betrayal with friends",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply("join a vc");
    const embed = new MessageEmbed()
      .setTitle("Betrayal")
      .setColor("#cce1f2")
      .setDescription("Click the button to play betrayal");

    const BetrayalLink = await client.discordTogether
      .createTogetherCode(message.member.voice.channelId, "betrayal")
      .then(async (invite) => await invite.code);

    const betrayalButton = new MessageButton()
      .setURL(BetrayalLink)
      .setLabel("betrayal")
      .setStyle("LINK");

    const components = (state) => [
      new MessageActionRow().addComponents(betrayalButton),
    ];

    await message.reply({
      embeds: [embed],
      components: components(false),
      allowedMentions: { repliedUser: false },
    });
  },
};
