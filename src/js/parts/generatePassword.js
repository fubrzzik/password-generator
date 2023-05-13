const output = document.querySelector('.password');
const stringLength = document.querySelector('#length');
const lengthValue = document.querySelector('.length-value');
const includeUppercase = document.querySelector('#includeUppercase');
const includeLowercase = document.querySelector('#includeLowercase');
const includeNumbers = document.querySelector('#includeNumbers');
const includeSymbols = document.querySelector('#includeSymbols');
const generateBtn = document.querySelector('#generate');

const uppercases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercases = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '~!@#$%^&*()_-+={}[]|:;<,>.?/';

stringLength.addEventListener('input', function() {
    lengthValue.innerHTML = this.value;
});

function generatePassword(length) {
    let result = '';
    const characters = [];

    includeUppercase.checked ? characters.push(uppercases) : null;
    includeLowercase.checked ? characters.push(lowercases) : null;
    includeNumbers.checked ? characters.push(numbers) : null;
    includeSymbols.checked ? characters.push(symbols) : null;

    const charactersLength = characters.join('').length;
    let counter = 0;

    if (charactersLength != 0 && stringLength.value != 0) {
        while (counter < length) {
            result += characters.join('').charAt(Math.floor(Math.random() * charactersLength));
            counter += 1
        }
    } else {
        result += 'Error';
    }

    return result;
}

generateBtn.addEventListener('click', function() {
    output.innerHTML = generatePassword(stringLength.value);
});