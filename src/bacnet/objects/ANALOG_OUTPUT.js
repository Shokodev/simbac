const bacnet = require("bacstack");
const BacnetObject = require("../bacnet-object");

class AnalogOutput extends BacnetObject {
  constructor(_instance = Number, storeProps = []) {
    super(bacnet.enum.ObjectType.ANALOG_OUTPUT, _instance, storeProps);
    if (storeProps.length === 0) {
      props.forEach((prop) => {
        this.properties.push(prop);
      });
    }
  }

  //ADD FUNCTIONS LIKE HIGH OR LOW LIMIT REACHED
}

const props = [
  {
    id: bacnet.enum.PropertyIdentifier.PRESENT_VALUE,
    pidName: "PRESENT_VALUE",
    type: bacnet.enum.ApplicationTags.REAL,
    value: 1.1,
  },
  {
    id: bacnet.enum.PropertyIdentifier.DESCRIPTION,
    pidName: "DESCRIPTION",
    type: bacnet.enum.ApplicationTags.CHARACTER_STRING,
    value: "Analog Value TXT",
  },
  {
    id: bacnet.enum.PropertyIdentifier.DEVICE_TYPE,
    pidName: "DEVICE_TYPE",
    type: bacnet.enum.ApplicationTags.CHARACTER_STRING,
    value: "",
  },
  {
    id: bacnet.enum.PropertyIdentifier.STATUS_FLAGS,
    pidName: "STATUS_FLAGS",
    type: bacnet.enum.ApplicationTags.ENUMERATED,
    enum: bacnet.enum.StatusFlags,
    value: 3,
  },
  {
    id: bacnet.enum.PropertyIdentifier.EVENT_STATE,
    pidName: "EVENT_STATE",
    type: bacnet.enum.ApplicationTags.ENUMERATED,
    enum: bacnet.enum.EventState,
    value: 0,
  },
  {
    id: bacnet.enum.PropertyIdentifier.RELIABILITY,
    pidName: "RELIABILITY",
    type: bacnet.enum.ApplicationTags.ENUMERATED,
    enum: bacnet.enum.Reliability,
    value: 0,
  },
  {
    id: bacnet.enum.PropertyIdentifier.OUT_OF_SERVCIE,
    pidName: "OUT_OF_SERVCIE",
    type: bacnet.enum.ApplicationTags.BOOLEAN,
    value: 0,
  },
  {
    id: bacnet.enum.PropertyIdentifier.UNITS,
    pidName: "UNITS",
    type: bacnet.enum.ApplicationTags.ENUMERATED,
    enum: bacnet.enum.EngineeringUnits,
    value: 0,
  },
  {
    id: bacnet.enum.PropertyIdentifier.MIN_PRES_VALUE,
    pidName: "MIN_PRES_VALUE",
    type: bacnet.enum.ApplicationTags.REAL,
    value: 0,
  },
  {
    id: bacnet.enum.PropertyIdentifier.MAX_PRES_VALUE,
    pidName: "MAX_PRES_VALUE",
    type: bacnet.enum.ApplicationTags.REAL,
    value: 20,
  },
  {
    id: bacnet.enum.PropertyIdentifier.RESOLUTION,
    pidName: "RESOLUTION",
    type: bacnet.enum.ApplicationTags.REAL,
    value: 1,
  },
  {
    id: bacnet.enum.PropertyIdentifier.PRIORITY_ARRAY,
    pidName: "PRIORITY_ARRAY",
    type: bacnet.enum.ApplicationTags.ENUMERATED,
    enum: {val:"tbd"},
    value: 0,
  },
  {
    id: bacnet.enum.PropertyIdentifier.RELINQUISH_DEFAULT,
    pidName: "RELINQUISH_DEFAULT",
    type: bacnet.enum.ApplicationTags.REAL,
    value: 0,
  },
  {
    id: bacnet.enum.PropertyIdentifier.COV_INCREMENT,
    pidName: "COV_INCREMENT",
    type: bacnet.enum.ApplicationTags.REAL,
    value: 1,
  },
  {
    id: bacnet.enum.PropertyIdentifier.TIME_DELAY,
    pidName: "TIME_DELAY",
    type: bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
    value: "",
  },
  {
    id: bacnet.enum.PropertyIdentifier.NOTIFICATION_CLASS,
    pidName: "NOTIFICATION_CLASS",
    type: bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
    value: 1,
  },
  {
    id: bacnet.enum.PropertyIdentifier.HIGH_LIMIT,
    pidName: "HIGH_LIMIT",
    type: bacnet.enum.ApplicationTags.REAL,
    value: 20,
  },
  {
    id: bacnet.enum.PropertyIdentifier.LOW_LIMIT,
    pidName: "LOW_LIMIT",
    type: bacnet.enum.ApplicationTags.REAL,
    value: 0,
  },
  {
    id: bacnet.enum.PropertyIdentifier.DEADBAND,
    pidName: "DEADBAND",
    type: bacnet.enum.ApplicationTags.REAL,
    value: 0,
  },
  {
    id: bacnet.enum.PropertyIdentifier.LIMIT_ENABLED,
    pidName: "LIMIT_ENABLED",
    type: bacnet.enum.ApplicationTags.ENUMERATED,
    enum: bacnet.enum.LimitEnable,
    value: false,
  },
  {
    id: bacnet.enum.PropertyIdentifier.EVENT_ENABLED,
    pidName: "EVENT_ENABLED",
    type: bacnet.enum.ApplicationTags.ENUMERATED,
    enum: bacnet.enum.EventTransitionBits,
    value: false,
  },
  {
    id: bacnet.enum.PropertyIdentifier.ACKED_TRANSITIONS,
    pidName: "ACKED_TRANSITIONS",
    type: bacnet.enum.ApplicationTags.ENUMERATED,
    enum: bacnet.enum.EventTransitionBits,
    value: 0,
  },
  {
    id: bacnet.enum.PropertyIdentifier.NOTIFY_TYPE,
    pidName: "NOTIFY_TYPE",
    type: bacnet.enum.ApplicationTags.ENUMERATED,
    enum: bacnet.enum.NotifyType,
    value: 0,
  },
  {
    id: bacnet.enum.PropertyIdentifier.EVENT_TIME_STAMPS,
    pidName: "EVENT_TIME_STAMPS",
    type: bacnet.enum.ApplicationTags.TIMESTAMP,
    value: "",
  },
  {
    id: bacnet.enum.PropertyIdentifier.PROFILE_NAME,
    pidName: "PROFILE_NAME",
    type: bacnet.enum.ApplicationTags.CHARACTER_STRING,
    value: "",
  },
];

module.exports = AnalogOutput;
