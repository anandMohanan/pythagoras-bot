const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const DIG = require("discord-image-generation");
module.exports = {
  name: "gay",
  description: "gay image",
  options: [
    {
      name: "user",
      type: "USER",
      description: "gay image",
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

    let avatar = await user.displayAvatarURL({ dynamic: false, format: "png" });
    //let level = 5;
    let image = await new DIG.Gay().getImage(avatar);
    let attach = new MessageAttachment(image, "gay.png");
    const embed = new MessageEmbed()
      .setTimestamp()
      .setColor("#cce1f2")
      .setImage("attachment://gay.png");
    return await interaction.followUp({
      files: [attach],
      embeds: [embed],
      allowedMentions: { repliedUser: false },
    });
  },
};
