const tape = require('tape');

tape('Zero test', (t) => {
	let num = 100;
	t.deepEqual(100, num, "A++")
	t.end()
});