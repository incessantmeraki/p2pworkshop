var net = require('net')
var streamSet = require('stream-set')

var friends = streamSet()

var server = net.createServer(function(socket){
  friends.add(socket)
	socket.on('data', function (data) {
    friends.forEach(function (friend) {
      if (friend !== socket) friend.write(data)
    })
	})
})

server.listen(8088)
