(function() {
    var redismock = typeof require === 'function' ? require('../../redis-mock.js') : window.redismock;
    if (typeof chai === 'undefined') {
        var chai = typeof require === 'function' ? require('chai') : window.chai;
    }
    chai.config.includeStack = true;
    var expect = chai.expect;

    function randkey(prefix) {
        if (!prefix) {
            prefix = 'k';
        }
        return prefix + Math.random();
    }

    var k1 = randkey(), k2 = randkey();
    var n = 1000000;
    before(function () {
        this.timeout(20000);
        for (var idx = 0; idx < n; idx += 1) {
            redismock.sadd(k1, Math.floor((Math.random()*n)).toString());
            redismock.sadd(k2, Math.ceil((Math.random()*n)).toString());
        }
    });

    describe('creating a one million element set', function () {
        it('should take under 20 seconds', function () {
            var start = new Date();
            var k = randkey();
            for (var idx = 0; idx < 1000000; idx += 1) {
                redismock.sadd(k, idx.toString());
            }
            var end = new Date();
            expect(end - start).to.be.below(20000);
        });
    });

    describe('diffing 2 one million element sets', function () {
        it('should take under 1 second', function () {
            var start = new Date();
            var reply = redismock.sdiff(k1, k2);
            var end = new Date();
            expect(end - start).to.be.below(1000);
        });
    });

    describe('creating 100 sets with 10 000 elements each and diffing them', function () {
    });

    describe('intersecting 2 one million element sets', function () {
        it('should take under 1 second', function () {
            var start = new Date();
            var reply = redismock.sinter(k1, k2);
            var end = new Date();
            expect(end - start).to.be.below(1000);
        });
    });

    describe('creating 100 sets with 10 000 elements each and intering them', function () {
    });

    describe('unioning 2 one million element sets', function () {
        it('should take under 2 seconds', function () {
            var start = new Date();
            var reply = redismock.sunion(k1, k2);
            var end = new Date();
            expect(end - start).to.be.below(2000);
        });
    });

    describe('creating 100 sets with 10 000 elements each and unioning them', function () {
    });

}).call(this);
