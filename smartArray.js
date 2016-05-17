function SmartArray(arr,byVal){
	/*If true is passed as second argument the array passed is copied into a
	 new one value by value not by ref*/
	var isJqueryPresent=typeof jQuery != 'undefined';
	function int(i){
		return parseInt(i);
	}
	function shuffle(a){
		var j, x, i;
		for (i = a.length; i; i--) {
		    j = Math.floor(Math.random() * i);
		    x = a[i - 1];
		    a[i - 1] = a[j];
		    a[j] = x;
		}
		return a;
	}
	function toChar(c){
		return String.fromCharCode(int(c));
	}
	function backup(){
		_backup=_array.slice();
	}
	function getArgs(a){
		return Array.prototype.slice.call(a);
	}
	function updateLength(arr){
		self.length=_array.length;
	}
	var self=this;
	var _array=arr||[],
	_backup=[];
	if(_array.constructor!=Array)
		_array=[];
	if(byVal)
		_array=arr.slice() || [];
	self.length=_array.length;
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
	self.getUniqueItems=function(sorted){
		//Returns an array without duplicated items
		//If sorted the array returnd will be sorted
		var unique_set=[];
		backup();
		self.sort();
		for(var i=0,max=_array.length;i<max;i+=self.frequency(_array[i]))
			if(!unique_set.includes(_array[i]))
				unique_set.push(_array[i]);
		self.restoreBackup();
		return !sorted?unique_set:unique_set.sort(function(a,b){ return a-b;});	
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
	self.getArray=function(){
		return _array;
	};
	self.getLastItem=function(){ 
		var ar=_array;
		return !_array?ar[ar.length-1]:null;
	};
	self.replaceArray=function(newArray,byVal){
		backup();
		_array=byVal?newArray.slice():newArray;
		updateLength(_array);
		return _array;
	};
	self.backupArray=function(){
		backup();
	};
	self.restoreBackup=function(){
		updateLength(_array);
		return self.replaceArray(_backup.slice());
	};
	self.getBackup=function(){
		return _backup;
	};
	self.deleteArray=function(){
		backup();
		_array.length=self.length=0;
	};
	self.shuffle=function(){
		//Stack overflow question
		//http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
		if(!self.isEmpty())
			shuffle(_array);
		else 
			throw new Error("Array is empty");
	};
	self.pickRandomItem=function(){
		//Shuffe a copy of the array(not the original array) and return the first element
		return shuffle(_array.slice())[0];
	};
	self.swap=function(start_index,end_index){
		backup();
		var array_max=self.length;
		if(start_index == array_max || end_index ==array_max || start_index < 0 || end_index < 0)
			throw new TypeError("Index out of bounds");
		if(!start_index || !end_index){
				var msg;
				if(start_index == 0 || end_index == 0)//Javascript treats 0 as false so when 0 is passed as an argument in 
					//self.swap an error will be thrown so to avoid it if any of the arguments is 0 we do not throw any errors
					msg=null;
				else if(!start_index && !end_index ) 
					msg="Both indexes are invalid";
				else if(!start_index)
					msg="Start index is invalid";
				else
					msg="End index is invalid";
				//If there is an actual error throw the error
				if(msg)
					throw new TypeError(msg);
		}
		var temp=_array[end_index];
		_array[end_index]=_array[start_index];
		_array[start_index]=temp;
	};
	self.replaceItem=function(item_index,newObj){
		backup();
		_array[item_index]=newObj;
		return _array;
	};
	//Reimplementing Basic Array methods
	self.push=function(){
		return self.length = Array.prototype.push.apply(_array,getArgs(arguments));
	};
	self.pop=function(){
		self.length--;
		return _array.pop();
	};
	self.fill=function(){
    	return Array.prototype.fill.apply(_array,getArgs(arguments));
	};
	self.slice=function(start,stop){
		return Array.prototype.slice.apply(_array,getArgs(arguments));
	};
	self.shift=function(){
		var item= _array.shift();
		updateLength(_array);
		return item;
	};
	self.unshift=function(item){
		_array.unshift(item);
		updateLength(_array);
		return self.length;
	};
	self.reverse=function(){
		return _array.reverse();
	};
	self.reduce=function(filter){
		return _array.reduce(filter);
	};
	self.sort=function(compareFunction){
		var fn=compareFunction=='>'?function(a,b){return b-a;}:compareFunction=='<'?function(a,b){return a -b ;}:compareFunction;
		return _array.sort(fn);
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
		return _array.map(fn);
	};

}