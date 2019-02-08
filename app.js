const http = require('http');
var https = require('https');
var http2 = require('http2');
const fs = require('fs');

const hostname = 'localhost';
const httpPort = 8880;
const httpsPort = 8443;
const http2Port = 8300;

var options = {
  key: fs.readFileSync('server.pem'),
  cert: fs.readFileSync('server.crt')
};

var headersText = fs.readFileSync('headers.txt', 'utf8');
var headers = headersText.split('\r\n')
  .filter(function(line){
	return line.trim().length > 0;
  })
  .map(function(pair) {
    var colonIndex=pair.indexOf(':');
    return {name: pair.substring(0,colonIndex), value: pair.substring(colonIndex+1).trim()}
  });

console.log("Headers:");
headers.forEach(function(header){
  console.log(header.name + ": " +header.value);
});

const httpServer = http.createServer(function(req, res) {
  res.statusCode = 200;
  headers.forEach(function(header){
    res.setHeader(header.name, header.value);
  });
  res.end('Hello https');
});

const httpsServer = https.createServer(options, function(req, res) {
  res.statusCode = 200;
  headers.forEach(function(header){
    res.setHeader(header.name, header.value);
  });
  res.end('Hello https');
});

const http2Server = http2.createSecureServer(options, function(req, res) {
  res.statusCode = 200;
  headers.forEach(function(header){
    res.setHeader(header.name, header.value);
  });
  res.end('Hello http2');
});

httpServer.listen(httpPort, hostname, function () {
  console.log('Server running at http://' + hostname + ':' + httpPort + '/');
});

httpsServer.listen(httpsPort, hostname, function ()  {
  console.log('Https server running at http://' + hostname + ':' + httpsPort + '/');
});

http2Server.listen(http2Port, hostname, function ()  {
  console.log('Http2 server running at http://' + hostname + ':' + http2Port + '/');
});