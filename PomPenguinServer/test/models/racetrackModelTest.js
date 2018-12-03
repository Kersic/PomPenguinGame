const racetrackGenerator = require('../../generators/racetrackGenerator');
const assert = require('chai').assert;
const expect = require('chai').expect;
const racetrack = require('../../models/racetrack');

var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 'mongodb://penguin:mafiluta@ds163119.mlab.com:63119/pompenguin');

after(function () {
    mongoose.connection.close();
});



describe('Test modela proge', function () {
    var odseki = [];
    odseki.push(1);
    odseki.push(2);
    odseki.push(3);

    var testnaProga = new racetrack({
        name: 'TestnaProga',
        time:5,
        sectionCounter:10,
        reward:30,
        sectionArray: odseki
    });

    it('Vstavljanje v bazo', async function () {
        await testnaProga.save();
        assert.equal(testnaProga.isNew, false);
    });

    it('Najdi gelde na id', async function () {
        await racetrack.findById(testnaProga._id, function (err, p) {
            assert.equal(JSON.stringify(p), JSON.stringify(testnaProga));
        });

    });

    it('Spremeni ime', async function () {
        var ime = "novo ime";
        var query = {'_id':testnaProga._id};
        await racetrack.findOneAndUpdate(query, {"name": ime}, {upsert:true}, function(err, doc){

        });
        await racetrack.findById(testnaProga._id, function (err, p) {
            assert.equal(p.name, "novo ime");
        });
    });

   it('Zbrisi iz baze', async function () {
       await testnaProga.remove();
       await racetrack.findById(testnaProga._id, function (err, p) {
           assert.equal(p, null);
       });
    });


});