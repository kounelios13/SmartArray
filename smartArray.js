"use strict";
function SmartArray(arr,byVal){
	/*If true is passed as second argument the array passed is copied into a
	 new one value by value not by ref*/
	var isJqueryPresent=typeof jQuery != 'undefined';
	var isBackupEnabled=true;
	var self=this;
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
		return isNaN(n);
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
	/*
	Recursive implementation
	function deleteProps(num)
	{
		delete self[!num?0:num];
		if(self[num+1]||0)
			deleteProps(num+1 || 0);
		else
			_totalProps=0;
	}
*/	function updateProps(append){
		var max=self.length,i;
		for(i=append?_totalProps:0;i<max;i++)
			self[i] =_array[i];
		_totalProps=max;	
	}
	/*function typo(msg){
		throw new TypeError(msg);
	}*/
	var _array=arr||[],
	_backup=[];
	if(_array.constructor!=Array)
		_array=[];
	if(byVal && arr.constructor == Array)
		//No need to execute if  we have an empty array
		_array=arr.slice();
	var _totalProps=0;
	self.constructor="SmartArray";
	self.length=_array.length;
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
			if(typeof _array[i]=='number')
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
		//unique_set.sort(grt);
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
	self.logKeys=function(){
		console.log("Now every time you press a key its keycode will be saved in the array you specified");
		function key(e){
			_array.push(e.which || e.keyCode);
			self.length=_array.length;
			updateProps(true);
		}
		if(isJqueryPresent)
			$(window).keypress(key);
		else
			window.addEventListener("keypress",key);
		return self;
	};
	self.filter=function(callback){
		return _array.filter(callback);
	};
	self.getArray=function(copy){
		//Returns a reference to the array or a copy of the array
		return !copy?_array:_array.slice();
	};
	self.getLastItem=function(){ 
		var ar=_array;
		return !self.isEmpty()?ar[ar.length-1]:null;
	};
	self.replaceArray=function(newArray,byVal){
		backup();
		_array=byVal?newArray.slice():newArray;
		updateLength(_array);
		updateProps();
		return _array;
	};
	self.backupArray=function(){
		backup();
	};
	self.restoreBackup=function(){
		updateLength(_array);
		self.replaceArray(_backup.slice());
		updateProps();
		return _array;
	};
	self.getBackup=function(){
		return _backup;
	};
	self.deleteArray=function(){
		backup();
		//Delete all properties of current Smart Array object
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
			throw new Error("Array is empty");
	};
	self.pickRandomItem=function(){
		//Shuffe a copy of the array(not the original array) and return the first element
		return shuffle(_array.slice())[0];
	};
	self.swap=function(start_index,end_index){
		//TODO
		//if one(or both) of indexes is not a number
		//but something else try to find the index of the argument passed
		//e.g.
		//swap("a","b")->find index of a and b and the perform the swap
		//assign start index to a and end index to b
		var array_max=self.length;
		var a=start_index,b=end_index;
		//Test the following part:
		if(typeof a !='number')
			a=_array.indexOf(a);
		if(typeof b !='number')
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
				if(nan(int(a)) || nan(int(b)))
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
		temp=self[end_index];
		self[end_index]=self[start_index];
		self[start_index]=temp;
		//And then swap the actual items
		temp=_array[end_index];
		_array[end_index]=_array[start_index];
		_array[start_index]=temp;
				
	};
	self.replaceItem=function(item_index,newObj){
		backup();
		_array[item_index]=newObj;
		updateProps();
		return _array;
	};
	/*---------------Important functions------------------*/
	self.update=function(){
		//Execute only if array is not copied but passed by reference
		if(!byVal && window.hasOwnProperty(arr))
			if(arr.length != self.length || arr != _array)
			{
				self.length=arr.length;
				updateProps();
			}
	};
	self.autoUpdate=function(interval){
		//If the array passed is copied with .slice() don't do anything
		if(byVal)
			return;
		if(nan(interval))
			throw new TypeError("Interval value must be a valid number");
		self.interval=setInterval(function(){
			self.update();
			//console.log("Array updated");
		},interval < 0?-interval:interval);
	};
	self.disableAutoUpdate=function(){
		//if(!byVal)
		clearInterval(self.interval);
	};
	self.disableBackups=function(){ isBackupEnabled=false;};
	self.enableBackups=function(){ isBackupEnabled=true};
	/*--------------------------------------------------------*/
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
		backup();
		if(self.isEmpty())
			throw new Error("Can't pop from empty array.");
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
		backup();
		_array.map(fn);
		if(_backup.slice() != _array.slice())
			updateProps();
		return _array.map(fn);

	};
}
