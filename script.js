const calculator = document.querySelector('.calculator');
const numBtns = calculator.querySelectorAll('.button.number');
const dotBtn = calculator.querySelector('.button.dot');
const operationBtns = calculator.querySelectorAll('.button.operation');
const delBtn = calculator.querySelector('#backspace');
const clearBtn = calculator.querySelector('#clear');
const display = calculator.querySelector('.display');
const equalBtn = calculator.querySelector('#equal');

let lastNum = "";
let currentNum = "new";
let currentOperation = "";
let answer = ""

popDisplay();
numBtns.forEach(numBtn => numBtn.addEventListener('click', setNum));
dotBtn.addEventListener('click', setNum);
dotBtn.addEventListener('click', () => dotBtn.setAttribute("disabled", true));
delBtn.addEventListener('click', deleteNum);
clearBtn.addEventListener('click', clear);
operationBtns.forEach(btn => btn.addEventListener('click', operation));
equalBtn.addEventListener('click', equal);

function setNum(){
    if (currentNum == "new") currentNum = "";

    currentNum += this.textContent;  
    popDisplay();
}

function resetDot(){
    dotBtn.removeAttribute("disabled");
}

function popDisplay(){
    if (currentNum == "new") {
        display.textContent = "0";
        return;
    }
    display.textContent = currentNum;  
}

function deleteNum(){
    currentNum = "new";
    popDisplay();
    resetDot();
}

function clear(){
    currentNum = "new";
    lastNum = '';
    currentOperation = "";
    popDisplay();
    resetDot();
}

function operation(){

    resetDot();
    //if only one number is present, end
    //allow change of operator at the same time
    if (currentNum == "new" ) {
        currentOperation = this.id;
        return;
    }

    //if this is first time a operation button is pressed
    if (!currentOperation){
        lastNum = currentNum;
        currentNum = "new";
        currentOperation =  this.id;
        console.log("in first currenet operation")
        return;
    }

    switch(currentOperation){
        case 'add':
            lastNum = parseFloat(lastNum) + parseFloat(currentNum);
            break;
        case 'subtract':
            lastNum = parseFloat(lastNum) - parseFloat(currentNum);
            break;
        case 'multiply':
            lastNum = parseFloat(lastNum) * parseFloat(currentNum);
            break;
        case 'divide':
            lastNum = parseFloat(lastNum) / parseFloat(currentNum);
            break;
    }

    //return ERR if division of 0
    if (lastNum == Infinity){
        display.textContent = "ERR";
        return;
    }

    //control output to 4d.p.
    lastNum = Math.round(lastNum * 10000) / 10000;
    display.textContent = lastNum;
    currentNum = "new";
    //if calling from equal button
    if(typeof this.id !== "undefined") {
        currentOperation = this.id;
    } 
    console.log(currentOperation)
    
}

function equal(){
    //if no operation is selected, end immediately
    if (currentOperation == "") return;
    
    //perform the operation if only one number is inputted
    if (currentNum == "new"){
        currentNum = lastNum;
    }

    resetDot();
    operation();
    currentOperation = "";
}