# Bacnet Test Device
This device can be used to test against the simbac simulator.

> You can not run this code on the same machine where simbac or any other bacnet stack is running!

Easiest way to use this code is to run it in a docker container which runs in host mode. You can build the docker image by yourself with the provided Dockerfile or just use the image from docker hub with:

```bash
docker run --network="host" --env INTERFACE="<your IP>" dinifarb/simbac_test
```

>Don't forget to change the INTERFACE variable to your machines IP which has to be in the same LAN as the simbac instance


As soon the container is started you can ssh in it and run `node index.js` in the app root dir. After the app has started you can use the below commands:

## Features so far:
|command|params|example|description|
|-|-|-|-|
|`whois`|{addr} `optional`|`whois` or `whois 192.168.0.44`|sends a whoIs to broadcast addr
|`read`|{addr} {objectidentifier} {propertyidentifier}|`read 192.168.0.44 0:1 85`|sends a read property request|