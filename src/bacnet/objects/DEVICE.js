import bacnet from 'bacstack';
import BacnetObject from '../bacnet-object.js';
import { getObjectList } from '../../background-store';

export default class Device extends BacnetObject {
  constructor(_instance = Number, storeProps = []) {
    super(bacnet.enum.ObjectType.DEVICE, _instance, storeProps);
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
        id:bacnet.enum.PropertyIdentifier.SYSTEM_STATUS,
        pidName:"SYSTEM_STATUS",
        type: bacnet.enum.ApplicationTags.ENUMERATED,
        enum:bacnet.enum.DeviceStatus,
        value:0
    },

    {
        id:bacnet.enum.PropertyIdentifier.VENDOR_NAME,
        pidName:"VENDOR_NAME",
        type:bacnet.enum.ApplicationTags.CHARACTER_STRING,
        value:"device 1"
    },

    {
        id:bacnet.enum.PropertyIdentifier.VENDOR_IDENTIFIER,
        pidName:"VENDOR_IDENTIFIER",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:0
    },

    {
        id:bacnet.enum.PropertyIdentifier.MODEL_NAME,
        pidName:"MODEL_NAME",
        type:bacnet.enum.ApplicationTags.CHARACTER_STRING,
        value:"SHOKO-001"
    },

    {
        id:bacnet.enum.PropertyIdentifier.FIRMWARE_REVISION,
        pidName:"FIRMWARE_REVISION",
        type:bacnet.enum.ApplicationTags.CHARACTER_STRING,
        value:"FW-SHOKO-001"
    },

    {
        id:bacnet.enum.PropertyIdentifier.APPLICATION_SOFTWARE_VERSION,
        pidName:"APPLICATION_SOFTWARE_VERSION",
        type:bacnet.enum.ApplicationTags.CHARACTER_STRING,
        value:"SW-SHOKO-001"
    },

    {
        id:bacnet.enum.PropertyIdentifier.LOCATION,
        pidName:"LOCATION",
        type:bacnet.enum.ApplicationTags.CHARACTER_STRING,
        value:"CH"
    },

    {
        id:bacnet.enum.PropertyIdentifier.DESCRIPTION,
        pidName:"DESCRIPTION",
        type:bacnet.enum.ApplicationTags.CHARACTER_STRING,
        value:"Virtual shoko device"
    },

    {
        id:bacnet.enum.PropertyIdentifier.PROTOCOL_VERSION,
        pidName:"PROTOCOL_VERSION",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:1
    },

    {
        id:bacnet.enum.PropertyIdentifier.PROTOCOL_SERVICES_SUPPORTED,
        pidName:"PROTOCOL_SERVICES_SUPPORTED",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:1
    },

    {
        id:bacnet.enum.PropertyIdentifier.PROTOCOL_OBJECT_TYPES_SUPPORTED,
        pidName:"PROTOCOL_OBJECT_TYPES_SUPPORTED",
        type:bacnet.enum.ApplicationTags.ENUMERATED,
        enum: bacnet.enum.ServicesSupported,
        value:Object.keys(bacnet.enum.ServicesSupported).reduce((a,v)=>{a.push(bacnet.enum.ServicesSupported[v]); return a},[])
    },

    {
        id:bacnet.enum.PropertyIdentifier.OBJECT_LIST,
        pidName:"OBJECT_LIST",
        type:bacnet.enum.ApplicationTags.OBJECTIDENTIFIER,
        //read what is in store while ini
        value: getObjectList(),
    },

    {
        id:bacnet.enum.PropertyIdentifier.MAX_APDU_LENGTH_SUPPORTED,
        pidName:"MAX_APDU_LENGTH_SUPPORTED",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:1476
    },

    {
        id:bacnet.enum.PropertyIdentifier.SEGMENTATION_SUPPORTED,
        pidName:"SEGMENTATION_SUPPORTED",
        type:bacnet.enum.ApplicationTags.ENUMERATED,
        enum: bacnet.enum.Segmentation,
        value:0
    },

