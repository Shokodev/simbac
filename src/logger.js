import { BrowserWindow } from "electron";

const Level = {
  trace: "TRACE",
  debug: "DEBUG",
  info: "INFO",
  warn: "WARN",
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

function getTimeStamp() {
  let now = new Date();
  const twoDigi = (num) => (num.length == 1 ? 0 + num.toString() : num);
  return (
    `${now.getFullYear()}-${twoDigi(now.getMonth())}-${twoDigi(now.getDay())}` +
    ` ${twoDigi(now.getHours())}:${twoDigi(now.getMinutes())}:${twoDigi(
      now.getSeconds()
    )}`
  );
}

const logger = {};

Object.keys(Level).forEach((level) => {
  logger[level] = (msg) => {
    try {
      let log = {
        level: Level[level],
        message: msg,
        timestamp: getTimeStamp(),
      };
      console.log(`${log.timestamp}|${log.level}|${log.message}`);
      streamToFrontend(log);
    } catch (err) {
      console.log(`Logger ERROR: ${err}`);
    }
  };
});

export default logger;
