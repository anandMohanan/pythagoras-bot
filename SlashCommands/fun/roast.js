const fetch = require("node-fetch");
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "roast",
  description: "returns a roast",
  options: [
    {
      name: "user",
      type: "USER",
      description: "roast someone",
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

      //console.log(user);
      //console.log(client.config.owners[0]);
      if (!args[0]) {
        let roastArg = new MessageEmbed()
          .setColor("#A348A6")
          .setDescription("mention someone");
        return interaction.followUp({
          embeds: [roastArg],
          allowedMentions: { repliedUser: false },
        });
      }

      if (user.id === client.config.owners[0]) {
        let roastAnnan = new MessageEmbed()
          .setColor("#A348A6")
          .setDescription("How dare you roast annan!!!!!!!");
        return interaction.followUp({
          embeds: [roastAnnan],
          allowedMentions: { repliedUser: false },
        });
      }

      if (user.id === interaction.member.user.id) {
        let roastMention = new MessageEmbed()
          .setColor("#A348A6")
          .setDescription("You can not roast yourself");
        return interaction.followUp({
          embeds: [roastMention],
          allowedMentions: { repliedUser: false },
        });
      }
      //   if (args[0] < 1) {
      //     let roastArg = new MessageEmbed()
      //       .setColor("#A348A6")
      //       .setDescription("You must mention someone to roast them.");
      //     return message.reply({
      //       embeds: [roastArg],
      //       allowedMentions: { repliedUser: false },
      //     });
      //   }
      let body = await fetch(
        "https://evilinsult.com/generate_insult.php?lang=en&type=json"
      );
      let roast = await body.json();
      let roastEmbed = new MessageEmbed()
        .setColor("#cce1f2")
        .setDescription(user.username + ", " + roast.insult);
      await interaction.followUp({
        embeds: [roastEmbed],
        allowedMentions: { repliedUser: false },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
