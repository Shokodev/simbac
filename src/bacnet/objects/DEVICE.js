const bacnet = require("bacstack");
const BacnetObject = require("../bacnet-object");

class Device extends BacnetObject {
  constructor(_instance = Number, storeProps = []) {
    super(bacnet.enum.ObjectType.ANALOG_INPUT, _instance, storeProps);
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
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.VENDOR_NAME,
        pidName:"VENDOR_NAME",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.VENDOR_IDENTIFIER,
        pidName:"VENDOR_IDENTIFIER",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.MODEL_NAME,
        pidName:"MODEL_NAME",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.FIRMWARE_REVISION,
        pidName:"FIRMWARE_REVISION",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.APPLICATION_SOFTWARE_VERSION,
        pidName:"APPLICATION_SOFTWARE_VERSION",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.LOCATION,
        pidName:"LOCATION",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.DESCRIPTION,
        pidName:"DESCRIPTION",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.PROTOCOL_VERSION,
        pidName:"PROTOCOL_VERSION",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.PROTOCOL_SERVICES_SUPPORTED,
        pidName:"PROTOCOL_SERVICES_SUPPORTED",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.PROTOCOL_OBJECT_TYPES_SUPPORTED,
        pidName:"PROTOCOL_OBJECT_TYPES_SUPPORTED",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.OBJECT_LIST,
        pidName:"OBJECT_LIST",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.MAX_APDU_LENGTH_SUPPORTED,
        pidName:"MAX_APDU_LENGTH_SUPPORTED",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.SEGMENTATION_SUPPORTED,
        pidName:"SEGMENTATION_SUPPORTED",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.MAX_SEGMENTS_ACCEPTED,
        pidName:"MAX_SEGMENTS_ACCEPTED",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.VT_CLASSES_SUPPORTED,
        pidName:"VT_CLASSES_SUPPORTED",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.ACTIVE_VT_SESSIONS,
        pidName:"ACTIVE_VT_SESSIONS",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.LOCAL_TIME,
        pidName:"LOCAL_TIME",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.LOCAL_DATE,
        pidName:"LOCAL_DATE",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.UTC_OFFSET,
        pidName:"UTC_OFFSET",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.DAYLIGHT_SAVINGS_STATUS,
        pidName:"DAYLIGHT_SAVINGS_STATUS",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.APDU_SEGMENT_TIMEOUT,
        pidName:"APDU_SEGMENT_TIMEOUT",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.APDU_TIMEOUT,
        pidName:"APDU_TIMEOUT",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.NUMBER_OF_APDU_RETRIES,
        pidName:"NUMBER_OF_APDU_RETRIES",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.TIME_SYNCHRONIZATION_RECIPIENTS,
        pidName:"TIME_SYNCHRONIZATION_RECIPIENTS",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.MAX_MASTER,
        pidName:"MAX_MASTER",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.MAX_INFO_FRAMES,
        pidName:"MAX_INFO_FRAMES",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.DEVICE_ADDRESS_BINDING,
        pidName:"DEVICE_ADDRESS_BINDING",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.DATABASE_REVISION,
        pidName:"DATABASE_REVISION",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.CONFIGURATION_FILES,
        pidName:"CONFIGURATION_FILES",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.LAST_RESTORE_TIME,
        pidName:"LAST_RESTORE_TIME",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.BACKUP_FAILURE_TIMEOUT,
        pidName:"BACKUP_FAILURE_TIMEOUT",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.BACKUP_PREPARATION_TIME,
        pidName:"BACKUP_PREPARATION_TIME",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.RESTORE_PREPARATION_TIME,
        pidName:"RESTORE_PREPARATION_TIME",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.RESTORE_COMPLETION_TIME,
        pidName:"RESTORE_COMPLETION_TIME",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.BACKUP_AND_RESTORE_STATE,
        pidName:"BACKUP_AND_RESTORE_STATE",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.ACTIVE_COV_SUBSCRIPTIONS,
        pidName:"ACTIVE_COV_SUBSCRIPTIONS",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.SLAVE_PROXY_ENABLE,
        pidName:"SLAVE_PROXY_ENABLE",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.MANUAL_SLAVE_ADDRESS_BINDING,
        pidName:"MANUAL_SLAVE_ADDRESS_BINDING",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.AUTO_SLAVE_DISCOVERY,
        pidName:"AUTO_SLAVE_DISCOVERY",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.SLAVE_ADDRESS_BINDING,
        pidName:"SLAVE_ADDRESS_BINDING",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.LAST_RESTART_REASON,
        pidName:"LAST_RESTART_REASON",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.TIME_OF_DEVICE_RESTART,
        pidName:"TIME_OF_DEVICE_RESTART",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.RESTART_NOTIFICATION_RECIPIENTS,
        pidName:"RESTART_NOTIFICATION_RECIPIENTS",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.UTC_TIME_SYNCHRONIZATION_RECIPIENTS,
        pidName:"UTC_TIME_SYNCHRONIZATION_RECIPIENTS",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.TIME_SYNCHRONIZATION_INTERVAL,
        pidName:"TIME_SYNCHRONIZATION_INTERVAL",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.ALIGN_INTERVALS,
        pidName:"ALIGN_INTERVALS",
        type:"",
        value:""
    },

