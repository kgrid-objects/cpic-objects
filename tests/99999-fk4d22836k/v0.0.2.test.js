var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-fk4d22836k/v0.0.2/model/resource/getrecommendation.js');

//Load in the function
var getrecommendation = javascript.__get__("getrecommendation");


var testset = [
  {"input":{"enzyme":"CYP2C19","phenotype": "Ultrarapid metabolizer"},"output":"Implications for phenotypic measures" },
  {"input":{"enzyme":"CYP2C19","phenotype": "Normal metabolizer"},"output":"Implications for phenotypic measures" },
  {"input":{"enzyme":"CYP2C19","phenotype": "Intermediate metabolizer"},"output":"Dosing recommendations" },
  {"input":{"enzyme":"CYP2C19","phenotype": "Poor metabolizer"},"output":"Classification of recommendations" }

]

describe('99999-2d6codeine v0.0.1', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it(e.input.phenotype, function(){
        var result = getrecommendation(e.input)
        assert.equal(true, result.recom[e.output]!=null);
      });

    })

  });

  describe('Invalid inputs', function(){

    it('fields missing', function(){
      var result = getrecommendation({})
      assert.equal('Incorrect/invalid input.', result);
    })

    it('incorrect enzyme', function(){
      var result = getrecommendation({"enzyme":"CYP2C9","phenotype": "Ultrarapid metabolizer"})
      assert.equal(true, result.startsWith('Expecting'));
    })

    it('incorrect phenotype', function(){
      var result = getrecommendation({"enzyme":"CYP2C19","phenotype": "Ultrarapid mettabolizer"})
      assert.equal('Incorrect/invalid input for phenotype.', result);
    })

    it('no input', function(){
      var result = getrecommendation()
      assert.equal('Error', result);
    })

  });

});
