const keys = document.querySelectorAll('#keys');
// const display_input = document.querySelectorAll('.application_calculator_display_content--input');
// const display_output = document.querySelectorAll('.application_calculator_display_content--output');

const display_input = document.querySelectorAll('#display #input');
const display_output = document.querySelectorAll('#display #output');

// INPUT VALUE IN THE CALCULATOR 
let input = "";

for ( let key of keys ) {
    const value = key.dataset.key;
    key.addEventListener('click', () => {
        console.log(value)
        if ( value == "clear" ) {
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML = "";
        } else if ( value == "backspace" ) {
            input = input.slice(0, -1);
            display_input.innerHTML = input;
        } else if ( value == "=" ) {
            let result = eval(input);
            display_output.innerHTML = result;
        } else if ( value == "brackets" ) {
            if (
                input.indexOf("(") == -1 || 
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.indexOf("(") < input.lastIndexOf(")")
            ) {
                input += "(";
            } else if (
                input.indexOf(")") != -1 &&
                input.indexOf(")") == -1 ||
                input.indexOf("(") != -1 && 
                input.indexOf(")") != -1 &&
                input.indexOf("(") > input.lastIndexOf(")")
            ) {
                input += ")";
            }

            display_input.innerHTML = input;
        } else {
            input += value;
            display_input.innerHTML = input;
        }
    });
}