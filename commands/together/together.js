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
  name: "together",
  description: "youtube|betrayal|chess|fishing|poker",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply("join a vc");
    const embed = new MessageEmbed()
      .setTitle("discord-together")
      .setDescription("Please choose an option to get the invite link");
    const components = (state) => [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("together")
          .setPlaceholder("Click to see all the options.")
          .setDisabled(state)
          .addOptions([
            {
              label: "youtube",
              description: "watch youtube with friends in vc",
              value: "youtube",
            },
            {
              label: "poker",
              description: "play poker with friends in vc",
              value: "poker",
            },
            {
              label: "chess",
              description: "play chess with friends in vc",
              value: "chess",
            },
            {
              label: "fishing",
              description: "play fishing with friends in vc",
              value: "fishing",
            },
            {
              label: "betrayal",
              description: "play betrayal with friends in vc",
              value: "betrayal",
            },
          ])
      ),
    ];

    const initialMessage = await message.reply({
      embeds: [embed],
      components: components(false),
      allowedMentions: { repliedUser: false },
    });
    /**
     *
     * @param {CommandInteraction} togetherInteraction
     * @returns
     */
    const filter = (togetherInteraction) =>
      togetherInteraction.user.id === message.author.id &&
      togetherInteraction.customId === "together";
    const collector = message.channel.createMessageComponentCollector({
      filter,
      componentType: "SELECT_MENU",
      time: 10000,
    });

    collector.on("collect", (togetherInteraction) => {
      const [value] = togetherInteraction.values;

      client.discordTogether
        .createTogetherCode(
          message.member.voice.channelId,
          value.toLowerCase().toString()
        )
        .then(async (invite) => {
          let button = new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel("invite link")
              .setStyle("LINK")
              .setURL(invite.code)
          );
          const inviteEmbed = new MessageEmbed()
            .setTitle(`Play ${value} with your friends in discord vc`)
            .setColor("#596854");

          await togetherInteraction.update({
            embeds: [inviteEmbed],
            components: [button],
          });
        });
    });
    // collector.on("end", () => {
    //   initialMessage.edit({ components: components(true) });
    // });
  },
};
