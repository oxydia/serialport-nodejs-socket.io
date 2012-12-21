// Quick configuration of usb port
var arduinoSerialPort = "/dev/tty.usbmodemfa141";

// Init app & RT sockets
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
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
    var captors = JSON.parse(data);
    // Debug
    // console.log('photocell captor value : ' + captors.photocell);

    // We could emit directly the json for captors like this
    // socket.emit('captors', captors);
    // but we would need to parse the json later (jquery?)
    // for now, an integer is enough
    socket.emit('photocell', captors.photocell);
  });
});

// Handle page view
function handler (req, res) {
  // serve index.html file directly & handle basic errors
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}
