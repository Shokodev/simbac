import bacnet from "bacstack";
import os from "os";

const bacId = process.env.BACID || 123456;
const port = process.env.BACPORT || 47808;
const CMD = {
  info: (msg) => {
    console.log(`[INFO]  : ${msg}`);
  },
  error: (msg) => {
    console.log(`[ERROR] : ${msg}`);
  },
};

const getInterface = () => {
  const itfc = os.networkInterfaces();
  return Object.keys(itfc).reduce((acc, val) => {
    itfc[val].forEach((addr) => {
      if (addr.family === "IPv4") {
        acc = addr.address;
      }
    });
    return acc;
  }, "");
};

if (!process.env.INTERFACE) {
  CMD.info(
    `No env with interface address provided => serach local interfaces. . .`
  );
  process.env.INTERFACE = getInterface();
}

const bacstack = new bacnet({
  port: port,
  interface: process.env.INTERFACE,
});

bacstack.on("whoIs", (data) => {
  CMD.info(`Who is request received from ${data.deviceId}`);
  if (data.lowLimit && data.lowLimit > bacId) return;
  if (data.highLimit && data.highLimit < bacId) return;
  bacstack.iAmResponse(bacId, bacnet.enum.Segmentation.SEGMENTATION_BOTH, 99);
});

bacstack.on("error", (err) => {
  CMD.error(`Stack failed with: ${err}`);
  bacstack.close();
  process.exit(2);
});

CMD.info(
  `Test device started with id: [${bacId}] on: [${process.env.INTERFACE}:${port}]`
);
process.stdin.setEncoding("utf8");
process.stdin.on("data", async (data) => {
  let input = data.trim();
  if (input === "exit") process.exit(0);
  if (input.startsWith("whois")) {
    let splits = input.split(" ");
    CMD.info("Sending whoIs . . .");
    if (splits[1]) {
      bacstack.whoIs({ address: splits[1] });
    } else {
      bacstack.whoIs();
    }
  }
  if (input.startsWith("read")) {
    let splits = input.split(" ");
    if (splits.length !== 4) {
      CMD.error("Wrong Parameter, use example: read 192.168.0.50 0:3 85");
    } else {
      await progressRequest(readprop, splits);
    }
  }
  if (input.startsWith("write")) {
    let splits = input.split(" ");
    if (splits.length !== 6) {
      CMD.error(
        "Wrong Parameter, use example: write 192.168.0.50 0:3 85 4 1.8"
      );
    } else {
      await progressRequest(writeprop, splits);
    }
  }
});

const readprop = async (s, cb) => {
  try {
    bacstack.readProperty(
      s[1],
      { type: s[2].split(":")[0], instance: s[2].split(":")[1] },
      s[3],
      (err, data) => {
        if (err) {
          cb(`ERR::${err}`);
        } else cb(data.values[0].value);
      }
    );
  } catch (err) {
    cb(`ERR::${err}`);
  }
};
const writeprop = async (s, cb) => {
  try {
    bacstack.writeProperty(
      s[1],
      { type: parseInt(s[2].split(":")[0]), instance: parseInt(s[2].split(":")[1]) },
      s[3],
      [{ type: parseInt(s[4]), value: parseInt(s[5]) }],
      (err, data) => {
        if (err) {
          cb(`ERR::${err}`);
        } else cb(data.values[0].value);
      }
    );
  } catch (err) {
    cb(`ERR::${err}`);
  }
};
const progressRequest = async (req, splits) => {
  try {
    let r = await new Promise((re, rj) => {
      let loop = setInterval(async () => {
        for(let i = 0; i < 50; i++){
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            let prog = "=".repeat(i);
            let spare = " ".repeat(49 - i); 
            process.stdout.write(`Progress: [${prog}${spare}]`);
        }  
      });
      req(splits, (result) => {
        clearInterval(loop);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        if (result.toString().startsWith("ERR::"))
          rj(result.split("ERR::")[1].replace("Error:", ""));
        re(result);
      });
    });
    CMD.info(r);
  } catch (err) {
    CMD.error(err);
  }
};
