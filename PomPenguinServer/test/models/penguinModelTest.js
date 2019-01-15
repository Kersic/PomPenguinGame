const assert = require('chai').assert;
const expect = require('chai').expect;
const penguin = require('../../models/penguin');

var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 'mongodb://penguin:mafiluta@ds163119.mlab.com:63119/pompenguin');


after(function () {
    mongoose.connection.close();
});

describe('test_pingvina', function(){

    var testniPingvin = new penguin({
        name: "Penguin_test",
        color:"red",
        baseSpeed: 100,
        speed:{
            run:20,
            slide:30,
            swim:20
        },
        penguinCost: 300,
    });

    it('Dodaj pingvina v bazo', async function(){
        await testniPingvin.save();
        assert.equal(testniPingvin.isNew, false);
    });

    it('Vrni pingvina glede na ID', async function(){
        await penguin.findById(testniPingvin._id, function(err, res){
            assert.equal(JSON.stringify(res), JSON.stringify(testniPingvin));
        });
    });

    it('Spremeni atribut pingvina', async function(){

        var newColor = 'red';
        await penguin.findOneAndUpdate({'_id':testniPingvin._id},{'color':newColor},{upsert:true}, function(err, res){});

        await penguin.findById(testniPingvin._id, function(err, res){
            assert.equal(res.color, newColor);
        });
    });

    it('Zbrisi pingvina iz baze', async function(){
        await testniPingvin.remove();
        await penguin.findById(testniPingvin._id, function(err, res){
            assert.equal(res,null);
        });
    });
});
