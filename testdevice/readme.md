# Bacnet Test Device
This device can be used to test against the simbac simulator.

> You can not run this code on the same machine where simbac or any other bacnet stack is running!

Easiest way to use this code is to run it in a docker container. You can build the docker image by yourself with the provided Dockerfile or just use the image from docker hub with:

```bash
docker run -d dinifarb/simbac_testdevice
```

Following settings are changable with env:

- INTERFACE=ipaddress (Default last ipv found by local interfaces)
- PORT=47808 (Bacnet Port, default 47808)
- BACID=1234 (Bacnet ID, default 123456)

As soon the container is started you can ssh in it and run `node index.js` in the app root dir. After the app has started you can use the below commands:

## Features so far:
|command|params|example|description|
|-|-|-|-|
|`whois`|{addr} `optional`|`whois` or `whois 192.168.0.44`|sends a whoIs to broadcast addr
|`read`|{addr} {objectidentifier} {propertyidentifier}|`read 192.168.0.44 0:1 85`|sends a read property request|
|`write`|{addr} {objectidentifier} {propertyidentifier} {property value type} {value}|`read 192.168.0.44 0:1 85 4 1.7`|sends a write property request|

some property value types:
  - BOOLEAN = 1
  - UNSIGNED_INTEGER = 2
  - SIGNED_INTEGER = 3
  - REAL = 4
  - DOUBLE = 5
  - OCTET_STRING = 6
  - CHARACTER_STRING = 7
  - BIT_STRING = 8
  - ENUMERATED = 9
  - DATE = 10
  - TIME = 11
  - OBJECTIDENTIFIER = 12