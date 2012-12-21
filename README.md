serialport-nodejs-socket.io
===========================

Basic example of a collection of files that will broadcast the values received from an arduino board to a web page in real time.

// change directory to public_html

cd /home/user/arduino/public_html

// Arduino may be runnning on a different usb port, edit arduinoSerialPort :

nano server.js

// Install dependencies

npm install serialport socket.io

// Launch server & capture console

nohup node server.js >> ../console.log 2>&1 &

// Watch values evolved

-> http://localhost:8080
