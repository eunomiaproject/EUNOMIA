//ASYNC FUNCTION
function async() {
	window.setTimeout(function() {
		console.log("result");
	}, 1000);
	console.log('something');
}
//sees setTimeout, console.logs something, then console.logs result whenever 1 second has passed

function async2(num1, num2, callback) {
	var result = num1 + num2;
	console.log(result);
	callback(result);
}
async2(1,2,function(num){
	console.log('final:'+num);
});
//runs async2, passes 1 and 2 as parameters, result is 3, then runs callback --which is the function you pass as the third parameter--  
//where you can do anything with the result

function sync() {
	async2(1,2,function(num){
		console.log('final:'+num);
	});
	console.log('something');
}
//3, then final:3, then something

//SYNC FUNCTION
function sync() {
	doSomething();
	console.log('something');
}
//runs doSomething(), waits for it to complete, then console.logs something


//RETURN examples
function a() {
	alert('A');
}
//alerts 'A', returns undefined

function b() {
	alert('B');
	return a;
}
//alerts 'B', returns function a

function c() {
	alert('C');
	return a();
}
//alerts 'C', alerts 'A', returns undefined