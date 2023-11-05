import { Client } from "discord.js";
import { loadEnvFromFolder } from "jsonforenv";
import { loadCommands, loadEvents } from "./loaders/index.js";
import "dotenv/config";

(async () => {
  await loadEnvFromFolder("./src/configs/");

  // create the client
  const client = new Client({ intents: process.env.intents });

  await loadCommands(client);
  await loadEvents(client);

  // login to the bot
  client.login(process.env.tokenBot);
  console.log("[INDEX] - index successfully loaded");
})();
