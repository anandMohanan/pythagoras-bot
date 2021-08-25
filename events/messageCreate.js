const client = require("../index");

client.on("messageCreate", async (message) => {
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(client.config.prefix)
  )
    return;

  const [cmd, ...args] = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(" ");

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.get(client.aliases.get(cmd.toLowerCase()));
  // if (!message.member.permissions.has(command.userPermissions || []))
  //   return message.reply(
  //     "you do not have enough permissions to run this command"
  //   );
  // if (!message.guild.me.permissions.has(command.botPermissions || []))
  //   return message.reply(
  //     "i do not have enough permissions to run this command"
  //   );
  if (!command) return;
  await command.run(client, message, args);
});
