import bacnet from 'bacstack';
import BacnetObject from '../bacnet-object.js';

export default class MultistateInput extends BacnetObject {
  constructor(_instance = Number, storeProps = []) {
    super(bacnet.enum.ObjectType.MULTI_STATE_INPUT, _instance, storeProps);
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
    type: bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
    value: 1,
  },
  {
    id: bacnet.enum.PropertyIdentifier.DESCRIPTION,
    pidName: "DESCRIPTION",
    type: bacnet.enum.ApplicationTags.CHARACTER_STRING,
    value: "Multistate Input TXT",
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
    id: bacnet.enum.PropertyIdentifier.NUMBER_OF_STATES,
    pidName: "NUMBER_OF_STATES",
    type: bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
    value: 2,
  },
  {
    id: bacnet.enum.PropertyIdentifier.STATE_TEXT,
    pidName: "STATE_TEXT",
    type: bacnet.enum.ApplicationTags.CHARACTER_STRING,
    value: "Stufe 1, Stufe 2",
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
    type: bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
    value: 1,
  },
  {
    id: bacnet.enum.PropertyIdentifier.EVENT_ENABLED,
    pidName: "EVENT_ENABLED",
    type: bacnet.enum.ApplicationTags.ENUMERATED,
    enum: bacnet.enum.EventTransitionBits,
    value: 0,
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