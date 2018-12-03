const racetrackGenerator = require('../../generators/racetrackGenerator');
const assert = require('chai').assert;
const expect = require('chai').expect;
const racetrack = require('../../models/racetrack');

var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 'mongodb://penguin:mafiluta@ds163119.mlab.com:63119/pompenguin');
let db = mongoose.connection;

after(function () {
    mongoose.connection.close();
});



describe('Test modela proge', async function () {
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


    await it('Vstavljanje v bazo', async function () {
        await testnaProga.save();
        assert.equal(testnaProga.isNew, false);
    });

    await it('Zbrisi iz baze', async function () {
        await testnaProga.remove();
    })
});