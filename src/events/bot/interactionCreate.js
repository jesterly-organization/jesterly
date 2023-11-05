export default async function interactionCreate(client, interaction) {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return interaction.reply(`The **${interaction.commandName}** command is currently unavailable`);

  try {
    await command.run(client, interaction);
  } catch (error) {
    console.error(error);
  }
}
