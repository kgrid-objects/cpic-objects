#!/usr/bin/env node
const program = require('commander');
const axios = require('axios');

axios({
  method: 'post',
  url: 'http://localhost:8080/99999/fk4qj7sz2t/v0.0.3/genophenokolist',
  headers: {'Content-Type': 'application/json'},
  data: {
    "CYP2D6":"*3/*3",
    "CYP2C19":"*3/*3"
  }
}).then(function (response) {
  response.data.pipe(fs.createWriteStream(data.txt));
}).catch(function (error) {
  console.log(error);
});
