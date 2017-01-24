var level = require('level')
var scuttleup = require('scuttleup')

var logs = scuttleup(level('./db'))

var stream = logs.createReadStream({valueEncoding: 'utf-8'})

stream.on('data', console.log)
