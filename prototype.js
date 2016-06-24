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
Array.prototype.lastItem=function(){
	return this[this.length-1];
};
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
Array.prototype.frequncy=function(item){
	if(!item)
		return 0;
	var counter=0;
	for(var i=0,max=this.length,ar=this;i<max;i++)
		if(ar[i]==item)
			counter++;
	return counter;	
};
Array.prototype.uniqueItems=function(){
	var ar=this,unique=[],max=ar.length;
	for(var i = 0 ; i < max;i++)
		if(unique.indexOf(ar[i] )==-1)
			unique.push(ar[i]);
	return unique;	
};
Array.prototype.removeDuplicates=function(){
	var clear_array=this.uniqueItems();
	this.length=0;
	for(var i = 0;i<clear_array.length;i++)
		this[i] = clear_array[i];
	return this;
};
Array.prototype.shuffle=function(){
	var a = this;
	var j, x,i=a.length;
		while(i){
			j = Math.floor(Math.random() * i);
		    x = a[i - 1];
		    a[i - 1] = a[j];
		    a[j] = x;
		    i--;
		    
		}
		return a;
};
Array.prototype.randomItem=function(){
	return this.slice().shuffle()[0];
};
Array.prototype.topItem=function(){
	var ar = this.slice().sort(function(a,b) {
    	return ('number'=== typeof (a && b))?a-b:(a+"").localeCompare(b);
    });
	var max = ar.length;
	var max_f = ar.frequncy(ar[0]);
	var top = ar[0];
	for(var i =  1 ;i < max; i++)
		if(ar.frequncy(ar[i]) > max_f){
			max=ar[i];
			max_f=ar.frequncy(ar[i]);
		}
	return top;	
};
var x=[1,1,1,1,1,1,1,1,2,3,4,4,5,5,5,1,1,1];
//x.removeDuplicates();
//var y = x.shuffle();
log(x.shuffle().topItem());
t=[];
for(i=0;i<1000000;i++)
	t.push(x.topItem());
log(t.length);