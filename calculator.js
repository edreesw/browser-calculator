let opDisplayVal = ""; //top display for the ongoing operation/values 
let displayVal = ""; 
let numList = []; 
let opList = []; 
/*
function add(a, b) {
	return a+b; 
}

function sub(a, b) {
	return a-b; 
}

function mul(a, b) {
	return a*b; 
}

function div(a, b) {
	return a/b; 
}
*/

function operate(op, a, b) {
	//take string, return int
	a=parseInt(a); 
	b=parseInt(b); 
	if(op==="+") {
		return a+b; 
	}
	if(op==="-") {
		return a-b; 
	}
	if(op==="*") {
		return a*b; 
	}
	if(op==="/") {
		return a/b; 
	}
}

function displayNumBtnPress(e) {
	let display = document.querySelector("#main-display"); 
	if(displayVal==="0") {
		displayVal=""; 
	}
	displayVal = displayVal.concat(this.textContent)
	display.textContent = displayVal; 
}

function clearDisplay(e) {
	let display = document.querySelector("#main-display"); 
	let topDisplay = document.querySelector("#top-display"); 
	opDisplayVal = " "; 
	displayVal = "0"; 
	display.textContent = displayVal;  
	topDisplay.textContent = opDisplayVal; 
}

function queueOperator(e) {
	//TODO: clear display back to zero, add operator and current number to the op/num lists to be evaluated later
	if(displayVal==="") {
		return; 
	}

	let topDisplay = document.querySelector("#top-display"); 
	opDisplayVal = opDisplayVal.concat(displayVal + this.textContent);
	topDisplay.textContent = opDisplayVal; 
	numList.push(displayVal); 
	opList.push(this.textContent); 

	//let mainDisplay = document.querySelector("#main-display"); 
	displayVal = ""; 
	//mainDisplay.textContent = displayVal;  
}

function calculate() {
	let curValue = document.querySelector("#main-display").textContent; //take whatever's in the display as the current/final value
	numList.push(curValue); 
	console.log(opList); 
	console.log(numList); 

	//TODO: loop through nums/operators, check for errors/div by zero, etc, return final calculation
}

let numBtns = document.querySelectorAll(".num-btn"); 
numBtns.forEach(numBtn => { 
  numBtn.addEventListener("click", displayNumBtnPress); 
}); 

let opBtns = document.querySelectorAll(".operator-btn"); 
opBtns.forEach(opBtn => { 
  opBtn.addEventListener("click", queueOperator); 
}); 

let clearBtn = document.querySelector("#clear-btn"); 
clearBtn.addEventListener("click", clearDisplay); 

let equalsBtn = document.querySelector("#equals-btn"); 
equalsBtn.addEventListener("click", calculate); 