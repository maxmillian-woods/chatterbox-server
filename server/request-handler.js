/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// var storage = {};
// storage.results = [];
var fs = require('fs');
var path = require('path');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var sendResponse = function(response, code) {
  code = code || 200;
  fs.readFile(path.join(__dirname, 'messages.json'), (err, data) => {
    if (err) {
      let storage = { results: [] };
      fs.writeFile(
        path.join(__dirname, 'messages.json'),
        JSON.stringify(storage),
        () => {
          response.writeHead(200, defaultCorsHeaders);
          response.end(JSON.stringify(storage));
        }
      );
    } else {
      response.writeHead(code, defaultCorsHeaders);
      response.end(data);
    }
  });
};

var methods = {
  GET: function(request, response) {
    sendResponse(response);
  },

  POST: function(request, response) {
    var data = '';
    request.on('data', function(chunk) {
      data += chunk;
    });

    request.on('end', function() {
      fs.readFile(path.join(__dirname, 'messages.json'), (err, buffer) => {
        let storage = JSON.parse(buffer);
        storage.results.push(JSON.parse(data));
        fs.writeFile(
          path.join(__dirname, 'messages.json'),
          JSON.stringify(storage),
          err => {
            response.writeHead(201, defaultCorsHeaders);
            response.end();
          }
        );
      });
    });

    // sendResponse(response, data, 201);
  },

  OPTIONS: function(request, response) {
    sendResponse(response, null);
  }
};

module.exports.requestHandler = function(request, response) {
  console.log(
    'Serving request type ' + request.method + ' for url ' + request.url
  );
  var action = methods[request.method];
  console.log(request.url);
  if (action && request.url.includes('/classes/messages')) {
    action(request, response);
  } else {
    sendResponse(response, '', 404);
  }
};
