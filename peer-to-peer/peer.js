var topology = require('fully-connected-topology')
var jsonStream = require('duplex-json-stream')
var streamSet = require('stream-set')

var me = process.argv[3]
var others = process.argv.slice(4)

var t = topology(me, others)
var connections = streamSet()
var id = Math.random()
var seq = 0
var logs = {}

t.on('connection', function(connection, peer) {
  console.log('connected to ' + peer)
  var socket = jsonStream(connection) 
  connections.add(socket)

  socket.on('data', function(data) {
    if (logs[data.log] >= data.seq) return;
    logs[data.log] = data.seq
    process.stdout.write(data.username + '>'+ data.message+'sequence:'+ data.seq+'\n')

    connections.forEach(function(peer) {
      peer.write(data)
    })
  })
})

process.stdin.on('data', function(data) {
  var next = seq++
  connections.forEach(function (socket) {
    socket.write({
      log: id ,
      seq: seq, 
      username: process.argv[2],
      message: data.toString().trim()
    })
  })
})
