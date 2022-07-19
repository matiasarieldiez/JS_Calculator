// A. Grab the Items from the DOM for later use and manipulation
// A1. Grab all Number Buttons (0-9)
const numberButtons = document.querySelectorAll(".button--number");
console.log(numberButtons);

// A2. Grab all Operator Buttons (+, -, *, /)
const operatorButtons = document.querySelectorAll(".button--operator");
console.log(operatorButtons);

// A3. Grab the Decimal Button (.)
const decimalButton = document.querySelector(".button--decimal");
console.log(decimalButton);

// A4. Grab the Equals Button (=)
const equalsButton = document.querySelector(".button--equals");
console.log(equalsButton);

// A5. Grab the Clear All Button (C)
const clearAllButton = document.querySelector(".button--clear-all");
console.log(clearAllButton);

// A6. Grab the Backspace Button (<-)
const backspaceButton = document.querySelector(".button--backspace");
console.log(backspaceButton);

// A7. Grab all Buttons from the KeyPad
const allButtons = document.querySelectorAll(".button");
console.log(allButtons);

// A8. Grab all Display Sections (Previous Value and Current Value)
const displayContainer = document.querySelectorAll(".display");
console.log(displayContainer);

// A9. Grab Previous Value Display
const previousValueDisplay = document.querySelector(".display--previous-value");
console.log(previousValueDisplay);

// A10. Grab Current Value Display
const currentValueDisplay = document.querySelector(".display--current-value");
console.log(currentValueDisplay);

// B. Actions at loading
// B1. Clear Values at first loading
previousValueDisplay.innerText = "";
currentValueDisplay.innerText = 0;

// B2. Declare global variables to use further down the program
let previousButtonType = ""; // We'll use this variable to determine some actiones based on which was the previous button type
let isNewNumber = true; // We'll use this variable to decide if the input number is the first number or if it's the following concatenating numbers to be appended.
let operatorValue = ""; // We'll use these variables to perform the equation/caculation/math
let operandA = 0; // We'll use these variables to perform the equation/caculation/math
let operandB = 0; // We'll use these variables to perform the equation/caculation/math
let calculationString = ""; // We'll use these variables to perform the equation/caculation/math

// C. Actions to happen when I click the different buttons from the calculator
// C1. Press a number Button (0–9)
numberButtons.forEach((button) => {
    // Add Event Listener to Decide what happens when clicked
    button.addEventListener("click", () => {
        //If there's a current previous result, I want to clean the display and the calculation string for new calculations to happen
        if (previousButtonType === "equal") {
            currentValueDisplay.innerText = "";
            previousValueDisplay.innerText = "";
            calculationString = "";
        }

        //Check if it is a Not Number (currently displayin 0. or !0), and append the button value to the display and set isNewNumber to false
        if (previousButtonType === "decimal" || !isNewNumber) {
            currentValueDisplay.innerText += button.lastChild.innerText;
            isNewNumber = false;
        } else {
            //If it is a new value (currently displaying 0, do not append but change the value with the current button value) and set isNewNumber to false
            currentValueDisplay.innerText = button.lastChild.innerText;
            isNewNumber = false;
        }

        //Set PreviousButton Type for future validations
        previousButtonType = "number";
    });
});

// C2. Press an Operator Button (+, -, ×, ÷)
operatorButtons.forEach((button) => {
    // Add Event Listener to Decide what happens when clicked
    button.addEventListener("click", () => {
        // Check if the previous value was an operator. If so, operators cannot be selected, it's time to select another number
        if (previousButtonType === "operator") {
            return;
        }
        // Validation for chained operations after choosing an operator after a result was already given (A + B = C => Operator).
        // Clear the Previous value display so it can display the new values
        if (previousValueDisplay.innerText != 0) {
            previousValueDisplay.innerText = "";
        }

        // Set the display values for Previous and Current Displays
        if (currentValueDisplay.innerText != 0) {
            operandA = currentValueDisplay.innerText;
            previousValueDisplay.innerText +=
                currentValueDisplay.innerText + button.lastChild.innerText;
            currentValueDisplay.innerText = "";
        }

        // Store the operation type in a variable for future calculation inside Equal's button event listener and previousButtonType checks
        switch (button.lastChild.innerText) {
            case "+":
                operatorValue = "add";
                break;
            case "-":
                operatorValue = "substract";
                break;
            case "/":
                operatorValue = "divide";
                break;
            case "*":
                operatorValue = "multiply";
                break;
        }

        //Set PreviousButton Type for future validations
        previousButtonType = "operator";
    });
});

// C3. Press the Decimal Button
// Add Event Listener to Decide what happens when clicked
decimalButton.addEventListener("click", () => {
    // Check the previousButtonType to handle decimal notation properly and reset previous value Displayed for a new operation to happen
    if (previousButtonType === "equal") {
        currentValueDisplay.innerText = "0.";
        previousValueDisplay.innerText = "";
    }

    // Validations to handle decimal notation properly
    if (previousButtonType === "operator") {
        currentValueDisplay.innerText = "0.";
    }

    // Validations to handle decimal notation properly
    if (currentValueDisplay.innerText == 0) {
        currentValueDisplay.innerText = "0.";
    }

    // If there's already ONE decimal point, no decimal point should be added.
    if (!currentValueDisplay.innerText.includes(".")) {
        currentValueDisplay.innerText += decimalButton.innerText;
    }

    // Set PreviousButton Type for future validations
    previousButtonType = "decimal";
});

// C4. Press the Equals Button
// Add Event Listener to Decide what happens when clicked
equalsButton.addEventListener("click", () => {
    // If previous button type was equal, equal cannot be pressed again
    if (previousButtonType !== "equal") {
        // Previous and Current Display Values Update
        operandB = currentValueDisplay.innerText;
        previousValueDisplay.innerText += currentValueDisplay.innerText;
        currentValueDisplay.innerText = "";
        calculationString =
            previousValueDisplay.innerText + currentValueDisplay.innerHTML;

        // Operation Equation
        switch (operatorValue) {
            case "add":
                calculationString = parseFloat(operandA) + parseFloat(operandB);
                break;
            case "substract":
                calculationString = parseFloat(operandA) - parseFloat(operandB);
                break;
            case "divide":
                calculationString = parseFloat(operandA) / parseFloat(operandB);
                break;
            case "multiply":
                calculationString = parseFloat(operandA) * parseFloat(operandB);
                break;
        }

        // Update Current Value with Result
        currentValueDisplay.innerText = calculationString;
        previousButtonType = "equal";
    }
    return;
});

// C5. Press the Clear Button
// Add Event Listener to Decide what happens when clicked
clearAllButton.addEventListener("click", () => {
    // Clear all the values letting the calculator ready for a fresh new calculation
    previousValueDisplay.innerText = "";
    currentValueDisplay.innerText = 0;
    isNewNumber = true;
    previousButtonType = "clear";
});

// C6. Press the Backspace Button
// Add Event Listener to Decide what happens when clicked
backspaceButton.addEventListener("click", () => {
    // This button should be disabled if the previous button type was Equal or Clear all, as there's nothing to delete
    if (previousButtonType !== "equal" && previousButtonType !== "clear") {
        currentValueDisplay.innerText = currentValueDisplay.innerText.slice(
            0,
            -1,
        );

        // Set PreviousButton Type for future validations
        previousButtonType = "backspace";
    }

    return;
});
