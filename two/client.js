var net = require('net')
var jsonStream = require('duplex-json-stream')

var socket = jsonStream(net.connect(8088, 'localhost'))

process.stdin.on('data', function(data) {
	socket.write({
    username: process.argv[2],
    message: data.toString()
  })
})

socket.on('data', function(data) {
	process.stdout.write(data.username + '>'+ data.message)
})