    {
        id:bacnet.enum.PropertyIdentifier.MAX_SEGMENTS_ACCEPTED,
        pidName:"MAX_SEGMENTS_ACCEPTED",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:0
    },

    {
        id:bacnet.enum.PropertyIdentifier.VT_CLASSES_SUPPORTED,
        pidName:"VT_CLASSES_SUPPORTED",
        type:bacnet.enum.ApplicationTags.ENUMERATED,
        enum: bacnet.enum.VTClass,
        value:0
    },

    {
        id:bacnet.enum.PropertyIdentifier.ACTIVE_VT_SESSIONS,
        pidName:"ACTIVE_VT_SESSIONS",
        type:bacnet.enum.ApplicationTags.ENUMERATED,
        enum: bacnet.enum.VTClass,
        value:0
    },

    {
        id:bacnet.enum.PropertyIdentifier.LOCAL_TIME,
        pidName:"LOCAL_TIME",
        type:bacnet.enum.ApplicationTags.TIME,
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.LOCAL_DATE,
        pidName:"LOCAL_DATE",
        type:bacnet.enum.ApplicationTags.DATE,
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.UTC_OFFSET,
        pidName:"UTC_OFFSET",
        type:bacnet.enum.ApplicationTags.SIGNED_INTEGER,
        value:0
    },

    {
        id:bacnet.enum.PropertyIdentifier.DAYLIGHT_SAVINGS_STATUS,
        pidName:"DAYLIGHT_SAVINGS_STATUS",
        type:bacnet.enum.ApplicationTags.BOOLEAN,
        value:false
    },

    {
        id:bacnet.enum.PropertyIdentifier.APDU_SEGMENT_TIMEOUT,
        pidName:"APDU_SEGMENT_TIMEOUT",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:6000
    },

    {
        id:bacnet.enum.PropertyIdentifier.APDU_TIMEOUT,
        pidName:"APDU_TIMEOUT",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:6000
    },

    {
        id:bacnet.enum.PropertyIdentifier.NUMBER_OF_APDU_RETRIES,
        pidName:"NUMBER_OF_APDU_RETRIES",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:1
    },

    {
        id:bacnet.enum.PropertyIdentifier.TIME_SYNCHRONIZATION_RECIPIENTS,
        pidName:"TIME_SYNCHRONIZATION_RECIPIENTS",
        type:bacnet.enum.ApplicationTags.ENUMERATED,
        enum:[{val:'tbd'}],
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.MAX_MASTER,
        pidName:"MAX_MASTER",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:1
    },

    {
        id:bacnet.enum.PropertyIdentifier.MAX_INFO_FRAMES,
        pidName:"MAX_INFO_FRAMES",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:1
    },

    {
        id:bacnet.enum.PropertyIdentifier.DEVICE_ADDRESS_BINDING,
        pidName:"DEVICE_ADDRESS_BINDING",
        type:bacnet.enum.ApplicationTags.ENUMERATED,
        enum:[{val:'tbd'}],
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.DATABASE_REVISION,
        pidName:"DATABASE_REVISION",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:1
    },

    {
        id:bacnet.enum.PropertyIdentifier.CONFIGURATION_FILES,
        pidName:"CONFIGURATION_FILES",
        type:bacnet.enum.ApplicationTags.OBJECTIDENTIFIER,
        value:[]
    },

    {
        id:bacnet.enum.PropertyIdentifier.LAST_RESTORE_TIME,
        pidName:"LAST_RESTORE_TIME",
        type:bacnet.enum.ApplicationTags.TIMESTAMP,
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.BACKUP_FAILURE_TIMEOUT,
        pidName:"BACKUP_FAILURE_TIMEOUT",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:1
    },

    {
        id:bacnet.enum.PropertyIdentifier.BACKUP_PREPARATION_TIME,
        pidName:"BACKUP_PREPARATION_TIME",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:1
    },

