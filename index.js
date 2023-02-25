const display = document.querySelector(".calculator__display");
const buttons = document.querySelector(".calculator__buttons");

let previousKey, former, latter, operator;

const calculate = (operand1, operatorForCal, operand2) => {
  let result = 0;
  let num1 = parseFloat(operand1);
  let num2 = parseFloat(operand2);
  switch (operatorForCal) {
    case "+":
      result = num1 + num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "/":
      result = num1 / num2;
      break;
  }
  return result;
};

const handleButtonClick = (event) => {
  const target = event.target;
  const firstClass = target.classList[0];
  const buttonContent = target.textContent;
  if (target.matches("button")) {
    switch (firstClass) {
      case "clear":
        console.log("clear");
        display.textContent = "0";
        former = undefined;
        latter = undefined;
        operator = undefined;
        break;
      case "back":
        console.log("back");
        if (display.textContent !== "0") {
          if (display.textContent.length === 1 || previousKey === "calculate")
            display.textContent = "0";
          else display.textContent = display.textContent.slice(0, -1);
        }
        previousKey = "back";
        break;
      case "calculate":
        console.log("calculate");
        if (!former) return;
        if (previousKey !== "operator") {
          if (previousKey === "calculate") former = display.textContent;
          else latter = display.textContent;
          display.textContent = calculate(former, operator, latter);
          previousKey = "calculate";
        }
        break;
      case "number":
        console.log("number");
        if (previousKey === "calculate") {
          former = undefined;
          latter = undefined;
          operator = undefined;
        }
        if (
          display.textContent === "0" ||
          previousKey === "operator" ||
          previousKey === "calculate"
        )
          display.textContent = buttonContent;
        else display.textContent += buttonContent;
        previousKey = "number";
        break;
      case "decimal":
        console.log("decimal");
        if (previousKey === "calculate") {
          former = undefined;
          latter = undefined;
          operator = undefined;
        }
        if (previousKey === "operator" || previousKey === "calculate")
          display.textContent = "0.";
        else if (!display.textContent.includes(".")) display.textContent += ".";
        previousKey = "decimal";
        break;
      case "operator":
        console.log("operator");
        if (former && previousKey !== "calculate" && previousKey !== "operator")
          display.textContent = calculate(
            former,
            operator,
            display.textContent
          );
        former = display.textContent;
        operator = buttonContent;
        previousKey = "operator";
        break;
    }
  }
};

buttons.addEventListener("click", handleButtonClick);