    {
        id:bacnet.enum.PropertyIdentifier.INTERVAL_OFFSET,
        pidName:"INTERVAL_OFFSET",
        type:bacnet.enum.ApplicationTags.ENUMERATED,
        typeValues:bacnet.enum.TimeStamp,
        value:1
    },

    {
        id:bacnet.enum.PropertyIdentifier.PROFILE_NAME,
        pidName:"PropertyIdentifier",
        type:bacnet.enum.ApplicationTags.CHARACTER_STRING,
        value:""
    }
]

module.exports = Device


 /*        // Device
    systemStatus = DeviceStatus
    vendorName = CharacterString
    vendorIdentifier = Unsigned16
    modelName = CharacterString
    firmwareRevision = CharacterString
    applicationSoftwareVersion = CharacterString
    location = CharacterString
    description = CharacterString
    protocolVersion = UnsignedInteger
    protocolRevision = UnsignedInteger
    protocolServicesSupported = ServicesSupported
    protocolObjectTypesSupported = ObjectTypesSupported = ObjectIdentifier
    structuredObjectList = ObjectIdentifier
    maxApduLengthAccepted = UnsignedInteger
    segmentationSupported = Segmentation
    vtClassesSupported = VtClass
    activeVtSessions = VtSession
    localTime = Time
    localDate = Date
    utcOffset = SignedInteger
    daylightSavingsStatus = Boolean
    apduSegmentTimeout = UnsignedInteger
    apduTimeout = UnsignedInteger
    numberOfApduRetries = UnsignedInteger
    listOfSessionKeys = SessionKey
    timeSynchronizationRecipients = Recipient
    maxMaster = UnsignedInteger
    maxInfoFrames = UnsignedInteger
    deviceAddressBinding = AddressBinding
    databaseRevision = UnsignedInteger
    configurationFiles = ObjectIdentifier
    lastRestoreTime = TimeStamp
    backupFailureTimeout = Unsigned16
    backupPreparationTime = Unsigned16
    restorePreparationTime = Unsigned16
    restoreCompletionTime = Unsigned16
    backupAndRestoreState = BackupState
    activeCovSubscriptions = CovSubscription
    maxSegmentsAccepted = UnsignedInteger
    utcTimeSynchronizationRecipients = Recipient
    timeSynchronizationInterval = UnsignedInteger
    alignIntervals = Boolean
    intervalOffset = UnsignedInteger
    slaveProxyEnable = Boolean
    autoSlaveDiscovery = Boolean
    slaveAddressBinding = AddressBinding
    manualSlaveAddressBinding = AddressBinding
    lastRestartReason = RestartReason
    restartNotificationRecipients = Recipient
    timeOfDeviceRestart = TimeStamp */