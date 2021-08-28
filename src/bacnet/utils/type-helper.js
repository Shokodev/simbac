const bacnet = require("bacstack");

let object_types = Object.keys(bacnet.enum.ObjectType).reduce((a, v) => {
  a[bacnet.enum.ObjectType[v]] = v;
  return a;
}, {});

let pids = Object.keys(bacnet.enum.PropertyIdentifier).reduce((a, v) => {
  a[bacnet.enum.PropertyIdentifier[v]] = v;
  return a;
}, {});

module.exports = {
  object_types,
  pids,
};
