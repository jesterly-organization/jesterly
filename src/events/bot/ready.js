import { parse } from "jsonforenv";
import { ActivityType } from "discord.js";

export default function Ready(client) {
  const status = parse("status");

  client.user.setStatus(status.presence);
  client.user.setActivity(status.message, { type: ActivityType[status.activity] });

  console.log(`Logged in as ${client.user.username}`);
}
