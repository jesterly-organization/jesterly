import { SlashCommandBuilder } from "discord.js";
import wait from "../utils/wait.js";

class BaseCommand extends SlashCommandBuilder {
  constructor() {
    super();
    this.setDescription("no description");
  }

  async execute() {}

  async run(client, interaction) {
    const [error] = await wait(this.execute(client, interaction));

    if (error) {
      console.log(error);

      const errorMessage = {
        content: "There was an error while executing this command!",
        ephemeral: true,
      };
      if (interaction.deferred || interaction.replied) await interaction?.editReply?.(errorMessage);
      else interaction.reply(errorMessage);
    }
  }
}

export default BaseCommand;
