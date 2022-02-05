import bacnet from "bacstack";

let object_types = Object.keys(bacnet.enum.ObjectType).reduce((a, v) => {
  a[bacnet.enum.ObjectType[v]] = v;
  return a;
}, {});

let pids = Object.keys(bacnet.enum.PropertyIdentifier).reduce((a, v) => {
  a[bacnet.enum.PropertyIdentifier[v]] = v;
  return a;
}, {});

const viewDepth = {
  base: 0,
  extended: 1,
  all: 2,
};

export { object_types, pids, viewDepth };
