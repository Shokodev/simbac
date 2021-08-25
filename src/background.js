const { app, BrowserWindow, ipcMain } = require("electron");
const { save, read } = require("./background-store");
import path from "path";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";
const log = require("./logger");

//Create Window and load index.html & preload.js
function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    alwaysOnTop: true,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const splash = new BrowserWindow({
    width: 400,
    height: 400,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });
  splash.setResizable(false);
  // eslint-disable-next-line no-undef
  splash.loadURL(path.join(__static, "loading.html"));

  //const loadingScreen = createSplashWindow();
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    // eslint-disable-next-line no-undef
    createProtocol("app");
    // Load the index.html when not in developments
    win.loadURL("app://./index.html");
  }
  win.once("ready-to-show", () => {
    splash.destroy();
    win.show();
  });
}

app.whenReady().then(async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      log.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

const BACnetDevice = require("./bacnet/bacnet-device");
const device = new BACnetDevice();

ipcMain.on("GET_DEVICE", (event) => {
  event.reply("GET_DEVICE", {
    name: read("name"),
    port: read("port"),
    deviceId: read("deviceId"),
    vendorId: read("vendorId"),
    dp: read("dp"),
    isRunning: device.bacstack ? true : false,
  });
});

ipcMain.on("CREATE_DEVICE", (event, payload) => {
  try {
    log.info("Save device settings");

    save("name", payload.name);
    save("port", parseInt(payload.port));
    save("deviceId", parseInt(payload.deviceId));
    save("vendorId", parseInt(payload.vendorId));
    let result = device.start();
    device.bacstack.whoIs();
    // Read Device Object
    device.bacstack.readProperty(
      "localhost",
      { type: 2, instance: 0 },
      85,
      (err, data) => {
      log.info(`Found value: ${data.values[0].value}`);
      }
    );
    event.reply("CREATE_DEVICE", result);
  } catch (err) {
    event.reply("CREATE_DEVICE", err);
  }
});

ipcMain.on("UPDATE_DPS", (event, payload) => {
  try {
    log.info("Update datapoints");
    save("dp", payload);
    event.reply("UPDATE_DPS", "OK");
  } catch (err) {
    event.reply("UPDATE_DPS", err);
  }
});

ipcMain.on("DELETE_DEVICE", (event, payload) => {
  log.info(payload);
  let result = device.stop();
  event.reply("DELETE_DEVICE", result);
});


