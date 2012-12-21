// Quick configuration of usb port
var arduinoSerialPort = "/dev/tty.usbmodemfa141";

// Init app & RT sockets
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var path = require('path');
var server = app.listen(8080);

// Init connexion with usb
var serialport = require('serialport');
var usb = new serialport.SerialPort(arduinoSerialPort, {
  parser: serialport.parsers.readline('\n')
});

// var dateLastInfo = new Date(0); // For sending a timestamp

// Create web socket
io.sockets.on('connection', function (socket) {
  // Transfer usb to socket
  usb.on('data', function (data) {
    //var sensors = JSON.parse(data);
    // Debug
    // console.log('photocell sensor value : ' + sensors.photocell);

    // Push a notification through the socket
    socket.emit('sensors', data);
  });
});

// Handle page view
function handler (req, res) {
  if(req.url == "/" || req.url == "/index.html") {
    fs.readFile(__dirname + '/index.html', function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    });
  }
  // Now we handle static files and files not found
  else if (req.url == "/js/bootstrap.min.js") {
    fs.readFile(__dirname + req.url, function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading file');
      }
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.end(data);
    });
  } else if (req.url == "/css/bootstrap.min.css") {
    fs.readFile(__dirname + req.url, function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading file');
      }
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(data);
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end("Page Could Not Be Found"); 
  }
}
