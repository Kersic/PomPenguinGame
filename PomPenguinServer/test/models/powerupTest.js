const assert = require('chai').assert;
const expect = require('chai').expect;
const powerup = require('../../models/powerup');

var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 'mongodb://penguin:mafiluta@ds163119.mlab.com:63119/pompenguin');


after(function () {
    mongoose.connection.close();
});

describe('test_powerup', function(){

    var testniPowerup = new powerup({
        name: 'Powerup_test',
        speedup_factor:10,
        speedup_time: 4,
    });

    it('Dodaj powerup v bazo', async function(){
        await testniPowerup.save();
        assert.equal(testniPowerup.isNew, false);
    });

    it('Vrni powerup glede na ID', async function(){
        await powerup.findById(testniPowerup._id, function(err, res){
            assert.equal(JSON.stringify(res), JSON.stringify(testniPowerup));
        });
    });

    it('Zbrisi powerup iz baze', async function(){
        await testniPowerup.remove();
        await powerup.findById(testniPowerup._id, function(err, res){
            assert.equal(res,null);
        });
    });
});
