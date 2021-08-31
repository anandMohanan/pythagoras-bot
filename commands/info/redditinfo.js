const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "redditinfo",
  description: "returns subReddit info",
  aliases: ["ri"],
  //timeout: 10000000,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    try {
      const input = args.join(" ");
      if (!input)
        return message.channel.send("Please provide a subreddit name!");
      const response = await fetch(
        `https://api.popcat.xyz/subreddit/${encodeURIComponent(input)}`
      );
      const rsp = await response.json();
      if (!rsp) return message.channel.send("Subreddit Not Found!");
      //console.log(rsp);
      if (rsp.error) return message.channel.send("Subreddit Not Found!");
      const yesno = {
        true: "Yes",
        false: "No",
      };
      const embed = new MessageEmbed()
        .setTitle("Subreddit Info")
        .setThumbnail(rsp.icon.split("?")[0]) //to avoid discord not showing img as it has to end with .png or .extension
        .setColor("#cce1f2")
        .addField("Name", rsp.name, true)
        .addField("Title", rsp.title, true)
        .addField("URL", `[URL](${rsp.url})`, true)
        .addField("Active Users", rsp.active_users, true)
        .addField("Total Users", rsp.members, true)
        .addField("Images Allowed", yesno[rsp.allow_images], true)
        .addField("Videos Allowed", yesno[rsp.allow_videos], true)
        .addField("Over 18", yesno[rsp.over_18], true)
        .addField("Description", rsp.description ? rsp.description : "None");
      message.reply({ embeds: [embed] });
    } catch (e) {
      message.channel.send({ content: `subreddit not found` });
      console.log(e);
    }
  },
};
