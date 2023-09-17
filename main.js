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
    `number one: ${numberOne} \n number twp: ${numberTwo} \n operator: ${operator}`
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
    result = x / y;
  }
  return result;
}

function areSet() {
  return numberOne != "" && numberTwo != "" && operator != "";
}

function handleDigits(e) {
  const number = e.target.textContent;

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
    numberOne = result;
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
  const result = operation(numberOne, numberTwo, operator);
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
