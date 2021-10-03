const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const { save, read, addDp, removeDp } = require("./background-store");
import path from "path";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { object_types } from "./bacnet/utils/type-helper";
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
  globalShortcut.register('Alt+CommandOrControl+D', () => {
    save("name", "device1");
    save("port", 47808);
    save("deviceId", 1234);
    save("vendorId", 7);
    save("dp", [])  ;
  })
  createWindow();
  console.log(read('netInterface')); 
});

const BACnetDevice = require("./bacnet/bacnet-device");
const device = new BACnetDevice();
const bacnet = require("bacstack").enum;

const os = require('os');
ipcMain.on("GET_STORE", (event) => {
  event.reply("GET_STORE", {
    name: read("name"),
    port: read("port"),
    deviceId: read("deviceId"),
    vendorId: read("vendorId"),
    isRunning: device.bacstack ? true : false,
    objectTypes: bacnet.ObjectType,
    netInterfaces: os.networkInterfaces(),
    dp: read("dp"),
  });
});

//TODO RENAME TO START_STACK (or similar) and devide stack and device data
ipcMain.on("CREATE_DEVICE", (event, payload) => {
  try {
    log.info("Save device settings");
    save("name", payload.name);
    save("port", parseInt(payload.port));
    save("deviceId", parseInt(payload.deviceId));
    save("vendorId", parseInt(payload.vendorId));
    let result = device.start();
    device.bacstack.whoIs();
    // Read some datapoint
    /* device.bacstack.readProperty(
      "localhost",
      { type: 0, instance: 0 },
      85,
      (err, data) => {
        if (err) {
          log.error(`Read property request failed: ${err}`);
        } else {
          log.info(`Found value: ${data.values[0].value}`);
        }
      }
    ); */
    event.reply("CREATE_DEVICE", result);
  } catch (err) {
    event.reply("CREATE_DEVICE", err);
  }
});

ipcMain.on("ADD_DP", (event, payload) => {
  try {
    log.info(`Add datapoint: ${payload.oid}`);
    addDp(payload);
    event.reply("ADD_DP", "OK");
  } catch (err) {
    event.reply("ADD_DP", err);
  }
});

ipcMain.on("REMOVE_DP", (event, payload) => {
  try {
    log.info(`Remove datapoint: ${payload.oid}`);
    removeDp(payload);
    event.reply("REMOVE_DP", "OK");
  } catch (err) {
    event.reply("REMOVE_DP", err);
  }
});

ipcMain.on("NEW_DP", (event, payload) => {
  try {
    log.info(`Create new: ${payload}`);
    let obj = require(`./bacnet/objects/${payload}`);
    let instance = read("dp").reduce((a, v) => {
      if (object_types[v.oid.split(":")[0]] === payload) {
        if (parseInt(v.oid.split(":")[1]) > a) {
          return parseInt(v.oid.split(":")[1]);
        } else return a;
      }
      return a;
    }, 0);
    let num = instance === 0 ? 0 : instance + 1;
    log.debug(`Allocate instance number ${num}`);
    event.reply("NEW_DP", new obj(num));
  } catch (err) {
    event.reply("NEW_DP", err);
  }
});

//TODO RENAME TO STOP_STACK (or similar)
ipcMain.on("DELETE_DEVICE", (event, payload) => {
  log.info(payload);
  let result = device.stop();
  event.reply("DELETE_DEVICE", result);
});
