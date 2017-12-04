const fs = require('fs');
const http = require('http');
const querystring = require('querystring');

////////////////////////////////////////////////////////////////////
// const searchLetter = process.argv[2];
//
// fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(`The animals starting with the letter ${searchLetter}:`);
//   const allAnimals = data.split('\n');
//   const searchedAnimals = [];
//
//   allAnimals.forEach(animal => {
//     if (animal === "") {
//       return;
//     }
//     if (animal[0].toLowerCase() === searchLetter.toLowerCase()) {
//       searchedAnimals.push(animal);
//     }
//   });
//
//   console.log(searchedAnimals);
//
//   fs.writeFile(`./${searchLetter}_animals.txt`, searchedAnimals.join('\n') , err => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(`${searchLetter}_animals.txt has been created with
//       all the animals starting with the letter ${searchLetter}`);
//   });
//
// });

////////////////////////////////////////////////////////////////

const server = http.createServer((req, res) => {
  res.write('Hello World');
  res.end();
});

server.listen(5000, () => console.log("I'm listening on port 5000"));

////////////////////////////////////////////////////////////////////
