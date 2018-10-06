const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {//incoming http request from a browser trying to acces server
    console.log("Request for" + req.url + "by method" + req.method);
    const ip = res.socket.remoteAddress;
    const port = res.socket.remotePort;
    res.end(`Your IP address is ${ip} and your source port is ${port}.`);

    var fileURL;
    if(req.method == 'GET'){
      //set the file url
      if(req.url == '/') fileURL = "/index.html"
      else fileURL = req.url;
      var filePath = path.resolve('./public'+fileURL);
      const fileExt = path.extname(filePath);
      console.log(filePath);
      
      if(fileExt == '.html'){
        fs.exists(filePath, (exists) => {
          if(!exists){
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body>Error 404: '+fileURL+' not found</body></html>');
            return;
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          fs.createReadStream(filePath).pipe(res);
        });
      }else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body>Error 404: '+fileURL+' not HTML</body></html>');
        return;
      }
    }else{
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body>Error 404: '+req.method+' not supported</body></html>');
      return;
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
