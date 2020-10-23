const http = require('http');
const url = require('url');
var fs = require("fs");


const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url,true).query;
    fs.writeFile("demo/src/example/sample2.json", JSON.stringify(queryObject), (err) => {
        if (err) console.log(err);
        res.end("Successfully Written to File.");
      });
 //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello World');
});



/*
fs.readFile("demo/src/example/sample.json", function(err, buf) {
  console.log(buf.toString());
});
*/
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});