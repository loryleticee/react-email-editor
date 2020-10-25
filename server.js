const http = require('http');
const url = require('url');
const path = require('path')
var fs = require("fs");
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 4000;

var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get('/', function (req, res, next) {
  let datas = fs.readdirSync("demo/src/example");
  let files = []
  for (var file of datas) {
    files.push(file)
  }
  res.json({files: files})
})

app.get('/file/:template', function (req, res, next) {
  let title = req.params.template
  res.sendFile(path.join(__dirname, "demo/src/example/" + title +".json"))
})

app.post('/',function(req, res){
  req.on('data', function (chunk) {
      var result = JSON.parse(chunk);
        
      fs.writeFile("demo/src/example/" + result.title + ".json", JSON.stringify(result.data), (err) => {
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
