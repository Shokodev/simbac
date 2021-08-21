const Store = require("electron-store");

const device = {
  name: {
    type: "string",
    default: "device1",
  },
  port: {
    type: "number",
    default: 47808,
  },
  deviceId: {
    type: "number",
    default: 1234,
  },
  vendorId: {
    type: "number",
    default: 7,
  },
  dp: { type: "array", default: [] },
};

const saveSettings = (payload) => store.set("baci", payload);
const readSettings = () => store.get("baci");

const store = new Store({ schema: device });

module.exports = { store, saveSettings, readSettings };
