import { writable } from "svelte/store";
import obs from "@/libs/obs";

export const store = writable(null);
export const state = writable(null);
export const status = writable(null);

let initialized = false;

function registerEvents() {
  if (initialized) return;
  initialized = true;

  obs.on("state", state.set);

  obs.on("connect", async () => {
    console.log("connected!");
    const { version } = await obs.emit("GetVersion");
    console.log({ version });
  });

  obs.on("StreamStatus", (...args) => {
    console.log(args);
  });
}

export default async function load() {
  store.set(await obs.getStore());
  state.set(await obs.getState());
  registerEvents();
}