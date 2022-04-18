import bacnet from "bacstack";

const value_types = Object.keys(bacnet.enum.ApplicationTags).reduce((a, v) => {
  a[bacnet.enum.ApplicationTags[v]] = v;
  return a;
}, {});

const object_types = Object.keys(bacnet.enum.ObjectType).reduce((a, v) => {
  a[bacnet.enum.ObjectType[v]] = v;
  return a;
}, {});

const pids = Object.keys(bacnet.enum.PropertyIdentifier).reduce((a, v) => {
  a[bacnet.enum.PropertyIdentifier[v]] = v;
  return a;
}, {});

const viewDepth = {
  base: 0,
  extended: 1,
  all: 2,
};

export { object_types, pids, viewDepth, value_types };
