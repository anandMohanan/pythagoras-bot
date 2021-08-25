const client = require("../index");

client.on("messageDelete", async (message) => {
  let snipes = client.snipes.get(message.channel.id) || [];
  if (snipes.length > 1) snipes = snipes.slice(0, 1);
  snipes.unshift({
    msg: message,
  });
  client.snipes.set(message.channel.id, snipes);
});
