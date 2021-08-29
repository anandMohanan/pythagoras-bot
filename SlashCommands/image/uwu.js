const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const DIG = require("discord-image-generation");
module.exports = {
  name: "uwu",
  description: "uwu image",
  options: [
    {
      name: "uwu",
      type: "USER",
      description: "uwu image",
      required: true,
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
      let user = interaction.guild.members.cache.get(args[0]).user;

      let img2 = user.displayAvatarURL({ dynamic: false, format: "png" });

      let img1 = interaction.member.user.displayAvatarURL({
        dynamic: false,
        format: "png",
      });
      //let jakfh = new Discord.MessageAttachment(img1, "fdgdfg.png");
      //let jhjhg = new Discord.MessageAttachment(img2, "hjfgfd.png");
      //message.channel.send(jakfh);
      //message.channel.send(jhjhg);
      let image = await new DIG.Kiss().getImage(img1, img2);
      let attach = new MessageAttachment(image, "kiss.png");
      const embed = new MessageEmbed()
        .setTimestamp()
        .setColor("#cce1f2")
        .setImage("attachment://kiss.png");
      return await interaction.followUp({
        files: [attach],
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
