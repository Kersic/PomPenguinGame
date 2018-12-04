const assert = require('chai').assert;
const expect = require('chai').expect;
const improvement = require('../../models/improvement');
const penguin = require('../../models/penguin');
var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 'mongodb://penguin:mafiluta@ds163119.mlab.com:63119/pompenguin');


after(function () {
    mongoose.connection.close();
});

describe('test_izboljsave', function(){

    var testnaIzboljsava = new improvement({
        name: "improvement_test",
        terrain_based: "ice",
        improvement_value: 0.3
    });

    it('Dodaj izboljsavo v bazo', async function(){
        await testnaIzboljsava.save();
        assert.equal(testnaIzboljsava.isNew, false);
    });

    it('Vrni izboljsavo glede na ID', async function(){
        await improvement.findById(testnaIzboljsava._id, function(err, res){
            assert.equal(JSON.stringify(res), JSON.stringify(testnaIzboljsava));
        });
    });

    it('Spremeni kolicino izboljsave', async function(){

        var newVal = 0.6;
        await improvement.findOneAndUpdate({'_id':testnaIzboljsava._id},{'improvement_value':newVal},{upsert:true}, function(err, res){});

        await improvement.findById(testnaIzboljsava._id, function(err, res){
            assert.equal(res.improvement_value, newVal);
        });
    });


    it('Zbrisi izboljsavo iz baze', async function(){
        await testnaIzboljsava.remove();
        await improvement.findById(testnaIzboljsava._id, function(err, res){
            assert.equal(res,null);
        });
    });
});
