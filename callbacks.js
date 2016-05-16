function even(n){
	return n % 2 == 0;
}
function odd(n){
	return n % 2 == 1;
}
function sort_fun(direction,a,b){
	return direction==">"?b-a:a-b;
}
function square(a){
	return a * a;
}
function qube(a){
	return square(a) * a;
}
function isLetter(n){
	return (n>=65 && n <= 90) ||( n>=97 &&  n<=122);
	//a..z && A..Z
}