
require('dotenv').config()

const ServerRest = require('./models/server')


const server = new ServerRest();

server.listen()

