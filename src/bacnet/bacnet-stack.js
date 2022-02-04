import bacnet from 'bacstack';
import { object_types, pids } from './utils/type-helper.js';
import log from '../logger.js';
import { read } from '../background-store.js';

function createStack() {

  /* {
  port: 47809,                          // Use BAC1 as communication port
  interface: '192.168.251.10',          // Listen on a specific interface
  broadcastAddress: '192.168.251.255',  // Use the subnet broadcast address
  adpuTimeout: 6000                     // Wait twice as long for response
  } */
  const bacstack = new bacnet({
    port: read("port"),
    interface: read("netInterface")
  });

  bacstack.on("whoIs", (data) => {
    log.info(`WhoIs request from: ${data.address}`);
    if (data.lowLimit && data.lowLimit > read("deviceId")) return;
    if (data.highLimit && data.highLimit < read("deviceId")) return;
    bacstack.iAmResponse(
      read("deviceId"),
      bacnet.enum.Segmentation.SEGMENTATION_BOTH,
      read("vendorId")
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
    let object = read("dp").find(
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
    log.info(`WhoHas request from: ${data.address}`);
    if (data.lowLimit && data.lowLimit > read("deviceId")) return;
    if (data.highLimit && data.highLimit < read("deviceId")) return;
    if (data.objId) {
      let object = read("dp").find(
        (datapoint) =>
          datapoint.oid ===
          `${data.request.objectId.type}${data.request.objectId.instance}`
      );
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

export { createStack };
