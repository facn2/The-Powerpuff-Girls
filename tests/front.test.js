const tape = require('tape');
const shot = require('shot');
const router = require('../src/router');


tape('Zero test', (t) => {
	let num = 100;
	t.deepEqual(100, num, "A++")
	t.end()
});

tape('Router.js - Test 1: Home route returns status code of 200', (t) => {
	shot.inject(router, {method: 'get', url: "/" }, (res) => {
		t.deepEqual(res.statusCode, 200, 'should return w/status code 200');
		t.end();
	})
});

tape('Router.js - Test 2: Home')


module.exports = router.test;

