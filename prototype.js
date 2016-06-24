function toNum(array, item) {
	if(!array)
		return -1;
	return 'number' != typeof item ? array.indexOf(item) : item;
}

function checkIndex() {
	var ar = arguments[0],
		max = ar.length,
		args = arguments,
		a = args[1],
		twoArgs = args.length > 2,
		b = args[2];
	if (typeof a != 'number')
		a = ar.indexOf(a);
	if (twoArgs)
		if (typeof b != 'number')
			b = ar.indexOf(b);
	return a != -1 && a < max && !twoArgs ? 1 : b != -1 && b < max && b != a;
}

function log(o) {
	//Just for debugging
	console.log(o);
}
//Just for testing purposes
var ar = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c'];
"use strict";
Array.prototype.swap = function() {
	var args = arguments;
	var ar = this;
	var a = toNum(ar, args[0]),
		b = toNum(ar, args[1]),
		ar = this;
	if (!checkIndex(ar, a, b))
		throw new TypeError("Invalid indices");
	var temp = this[b];
	this[b] = this[a];
	this[a] = temp;
};