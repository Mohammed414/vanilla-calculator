let digits = document.querySelectorAll(".btn-digit");
let operations = document.querySelectorAll(".operator-btn");

setDisplay(0);

let numberOne = "";
let numberTwo = "";
let operator = "";

function cleanVars() {
  numberOne = "";
  numberTwo = "";
  operator = "";
}

// helper
function printVars() {
  console.log(
    `number one: ${numberOne} \n number two: ${numberTwo} \n operator: ${operator}`
  );
}

function cleanDisplay() {
  const displayElement = document.querySelector(".display");
  displayElement.textContent = "0";
  cleanVars();
}

function setDisplay(text) {
  const displayElement = document.querySelector(".display");
  displayElement.textContent = text;
}

function operation(x, y, operation) {
  x = parseFloat(x);
  y = parseFloat(y);
  let result;
  if (operation == "+") {
    result = x + y;
  } else if (operation == "-") {
    result = x - y;
  } else if (operation == "×") {
    result = x * y;
  } else if (operation == "÷") {
    if (y == 0) {
      // add class btn-disabled to all buttons
      const buttons = document.querySelectorAll(".btn");
      buttons.forEach((button) => button.classList.add("btn-disabled"));
      // disable all buttons
      buttons.forEach((button) => (button.disabled = true));
    }
    result = "💀";
  }
  return result;
}

function areSet() {
  return numberOne != "" && numberTwo != "" && operator != "";
}

function handleDigits(e) {
  const number = e.target.textContent.trim();
  // stops adding beyond 11 digit
  if (numberOne.length > 10 || numberTwo.length > 10) return;

  if (!operator) {
    // edge case. stops multiple  .
    if (number == "." && numberOne.charAt(numberOne.length - 1) == ".") {
      return;
    }
    numberOne += number;
    setDisplay(numberOne);
  } else {
    if (number == "." && numberTwo.charAt(numberTwo.length - 1) == ".") {
      return;
    }
    numberTwo += number;
    setDisplay(numberTwo);
  }
}

function handleOperation(e) {
  const clickedOperator = e.target;
  if (areSet()) {
    let result = operation(numberOne, numberTwo, operator);
    setDisplay(result);
    numberOne = parseFloat(result);
    numberTwo = "";
  }
  operator = clickedOperator.textContent.trim();
}

digits.forEach((digit) => digit.addEventListener("click", handleDigits));
operations.forEach((operation) =>
  operation.addEventListener("click", handleOperation)
);

function handleEqual(e) {
  //edge case
  if (!numberTwo || !operation || !numberOne) {
    return;
  }

  printVars();
  let result = operation(numberOne, numberTwo, operator);
  // if the result is larger than 11 digits then it will be small scientific notation
  if (result.toString().length > 10) {
    result = result.toExponential(2);
  }
  // if it has so many decimal places then it will be scientific notation
  if (result.toString().includes(".")) {
    let decimalPlaces = result.toString().split(".")[1];
    if (decimalPlaces.length > 10) {
      result = result.toExponential(2);
    }
  }
  setDisplay(result);
  cleanVars();
}

function handlePercent(e) {
  if (numberOne != "" && numberTwo == "") {
    numberOne = numberOne / 100;
    setDisplay(numberOne);
  } else {
    numberTwo = numberTwo / 100;
    setDisplay(numberTwo);
  }
}

function handleSign(e) {
  if (numberOne != "" && numberTwo == "") {
    numberOne = numberOne * -1;
    setDisplay(numberOne);
  } else {
    numberTwo = numberTwo * -1;
    setDisplay(numberTwo);
  }
}

const equalButton = document.querySelector(".btn-equal");
equalButton.addEventListener("click", handleEqual);

const acButton = document.querySelector("#ac-button");
acButton.addEventListener("click", cleanDisplay);

const percentButton = document.querySelector("#percent-btn");
percentButton.addEventListener("click", handlePercent);

const signButton = document.querySelector("#sign-btn");
signButton.addEventListener("click", handleSign);
