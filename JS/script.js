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
            if (numb == 0) {
                result = `error: ${numa} can not be divided by 0`;
            } else
                result = divide(numa, numb);
            break;
    }
    return result;
}

function getResult(valuesSeparated) {
    let result = "";
    while (valuesSeparated.length > 1) {
        console.log(valuesSeparated[0], valuesSeparated[1], valuesSeparated[2]);
        result = operate(parseFloat(valuesSeparated[0]), valuesSeparated[1], parseFloat(valuesSeparated[2]));
        if (typeof result == 'string') {
            break;
        } else {
            valuesSeparated.splice(0, 2);
            valuesSeparated[0] = result;
            console.log(result);
        }
    } typeof result == 'string' ? showResults(result) : showResults(result.toFixed(2));
}

function populateScreen(e) {
    switch (e.target.textContent) {
        case "=":
            divideFormula(screen.textContent);
            break;
        case "Clear":
            screen.textContent = 0;
            break;
        case "Del":
            let newFormula = screen.textContent;
            newFormula = newFormula.substring(0, newFormula.length - 1);
            showResults(newFormula);
            break;
        default:
            if (screen.textContent == "0") {
                screen.textContent = e.target.textContent
            }
            else screen.textContent += e.target.textContent;
    }
}

function divideFormula(formula) {
    let validation = /^[+*/-]+$/;
    let currentNumber = "";
    let origValues = formula.split("");
    let valuesSeparated = [];
    let error = false;
    for (let i = 0; i < origValues.length; i++) {
        if ((validation.test(origValues[i]) && validation.test(origValues[i - 1]))) {
            showResults("error: An operator can not be followed by another operator");
            error = true;
            break;
        }
        else if (validation.test(origValues[origValues.length - 1])) {
            showResults("error: The formula can not end with an operator");
            error = true;
            break;
        }
        else {

            if (!validation.test(origValues[i])) {
                currentNumber += origValues[i];
            }
            else {
                valuesSeparated.push(currentNumber);
                valuesSeparated.push(origValues[i]);
                currentNumber = "";
            }
        }
    }
    if (!error) {
        valuesSeparated.push(formula.substring(formula.length, formula.lastIndexOf(valuesSeparated[valuesSeparated.length - 1]) + 1));
        getResult(valuesSeparated)
    }
}

function showResults(message) {
    screen.textContent = message;
}

let key = document.querySelector(".buttons");
key.addEventListener('click', populateScreen);
let screen = document.querySelector(".result");


