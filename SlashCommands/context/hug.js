const { Client, ContextMenuInteraction, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "hug",
  type: "USER",

  /**
   *
   * @param {Client} client
   * @param {ContextMenuInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const user = await client.users.fetch(interaction.targetId);
    const body = await fetch("https://api.waifu.pics/sfw/hug");
    const image = await body.json();
    //console.log(interaction.member.user.username);
    const embed = new MessageEmbed()
      .setImage(image.url)
      .setColor("#cce1f2")
      .setTitle(`${interaction.member.user.username} hugs ${user.username}`);

    interaction.followUp({
      embeds: [embed],
      allowedMentions: { repliedUser: false },
    });
  },
};
