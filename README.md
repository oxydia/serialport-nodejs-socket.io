serialport-nodejs-socket.io
===========================

Basic example of a collection of files that will broadcast the values received from an arduino board to a web page in real time.

cd /home/user/arduino/public_html

// Arduino may be runnning on a different usb port, edit arduinoSerialPort :
nano index.js

npm install serialport socket.io
nohup node index.js >> ../console.log 2>&1 &