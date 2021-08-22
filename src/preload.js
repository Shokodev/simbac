const log = require("./logger");
const { contextBridge, ipcRenderer } = require("electron");
const validChannels = ["CREATE_DEVICE", "DELETE_DEVICE", "GET_DEVICE"];

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
