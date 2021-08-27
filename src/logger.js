const Transport = require("winston-transport");
const { createLogger, transports, format } = require("winston");
const window = require("electron").BrowserWindow;

class ConsoleFrontend extends Transport {
  constructor(opts) {
    super(opts);
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit("logged", info);
    });
    let win = window.getFocusedWindow();
    win.webContents.send("CONSOLE_MSG", {
      level: info.level,
      message: info.message,
      timestamp: info.timestamp,
    });
    if (callback) {
      callback();
    }
  }
}

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  level: "debug",
  transports: [
    new transports.File({
      filename: "./logs/log.log",
      json: false,
      maxsize: 5242880,
      maxFiles: 1,
    }),
    new transports.Console(),
    new ConsoleFrontend(),
  ],
});

module.exports = logger;
