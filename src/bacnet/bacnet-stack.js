const bacnet = require("bacstack");
const BacnetObject = require("./bacnet-object");
const log = require("../logger");
const { read, save } = require("../background-store");
const addDp = (bacnetObject) => {
  let dps = read("dp");
  if (dps.find((dp) => dp.oid === bacnetObject.oid))
    throw Error(`Store has already Datapoint with oid: ${bacnetObject.oid}`);
  dps.push(bacnetObject);
  save("dp", dps);
};

function createStack() {
  const bacstack = new bacnet({
    port: read("port"),
  });

  // create sample data
  let ex1 = new BacnetObject(2, 0); //ANALOG_VALUE
  ex1.setProperty(85, 10.23); //PRESENT_VALUE
  try {
    addDp(ex1);
  } catch (err) {
    log.warn(err);
  }

  bacstack.on("whoIs", (data) => {
    if (data.lowLimit && data.lowLimit > read("deviceId")) return;
    if (data.highLimit && data.highLimit < read("deviceId")) return;
    bacstack.iAmResponse(
      read("deviceId"),
      bacnet.enum.Segmentation.SEGMENTATION_BOTH,
      read("vendorId")
    );
  });

  bacstack.on("readProperty", (data) => {
    let object = read("dp").find(
      (datapoint) =>
        datapoint.oid ===
        `${data.request.objectId.type}${data.request.objectId.instance}`
    );
    if (!object)
      return bacstack.errorResponse(
        data.address,
        bacnet.enum.ConfirmedServiceChoice.READ_PROPERTY,
        data.invokeId,
        0,
        0
      );

    //TODO see Type for Property
    const property = object[data.request.property.id];
    if (!property)
      return bacstack.errorResponse(
        data.address,
        bacnet.enum.ConfirmedServiceChoice.READ_PROPERTY,
        data.invokeId,
        0,
        0
      );
    if (data.request.property.index === 0xffffffff) {
      bacstack.readPropertyResponse(
        data.address,
        data.invokeId,
        data.request.objectId,
        data.request.property,
        property
      );
    } else {
      const slot = property[data.request.property.index];
      if (!slot)
        return bacstack.errorResponse(
          data.address,
          bacnet.enum.ConfirmedServiceChoice.READ_PROPERTY,
          data.invokeId,
          0,
          0
        );
      bacstack.readPropertyResponse(
        data.address,
        data.invokeId,
        data.request.objectId,
        data.request.property,
        [slot]
      );
    }
  });

  bacstack.on("writeProperty", (data) => {
    let object = read("dp").find(
      (datapoint) =>
        datapoint.oid ===
        `${data.request.objectId.type}${data.request.objectId.instance}`
    );
    if (!object)
      return bacstack.errorResponse(
        data.address,
        data.service,
        data.invokeId,
        bacnet.enum.ErrorClasses.ERROR_CLASS_OBJECT,
        bacnet.enum.ErrorCodes.ERROR_CODE_UNKNOWN_OBJECT
      );
    let property = object[data.request.property.id];
    if (!property)
      return bacstack.errorResponse(
        data.address,
        data.service,
        data.invokeId,
        bacnet.enum.ErrorClasses.ERROR_CLASS_PROPERTY,
        bacnet.enum.ErrorCodes.ERROR_CODE_UNKNOWN_PROPERTY
      );
    if (data.request.property.index === 0xffffffff) {
      property = data.request.value.value;
      bacstack.simpleAckResponse(data.address, data.service, data.invokeId);
    } else {
      let slot = property[data.request.property.index];
      if (!slot)
        return bacstack.errorResponse(
          data.address,
          data.service,
          data.invokeId,
          bacnet.enum.ErrorClasses.ERROR_CLASS_PROPERTY,
          bacnet.enum.ErrorCodes.ERROR_CODE_INVALID_ARRAY_INDEX
        );
      slot = data.request.value.value[0];
      bacstack.simpleAckResponse(data.address, data.service, data.invokeId);
    }
  });

  bacstack.on("whoHas", (data) => {
    if (data.lowLimit && data.lowLimit > read("deviceId")) return;
    if (data.highLimit && data.highLimit < read("deviceId")) return;
    if (data.objId) {
      var object = dataStore[data.objId.type + ":" + data.objId.instance];
      if (!object) return;
      bacstack.iHaveResponse(
        read("deviceId"),
        { type: data.objId.type, instance: data.objId.instance },
        object[77][0].value
      );
    }
    if (data.objName) {
      // TODO: Find stuff...
      bacstack.iHaveResponse(
        read("deviceId"),
        { type: 1, instance: 1 },
        "test"
      );
    }
  });

  bacstack.on("timeSync", (data) => {
    log.info(`${data}`);
    // TODO: Implement
  });

  bacstack.on("timeSyncUTC", (data) => {
    log.info(`${data}`);
    // TODO: Implement
  });

  return bacstack;
}

module.exports = { createStack };
