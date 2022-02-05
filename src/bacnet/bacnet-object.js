import bacnet from 'bacstack';
import { object_types } from './utils/type-helper.js';

const getCleanType = (t, i) =>
  t
    .split("_")
    .reduce((a, v) => {
      v.split("").forEach((c, i) => {
        i === 0 ? (a = `${a}${c}`) : (a = `${a}${c.toLowerCase()}`);
      });
      return `${a} `;
    }, "")
    .trim() + ` ${i}`;

export default class BacnetObject {
  //cast in type while using from Estore
  constructor(
    _type = bacnet.enum.ObjectType,
    _instance = Number,
    storeProps = []
  ) {
    if (!Number.isInteger(_instance))
      throw TypeError("BACNetObject Inctance number");
    if (!object_types[_type]) throw TypeError("BACNetObject Type");
    this.oid = `${_type}:${_instance}`;
    if (storeProps.length > 0) {
      this.properties = storeProps;
    } else {
      this.properties = [
        {
          id: bacnet.enum.PropertyIdentifier.OBJECT_IDENTIFIER,
          pidName: "OBJECT_IDENTIFIER",
          value: { type: _type, instance: _instance },
          type: bacnet.enum.ApplicationTags.OBJECTIDENTIFIER,
        },
        {
          id: bacnet.enum.PropertyIdentifier.OBJECT_NAME,
          pidName: "OBJECT_NAME",
          value: getCleanType(object_types[_type], _instance),
          type: bacnet.enum.ApplicationTags.CHARACTER_STRING,
        },
        {
          id: bacnet.enum.PropertyIdentifier.OBJECT_TYPE,
          pidName: "OBJECT_TYPE",
          value: _type,
          type: bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        },
      ];
    }
  }
}
