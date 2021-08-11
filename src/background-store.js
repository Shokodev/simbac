const Store = require('electron-store');

const device = {
	name: {
		type: 'string',
		default: 'device1'
	},
	port: {
		type: 'number',
		default: 47808
	},
    deviceId: {
        type:'number',
        default:1234,
    },
    vendorId: {
        type:'number',
        default:7,
    }
};

const store = new Store({schema: device});

module.exports = store;