import bacnet from "bacstack";
import { object_types, pids,value_types} from "./utils/type-helper.js";
import log from "../logger.js";
import eStore from "../background-store.js";

function createStack() {
  /* {
  port: 47809,                          // Use BAC1 as communication port
  interface: '192.168.251.10',          // Listen on a specific interface
  broadcastAddress: '192.168.251.255',  // Use the subnet broadcast address
  adpuTimeout: 6000                     // Wait twice as long for response
  } */
  const bacstack = new bacnet({
    port: eStore.read("port"),
    interface: eStore.read("netInterface"),
  });

  bacstack.on("whoIs", (data) => {
    log.info(`WhoIs request from: ${data.address}`);
    let deviceid = eStore.read("deviceId");
    if (data.lowLimit && data.lowLimit > deviceid) return;
    if (data.highLimit && data.highLimit < deviceid) return;
    log.debug(`Respnose with IAM[${deviceid}]`);
    bacstack.iAmResponse(
      deviceid,
      bacnet.enum.Segmentation.SEGMENTATION_BOTH,
      deviceid
    );
  });
  //TODO DEFINE ERROR RESPONSE
  bacstack.on("readProperty", (data) => {
    let prop = {
      id: data.request.property.id,
      str: pids[data.request.property.id],
    };
    let obj = {
      inst: data.request.objectId.instance,
      type: object_types[data.request.objectId.type],
    };
    log.info(
      `Read property ${prop.str} (${prop.id}) request on ${obj.type} (${obj.inst}) from ${data.address}`
    );
    let object = eStore
      .read("dp")
      .find(
        (datapoint) =>
          datapoint.oid ===
          `${data.request.objectId.type}:${data.request.objectId.instance}`
      );
    if (!object) {
      log.debug(`Object ${obj.type} (${obj.inst}) not found, return Error`);
      return bacstack.errorResponse(
        data.address,
        bacnet.enum.ConfirmedServiceChoice.READ_PROPERTY,
        data.invokeId,
        0,
        0
      );
    }
    const property = object.properties.filter(
      (property) => property.id == data.request.property.id
    );
    if (!property) {
      log.debug(
        `Property ${prop.str} (${prop.id}) on object ${obj.type} (${obj.inst}) not found, return Error`
      );
      return bacstack.errorResponse(
        data.address,
        bacnet.enum.ConfirmedServiceChoice.READ_PROPERTY,
        data.invokeId,
        0,
        0
      );
    }
    log.debug(
      `Return ${prop.str} with: ${property.reduce(
        (a, v) => a + ` ${v.value}`,
        ""
      )}`
    );
    bacstack.readPropertyResponse(
      data.address,
      data.invokeId,
      data.request.objectId,
      data.request.property,
      property
    );
  });

  bacstack.on("writeProperty", (data) => {
    console.log(data.request);
    let prop = {
      id: data.request.value.property.id,
      index: data.request.value.property.index,
      str: pids[data.request.value.property.id],
      val: data.request.value.value[0].value,
      valType: value_types[data.request.value.value[0].type]
    };
    let obj = {
      inst: data.request.objectId.instance,
      typeText: object_types[data.request.objectId.type],
      type: data.request.objectId.type
    };
    log.info(
      `Write property request for: ${prop.str} (${prop.id}) on ${obj.typeText} (${obj.inst}) with (${prop.valType}) value [${prop.val}]  from ${data.address}`
    );
    let storeObject = eStore
      .read("dp")
      .find(
        (datapoint) =>
          datapoint.oid ===
          `${obj.type}:${obj.inst}`
      );
    if (!storeObject){
      log.debug(`Object ${obj.typeText} (${obj.inst}) not found, return Error`);
      return bacstack.errorResponse(
        data.address,
        data.service,
        data.invokeId,
        bacnet.enum.ErrorClass.ERROR_CLASS_OBJECT,
        bacnet.enum.ErrorCode.ERROR_CODE_UNKNOWN_OBJECT
      );
    }
    let storeProp = storeObject.properties.find(p=>p.id=prop.id);
    if (!storeProp)
      return bacstack.errorResponse(
        data.address,
        data.service,
        data.invokeId,
        bacnet.enum.ErrorClass.ERROR_CLASS_PROPERTY,
        bacnet.enum.ErrorCode.ERROR_CODE_UNKNOWN_PROPERTY
      );
    if (prop.index === 0xffffffff) {
      console.log(`Index is 0xffffffff`)
      //storeProp = data.request.value.value;
      bacstack.simpleAckResponse(data.address, data.service, data.invokeId);
    } else {
      let slot = storeProp[data.request.property.index];
      if (!slot)
        return bacstack.errorResponse(
          data.address,
          data.service,
          data.invokeId,
          bacnet.enum.ErrorClass.ERROR_CLASS_PROPERTY,
          bacnet.enum.ErrorCode.ERROR_CODE_INVALID_ARRAY_INDEX
        );
      slot = data.request.value.value[0];
      //Simple ack response does not work as write response
      bacstack.simpleAckResponse(data.address, data.service, data.invokeId);
    }
  });

  bacstack.on("whoHas", (data) => {
    log.info(`WhoHas request from: ${data.address}`);
    if (data.lowLimit && data.lowLimit > eStore.read("deviceId")) return;
    if (data.highLimit && data.highLimit < eStore.read("deviceId")) return;
    if (data.objId) {
      let object = eStore
        .read("dp")
        .find(
          (datapoint) =>
            datapoint.oid ===
            `${data.request.objectId.type}${data.request.objectId.instance}`
        );
      if (!object) return;
      bacstack.iHaveResponse(
        eStore.read("deviceId"),
        { type: data.objId.type, instance: data.objId.instance },
        object[77][0].value
      );
    }
    if (data.objName) {
      // TODO: Find stuff...
      bacstack.iHaveResponse(
        eStore.read("deviceId"),
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

export { createStack };
