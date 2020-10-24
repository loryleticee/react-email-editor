const http = require('http');
const url = require('url');
var fs = require("fs");
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');


const hostname = '127.0.0.1';
const port = 4000;

var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
//app.use(express.bodyParser());

app.get('/', function (req, res, next) {
  res.json('Hello world')
})

app.post('/',function(req, res){
  req.on('data', function (chunk) {
      var result = JSON.parse(chunk);
        
      fs.writeFile("demo/src/example/sample3.json", JSON.stringify(result.data), (err) => {
        if (err) res.json(err);
        res.end("Successfully Wrditten to File.");
      });
      
      return result;
  });

  /*
  fs.writeFile("demo/src/example/sample3.json", email.data, (err) => {
    if (err) res.json(err);
    res.end("Successfully Wrditten to File.");
  });
  */
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/*
fs.readFile("demo/src/example/sample.json", function(err, buf) {
  console.log(buf.toString());
});
*/
