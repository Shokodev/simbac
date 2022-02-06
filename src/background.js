import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron';
import { save, read, addDp, removeDp } from './background-store.js';
import path from 'path';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { object_types } from './bacnet/utils/type-helper.js';
import log from './logger.js';
const isDevelopment = process.env.NODE_ENV !== "production";

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
    alwaysOnTop: false,
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
    save("netInterface", "127.0.0.1");
    save("deviceId", 1234);
    save("vendorId", 7);
    save("dp", [])  ;
  })
  createWindow();
});

import BACnetDevice from './bacnet/bacnet-device.js';
const device = new BACnetDevice();
import bacnet from 'bacstack';
import os from 'os';

ipcMain.on("GET_STORE", (event) => {
  event.reply("GET_STORE", {
    name: read("name"),
    port: read("port"),
    deviceId: read("deviceId"),
    vendorId: read("vendorId"),
    netInterface: read("netInterface"),
    isRunning: device.bacstack ? true : false,
    objectTypes: bacnet.enum.ObjectType,
    netInterfaces: os.networkInterfaces(),
    dp: read("dp"),
  });
});

ipcMain.on("START_STACK", (event, payload) => {
  try {
    log.info("Save device settings");
    save("name", payload.name);
    save("port", parseInt(payload.port));
    save("deviceId", parseInt(payload.deviceId));
    save("vendorId", parseInt(payload.vendorId));
    save("netInterface", payload.netInterface);
    const result = device.start();
    device.bacstack.whoIs();
    // Read some datapoint
/*     device.bacstack.readProperty(
      "192.168.1.130",
      { type: 0, instance: 0 },
      85,
      (err, data) => {
        if (err) {
          log.error(`Read property request failed: ${err}`);
        } else {
          log.info(`Found value: ${data.values[0].value}`);
        }
      }
    );  */
    event.reply("START_STACK", result);
  } catch (err) {
    event.reply("START_STACK", err);
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

ipcMain.on("NEW_DP", async(event, payload) => {
  try {
    log.info(`Create new: ${payload}`);
    let obj = await import(`./bacnet/objects/${payload}.js`);
    let instance = read("dp").reduce((a, v) => {
      if (object_types[v.oid.split(":")[0]] === payload) {
        a = 0;
        if (parseInt(v.oid.split(":")[1]) > a) {
          return parseInt(v.oid.split(":")[1]);
        } else return a;
      }
      return a;
    }, null);
    console.log(instance);
    let num = instance === null ? 0 : instance + 1;
    log.debug(`Allocate instance number ${num}`);
    const dp = obj.default;
    event.reply("NEW_DP", new dp(num));
  } catch (err) {
    event.reply("NEW_DP", err);
  }
});

ipcMain.on("STOP_STACK", (event, payload) => {
  log.info(payload);
  let result = device.stop();
  event.reply("STOP_STACK", result);
});
