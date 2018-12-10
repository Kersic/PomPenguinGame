const assert = require('chai').assert;
var simulator = require('../../simulators/simulator.js');

describe('Test casa enega polja', function () {
    var proga = {"_id": {"$oid": "5b1eabc5ea277b266033c1e3"}, "sectionArray": [{"obstacleMatrix": [["2", "0", "2"], ["1", "0", "2"], ["0", "0", "1"], ["0", "2", "1"], ["0", "0", "1"], ["2", "0", "1"], ["2", "0", "4"], ["1", "2", "4"], ["2", "0", "4"], ["3", "0", "2"], ["2", "0", "0"], ["2", "1", "0"], ["2", "4", "0"], ["1", "4", "1"], ["2", "4", "2"], ["2", "4", "1"], ["2", "4", "2"], ["1", "4", "1"], ["1", "0", "0"], ["2", "2", "0"]], "_id": "5b1eab9eea277b266033c1e0", "name": "test", "sectionType": "1", "curvature": "180", "baseLength": "20", "incline": "-25"}, {"obstacleMatrix": [["2", "3", "0"], ["2", "2", "0"], ["1", "0", "0"], ["1", "0", "1"], ["2", "0", "0"], ["2", "1", "0"], ["2", "3", "0"], ["2", "2", "0"], ["1", "1", "4"], ["1", "2", "4"], ["2", "0", "4"], ["2", "0", "2"], ["4", "0", "1"], ["4", "2", "1"], ["4", "0", "3"], ["2", "0", "1"], ["2", "0", "0"], ["2", "1", "4"], ["1", "1", "4"], ["1", "2", "4"]], "_id": "5b1eab9eea277b266033c1e1", "name": "test", "sectionType": "1", "curvature": "180", "baseLength": "20", "incline": "-25"}], "name": "Cape Lookout", "time": 84, "sectionCounter": 2, "reward": 7, "waterPercent": 30, "snowPercent": 20, "icePercent": 50, "__v": 0};
    var sestavljenPingvin = [5,8,8];
    var tezavnost = 2;
    var idPingvina = 1;
    var idProge = 10;
    it('Test simulatorja', function () {
        proga = {"_id": {"$oid": "5b1eabc5ea277b266033c1e3"}, "sectionArray": [{"obstacleMatrix": [["2", "0", "2"], ["1", "0", "2"], ["0", "0", "1"], ["0", "2", "1"], ["0", "0", "1"], ["2", "0", "1"], ["2", "0", "4"], ["1", "2", "4"], ["2", "0", "4"], ["3", "0", "2"], ["2", "0", "0"], ["2", "1", "0"], ["2", "4", "0"], ["1", "4", "1"], ["2", "4", "2"], ["2", "4", "1"], ["2", "4", "2"], ["1", "4", "1"], ["1", "0", "0"], ["2", "2", "0"]], "_id": "5b1eab9eea277b266033c1e0", "name": "test", "sectionType": "1", "curvature": "180", "baseLength": "20", "incline": "-25"}, {"obstacleMatrix": [["2", "3", "0"], ["2", "2", "0"], ["1", "0", "0"], ["1", "0", "1"], ["2", "0", "0"], ["2", "1", "0"], ["2", "3", "0"], ["2", "2", "0"], ["1", "1", "4"], ["1", "2", "4"], ["2", "0", "4"], ["2", "0", "2"], ["4", "0", "1"], ["4", "2", "1"], ["4", "0", "3"], ["2", "0", "1"], ["2", "0", "0"], ["2", "1", "4"], ["1", "1", "4"], ["1", "2", "4"]], "_id": "5b1eab9eea277b266033c1e1", "name": "test", "sectionType": "1", "curvature": "180", "baseLength": "20", "incline": "-25"}], "name": "Cape Lookout", "time": 84, "sectionCounter": 2, "reward": 7, "waterPercent": 30, "snowPercent": 20, "icePercent": 50, "__v": 0};
        sestavljenPingvin = [5,8,8];
        tezavnost = 2;
        idPingvina = 1;
        idProge = 10;

       let pricakovano = {
           vmesniCasi: [7.13, 14.26],
           skupniCasProge: 14.25,
           vmesniCekini: [6,11],
           skupniCekini: 11,
           vmesniTipiPodlage: ["1","1"],
       };

       let vrnjeno = simulator.simulator(proga, sestavljenPingvin, tezavnost, idPingvina, idProge);
       assert.equal(JSON.stringify(vrnjeno), JSON.stringify(pricakovano));

    });
    it('Javi napako ce je stevilo odsekov manjse od 2', function () {
        proga = {"_id": {"$oid": "5b1eabc5ea277b266033c1e3"}, "sectionArray": [{"obstacleMatrix": [["2", "0", "2"], ["1", "0", "2"], ["0", "0", "1"], ["0", "2", "1"], ["0", "0", "1"], ["2", "0", "1"], ["2", "0", "4"], ["1", "2", "4"], ["2", "0", "4"], ["3", "0", "2"], ["2", "0", "0"], ["2", "1", "0"], ["2", "4", "0"], ["1", "4", "1"], ["2", "4", "2"], ["2", "4", "1"], ["2", "4", "2"], ["1", "4", "1"], ["1", "0", "0"], ["2", "2", "0"]], "_id": "5b1eab9eea277b266033c1e0", "name": "test", "sectionType": "1", "curvature": "180", "baseLength": "20", "incline": "-25"}, {"obstacleMatrix": [["2", "3", "0"], ["2", "2", "0"], ["1", "0", "0"], ["1", "0", "1"], ["2", "0", "0"], ["2", "1", "0"], ["2", "3", "0"], ["2", "2", "0"], ["1", "1", "4"], ["1", "2", "4"], ["2", "0", "4"], ["2", "0", "2"], ["4", "0", "1"], ["4", "2", "1"], ["4", "0", "3"], ["2", "0", "1"], ["2", "0", "0"], ["2", "1", "4"], ["1", "1", "4"], ["1", "2", "4"]], "_id": "5b1eab9eea277b266033c1e1", "name": "test", "sectionType": "1", "curvature": "180", "baseLength": "20", "incline": "-25"}], "name": "Cape Lookout", "time": 84, "sectionCounter": 1, "reward": 7, "waterPercent": 30, "snowPercent": 20, "icePercent": 50, "__v": 0};
        sestavljenPingvin = [5,8,8];
        tezavnost = 2;
        idPingvina = 1;
        idProge = 10;

        let expected = Error;
        const actual = () => simulator.simulator(proga, sestavljenPingvin, tezavnost, idPingvina, idProge);
        assert.throws(actual, expected);
    });
    it('Javi napako ce je tezavnost manj kot 0 ', function () {
        proga = {"_id": {"$oid": "5b1eabc5ea277b266033c1e3"}, "sectionArray": [{"obstacleMatrix": [["2", "0", "2"], ["1", "0", "2"], ["0", "0", "1"], ["0", "2", "1"], ["0", "0", "1"], ["2", "0", "1"], ["2", "0", "4"], ["1", "2", "4"], ["2", "0", "4"], ["3", "0", "2"], ["2", "0", "0"], ["2", "1", "0"], ["2", "4", "0"], ["1", "4", "1"], ["2", "4", "2"], ["2", "4", "1"], ["2", "4", "2"], ["1", "4", "1"], ["1", "0", "0"], ["2", "2", "0"]], "_id": "5b1eab9eea277b266033c1e0", "name": "test", "sectionType": "1", "curvature": "180", "baseLength": "20", "incline": "-25"}, {"obstacleMatrix": [["2", "3", "0"], ["2", "2", "0"], ["1", "0", "0"], ["1", "0", "1"], ["2", "0", "0"], ["2", "1", "0"], ["2", "3", "0"], ["2", "2", "0"], ["1", "1", "4"], ["1", "2", "4"], ["2", "0", "4"], ["2", "0", "2"], ["4", "0", "1"], ["4", "2", "1"], ["4", "0", "3"], ["2", "0", "1"], ["2", "0", "0"], ["2", "1", "4"], ["1", "1", "4"], ["1", "2", "4"]], "_id": "5b1eab9eea277b266033c1e1", "name": "test", "sectionType": "1", "curvature": "180", "baseLength": "20", "incline": "-25"}], "name": "Cape Lookout", "time": 84, "sectionCounter": 2, "reward": 7, "waterPercent": 30, "snowPercent": 20, "icePercent": 50, "__v": 0};
        sestavljenPingvin = [5,8,8];
        tezavnost = -1;
        idPingvina = 1;
        idProge = 10;

        let expected = Error;
        const actual = () => simulator.simulator(proga, sestavljenPingvin, tezavnost, idPingvina, idProge);
        assert.throws(actual, expected);
    });
    it('Javi napako ce je tezavnost vecja kot 2 ', function () {
        proga = {"_id": {"$oid": "5b1eabc5ea277b266033c1e3"}, "sectionArray": [{"obstacleMatrix": [["2", "0", "2"], ["1", "0", "2"], ["0", "0", "1"], ["0", "2", "1"], ["0", "0", "1"], ["2", "0", "1"], ["2", "0", "4"], ["1", "2", "4"], ["2", "0", "4"], ["3", "0", "2"], ["2", "0", "0"], ["2", "1", "0"], ["2", "4", "0"], ["1", "4", "1"], ["2", "4", "2"], ["2", "4", "1"], ["2", "4", "2"], ["1", "4", "1"], ["1", "0", "0"], ["2", "2", "0"]], "_id": "5b1eab9eea277b266033c1e0", "name": "test", "sectionType": "1", "curvature": "180", "baseLength": "20", "incline": "-25"}, {"obstacleMatrix": [["2", "3", "0"], ["2", "2", "0"], ["1", "0", "0"], ["1", "0", "1"], ["2", "0", "0"], ["2", "1", "0"], ["2", "3", "0"], ["2", "2", "0"], ["1", "1", "4"], ["1", "2", "4"], ["2", "0", "4"], ["2", "0", "2"], ["4", "0", "1"], ["4", "2", "1"], ["4", "0", "3"], ["2", "0", "1"], ["2", "0", "0"], ["2", "1", "4"], ["1", "1", "4"], ["1", "2", "4"]], "_id": "5b1eab9eea277b266033c1e1", "name": "test", "sectionType": "1", "curvature": "180", "baseLength": "20", "incline": "-25"}], "name": "Cape Lookout", "time": 84, "sectionCounter": 2, "reward": 7, "waterPercent": 30, "snowPercent": 20, "icePercent": 50, "__v": 0};
        sestavljenPingvin = [5,8,8];
        tezavnost = 3;
        idPingvina = 1;
        idProge = 10;

        let expected = Error;
        const actual = () => simulator.simulator(proga, sestavljenPingvin, tezavnost, idPingvina, idProge);
        assert.throws(actual, expected);
    });
});