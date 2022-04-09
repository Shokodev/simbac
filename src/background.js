import { app, BrowserWindow, ipcMain, globalShortcut } from "electron";
import eStore from "./background-store.js";
import path from "path";
import fs from "fs";
import bacnet from "bacstack";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { object_types } from "./bacnet/utils/type-helper.js";
import log from "./logger.js";
const isDevelopment = process.env.NODE_ENV !== "production";

//Create Window and load index.html & preload.js
function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    alwaysOnTop: false,
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
  globalShortcut.register("Alt+CommandOrControl+D", () => {
    eStore.save("port", 47808);
    eStore.save("bacnetId", 1234);
    eStore.save("netInterface", "127.0.0.1");
    eStore.save("dp", []);
  });
  createWindow();
});

import ShokoStack from "./bacnet/shoko-stack.js";
const shokoStack = new ShokoStack();
import os from "os";

ipcMain.on("GET_STORE", (event) => {
  event.reply("GET_STORE", {
    port: eStore.read("port"),
    bacnetId: eStore.read("bacnetId"),
    netInterface: eStore.read("netInterface"),
    isRunning: shokoStack.bacstack ? true : false,
    objectTypes: bacnet.enum.ObjectType,
    supportedObjectTypes: getSupportedTypes(),
    netInterfaces: os.networkInterfaces(),
    dp: eStore.read("dp"),
  });
});

ipcMain.on("START_STACK", (event, payload) => {
  try {
    log.info("Save device settings");
    eStore.save("port", parseInt(payload.port));
    eStore.save("bacnetId", parseInt(payload.bacnetId));
    eStore.save("netInterface", payload.netInterface);
    const result = shokoStack.start();
    shokoStack.bacstack.whoIs();
    // Read some datapoint
    /* shokoStack.bacstack.readProperty(
      "192.168.0.66",
      { type: 0, instance: 0 },
      85,
      (err, data) => {
        if (err) {
          log.error(`Read property request failed: ${err}`);
        } else {
          log.info(`Found value: ${data.values[0].value}`);
        }
      }
    );
    shokoStack.bacstack.writeProperty(
      "192.168.0.66",
      { type: 3, instance: 0 },
      85,
      [{ type: bacnet.enum.ApplicationTags.ENUMERATED, value: bacnet.enum.BinaryPV.ACTIVE }],
      (err, data) => {
        console.log(err);
        console.log(data);
      }
    ); */
    event.reply("START_STACK", result);
  } catch (err) {
    event.reply("START_STACK", err);
  }
});

ipcMain.on("ADD_DP", (event, payload) => {
  try {
    log.info(`Add datapoint: ${payload.oid}`);
    eStore.addDp(payload);
    event.reply("ADD_DP", "OK");
  } catch (err) {
    event.reply("ADD_DP", err);
  }
});

ipcMain.on("REMOVE_DP", (event, payload) => {
  try {
    log.info(`Remove datapoint: ${payload.oid}`);
    eStore.removeDp(payload);
    event.reply("REMOVE_DP", "OK");
  } catch (err) {
    event.reply("REMOVE_DP", err);
  }
});

ipcMain.on("NEW_DP", async (event, payload) => {
  try {
    log.info(`Create new: ${payload}`);
    let obj = await import(`./bacnet/objects/${payload}.js`);
    let instance = eStore.read("dp").reduce((a, v) => {
      if (object_types[v.oid.split(":")[0]] === payload) {
        a = 0;
        if (parseInt(v.oid.split(":")[1]) > a) {
          return parseInt(v.oid.split(":")[1]);
        } else return a;
      }
      return a;
    }, null);
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
  let result = shokoStack.stop();
  event.reply("STOP_STACK", result);
});

//TODO Check if path is correct when app is build
const getSupportedTypes = () => {
  try {
    let path = process.cwd() + "/src/bacnet/objects";
    return fs
      .readdirSync(path)
      .map((f) => f.replace(".js", ""))
      .filter((f) => f !== "DEVICE");
  } catch (err) {
    log.error(`Could not load supported object types from: ${path}`);
    return [];
  }
};
