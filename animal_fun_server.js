const fs = require('fs');
const http = require('http');
const qs = require('querystring');
const cache = {};

const filterAnimals = (allAnimals, searchLetter) => {
  const searchedAnimals = [];
  
  allAnimals.forEach(animal => {
    if (animal === "" || animal === "list") {
      return;
    }
    if (animal[0].toLowerCase() === searchLetter.toLowerCase()) {
      searchedAnimals.push(animal);
    }
  });
  
  return searchedAnimals;
}

const server = http.createServer((req, res) => {
  const query = req.url.split('?')[1];
  const searchLetter = qs.parse(query).letter;
  
  if (searchLetter !== undefined) {
    if (cache[searchLetter] !== undefined) {
      res.write(`accessed cached letter: ${searchLetter} \n`);
      res.end(cache[searchLetter]);
    } else {
      if (cache['data'] !== undefined) {
        const filteredAnimals = filterAnimals(cache['data'].split('\n'), searchLetter);
        cache[searchLetter] = filteredAnimals.join('\n');
        res.write(`accessed cached data and filtered by letter: ${searchLetter} \n`);
        res.end(cache[searchLetter]);
      } else {
        fs.readFile('./animals.txt', 'utf-8', (err, data) => {
          if (err) {
            console.log(err);
            res.end('ERROR');
            return;
          }
          const searchedAnimals = filterAnimals(data.split('\n'), searchLetter);

          cache['data'] = data;
          cache[searchLetter] = searchedAnimals.join('\n');
          res.write(`caching letter: ${searchLetter} \n`);
          res.end(cache[searchLetter]);
        });
      }
    }
  } else {
    if (cache['data'] !== undefined) {
      res.write(`accessing cached data file \n`);
      res.end(cache['data']);
    } else {
      fs.readFile('./animals.txt', 'utf-8', (err, data) => {
        if (err) {
          console.log(err);
          res.end('ERROR');
          return;
        }
        res.write("caching entire animal file \n");
        cache['data'] = data;
        res.end(data);
      });
    }
  }
});

server.listen(5000, () => console.log('Listening on port 5000'));
