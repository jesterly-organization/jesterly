import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import BaseCommand from "../../structures/command.js";

class BotInfo extends BaseCommand {
  constructor() {
    super();
    this.setDescription("Shows information about me");
  }

  async execute(client, interaction) {
    const author = interaction.user || interaction.author;
    const owner = await client.users.fetch(process.env.ownerId);
    const avatar = client.user.displayAvatarURL({ dynamic: true });

    const botUptime = this.formatUptime(process.uptime());
    const botCreationDate = client.user.createdAt.toDateString();
    const botServers = client.guilds.cache.size;
    const botUsers = client.users.cache.size;

    const description =
      `Hello ${author}, nice to meet you, my name is ${client.user.username}, ` +
      `I'm a meme bot for Discord, whether you want a meme to share with friends or just want to have a good laugh, ` +
      `I've got you covered. So sit back, relax and let the fun begin!` +
      `\n\nMy Creator: ***${owner.username}***`;

    const botInfoEmbed = new EmbedBuilder()
      .setColor(process.env.baseColor)
      .setTitle(`${client.user.username} Information`)
      .setThumbnail(avatar)
      .setDescription(description)
      .addFields(
        { name: "Uptime", value: botUptime, inline: true },
        { name: "Creation Date", value: botCreationDate, inline: true },
        { name: "Servers", value: `${botServers} servers`, inline: true },
        { name: "Serving", value: `${botUsers} users`, inline: true },
      )
      .setFooter({
        text: "Jesterly - Bringing joy to your Discord experience",
      });

    const row = new ActionRowBuilder().addComponents([
      new ButtonBuilder().setURL(process.env.supportLink).setLabel("Support").setStyle(ButtonStyle.Link),
      new ButtonBuilder().setURL(process.env.inviteLink).setLabel("Invite me").setStyle(ButtonStyle.Link),
    ]);

    await interaction.reply({ embeds: [botInfoEmbed], components: [row] });
  }

  formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${sec}s`;
  }
}

export default BotInfo;
