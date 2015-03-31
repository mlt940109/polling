var http = require('http');
var fs=require('fs');
var polling= require('../index.js');

http.createServer(function (req, res) {
  if (req.url === '/') {
    var rs = fs.createReadStream('./index.html' + req.url);
      rs.on('error', function (err) {
      res.end('Request Error: ' + err.code + ' when request: ' + req.url);
    });
    rs.pipe(res);
  }else{
    polling.on('testmsg',res);
  }
}).listen(3000);

setInterval(function () {
  polling.emit('testmsg',new Date().toString());
},1000);
