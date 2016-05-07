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
	var self=this;
	self.array=arr||[];
	if(self.array.constructor!=Array)
		self.array=[];
	if(byVal)
		self.array=arr.slice() || [];
	
	self.isEmpty=function(){
		return self.length() == 0;
	};
	self.toChars=function(){
		var chars=[];
		for(var i=0,max=self.array.length;i<max;i++)
			if(typeof self.array[i]=='number')
				chars.push(toChar(self.array[i]));
		return chars;
	};
	self.frequency=function(item){
		var counter=0;
		var array=self.array;
		for(var i=0,max=array.length;i<max;i++)
			if(array[i]==item)
				counter++;
		return counter;	
	};
	self.topItem=function(){
		var array=self.array;
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
		if(isJqueryPresent)
			$(window).keypress(function (e) {
				self.array.push(e.which || e.keyCode);
			});
		else
			window.addEventListener("keypress",function(e){
				self.array.push(e.which || e.keyCode);
			});
		return self;
	};
	self.getArray=function(){
		return self.array;
	};
	self.getLastItem=function(){ 
		var ar=self.array;
		return !self.array?ar[ar.length-1]:null;
	};
	self.replaceArray=function(newArray){
		self.array=newArray;
	};
	self.shuffle=function(){
		//Stack overflow question
		//http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
		if(!self.isEmpty())
			shuffle(self.array);
		else 
			throw new Error("Array is empty");
	};
	self.pickRandomItem=function(){
		//Shuffe a copy of the array(not the original array) and return the first element
		return shuffle(self.array.slice())[0];
	};
	//Reimplementing Basic Array methods
	self.length=function(){
		return self.array.length;
	};
	self.push=function(){
		for(var i=0;i<arguments.length;i++)
			self.array.push(arguments[i]);
	};
	self.slice=function(start,stop){
		return self.array.slice(start,stop);
	};
	self.shift=function(){
		var deleted_item=self.array[0];
		self.array=self.array.slice(1);
		return deleted_item;
	};
	self.unshift=function(item){
		if(item)
			self.array.unshift(item);
		return self.length();
	};
}