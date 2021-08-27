const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "returns avatar of the mentioned user",
  options: [
    {
      name: "user",
      type: "USER",
      description: "avatar of the user you want to see",
      required: false,
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    let user;
    if (args[0]) {
      user = interaction.guild.members.cache.get(args[0]).user;
    } else {
      user = interaction.member.user;
    }
    let avatar = user.displayAvatarURL({ size: 4096, dynamic: true });
    let avatarEmbed = new MessageEmbed().setImage(avatar).setColor("#cce1f2");
    await interaction.followUp({ embeds: [avatarEmbed] });
  },
};
