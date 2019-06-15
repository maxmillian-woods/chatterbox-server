/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var storage = {};
storage.results = [];

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var sendResponse = function(response, data, code) {
  code = code || 200;

  response.writeHead(code, defaultCorsHeaders);
  response.end(JSON.stringify(data));
};

var methods = {
  'GET': function(request, response) {
    sendResponse(response, storage);
  },

  'POST': function(request, response) {
    var data = '';
    request.on('data', function(chunk) {
      data += chunk;
    });

    request.on('end', function() {
      storage.results.push(JSON.parse(data));
    });

    sendResponse(response, data, 201);
  },

  'OPTIONS': function(request, response) {
    sendResponse(response, null);
  }
};

module.exports.requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var action = methods[request.method];
  console.log(request.url);
  if (action && request.url.includes('/classes/messages')) {
    action(request, response);
  } else {
    sendResponse(response, '', 404);
  }
};
