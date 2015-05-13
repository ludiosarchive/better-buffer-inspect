require('..');
const assert = require('assert');
const inspect = require('util').inspect;

describe('Buffer.prototype.inspect', function() {
	it('shows undecodeable Buffers as bytes', function() {
		const buf = new Buffer(4).fill(255);
		assert.equal(inspect(buf), '<Buffer ff ff ff ff>');
	});

	it('shows decodeable but too-long Buffers as bytes', function() {
		const buf = new Buffer(1000).fill(0);
		assert.equal(inspect(buf), '<Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... >');
	});

	it('shows decodeable Buffers as utf-8 strings', function() {
		assert.equal(inspect(new Buffer("hello world\n")), "<Buffer utf8 'hello world\\n'>");
		assert.equal(inspect(new Buffer(2).fill(0)), "<Buffer utf8 '\\u0000\\u0000'>");
		assert.equal(inspect(new Buffer("\ucccc", "utf8")), "<Buffer utf8 '\ucccc'>");
	});
});
