const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {
  var service = require('./service.js');
  // return a URL object with each part of the address as properties
  const reqUrl = url.parse(req.url, true);

  // GET Endpoint
  // log GET path, method,
  console.log(req.method);

  if (reqUrl.pathname == '/sample' && req.method === 'GET') {
    console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);

    service.sampleRequest(req, res);

    // POST Endpoint
    // log POST path, method
  } else if (reqUrl.pathname == '/test' && req.method === 'POST') {
    console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);

    service.testRequest(req, res);
  } else {
    console.log(
      'Request Type:' + req.method + ' Invalid Endpoint: ' + reqUrl.pathname
    );

    service.invalidRequest(req, res);
  }
});
