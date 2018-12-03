const assert = require('chai').assert;
var pathSimulator = require('../../simulators/algoritemIskanjaPoti.js');

describe('Test istanja poti za simultaor', function () {
    var odsekTrenutni= [[2,4,2],[1,4,2],[4,4,2],[4,2,1],[4,0,2],[1,0,2],[1,0,1],[2,0,2],[1,0,0],[1,1,0],[0,2,0],[2,0,1],[2,0,0],[1,2,0],[2,2,0],[1,2,4],[2,1,4],[1,2,4],[2,0,0],[3,0,1]];
    var odsekNaslednji=[[2,0,2],[1,0,2],[0,0,2],[0,3,3],[0,0,1],[1,0,1],[1,0,1],[1,4,3],[3,4,2],[2,4,2],[1,0,4],[1,2,4],[0,4,4],[1,4,2],[0,4,2],[0,1,3],[0,0,3],[3,0,2],[0,0,1],[0,2,2]];

    it('Test algoritma na stopnji 0', function () {
        let pricakovana = [[0,2],[1,1],[2,0],[3,1],[4,1],[5,0],[6,1],[7,1],[8,0],[9,1],[10,1],[11,0],[12,1],[13,1],[14,0],[15,1],[16,1],[17,0],[18,1],[19,1],[20,0],[21,1],[22,1],[23,0],[24,1],[25,1],[26,0],[27,1],[28,1],[29,0],[30,1],[31,1],[32,0],[33,1],[34,1],[35,0],[36,1],[37,1],[38,1],[39,2]];

        let path = pathSimulator.poisciPot(2, odsekTrenutni, odsekNaslednji,0);
        assert.equal(JSON.stringify(path[0]), JSON.stringify(pricakovana));
        assert.equal(path[1], 65);
    });
    it('Test algoritma na stopnji 1', function () {
        let pricakovana = [[0,2],[1,1],[2,0],[3,0],[4,0],[5,1],[6,0],[7,1],[8,1],[9,2],[10,2],[11,2],[12,1],[13,2],[14,2],[15,2],[16,2],[17,2],[18,2],[19,1],[20,1],[21,1],[22,0],[23,1],[24,0],[25,1],[26,0],[27,1],[28,1],[29,1],[30,1],[31,2],[32,2],[33,1],[34,0],[35,1],[36,2],[37,1],[38,0],[39,0]];

        let path = pathSimulator.poisciPot(2, odsekTrenutni, odsekNaslednji,1);
        assert.equal(JSON.stringify(path[0]), JSON.stringify(pricakovana));
        assert.equal(path[1], 59);

    });
    it('Test algoritma na stopnji 2', function () {
        let pricakovana = [[0,2],[1,1],[2,0],[3,1],[4,1],[5,1],[6,2],[7,1],[8,1],[9,2],[10,2],[11,2],[12,1],[13,2],[14,2],[15,2],[16,2],[17,2],[18,2],[19,1],[20,1],[21,1],[22,0],[23,0],[24,0],[25,1],[26,0],[27,0],[28,1],[29,1],[30,1],[31,0],[32,0],[33,0],[34,0],[35,0],[36,0],[37,1],[38,1],[39,0]];
        let path = pathSimulator.poisciPot(2, odsekTrenutni, odsekNaslednji,2);
        assert.equal(JSON.stringify(path[0]), JSON.stringify(pricakovana));
        assert.equal(path[1], 1170);
    });
});