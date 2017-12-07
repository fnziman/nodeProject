const http = require('http');
const https = require('https');
const fs = require('fs');
const qs = require('querystring');

const githubServer = http.createServer((req,res) => {
  if (req.method === 'POST') {
    res.end("im a post request");
  }
  res.end('Im not a post request');
});

githubServer.listen(5050, () => console.log("Listening On Port 5050"));