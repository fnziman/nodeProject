const fs = require('fs');
const http = require('http');
const qs = require('querystring');

const server = http.createServer((req, res) => {
  const query = req.url.split('?')[1]
  const searchLetter = qs.parse(query).letter
  
  if (searchLetter) {
    fs.readFile('./animals.txt', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      const allAnimals = data.split('\n');
      const searchedAnimals = [];
    
      allAnimals.forEach(animal => {
        if (animal === "") {
          return;
        }
        if (animal[0].toLowerCase() === searchLetter.toLowerCase()) {
          searchedAnimals.push(animal);
        }
      });
      result = searchedAnimals.join('\n');
      res.end(result);
    });
    
  } else {
    fs.readFile('./animals.txt', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      res.end(data)
    });
  }
  // res.end(result);
});

server.listen(5000, () => console.log('Listening on port 5000'));

////////////////////////////////////////////////////////////////////
