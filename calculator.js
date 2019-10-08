let opDisplayVal = ""; //top display for the ongoing operation/values 
let displayVal = ""; 
let numList = []; 
let opList = []; 


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
	if(op==="x") {
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
	opList = []; 
	numList = []; 
}

function divByZeroCheck() {
	if(opList[opList.length-1]==="/" && displayVal==="0") {
		clearDisplay(); 
		document.querySelector("#main-display").textContent ="Cannot div by zero!"; 
		return true; 
	} 
	return false; 
}

function queueOperator(e) {
	//TODO: clear display back to zero, add operator and current number to the op/num lists to be evaluated later
	if(displayVal==="") {
		displayVal = document.querySelector("#main-display").textContent; //use whats currently displayed (so that you can use the result of a calculation for another calculaton) 
	}

	if(divByZeroCheck()) {
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
	//console.log(opList); 
	//console.log(numList); 
	if(divByZeroCheck()) { 
		return; 
	}
	if(opList.length===0) {
		numList = []; 
		return; 
	}
	//TODO: loop through nums/operators, check for errors/div by zero (do this check in op func), etc, return final calculation
	//reminder: use .shift() on arrays to get/remove first element 

	let answer = numList.shift(); 
	while(opList.length!==0 && numList.length!==0) {
		answer = operate(opList.shift(), answer, numList.shift()); 
	}

	let topDisplay = document.querySelector("#top-display"); 
	opDisplayVal = opDisplayVal.concat(curValue);
	topDisplay.textContent = ""; //opDisplayVal; 
	let mainDisplay = document.querySelector("#main-display"); 
	mainDisplay.textContent = answer; 
	opDisplayVal = ""; 
	displayVal = ""; 
	numList = []; 
	opList = []; 
	//console.log(answer); 
	return answer; 
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