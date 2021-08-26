const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "shows information about the server",
  aliases: ["si"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const guild = message.guild;
    // console.log(guild.id.toString());
    // console.log(guild.name.toString());
    // console.log((await guild.fetchOwner()).user.username.toString());
    // console.log(guild.roles.cache.size);
    // console.log(
    //   `CREATED: ${guild.createdAt.getDate()}-${guild.createdAt.getMonth()}month-${guild.createdAt.getFullYear()}year`
    // );

    // console.log(guild.iconURL());
    // console.log(guild.bannerURL());
    //console.log(guild.channels.cache.filter((ch) => ch.type == "GUILD_TEXT"));
    const embed = new MessageEmbed()
      .setTitle(guild.name)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField(
        "General Info",
        [
          `ID: \`${guild.id.toString()}\``,
          `Name: \`${guild.name.toString()}\``,
          `Owner: \`${(await guild.fetchOwner()).user.username.toString()}\``,
        ].join("\n")
      )
      .addField(
        "Counts",
        [
          `Role: \`${guild.roles.cache.size} roles\``,
          `Channels: \`${guild.channels.cache.size} total\` `,
          `Emojis: \`${guild.emojis.cache.size}\``,
        ].join("\n")
      )
      .addField(
        "Additional information:",
        [
          `Created: \`${guild.createdAt.getDate()}-${guild.createdAt.getMonth()}-${guild.createdAt.getFullYear()}\``,
        ].join("\n")
      )
      .setImage(guild.bannerURL())
      .setColor("#cce1f2");
    return message.reply({
      embeds: [embed],
      allowedMentions: { repliedUser: false },
    });
    //message.channel.send("yes");
  },
};