    {
        id:bacnet.enum.PropertyIdentifier.RESTORE_PREPARATION_TIME,
        pidName:"RESTORE_PREPARATION_TIME",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:1
    },

    {
        id:bacnet.enum.PropertyIdentifier.RESTORE_COMPLETION_TIME,
        pidName:"RESTORE_COMPLETION_TIME",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:1
    },

    {
        id:bacnet.enum.PropertyIdentifier.BACKUP_AND_RESTORE_STATE,
        pidName:"BACKUP_AND_RESTORE_STATE",
        type:bacnet.enum.ApplicationTags.ENUMERATED,
        enum:bacnet.enum.BackupState,
        value:0
    },

    {
        id:bacnet.enum.PropertyIdentifier.ACTIVE_COV_SUBSCRIPTIONS,
        pidName:"ACTIVE_COV_SUBSCRIPTIONS",
        type:bacnet.enum.ApplicationTags.ENUMERATED,
        enum:[{val:'tbd'}],
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.SLAVE_PROXY_ENABLE,
        pidName:"SLAVE_PROXY_ENABLE",
        type:bacnet.enum.ApplicationTags.BOOLEAN,
        value:false
    },

    {
        id:bacnet.enum.PropertyIdentifier.MANUAL_SLAVE_ADDRESS_BINDING,
        pidName:"MANUAL_SLAVE_ADDRESS_BINDING",
        type:bacnet.enum.ApplicationTags.ENUMERATED,
        enum:[{val:'tbd'}],
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.AUTO_SLAVE_DISCOVERY,
        pidName:"AUTO_SLAVE_DISCOVERY",
        type:bacnet.enum.ApplicationTags.BOOLEAN,
        value:false
    },

    {
        id:bacnet.enum.PropertyIdentifier.SLAVE_ADDRESS_BINDING,
        pidName:"SLAVE_ADDRESS_BINDING",
        type:bacnet.enum.ApplicationTags.ENUMERATED,
        enum:[{val:'tbd'}],
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.LAST_RESTART_REASON,
        pidName:"LAST_RESTART_REASON",
        type:bacnet.enum.ApplicationTags.ENUMERATED,
        enum:bacnet.enum.RestartReason,
        value:2
    },

    {
        id:bacnet.enum.PropertyIdentifier.TIME_OF_DEVICE_RESTART,
        pidName:"TIME_OF_DEVICE_RESTART",
        type:bacnet.enum.ApplicationTags.TIMESTAMP,
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.RESTART_NOTIFICATION_RECIPIENTS,
        pidName:"RESTART_NOTIFICATION_RECIPIENTS",
        type:bacnet.enum.ApplicationTags.ENUMERATED,
        enum:[{val:'tbd'}],
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.UTC_TIME_SYNCHRONIZATION_RECIPIENTS,
        pidName:"UTC_TIME_SYNCHRONIZATION_RECIPIENTS",
        type:bacnet.enum.ApplicationTags.ENUMERATED,
        enum:[{val:'tbd'}],
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.TIME_SYNCHRONIZATION_INTERVAL,
        pidName:"TIME_SYNCHRONIZATION_INTERVAL",
        type:bacnet.enum.ApplicationTags.UNSIGNED_INTEGER,
        value:100
    },

    {
        id:bacnet.enum.PropertyIdentifier.ALIGN_INTERVALS,
        pidName:"ALIGN_INTERVALS",
        type:bacnet.enum.ApplicationTags.BOOLEAN,
        value:false
    },

    {
        id:bacnet.enum.PropertyIdentifier.INTERVAL_OFFSET,
        pidName:"INTERVAL_OFFSET",
        type:bacnet.enum.ApplicationTags.TIMESTAMP,
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.PROFILE_NAME,
        pidName:"PROFILE_NAME",
        type:bacnet.enum.ApplicationTags.CHARACTER_STRING,
        value:"PROFILE1"
    }
];


 