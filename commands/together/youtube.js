const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "youtube",
  description: "watch youtube in discord",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply("join a vc");
    const embed = new MessageEmbed()
      .setTitle("youtube")
      .setColor("#cce1f2")
      .setDescription("Click the button to watch youtube in vc");

    const YoutubeLink = await client.discordTogether
      .createTogetherCode(message.member.voice.channelId, "youtube")
      .then(async (invite) => await invite.code);

    const youtubeButton = new MessageButton()
      .setURL(YoutubeLink)
      .setLabel("youtube")
      .setStyle("LINK");

    const components = (state) => [
      new MessageActionRow().addComponents(youtubeButton),
    ];

    await message.reply({
      embeds: [embed],
      components: components(false),
      allowedMentions: { repliedUser: false },
    });
  },
};
