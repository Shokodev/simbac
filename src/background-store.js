const Store = require("electron-store");

const eStore = {
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
const getObjectList = () => store.get('dp').map(dp=>dp.oid);

const store = new Store({ schema: eStore });

const addDp = (bacnetObject) => {
  let dps = store.get('dp');
  if (dps.find((dp) => dp.oid === bacnetObject.oid))
    throw Error(`Store has already datapoint with oid: ${bacnetObject.oid}`);
    dps.push(bacnetObject);
    store.set('dp',dps);
};

//NOT TESTED
const removeDp = (bacnetObject) => {
  let dps = store.get('dp');
  if (dps.find((dp) => dp.oid === bacnetObject.oid))
    throw Error(`Store no datapoint with oid: ${bacnetObject.oid}`);
    dps.slice(dps.indexOf(bacnetObject),1);
    store.set('dp',dps);
};


module.exports = { save, read, addDp, removeDp, getObjectList };
