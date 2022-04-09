FROM node:latest
WORKDIR /usr/src/app
COPY . .
WORKDIR /usr/src/app/testdevice
CMD [ "node", "idle.js" ]