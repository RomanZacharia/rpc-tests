var config = require('../lib/config'),
    Helpers = require('../lib/helpers'),
    assert = require('chai').assert;

// TEST
var asyncTest = function(host, done){
    Helpers.send(host, {
        id: config.rpcMessageId++,
        jsonrpc: "2.0",
        method: "eth_coinbase",
        params: []

    }, function(result, status) {
        
        assert.equal(status, 200);
        assert.property(result, 'result', (result.error) ? result.error.message : 'error');
        assert.deepEqual(result.result, '0x165ccc179226690230d2952beaf9849e67c231a2');

        done();

    });
};


describe('eth_coinbase', function(){
    for (var key in config.hosts) {
        describe(key.toUpperCase(), function(){
            it('should return a coinbase address', function(done){
                asyncTest(config.hosts[key], done);
            });
        });
    }
});
