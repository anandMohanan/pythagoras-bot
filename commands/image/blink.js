const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const DIG = require("discord-image-generation");
module.exports = {
  name: "blink",
  description: "blink gif",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (message.mentions.users.size < 1)
        return message.channel.send("you can't blink nobody").then((msg) => {
          msg.delete({ timeout: 10000 });
        });
      let user = message.mentions.users.first();
      let img2 = user.displayAvatarURL({ dynamic: false, format: "png" });

      let img1 = message.author.displayAvatarURL({
        dynamic: false,
        format: "png",
      });

      let image = await new DIG.Blink().getImage(img1, img2);
      let attach = new MessageAttachment(image, "blink.gif");
      const embed = new MessageEmbed()
        .setTimestamp()
        .setColor("#cce1f2")
        .setImage("attachment://blink.gif");
      return await message.reply({
        files: [attach],
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
