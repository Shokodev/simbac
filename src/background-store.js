import Store from "electron-store";

const eStoreSchema = {
  port: {
    type: "number",
    default: 47808,
  },
  netInterface: {
    type: "string",
    default: "127.0.0.1",
  },
  bacnetId: {
    type: "number",
    default: 1234,
  },
  dp: { type: "array", default: [] },
};

const store = new Store({ schema: eStoreSchema });

const eStore = {
  save: (propName, payload) => store.set(propName, payload),
  read: (propName) => store.get(propName),
  remove: (propName) => store.delete(propName),
  getObjectList: () => store.get("dp").map((dp) => dp.oid),
  addDp: (bacnetObject) => {
    let dps = store.get("dp");
    if (dps.find((dp) => dp.oid === bacnetObject.oid))
      throw Error(`Store has already datapoint with oid: ${bacnetObject.oid}`);
    dps.push(bacnetObject);
    store.set("dp", dps);
  },
  //NOT TESTED
  removeDp: (bacnetObject) => {
    let dps = store.get("dp");
    if (!dps.find((dp) => dp.oid === bacnetObject.oid))
      throw Error(`Store has no datapoint with oid: ${bacnetObject.oid}`);
    dps.slice(dps.indexOf(bacnetObject), 1);
    store.set("dp", dps);
  },
  //NOT TESTED
  changeDp: (bacnetObject) => {
    let dps = store.get("dp");
    if (!dps.find((dp) => dp.oid === bacnetObject.oid))
      throw Error(`Store has no datapoint with oid: ${bacnetObject.oid}`);
    dps[dps.indexOf(bacnetObject)] = bacnetObject;
  },
};

export default eStore;
