const assert = require('chai').assert;
const expect = require('chai').expect;
const obstacle = require('../../models/obstacle');

var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 'mongodb://penguin:mafiluta@ds163119.mlab.com:63119/pompenguin');


after(function () {
    mongoose.connection.close();
});

describe('test_ovire', function(){

    var testnaOvira = new obstacle({
        name: "Obstacle_test",
        slowdown_factor:10,
        slowdown_time: 4,
        terrain_based: 'ice'
    });

    it('Dodaj oviro v bazo', async function(){
        await testnaOvira.save();
        assert.equal(testnaOvira.isNew, false);
    });

    it('Vrni oviro glede na ID', async function(){
        await obstacle.findById(testnaOvira._id, function(err, res){
            assert.equal(JSON.stringify(res), JSON.stringify(testnaOvira));
        });
    });

    it('Zbrisi oviro iz baze', async function(){
        await testnaOvira.remove();
        await obstacle.findById(testnaOvira._id, function(err, res){
            assert.equal(res,null);
        });
    });
});
