const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "slowmode",
  description: "slowmode channel",
  userPermissions: ["MANAGE_CHANNELS"],
  botPermissions: ["MANAGE_CHANNELS"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.reply({
        content: "You did not specify a time!",
        allowedMentions: { repliedUser: false },
      });
    }
    const currentCooldown = message.channel.rateLimitPerUser;

    const reason = args[1] ? args.slice(1).join(" ") : "no reason";

    const embed = new MessageEmbed().setFooter(
      `${message.author.tag} | ${message.author.id}`,
      message.author.displayAvatarURL({ dynamic: true })
    );

    if (args[0] === "off") {
      if (currentCooldown === 0)
        return message.reply("Channel cooldown is already off");

      embed.setTitle("Slowmode Disabled").setColor("#cce1f2");
      message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
      return message.channel.setRateLimitPerUser(0, reason);
    }

    const time = ms(args[0]) / 1000;

    if (isNaN(time)) {
      return message.reply({
        content: "not a valid time, please try again!",
        allowedMentions: { repliedUser: false },
      });
    }
    if (time >= 21600) {
      return message.reply({
        content:
          "That slowmode limit is too high, please enter anything lower than 6 hours.",
        allowedMentions: { repliedUser: false },
      });
    }
    if (currentCooldown === time) {
      return message.reply({
        content: `Slowmode is already set to ${args[0]}`,
        allowedMentions: { repliedUser: false },
      });
    }
    embed
      .setTitle("Slowmode Enabled")
      .addField("Slowmode: ", args[0])
      .addField("Reason: ", reason)
      .setColor("#cce1f2");

    message.channel.setRateLimitPerUser(time, reason);
    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
  },
};
