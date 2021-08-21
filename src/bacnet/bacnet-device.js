const log = require("../logger");

class BacnetDevice {
  
  start() {
    log.info("Start device...");
    try {
      if(this.bacstack) throw Error('Stack is already running!')  
      this.bacstack = require("./bacnet-stack");
    } catch (err) {
      log.error(`Device starting failed: ${err}`);
    }
  }

  stop() {
    log.info("Stop device...");
    try {
      if(!this.bacstack) throw Error('Stack was already stopped!')  
      this.bacstack.close();
      this.bacstack = null;
    } catch (err) {
      log.error(`Device starting failed: ${err}`);
    }
  }
  
}

module.exports = BacnetDevice;
