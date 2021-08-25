const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Shows you the list of commands.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const directories = [
      ...new Set(client.commands.map((cmd) => cmd.directory)),
    ];

    const formatString = (str) =>
      `${str[0].toLowerCase()}${str.slice(1).toUpperCase()}`;

    const categories = directories.map((dir) => {
      // console.log(dir);
      const getCommands = client.commands
        .filter((cmd) => cmd.directory === dir)
        .map((cmd) => {
          return {
            name: cmd.name,
            description: cmd.description || "No Description provided",
          };
        });
      return {
        directory: dir,
        commands: getCommands,
      };
    });
    // console.log(categories);
    const imageUrl = "https://ibb.co/Th9kcrj";
    const embed = new MessageEmbed()
      .setTitle("📬 Need Help ?")
      .setColor("#cce1f2")
      .setImage(
        "https://cdn.discordapp.com/attachments/867702505345122334/875359916829863966/pythagorus.jpg"
      )
      .setDescription("Please choose a category from the dropdown menu");
    const components = (state) => [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("help-menu")
          .setPlaceholder("Click to see all Categories.")

          .setDisabled(state)
          .addOptions(
            categories.map((cmd) => {
              return {
                label: cmd.directory,
                value: cmd.directory.toUpperCase(),
                description: `Commands From ${cmd.directory} Category.`,
              };
            })
          )
      ),
    ];

    const initialMessage = await message.reply({
      embeds: [embed],
      components: components(false),
      allowedMentions: { repliedUser: false },
    });

    const filter = (helpInteraction) =>
      helpInteraction.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({
      filter,
      componentType: "SELECT_MENU",
      time: 6000000,
    });

    collector.on("collect", async (helpInteraction) => {
      const [directory] = helpInteraction.values;
      const cate = categories.find(
        (x) => x.directory.toUpperCase() === directory
      );
      // console.log(cate.commands);

      const upem = new MessageEmbed()
        .setColor("cce1f2")
        .setTitle(`${directory} Commands`)
        .setDescription("List of commands")
        .addFields(
          cate.commands.map((cmd) => {
            return {
              name: `${cmd.name}`,
              value: `\`${cmd.description}\``,
              inline: true,
            };
          })
        );

      helpInteraction.update({ embeds: [upem] });
    });

    collector.on("end", () => {
      initialMessage.edit({ components: components(true) });
    });
  },
};
