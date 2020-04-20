const hostname = '127.0.0.1';
const port = 3000;
// import server
const server = require('./controller.js');

//have server listen to the port const
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
