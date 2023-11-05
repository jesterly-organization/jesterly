import { Collection } from "discord.js";
import { readdirSync } from "node:fs";
import { parse } from "jsonforenv";
import { REST, Routes } from "discord.js";

export default async function loadCommands(client) {
  client.commands = new Collection();
  const allCommands = [];
  const disabledCommands = parse("disabledCommands");

  const pathToCommands = new URL("../commands/", import.meta.url);
  const categoryNames = await readdirSync(pathToCommands);

  for (const category of categoryNames) {
    if (disabledCommands.folders.includes(category)) continue;

    const pathToCategory = new URL(category, pathToCommands.href);
    const fileNames = await readdirSync(pathToCategory);

    for (const fileName of fileNames) {
      const commandName = fileName.split(".")[0];
      if (disabledCommands.commands.includes(commandName)) continue;

      const { default: Command } = await import(`${pathToCommands.href}${category}/${fileName}`);
      const command = new Command();

      command.setName(commandName.toLowerCase());
      command.category = category;

      allCommands.push(command.toJSON());
      client.commands.set(command.name, command);
    }
  }

  const rest = new REST().setToken(process.env.tokenBot);
  const data = await rest.put(Routes.applicationCommands(process.env.clientId), {
    body: allCommands,
  });

  console.log(`[COMMANDS] - ${data.length}/${allCommands.length} commands reloaded successfully`);
}
