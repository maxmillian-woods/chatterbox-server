/* Import node's http module: */
var http = require('http');
var handler = require('./request-handler');
var fs = require('fs');
var path = require('path');

// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = 'localhost';

// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var serveFile = (url, res) => {
  let filePath;
  if (url === '/') {
    filePath = path.join(__dirname, '../index.html');
  } else {
    filePath = path.join(__dirname, '../', url);
  }

  fs.readFile(filePath, (err, data) => {
    if (err !== null) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, defaultCorsHeaders);
    res.write(data);
    res.end();
  });
};

var server = http.createServer((req, res) => {
  let url = req.url.includes('?')
    ? req.url.slice(0, req.url.indexOf('?'))
    : req.url;
  switch (url) {
  case '/classes/messages': {
    console.log('here');
    handler.requestHandler(req, res);
    break;
  }
  default: {
    serveFile(url, res);
    break;
  }
  }
});
console.log('Listening on http://' + ip + ':' + port);
server.listen(port);

// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.
