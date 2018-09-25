var dsteem = require('dsteem')
const express = require('express')
var es = require('event-stream') 
var util = require('util')
const app = express()
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on ${port}`));
console.log('listening on port 5000');

var client = new dsteem.Client('https://api.steemit.com')

var stream = client.blockchain.getBlockStream()

stream.pipe(es.map(function(block, callback) {
    console.log(block)
    callback(null, util.inspect(block, {colors: true, depth: null}) + '\n')
})).pipe(process.stdout) 