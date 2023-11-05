import BaseCommand from "../../structures/command.js";
import { EmbedBuilder, codeBlock } from "discord.js";
import { stripIndents } from "common-tags";

class Help extends BaseCommand {
  constructor() {
    super();
    this.setDescription("Provides help and command information").addStringOption((option) =>
      option.setName("command").setDescription("The command to search for"),
    );
  }

  async execute(client, interaction) {
    const oneCommand = interaction.options.getString("command");

    if (oneCommand) {
      const command = client.commands.get(oneCommand);
      if (!command)
        return interaction.reply({
          content: "Command not found!",
          ephemeral: true,
        });

      const { name, description, options, category } = command;

      const embed = new EmbedBuilder()
        .setColor(process.env.baseColor)
        .setTitle("Jesterly Help Guide")
        .setDescription(
          "Need a little help? Don't worry, I've got you covered! Here is some information about this command:",
        )
        .setTimestamp()
        .setFooter({
          text: `Requested by: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .addFields({
          name: "Command information:",
          value: codeBlock(
            "js",
            stripIndents`
          Name: ${name}
          Description: ${description}
          Category: ${category}
          Nsfw: no command is +18!`,
          ),
        });

      if (options >= 0) {
        for (const option of options) {
          embed.addFields({
            name: `Option: **${option.name}**`,
            value: codeBlock(
              "js",
              stripIndents`
            Name: ${option.name}
            Description: ${option.description}
            Required: ${option.required ? "Yes" : "No"}`,
            ),
          });
        }

        return interaction.reply({ embeds: [embed] });
      }
    }

    const embed = new EmbedBuilder()
      .setColor(process.env.baseColor)
      .setTitle("**Jesterly Help Guide**")
      .setDescription("Need a little help? Don't worry, I've got you covered! Here are some commands you can use:")
      .setTimestamp()
      .setFooter({
        text: "Type / followed by the command name to use a command, like /meme.",
      });

    const commands = client.commands.map((cmd) => cmd);
    const categories = {};

    for (const command of commands) {
      const { category, name } = command;
      categories[category] = categories[category] || [];
      categories[category].push(`/${name}`);
    }

    for (const category in categories) {
      embed.addFields({
        name: category,
        value: codeBlock("js", categories[category].sort().join(" ~ ")),
      });
    }

    await interaction.reply({ embeds: [embed] });
  }
}

export default Help;
