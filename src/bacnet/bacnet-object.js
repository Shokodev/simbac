const bacnet = require("bacstack");

let object_types = Object.keys(bacnet.enum.ObjectType).reduce((a, v) => {
  a[bacnet.enum.ObjectType[v]] = v;
  return a;
}, {});

let pids = Object.keys(bacnet.enum.PropertyIdentifier).reduce((a, v) => {
  a[bacnet.enum.PropertyIdentifier[v]] = v;
  return a;
}, {});

const getCleanType = (t, i) =>
  t
    .split("_")
    .reduce((a, v) => {
      v.split("").forEach((c, i) => {
        i === 0 ? (a = `${a}${c}`) : (a = `${a}${c.toLowerCase()}`);
      });
      return `${a} `;
    }, "")
    .trim() + `${i}`;

class BacnetObject {
  //cast in type while using from Estore
  constructor(_type = Number, _instance = Number) {
    if (!Number.isInteger(_instance))
      throw TypeError("BACNetObject Inctance number");
    if (!object_types[_type]) throw TypeError("BACNetObject Type");
    this.oid = `${_type}${_instance}`;
    this.properties = [
      {
        id: 75,
        pidName: "OBJECT_IDENTIFIER",
        value: { type: _type, instance: _instance },
        type: 12,
      },
      {
        id: 77,
        pidName: "OBJECT_NAME",
        value: getCleanType(object_types[_type], _instance),
        type: 7,
      },
      {
        id: 79,
        pidName: "OBJECT_TYPE",
        value: _type,
        type: 9,
      },
    ];
  }

  getProperty(_pid = Number) {
    if (!bacnet.enum.PropertyIdentifier[_pid])
      throw TypeError("Unknown PropertyIdentifier");
    let prop = this.properties.find((p) => p.pid === p._pid);
    if (!prop) throw Error(`Object has no property with id: ${_pid}`);
    return prop;
  }

  setProperty(_pid = Number, value) {
    if (!pids[_pid]) throw TypeError("Unknown PropertyIdentifier");
    //TODO There is no validation for property value type
    this.properties.push({
      id: _pid,
      pid_string: pids[_pid],
      type: 4,
      value: value,
    });
  }
}

module.exports = BacnetObject;
