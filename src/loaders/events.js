import { readdirSync } from "node:fs";
import { parse } from "jsonforenv";

async function loadEvents(client) {
  const disabledEvents = parse("disabledEvents");
  client._events = {};
  let totalOfEvents = 0;

  const pathToEvents = new URL("../events/", import.meta.url);
  const subFolders = await readdirSync(pathToEvents);

  for (const folder of subFolders) {
    if (disabledEvents.folders.includes(folder)) continue;

    const fileNames = await readdirSync(new URL(folder, pathToEvents.href));

    for (const fileName of fileNames) {
      const eventName = fileName.split(".")[0];
      if (disabledEvents.events.includes(eventName)) continue;

      const { default: event } = await import(`${pathToEvents.href}${folder}/${fileName}`);
      totalOfEvents++;

      const eventWithClient = event.bind(event, client);
      if (folder === "bot") client.on(eventName, eventWithClient);
      else if (folder === "process") process.on(eventName, eventWithClient);
    }
  }

  console.log(`[EVENTS] - ${totalOfEvents} events were successfully loaded`);
}

export default loadEvents;
