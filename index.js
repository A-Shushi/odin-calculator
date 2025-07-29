const display = document.querySelector(".input-display")
const numberButtons = document.querySelectorAll(".number")
const operatorButtons = document.querySelectorAll(".operator")
const clearButton = document.querySelector("#clear")
const equalsButton = document.querySelector("#equals")

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

let firstNumber = 0;
let secondNumber = 0;
let operator = "";
let equalsStatus = false;
let operatorStatus = false;

function operate(num1, operator, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            if (num2 === 0) {
                return "Can't divide by 0"
            } else {
                return divide(num1, num2).toFixed(2);
            }
    }
}

numberButtons.forEach(button => button.addEventListener("click", (event) => {
    if (equalsStatus) {
        display.textContent = "";
        equalsStatus = false;
    }
    if (isNaN(+display.textContent)) {
        display.textContent = event.target.innerText;
    } else {
        display.textContent += event.target.innerText;
    }
    operatorStatus = false;
}))

operatorButtons.forEach(button => button.addEventListener("click", (event) => {
    if (operator && !operatorStatus) {
        secondNumber = +display.textContent;
        display.textContent = operate(firstNumber, operator, secondNumber);
        firstNumber = +display.textContent;
        secondNumber = 0;
        operator = event.target.innerText;
        equalsStatus = true;
        operatorStatus = true;
    } else if (!operatorStatus) {
        if (!isNaN(+display.textContent)) {
            firstNumber = +display.textContent;
            operator = event.target.innerText
            display.textContent = "Enter second number"
            operatorStatus = true;
        }
    }
}))

equalsButton.addEventListener("click", () => {
    secondNumber = +display.textContent;
    display.textContent = operate(firstNumber, operator, secondNumber);
    firstNumber = 0;
    secondNumber = 0;
    operator = "";
    equalsStatus = true;
})

clearButton.addEventListener("click", () => {
    firstNumber = 0;
    secondNumber = 0;
    operator = "";
    equalsStatus = false;
    display.textContent = "Enter first number"
})