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
    //res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  });
};

exports.invalidRequest = function(req, res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Invalid Request');
};

// pass in request and response
exports.testRequest = function(req, res) {
  body = '';
  // bind event(data) to object(function)
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    postBody = JSON.parse(body);

    var response = {
      text: 'Post Request Value Is  ' + postBody.value,
    };

    res.statusCode = 200;
    //res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  });
};

exports.imageRequest = function(req, res) {
  const fs = require('fs');
  const homePage = fs.readFileSync('../../public/index.html');
  res.end(homePage);
};
