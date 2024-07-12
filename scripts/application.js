const keys = document.querySelectorAll('.application_calculator_keys--key');
const display_input = document.querySelector('.application_calculator_display_content--input');
const display_output = document.querySelector('.application_calculator_display_content--output');

// INPUT VALUE IN THE CALCULATOR 
let input = "";

for (let key of keys) {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if (value == "clear") {
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML = "";
        } else if (value == "backspace") {
            input = input.slice(0, -1);
            display_input.innerHTML = clean_input_mechanism(input);
        } else if (value == "=") {
            try {
                let result = eval(preparing_input_mechanism(input));
                display_output.innerHTML = clean_output_mechanism(result);
            } catch (e) {
                display_output.innerHTML = "Error";
            }
        } else if (value == "brackets") {
            if (
                input.indexOf("(") == -1 || 
                (input.indexOf("(") != -1 && 
                input.indexOf(")") != -1 && 
                input.lastIndexOf("(") < input.lastIndexOf(")"))
            ) {
                input += "(";
            } else if (
                (input.indexOf("(") != -1 && 
                input.indexOf(")") == -1) || 
                (input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") > input.lastIndexOf(")"))
            ) {
                input += ")";
            }

            display_input.innerHTML = clean_input_mechanism(input);
        } else {
            if (ValidateInput(value)) {
                input += value;
                display_input.innerHTML = clean_input_mechanism(input);
            }
        }
    });
}

function clean_input_mechanism(input) {
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] == "*") {
            input_array[i] = ` <span class="application_calculator_display_content--input--operator">x</span> `;
        } else if (input_array[i] == "/") {
            input_array[i] = ` <span class="application_calculator_display_content--input--operator">÷</span> `;
        } else if (input_array[i] == "+") {
            input_array[i] = ` <span class="application_calculator_display_content--input--operator">+</span> `;
        } else if (input_array[i] == "-") {
            input_array[i] = ` <span class="application_calculator_display_content--input--operator">-</span> `;
        } else if (input_array[i] == "(") {
            input_array[i] = `<span class="application_calculator_display_content--input--brackets">(</span>`;
        } else if (input_array[i] == ")") {
            input_array[i] = `<span class="application_calculator_display_content--input--brackets">)</span>`;
        } else if (input_array[i] == "%") {
            input_array[i] = `<span class="application_calculator_display_content--input--percent">%</span>`;
        }
    }

    return input_array.join("");
}

function clean_output_mechanism(output) {
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];

    let output_array = output_string.split("");
    
    if (output_array.length > 3) {
        for (let i = output_array.length - 3; i > 0; i -= 3) {
            output_array.splice(i, 0, ",");
        }
    }

    if (decimal) {
        output_array.push(".");
        output_array.push(decimal);
    }

    return output_array.join("");
}

function ValidateInput(value) {
    let last_input = input.slice(-1);
    let operators = ["+", "-", "*", "/"];

    if (value == "." && last_input == ".") {
        return false;
    }

    if (operators.includes(value)) {
        if (operators.includes(last_input)) {
            return false;
        } else {
            return true;
        }
    }

    return true;
}

function preparing_input_mechanism(input) {
    let input_array = input.split("");

    for (let i = 0; i < input_array.length; i++) {
        if (input_array[i] == "%") {
            input_array[i] = "/100";
        }
    }

    return input_array.join("");
}
