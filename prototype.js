function checkIndex(_array){
	var ar=_array,max=ar.length,args=arguments,a=args[1],twoArgs=args.length > 2;
	if(typeof a != 'number')
		a=ar.indexOf(a);
	if(twoArgs)
		if(typeof b != 'number')
			b = ar.indexOf(b);
	return !twoArgs? a >-1 && a<max:a >-1 && a<max && b >-1 && b < max && b!=a;	
}
"use strict";
Array.prototype.swap=function(){
	var args=arguments,a=args[0],b=args[1],ar=this;
	if(!checkIndex(a,b))
		throw new TypeError("Invalid indices");
	
};