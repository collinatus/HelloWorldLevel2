var http = require('http');
var fs = require('fs');

function mapUrlToResource(url) {
  var resource;
  switch(url) {
    case '/': resource = '/public/home.html';
      break;
    case '/about': resource = '/public/about.html';
      break;
    case '/img/logo.jpg': resource = '/public/logo.jpg';
      break;
    default: resource = '/public/404.html';
  }
  return resource;
}

function mapResourceToMime(resource) {
  var ext = resource.substr(resource.indexOf('.'));
  var mime;
  switch(ext) {
    case 'html': mime = 'text/html';
      break;
    case 'jpg': mime = 'img/jpeg';
      break;
    default: mime = 'text/plain';
  }
  return ext;
}

function requestHandler(req, res) {
  var resource = mapUrlToResource(req.url);
  var mime = mapResourceToMime(resource);
  fs.readFile(__dirname + resource, function(err, data) {
    if (err) {
      res.writeHeader(500, {'Content-Type': 'text/plain'});
      res.end('500 - server error');
    } else {
      res.writeHeader(200, {'Content-Type': mime});
      res.end(data);
    }
  });
}

http.createServer(requestHandler).listen(80);