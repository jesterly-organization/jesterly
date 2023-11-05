import BaseCommand from "../../structures/command.js";
import { stripIndents } from "common-tags";

class Ping extends BaseCommand {
  constructor() {
    super();
    this.setDescription("Check the API and bot latency.");
  }

  async execute(client, interaction) {
    const sent = await interaction.reply({ content: "Pinging...", fetchReply: true });
    const timeDiff = sent.createdTimestamp - interaction.createdTimestamp;
    await interaction.editReply(stripIndents`
    :bullettrain_front: │ Arrival latency: **${client.ws.ping}ms**
    :woman_shrugging: │ Response Latency: **${timeDiff}ms**
    `);
  }
}

export default Ping;
