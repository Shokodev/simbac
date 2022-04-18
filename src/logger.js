import { BrowserWindow } from "electron";

const Level = {
  trace: "TRACE",
  debug: "DEBUG",
  info: "INFO ",
  warn: "WARN ",
  error: "ERROR",
  fatal: "FATAL",
};

function streamToFrontend(log) {
  let win = BrowserWindow.getFocusedWindow();
  win.webContents.send("CONSOLE_MSG", {
    level: log.level,
    message: log.message,
    timestamp: log.timestamp,
  });
}

const logger = {};

Object.keys(Level).forEach((level) => {
  logger[level] = (msg) => {
    try {
      let log = {
        level: Level[level],
        message: msg,
        timestamp: new Date(),
      };
      console.log(`| ${log.level} | ${log.message}`);
      streamToFrontend(log);
    } catch (err) {
      console.log(`Logger ERROR: ${err}`);
    }
  };
});

export default logger;
