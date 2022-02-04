const log = require("./logger");
const { contextBridge, ipcRenderer } = require("electron");
const validChannels = [
  "START_STACK",
  "STOP_STACK",
  "GET_STORE",
  "ADD_DP",
  "REMOVE_DP",
  "CONSOLE_MSG",
  "NEW_DP",
];

console.log("Preload...");
contextBridge.exposeInMainWorld("ipc", {
  send: (channel, data) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    } else {
      log.error(`The channel ${channel} seems not to be valid..`);
    }
  },
  on: (channel, func) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    } else {
      log.error(`The channel ${channel} seems not to be valid..`);
    }
  },
});
