const log = require("../logger");
const {createStack} = require("./bacnet-stack");

class BacnetDevice {
  
  start() {
    log.info("Start device...");
    try {
      if(this.bacstack) throw 'Stack is already running!' 
      this.bacstack = createStack();
      return 'started';
    } catch (err) {
      log.error(`Device starting failed: ${err}`);
      return `Device starting failed: ${err}`
    }
  }

  stop() {
    log.info("Stop device...");
    try {
      if(!this.bacstack) throw 'Stack was already stopped!' 
      this.bacstack.close();
      this.bacstack = null;
      return 'stopped';
    } catch (err) {
      log.error(`Device stopping failed: ${err}`);
      return `Device stopping failed: ${err}`
    }
  }
  
}

module.exports = BacnetDevice;
