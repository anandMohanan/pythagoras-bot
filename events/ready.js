const client = require("../index");

client.once("ready", () => {
  //   let status = [
  //     "Above all things, reverence yourself.",
  //     "Concern should drive us into action and not into a depression. No man is free who cannot control himself.",
  //     "Silence is better than unmeaning words.",
  //     "Choose rather to be strong of soul than strong of body.",
  //     "Strength of mind rests in sobriety; for this keeps your reason unclouded by passion.",
  //   ];

  client.user.setActivity(
    `=help \nConcern should drive us into action and not into a depression. No man is free who cannot control himself.`,
    {
      type: "LISTENING",
    }
  );

  client.user.setStatus("dnd");
  console.log(`${client.user.tag} is up and ready to go!`);
});
