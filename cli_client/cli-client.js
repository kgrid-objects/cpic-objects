#!/usr/bin/env node
const program = require('commander');
const axios = require('axios');
const fs = require('fs-extra');

var host = 'http://localhost:8080';

var inputData = {
  'diplotypes': {
    "CYP2D6": "*3/*3",
    "CYP2C19": "*1/*2",
    "UGT1A1": "*1/*1"
    },
    'prescriptions': {
      'Atazanavir': true,
      'Codeine': true
    }
  };

var phenotypePanel = {};

function postJsonReq(path, data){
  return axios({
    method: 'post',
    url: host + path,
    headers: {'Content-Type': 'application/json'},
    data: data
  });
}

// Call the first genotype to phenotype ko mapping
postJsonReq('/99999/fk4qj7sz2t/v0.0.3/genophenokolist', inputData.diplotypes)
.then(response => {
  var gToPMap = response.data.result;
  var gToPPromises = [];
  // Create an array of genotype to phenotype request promises
  Object.keys(gToPMap).forEach(key => {
    gToPPromises.push(postJsonReq(gToPMap[key] + '/phenotype', inputData.diplotypes));
  });
  // Use each genotype to phenotype object to get the phenotype panel
  axios.all(gToPPromises).then((results) => {
    results.forEach(response => {
      var phenotype = response.data.result;
      Object.keys(phenotype).forEach(key => {
        phenotypePanel[key] = phenotype[key];
      });
    });
  }).then(results => generateDrugRecs()
  ).catch(error => {
    console.log(error);
  })
}).catch(error => {
  console.log(error);
});

function generateDrugRecs() {
  // Get the list of drug recommendation objects
  postJsonReq('/99999/fk4qj7sz2s/v0.0.3/druglist', inputData.diplotypes)
  .then(response => {
    var drugMap = response.data.result;
    var drugRecPromises = [];

    // Create an array of drug recommendation request promises
    Object.keys(drugMap).forEach(geneKey => {
      Object.keys(drugMap[geneKey]).forEach(drugKey => {
        drugRecPromises.push(
            postJsonReq(drugMap[geneKey][drugKey] + '/dosingrecommendation',
                phenotypePanel));
      });
    });

    // Use each drug recommendation object to get a recommendation
    axios.all(drugRecPromises).then(results => {
      results.forEach(response => {
        var result = response.data.result;
        console.log(result);
        fs.writeJsonSync('results.txt', result, {flag:'a'});
      });
    });
  }).catch(error => {
    console.log(error);
  });
}


