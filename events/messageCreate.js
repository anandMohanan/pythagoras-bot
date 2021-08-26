const ms = require("ms");
const { timeout } = require("../index");
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
  if (!command) return;

  if (!message.member.permissions.has(command.userPermissions || []))
    return message.reply(
      "you do not have enough permissions to run this command"
    );
  if (!message.guild.me.permissions.has(command.botPermissions || []))
    return message.reply(
      "i do not have enough permissions to run this command"
    );

  if (command) {
    // if (command.timeout) {
    //   if (timeout.has(`${command.name}${message.author.id}`))
    //     return message.channel.send(
    //       `You are on a  \`${ms(
    //         timeout.get(`${command.name}${message.author.id}`) - Date.now(),
    //         { long: true }
    //       )}\` cooldown`
    //     );
    await command.run(client, message, args);
    // timeout.set(
    //   `${command.name}${message.author.id}`,
    //   Date.now() + command.timeout
    // );
    // setTimeout(() => {
    //   timeout.delete(`${command.name}${message.author.id}`);
    // }, command.timeout);
    //}
  }
});
