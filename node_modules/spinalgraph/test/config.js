const spinalCore = require("spinal-core-connectorjs");
process.env.SPINALHUB_PORT = "7777";
process.env.SPINALHUB_IP = "192.168.213.208";
process.env.SPINAL_USER_ID = "168";
process.env.SPINALH_PASSWORD = "JHGgcz45JKilmzknzelf65ddDadggftIO98P";


const connection = spinalCore.connect(`http://${process.env.SPINAL_USER_ID}:${process.env.SPINALH_PASSWORD}@${process.env.SPINALHUB_IP}:${process.env.SPINALHUB_PORT}/`);

module.exports = connection;