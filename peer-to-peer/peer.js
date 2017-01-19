var topology = require('fully-connected-topology')
var jsonStream = require('duplex-json-stream')
var streamSet = require('stream-set')

var me = process.argv[3]
var others = process.argv.slice(4)

var t = topology(me, others)
var connections = streamSet()

t.on('connection', function(connection, peer) {
  console.log('connected to ' + peer)
  var socket = jsonStream(connection) 
  connections.add(socket)

  socket.on('data', function(data) {
    process.stdout.write(data.username + '>'+ data.message+'\n')
  })
})

process.stdin.on('data', function(data) {
  connections.forEach(function (socket) {
    socket.write({
      username : process.argv[2],
      message : data.toString().trim()
    })
  })
})
