const hostname = '127.0.0.1';
const port = 3000;
// import server
const server = require('./controller.js');

//server listen and log server status to console
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
