const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {
  var service = require('./service.js');
  const reqUrl = url.parse(req.url, true);

  // GET Annotations Endpoint
  if (reqUrl.pathname == '/annot' && req.method === 'GET') {
    console.log(
      'Request Annotations:' + req.method + ' Endpoint: ' + reqUrl.pathname
    );

    service.annotRequest(req, res);
  }

  if (reqUrl.pathname == '/annot' && req.method === 'POST') {
    console.log(
      'Request Annotations:' + req.method + ' Endpoint: ' + reqUrl.pathname
    );

    service.annotRequest(req, res);
  }

  // GET Endpoint
  else if (reqUrl.pathname == '/image' && req.method === 'GET') {
    console.log('Request Type:' + req.method + ' Endpoint: ' + reqUrl.pathname);

    service.imageRequest(req, res);
  }

  // Invalid Endpoint
  else {
    console.log(
      'Request Type:' + req.method + ' Invalid Endpoint: ' + reqUrl.pathname
    );

    service.invalidRequest(req, res);
  }
});
