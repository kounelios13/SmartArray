function int(i){
	return parseInt(i);
}
String.prototype.toChar=function(){
	return String.fromCharCode(int(this));
};
function SmartArray(arr){
	var self=this;
	self.array=arr||[];
	if(self.array.constructor!=Array)
		self.array=[];
	self.toChars=function(){
		var chars=[];
		for(var i=0,max=self.array.length;i<max;i++){
			if(typeof self.array[i]=='number')
				chars.push(String.fromCharCode(int(self.array[i])));

		}
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
		window.addEventListener("keypress",function(e){
			self.array.push(e.which);
		});
		return self;
	};
	self.getArray=function(){
		return self.array;
	};
	self.getLastItem=function(){ 
		var ar=self.array;
		return ar[ar.length-1];
	};
	self.replaceArray=function(newArray){
		self.array=newArray;
	};
	self.shuffle=function(){
		var a=self.array;
		var j, x, i;
	    for (i = a.length; i; i -= 1) {
	        j = Math.floor(Math.random() * i);
	        x = a[i - 1];
	        a[i - 1] = a[j];
	        a[j] = x;
	    }
	};

}