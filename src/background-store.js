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
  netInterface:{
    type:"string",
    default:"127.0.0.1"
  },
  dp: { type: "array", default: [] },
};

const save = (propName, payload) => store.set(propName, payload);
const read = (propName) => store.get(propName);

const store = new Store({ schema: device });

module.exports = { save, read };
