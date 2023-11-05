import { Client, Events, GatewayIntentBits } from "discord.js";
import { loadEnvFromFolder } from "jsonforenv";
await loadEnvFromFolder("./src/configs/");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.tokenBot);
