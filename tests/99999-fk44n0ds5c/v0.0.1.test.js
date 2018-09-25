var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-fk44n0ds5c/v0.0.1/model/resource/recommendation.js');

//Load in the function
var dosingrecommendation = javascript.__get__("dosingrecommendation");


var testset = [
  {"input":{"CYP2D6": {"diplotype": "*1/*28", "phenotype": "ultrarapid metabolizer"}},"output":"classification" },
  {"input":{"CYP2D6": {"diplotype": "*1/*1", "phenotype": "Normal metabolizer"}},"output":"classification" },
  {"input":{"CYP2D6": {"diplotype": "*1/*2", "phenotype": "Intermediate metabolizer"}},"output":"content" },
  {"input":{"CYP2D6": {"diplotype": "*1/*3", "phenotype": "Poor metabolizer"}},"output":"content" }
]

describe('99999-fk44n0ds5c v0.0.1', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.input.CYP2D6.phenotype, function(){
        var result = dosingrecommendation(e.input)
        assert.equal(result.recommendation[e.output]!=null, true);
      });

    })

  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = dosingrecommendation({})
      assert.equal(result, 'Incorrect/invalid input for drug nortripyline');
    })

    it('incorrect phenotype', function(){
      var result = dosingrecommendation({"CYP2D6": {"phenotype": "Ultrarapid mettabolizer"}})
      assert.equal('Incorrect/invalid input for drug nortripyline', result);
    })

    it('no input', function(){
      var result = dosingrecommendation()
      assert.equal(result, 'Incorrect/invalid input for drug nortripyline');
    })

  });

});
