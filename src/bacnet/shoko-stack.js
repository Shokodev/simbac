import log from "../logger.js";
import { createStack } from "./bacnet-stack.js";
import eStore from "../background-store.js";
import Device from "./objects/DEVICE.js";

export default class ShokoStack {
  start() {
    log.info("starting shoko bacnet stack");
    try {
      if (this.bacstack) throw "stack is already running!";
      this.bacstack = createStack();
      let device = eStore.read("dp").find((dp) => dp.oid === "8:0");
      if (device) {
        let model = device.properties.find((p) => p.id === 70);
        log.debug(`restored device object ${model.value}`);
      } else {
        let device = new Device(0);
        eStore.addDp(device);
        let model = device.properties.find((p) => p.id === 70);
        log.debug(`created new default device ${model.value}`);
      }
      return "started";
    } catch (err) {
      log.error(`start shoko bacnet stack failed: ${err}`);
      return `start shoko bacnet stack failed: ${err}`;
    }
  }

  stop() {
    log.info("stopping shoko bacnet stack");
    try {
      if (!this.bacstack) throw "stack was already stopped!";
      this.bacstack.close();
      this.bacstack = null;
      return "stopped";
    } catch (err) {
      log.error(`stopping shoko bacnet stack failed: ${err}`);
      return `stopping shoko bacnet stack failed: ${err}`;
    }
  }
}
