"use strict";
function SmartArray(){
	var isBackupEnabled=true,noDuplicates=false,self=this;
	function toNum(i){
		return 'number'===typeof i?i:_array.indexOf(i);
	}
	function checkIndex(){
		var args=arguments,ar=_array,a=args[0],len=ar.length,b;
		var twoArgs=arguments.length > 1;
		//check if we want to check 2 indices
		if(twoArgs)
			b = args[1];
		return !twoArgs? (a>-1 && a<len):(a >-1 && b >-1) && (a != b) &&  (a < len &&  b < len);
	}
	function lt(a,b) {
    	return ('number'=== typeof (a && b))?a-b:(a+"").localeCompare(b);
    }
	function int(i){
		return parseInt(i);
	}
	function shuffle(a){
		var j, x,i=a.length;
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
		for(var i=0,max=_array.length;i<max;i++)
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
		var counter=0,arr=_array,max=ar.length,i;
		for(i=0;i<max;i++)
			if(item==arr[i])
				counter++;
		return counter;	
	};
	self.topItem=function(){
		var array=_array.slice();
		var max_freq=self.frequency(array[0]);
		var max_item=array[0];
		for(var i=0,max=array.length;i<max;i++)
			if(self.frequency(array[i]) > max_freq){
				max_freq=self.frequency(array[i]);
				max_item=array[i];
			}		
		return max_item;
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
	self.delete=function(i){
		if(!checkIndex(i))
			throw new Error("Invalid index");
		delete self[toNum(i)];
		self.length--;
		return delete _array[toNum(i)];
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
		var a=toNum(start_index),b=toNum(end_index);
		if(!checkIndex(a,b))
			throw new TypeError("Invalid index values");
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
	self.replaceItem=function(item_index,newObj,lazyVal){
		//lazyVal-->don't check for invalid indexes
		var index=toNum(item_index);
		if(!lazyVal)
			if(!checkIndex(index))
				throw new TypeError("Invalid Index");
		backup();
		_array[index]=newObj;
		self[index]=newObj;
		if(lazyVal)
			updateLength(_array);
		return _array;
	};
	self.set=function(index,obj){
		return self.replaceItem(index,obj,true);
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
	self.denyDuplicates=function(){
		noDuplicates=true;
		return self.removeDuplicates();
	};
	self.allowDuplicates=function(){
		noDuplicates=false;
	};
	//Reimplementing Basic Array methods
	self.push=function(){
		backup();
		self.length = Array.prototype.push.apply(_array,getArgs(arguments));
		if(noDuplicates){
			//no need to call updateProps() since it will be called in removeDuplicates()
			self.removeDuplicates();
			return self.length;
		}
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
	self.filter=function(){
		return Array.prototype.filter.apply(_array,getArgs(arguments));
	};
	self.find=function(fn){
		return Array.prototype.find.apply(_array,getArgs(arguments));
	};
	self.values=function(){
		return _array.values();
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
	self.reduce=function(){
		return Array.prototype.reduce.apply(_array,getArgs(arguments));
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
	self.lastIndexOf=function(){
		return Array.prototype.lastIndexOf.apply(_array,getArgs(arguments));
	};
	self.keys=function(){
		return _array.keys();
	};
	self.map=function(fn){
		if(!fn)
			throw new TypeError("You can't call .map() without passing a function.");
		backup();
		_array.map(fn);
		updateProps();
		return _array.map(fn);
	};
	self.forEach=function(callback,thisArg){
		return _array.forEach(callback,thisArg);
	};
	self.every=function(){
		return Array.prototype.every.apply(_array,getArgs(arguments));
	};
}
