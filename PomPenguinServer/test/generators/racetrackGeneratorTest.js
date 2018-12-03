const racetrackGenerator = require('../../generators/racetrackGenerator');
const assert = require('chai').assert;
const expect = require('chai').expect;

var proga1 = racetrackGenerator.generirajProgo(20, 3);
var proga2 = racetrackGenerator.generirajProgo(10, 2);

describe('Test generatorja proge', function () {
    it('proge je prave dolzine', function () {
        assert.equal(proga1.sectionArray.length, 20)
        assert.equal(proga2.sectionArray.length, 10)
    });
    it('Dovoj zaporednih odsekov istega tipa', function () {
        let najmanjZaporednih = null;
        let stevecZaporednih = 1;
        let prejsnji = proga1.sectionArray[0];
        proga1.sectionArray.forEach(function (odsek) {
            if(odsek.sectionType === prejsnji.sectionType){
                stevecZaporednih++;
            }
            else{
                if(najmanjZaporednih == null){
                    najmanjZaporednih = stevecZaporednih;
                }
                else if(stevecZaporednih < najmanjZaporednih){
                    najmanjZaporednih = stevecZaporednih
                }
                stevecZaporednih = 1;
            }
            prejsnji = odsek;
        });
        expect(najmanjZaporednih).to.be.at.least(3)

        najmanjZaporednih = null;
        stevecZaporednih = 1;
        prejsnji = proga2.sectionArray[0];
        proga2.sectionArray.forEach(function (odsek) {
            if(odsek.sectionType === prejsnji.sectionType){
                stevecZaporednih++;
            }
            else{
                if(najmanjZaporednih == null){
                    najmanjZaporednih = stevecZaporednih;
                }
                else if(stevecZaporednih < najmanjZaporednih){
                    najmanjZaporednih = stevecZaporednih
                }
                stevecZaporednih = 1;
            }
            prejsnji = odsek;
        });
        expect(najmanjZaporednih).to.be.at.least(2)

    });
    it('Proga vsebuje vse odseke', function () {
        let sneg = false;
        let voda = false;
        let led = false;

        proga1.sectionArray.forEach(function (odsek) {
            if(odsek.sectionType === 0){
                sneg = true;
            }
            else if(odsek.sectionType === 1){
                led = true;
            }
            else if(odsek.sectionType === 2){
                voda = true;
            }
        });

        assert.equal(sneg, true);
        assert.equal(led, true);
        assert.equal(voda, true);

        sneg = false;
        voda = false;
        led = false;

        proga2.sectionArray.forEach(function(odsek) {
            if(odsek.sectionType === 0){
                sneg = true;
            }
            else if(odsek.sectionType === 1){
                led = true;
            }
            else if(odsek.sectionType === 2){
                voda = true;
            }
        });
        assert.equal(sneg, true);
        assert.equal(led, true);
        assert.equal(voda, true);
    });

    it('Javi napako ce je dolzina proge 0', function () {
        let expected = Error;
        const actual = () => racetrackGenerator.generirajProgo(0, 2);
        assert.throws(actual, expected);
    });

    it('Javi napako ce je minimalno stevilo zaporednih odsekov 0', function () {
        let expected = Error;
        const actual = () => racetrackGenerator.generirajProgo(2, 0);
        assert.throws(actual, expected);
    });
});