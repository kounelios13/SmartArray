"use strict";
function SmartArray(arr,byVal){
	/*If true is passed as second argument the array passed is copied into a
	 new one value by value not by ref*/
	 var self=this,_array=arr||[],
	 fr_array=[];
	 function updateProps(){
	 	for(var i=0;i<_array.length;i++){
	 		self[i]=_array[i];
	 	}
	 }
	 self.getAll=function(){
	 	return fr_array;
	 };
	 self.getArray=function(){
	 	return _array;
	 };
	 self.push=function(){
	 	for(var i=0;i<arguments.length;i++){
	 		var arg=arguments[i];
	 		var ind=_array.indexOf(arg);
	 		if(ind==-1)
	 		{
	 			_array.push(arg);
	 			fr_array.push(1);
	 		}
	 		else{
	 			fr_array[ind]++;
	 		}//if-else
	 	}//for
	 	//updateCommands()
	 	updateProps();
	 	return _array.length;
	 };

}
