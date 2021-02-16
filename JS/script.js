function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(numa, operator, numb) {
    let result = "";
    switch (operator) {
        case "+":
            result = add(numa, numb);
            break;
        case "-":
            result = substract(numa, numb);
            break;
        case "*":
            result = multiply(numa, numb);
            break;
        case "/":
            result = divide(numa, numb);
            break;
    }
    return result;
}

function getResult(valuesSeparated) {
    let count = 0;
    let result = "";
    while (count < valuesSeparated.length) {
        result = operate(parseInt(valuesSeparated[0]), valuesSeparated[1], parseInt(valuesSeparated[2]));
        valuesSeparated.splice(0, 2);
        valuesSeparated[0] = result;
        console.log(result);
        count++;
    }
    screen.textContent = result;
}

function populateScreen(e) {
    screen.textContent = screen.textContent + e.target.textContent;
    if (e.target.textContent == "=")
        divideFormula(screen.textContent);
    if (e.target.textContent == "Clear")
        screen.textContent = "";
}

function divideFormula(formula) {
    let currentNumber = "";
    let origValues = formula.split("");
    let valuesSeparated = [];
    for (let i = 0; i < origValues.length - 1; i++) {
        if (!/^[+*/-]+$/.test(origValues[i])) {
            currentNumber += origValues[i];
        }
        else {
            valuesSeparated.push(currentNumber);
            valuesSeparated.push(origValues[i]);
            currentNumber = "";
        }
    }
    valuesSeparated.push(origValues[origValues.length - 2]);
    getResult(valuesSeparated);
}

let key = document.querySelector(".buttons");
key.addEventListener('click', populateScreen);
let screen = document.querySelector(".result");


