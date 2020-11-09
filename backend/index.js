const http = require('http');
const app = require('./app');

const config = require('./utils/config')

const server = http.createServer(app);
const io = require('socket.io')(server);

server.listen(config.PORT, () => {
  console.log(`Listening on PORT ${config.PORT}`)
})