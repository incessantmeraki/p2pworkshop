var level = require('level')
var scuttleup = require('scuttleup')

var logs = scuttleup(level('./db'))

logs.append('hello world this is ashwin')
