const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
//const moment = require("moment");
module.exports = {
  name: "roleinfo",
  description: "Get information of a role",
  options: [
    {
      name: "role",
      type: "ROLE",
      description: "The role you want to see",
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
    // console.log(interaction.member.displayName);
    const role = interaction.guild.roles.cache.get(args[0]);
    // console.log(
    //   role.permissions
    //     .toArray()
    //     .map((e) => {
    //       return e.toLowerCase().replace(/_/g, " ");
    //     })
    //     .join(", "),
    //   true
    // );
    const position = `\`${
      interaction.guild.roles.cache.size - role.position
    }\`/\`${interaction.guild.roles.cache.size}\``;
    const embed = new MessageEmbed()
      .setTimestamp()
      .setURL(client.web)
      .setAuthor(
        interaction.member.displayName,
        interaction.user.displayAvatarURL({ dynamic: true })
      )
      .setTitle("Role Info")
      .setColor(role.color)
      .addFields(
        {
          name: "ID",
          value: role.id,
        },
        {
          name: "Name",
          value: role.name,
          inline: true,
        },
        {
          name: "Color",
          value: role.hexColor,
          inline: true,
        },
        {
          name: "Position",
          value: position,
          inline: true,
        },
        {
          name: `Hoisted`,
          value: `${role.hoist ? "Yes" : "No"}`,
          inline: true,
        },
        {
          name: "Mentionable",
          value: `${role.mentionable ? "Yes" : "No"}`,
          inline: true,
        },
        {
          name: "Bot Role",
          value: `${role.managed ? "Yes" : "No"}`,
          inline: true,
        },
        {
          name: "Creation Date",
          value: `\`${role.createdAt}\``,
          inline: true,
        },
        {
          name: "Permissions",
          value: role.permissions
            .toArray()
            .map((e) => {
              return e.toLowerCase().replace(/_/g, " ");
            })
            .join(", "),

          inline: true,
        }
      );

    await interaction.followUp({ embeds: [embed] });
  },
};
