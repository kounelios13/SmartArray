"use strict";
function SmartArray(){
	/*If true is passed as second argument the array passed is copied into a
	 new one value by value not by ref*/
	var isBackupEnabled=true;
	var self=this;
	//var log=function(o){console.log(o);};
	function lt(a,b) {
    	return (typeof a==="number" && typeof b==="number")?a-b:(a+"").localeCompare(b);
    }
    function grt(a,b){
    	return (typeof a==="number" && typeof b==="number")?b-a:(b+"").localeCompare(a);
    }
	function int(i){
		return parseInt(i);
	}
	function nan(n){
		return isNaN(int(n));
	}
	function shuffle(a){
		var j, x, i;
		i=a.length;
		while(i){
			j = Math.floor(Math.random() * i);
		    x = a[i - 1];
		    a[i - 1] = a[j];
		    a[j] = x;
		    i--;
		}
		return a;
	}
	function toChar(c){
		return String.fromCharCode(int(c));
	}
	function backup(){
		if(isBackupEnabled)
			_backup=_array.slice();
	}
	function getArgs(a){
		return Array.prototype.slice.call(a);
	}
	function updateLength(arr){
		self.length=_array.length;
	}
	function deleteProps(){
		for(var i=0;i<_array.length;i++)
			delete self[i];
		_totalProps=0;
	}
	function updateProps(append){
		var max=self.length,i;
		for(i=append?_totalProps:0;i<max;i++)
			self[i] =_array[i];
		_totalProps=max;	
	}
	var _array=[],
	_backup=[];
	if(_array.constructor!=Array)
		_array=[];
	var _totalProps=0;
	self.constructor="SmartArray";
	self.length=0;
	updateProps();
	self.isEmpty=function(){
		return self.length == 0;
	};
	self.includes=function(){
    	return Array.prototype.includes.apply(_array, getArgs(arguments));
	};
	self.every=function(){
    	return Array.prototype.every.apply(_array, getArgs(arguments));
	};
	self.toChars=function(){
		var chars=[];
		for(var i=0,max=_array.length;i<max;i++)
			if(typeof _array[i] === 'number')
				chars.push(toChar(_array[i]));
		return chars;
	};
	self.getUniqueItems=function(){
		//Returns an array without duplicated items
		var unique_set=[];
		//create a copy of the array
		var ar=self.getArray(true).sort(lt);
		for(var i=0,max=ar.length;i<max;i++)
			if(unique_set.indexOf(ar[i])==-1)
				unique_set.push(ar[i]);
		return unique_set;		
	};
	self.frequency=function(item){
		var counter=0;
		var arr=_array;
		for(var i=0,max=arr.length;i<max;i++)
			if(item==arr[i])
				counter++;
		return counter;	
	};
	self.topItem=function(){
		var array=_array.slice();
		array.sort();
		var max_freq=self.frequency(array[0]);
		var max_item=array[0];
		for(var i=0,max=array.length;i<max;i++)
			if(self.frequency(array[i]) > max_freq){
				max_freq=self.frequency(array[i]);
				max_item=array[i];
			}		
		return max_item;
	};
	self.filter=function(callback){
		return _array.filter(callback);
	};
	self.getArray=function(){
		//Returns a reference to the array or a copy of the array
		return _array.slice();
	};
	self.getLastItem=function(){ 
		var ar=_array;
		return !self.isEmpty()?ar[ar.length-1]:null;
	};
	self.replaceArray=function(newArray){
		backup();
		_array=newArray.slice();
		updateLength(_array);
		updateProps();
		return _array;
	};
	self.backupArray=function(){
		backup();
	};
	self.restoreBackup=function(){
		if(!isBackupEnabled)
			return;
		updateLength(_array);
		self.replaceArray(_backup.slice());
		updateProps();
		return _array;
	};
	self.delete=function(index){
		var i=index;
		if(typeof i ==='string')
			i=_array.indexOf(index);
		if(!i || i >= self.length || i < 0)
			throw new Error("Invalid index");
		delete self[i];
		self.length--;
		return delete _array[i];
	}
	self.getBackup=function(){
		return _backup;
	};
	self.deleteArray=function(){
		backup();
		//Delete all properties of the current Smart Array object
		deleteProps();
		_array.length=self.length=0;		
	};
	self.shuffle=function(){
		//Stack overflow question
		//http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
		if(!self.isEmpty()){
			backup();
			shuffle(_array);
			if(_backup != _array)
				updateProps();
		}
		else 
			throw new Error("Array is empty.");
	};
	self.pickRandomItem=function(){
		//Shuffe a copy of the array(not the original array) and return the first element
		return shuffle(_array.slice())[0];
	};
	self.swap=function(start_index,end_index){
		var array_max=self.length;
		var a=start_index,b=end_index;
		//Test the following part:
		if(typeof a ==="string")
			a=_array.indexOf(a);
		if(typeof b ==="string")
			b=_array.indexOf(b);
		//test ends here
		if(a==-1 || b==-1)
			throw new TypeError("Invalid indexes");
		else if(a == array_max || b ==array_max || a < 0 || b < 0)
			throw new TypeError("Index out of bounds");
		else if(a == b)
			throw new TypeError("Start index and end index can not be the same!!!");
		else if(!a || !b){
				var msg;
				//Check if one of 2 indexes is not a number
				if(nan(a) || nan(b))
					msg="Please eneter valid indexes";
				else if(a == 0 || b == 0)//Javascript treats 0 as false so when 0 is passed as an argument in 
					//self.swap an error will be thrown so to avoid it if any of the arguments is 0 we do not throw any errors
					msg=null;
				else if(!a && !b ) 
					msg="Both indexes are invalid";
				else if(!a)
					msg="Start index is invalid";
				else
					msg="End index is invalid";
				//If there is an actual error throw the error
				if(msg)
					throw new TypeError(msg);
		}
		//If no error is thrown backup the current array
		backup();
		//First swap object properties
		var temp=self[b];
		self[b]=self[a];
		self[a]=temp;
		//And then swap the actual items
		temp=_array[b];
		_array[b]=_array[a];
		_array[a]=temp;				
	};
	self.replaceItem=function(item_index,newObj){
		if(item_index<0 || item_index>=self.length)
			throw new TypeError("Invalid Index");
		backup();
		_array[item_index]=newObj;
		self[item_index]=newObj;
		return _array;
	};
	self.disableBackups=function(){ isBackupEnabled=false;_backup=null;};
	self.enableBackups=function(){ isBackupEnabled=true;_backup=[];};
	self.lastItem=function(){
		return _array[self.length-1];
	};
	self.removeDuplicates=function(){
		backup();
		//First clear all properties of current smart array
		deleteProps();
		self.replaceArray(self.getUniqueItems(true));
		updateLength(_array);
		_totalProps=_array.length;
		//And reassign the right ones
		updateProps();
		return _array;
	};
	//Reimplementing Basic Array methods
	self.push=function(){
		backup();
		self.length = Array.prototype.push.apply(_array,getArgs(arguments));
		updateProps(true);
		return self.length;
	};
	self.pop=function(){
		if(self.isEmpty())
			throw new Error("Can't pop from empty array.");
		backup();
		_totalProps--;
		delete self[--self.length];
		return _array.pop();
	};
	self.fill=function(){
    	Array.prototype.fill.apply(_array,getArgs(arguments));
		updateProps();
		return _array;
	};
	self.slice=function(start,stop){
		return Array.prototype.slice.apply(_array,getArgs(arguments));
	};
	self.shift=function(){
		if(self.isEmpty())
			throw new Error("Can't shift from empty array.");
		backup();
		var item= _array.shift();
		updateLength(_array);
		updateProps();
		delete self[self.length];
		return item;
	};
	self.unshift=function(item){
		_array.unshift(item);
		updateLength(_array);
		updateProps();
		return self.length;
	};
	self.reverse=function(){
		backup();
		 _array.reverse();
		 updateProps();
		 return _array;
	};
	self.reduce=function(filter){
		return _array.reduce(filter);
	};
	self.sort=function(compareFunction){
		backup();
		_array.sort(compareFunction);
		deleteProps();
		updateProps();
		return _array;
	}
	self.join=function(seperator){
		return _array.join(seperator);
	};
	self.toString=function(){
		return _array.toString();
	};
	self.indexOf=function(item){ 
		return _array.indexOf(item);
	};
	self.lastIndexOf=function(item){
		return _array.lastIndexOf(item);
	};
	self.keys=function(){
		return _array.keys();
	};
	self.map=function(fn){
		if(!fn)
			throw new TypeError("You can't call .map() without passing a function.");
		backup();
		_array.map(fn);
		if(_backup.slice() != _array.slice())
			updateProps();
		return _array.map(fn);
	};
}
