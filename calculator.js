let opDisplayVal = ""; //top display for the ongoing operation/values 
let displayVal = ""; 


let curNum = null; 
let curOp = null; 
let prevCalc = null; 



function operate(op, a, b) {
	//take string, return int
	a=parseInt(a); 
	b=parseInt(b); 
	switch(op) {
		case "+" : 
			return a+b;
			break;  
		case "-" : 
			return a-b; 
			break; 
		case "x" : 
			return a*b; 
			break; 
		case "/" : 
			return a/b; 
			break; 
	}
}

function displayNumBtnPress(e) {
	let display = document.querySelector("#main-display"); 

	displayVal = displayVal.concat(this.textContent)
	display.textContent = displayVal; 

	curNum = displayVal; 
}


function divByZeroCheck() {
	if(curOp === "/" && displayVal === "0") {
		clearDisplay(); 
		document.querySelector("#main-display").textContent ="Cannot div by zero!"; 
		return true; 
	} 
	return false; 
}

function queueOperator(e) { 
	if(displayVal==="") {
		displayVal = document.querySelector("#main-display").textContent; //use whats currently displayed (so that you can use the result of a calculation for another calculaton) 
		curNum = displayVal; 
	}

	if(divByZeroCheck()) {
		return; 
	}

	let topDisplay = document.querySelector("#top-display"); 
	opDisplayVal = opDisplayVal.concat(displayVal + this.textContent);
	topDisplay.textContent = opDisplayVal; 
	
	//set curOp to the current op, if it's the first time an operator is being used then set the prevCalc to the current display num. (this is so that the next time an operator is entered, you can calculate using the current num and the previously selected num)
	if(curOp !== null) { 
		calculate();
	} else {
		prevCalc = curNum;  
	}
	curOp = this.textContent;

	displayVal = ""; 


}

function calculate() {
	let curValue = document.querySelector("#main-display").textContent; //take whatever's in the display as the current/final value
	 
	if(divByZeroCheck()) { 
		return; 
	}

	if(prevCalc === null) {
		return; //do nothing if precalc is null, since this is likely only triggered when pressing equals key before any operators are used... 
	}

	let answer = operate(curOp, prevCalc, curNum); 

	prevCalc = answer; 
	displayVal = ""; 
	
	let topDisplay = document.querySelector("#top-display"); 
	
	let mainDisplay = document.querySelector("#main-display"); 
	mainDisplay.textContent = answer; 
 	
	return answer; 
}

function reset() {
	displayVal = ""; 
	opDisplayVal = ""; 
	curNum = null; 
	curOp = null; 
	prevCalc = null; 
}

function clearDisplay(e) {
	let display = document.querySelector("#main-display"); 
	let topDisplay = document.querySelector("#top-display"); 
	reset(); 
	display.textContent = "0";//displayVal;  
	topDisplay.textContent = "";
}

//resets variables and only the top display, leaving main display alone.
function equalsReset(e) {
	let topDisplay = document.querySelector("#top-display");
	topDisplay.textContent = ""; 
	reset(); 
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
equalsBtn.addEventListener("click", equalsReset); 