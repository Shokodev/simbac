const {contextBridge, ipcRenderer} = require('electron')

const validChannels = ['CREATE_OBJECT', 'DELETE_OBJECT']

console.log('Preload..e')
contextBridge.exposeInMainWorld(
    'ipc', {
        send: (channel, data) => {
            if(validChannels.includes(channel)) {
                ipcRenderer.send(channel, data)
            }else{
                console.error(`The channel ${channel} seems not to be valid..`)
            }
        },
        on: (channel, func) => {
            if(validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args))
            }else{
                console.error(`The channel ${channel} seems not to be valid..`)
            }
        }
    }
)