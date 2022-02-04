import bacnet from 'bacstack';
import BacnetObject from '../bacnet-object.js';

export default class BinaryInput extends BacnetObject {
  constructor(_instance = Number, storeProps = []) {
    super(bacnet.enum.ObjectType.BINARY_INPUT, _instance, storeProps);
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
    type: bacnet.enum.ApplicationTags.ENUMERATED,
    enum: bacnet.enum.BinaryPV,
    value: 1,
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
    id: bacnet.enum.PropertyIdentifier.POLARITY,
    pidName: "POLARITY",
    type: bacnet.enum.ApplicationTags.ENUMERATED,
    enum: bacnet.enum.Polarity,
    value: 0,
  },
  {
    id: bacnet.enum.PropertyIdentifier.INACTIVE_TEXT,
    pidName: "INACTIVE_TEXT",
    type: bacnet.enum.ApplicationTags.CHARACTER_STRING,
    value: "off",
  },
  {
    id: bacnet.enum.PropertyIdentifier.ACTIVE_TEXT,
    pidName: "ACTIVE_TEXT",
    type: bacnet.enum.ApplicationTags.CHARACTER_STRING,
    value: "on",
  },
  {
    id: bacnet.enum.PropertyIdentifier.CHANGE_OF_STATE_TIME,
    pidName: "CHANGE_OF_STATE_TIME",
    type: bacnet.enum.ApplicationTags.DATETIME,
    value: "",
  },
  {
    id: bacnet.enum.PropertyIdentifier.CHANGE_OF_STATE_COUNT,
    pidName: "CHANGE_OF_STATE_COUNT",
    type: bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
    value: "",
  },
  {
    id: bacnet.enum.PropertyIdentifier.TIME_OF_STATE_COUNT_RESET,
    pidName: "TIME_OF_STATE_COUNT_RESET",
    type: bacnet.enum.ApplicationTags.DATETIME,
    value: "",
  },
  {
    id: bacnet.enum.PropertyIdentifier.ELAPSED_ACTIVE_TIME,
    pidName: "ELAPSED_ACTIVE_TIME",
    type: bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
    value: 0,
  },
  {
    id: bacnet.enum.PropertyIdentifier.TIME_OF_ACTIVE_TIME_RESET,
    pidName: "TIME_OF_ACTIVE_TIME_RESET",
    type: bacnet.enum.ApplicationTags.DATETIME,
    value: "",
  },
  {
    id: bacnet.enum.PropertyIdentifier.NOTIFICATION_CLASS,
    pidName: "NOTIFICATION_CLASS",
    type: bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
    value: 1,
  },
  {
    id: bacnet.enum.PropertyIdentifier.ALARM_VALUE,
    pidName: "ALARM_VALUE",
    type: bacnet.enum.ApplicationTags.ENUMERATED,
    enum: bacnet.enum.BinaryPV,
    value: 1,
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
    value: 0,
  },
  {
    id: bacnet.enum.PropertyIdentifier.PROFILE_NAME,
    pidName: "PROFILE_NAME",
    type: bacnet.enum.ApplicationTags.CHARACTER_STRING,
    value: "",
  },
];