const url = require('url');

exports.annotRequest = function(req, res) {
  const reqUrl = url.parse(req.url, true);

  // Get the download directory
  const downloadsFolder = require('downloads-folder');
  console.log(downloadsFolder());
  var f = '/annotations.txt';
  var path = downloadsFolder() + f;

  // Requiring fs module in which
  // readFile function is defined.
  const fs = require('fs');

  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) throw err;

    console.log(data);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  });
};

exports.invalidRequest = function(req, res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Invalid Request');
};

exports.sampleRequest = function(req, res) {
  const reqUrl = url.parse(req.url, true);
  var name = 'World';
  if (reqUrl.query.name) {
    name = reqUrl.query.name;
  }

  var response = {
    text: 'Hello ' + name,
  };

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response));
};
