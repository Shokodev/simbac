import bacnet from 'bacstack';

const deviceId = process.env.DEVICEID || 1234;
const port = process.env.BACPORT || 47808;
const CMD = {
    info:(msg)=>{console.log(`[INFO]  : ${msg}`)},
    error:(msg)=>{console.log(`[ERROR]: ${msg}`)},
};


if(!process.env.INTERFACE){
     CMD.error('You need to specify the network interface with ENV, as example INTERFACE=192.168.0.50');
     process.exit(0);
} 

const bacstack = new bacnet({
    port: port,
    interface: process.env.INTERFACE,
});

bacstack.on("whoIs", (data) => {
    CMD.info(`Who is request received from ${data.deviceId}`);
    if (data.lowLimit && data.lowLimit > deviceId) return;
    if (data.highLimit && data.highLimit < deviceId) return;
    bacstack.iAmResponse(
        deviceId,
        bacnet.enum.Segmentation.SEGMENTATION_BOTH,
        99
        ); 
    });


bacstack.on('error', (err) => {
    CMD.error(`Stack failed with: ${err}`);
    bacstack.close();
    process.exit(2);
});

CMD.info(`Test device started with id: [${deviceId}] on: [${process.env.INTERFACE}:${port}]`);
process.stdin.setEncoding("utf8");
process.stdin.on("data", async (data) => {
    let input = data.trim();
    if(input === 'exit') process.exit(0);
    if(input.startsWith('whois')) {
        let splits = input.split(' ');
        CMD.info("Sending whoIs . . .");
        if(splits[1]){
            bacstack.whoIs({address:splits[1]});    
        } else {
            bacstack.whoIs();
        }
    }
    if(input.startsWith('read')) {
        let splits = input.split(' ');
        if(splits.length !== 4){
            CMD.error("Wrong Parameter, use example: read 192.168.0.50 0:3 85");
        } else {
            await readprop(splits);
        }
    }
});

const readprop = async (s) => {
    try {
        let r = await new Promise((re,rj)=>{
        let prog = " . "
        let loop = setInterval(async()=>{  
            if(prog === ". ") {
                prog = ". . ";
            } else if(prog === ". . "){ 
                prog = ". . . ";
            } else prog = ". ";
            process.stdout.clearLine()
            process.stdout.cursorTo(0)
            process.stdout.write(`Reading${prog}`);
        });     
        bacstack.readProperty(s[1], {type: s[2].split(':')[0], instance: s[2].split(':')[1]}, s[3], (err, data) => {
            clearInterval(loop);
            console.log(``);
            if(err){rj(err)}else{
            re(data.values[0].value);}    
        });
        });
        CMD.info(r);
    } catch(err){
        CMD.error(err);
    }   
}