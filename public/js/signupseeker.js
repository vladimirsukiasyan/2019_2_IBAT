import  Validation  from './validation.js';

const errInvalidPasswordData = 'Must contain at least 8 chars';
const errNotEqualPassRePass = 'Password and Password Repeat are not equal';


let signupForm = document.querySelector('.signup-form');
let email = signupForm.querySelector('.email');
let password = signupForm.querySelector('.password');
let passwordConfirm = signupForm.querySelector('.passwordConfirm');


password.addEventListener("input", function(event){
    let error = password.nextElementSibling;
    password.className = "input";
    error.innerHTML = "";
    error.className = "error";
}, false);

passwordConfirm.addEventListener("input", function(event){
    let error = passwordConfirm.nextElementSibling;
    passwordConfirm.className = "input";
    error.innerHTML = "";
    error.className = "error";
}, false);

email.addEventListener("input", function(event) {
    let isValid = Validation.validateEmail(email.value, true);
    let error = email.nextElementSibling;
    if (Validation.isEmptyField(email.value) || isValid) {
        email.className = "input";
        error.innerHTML = "";
        error.classNamem = "error";
    } else {
        email.className = "input invalid ";
        error.innerHTML = "Неверный email";
    }
}, false);

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let wasfail = false;

    let inputs = signupForm.querySelectorAll('.input');
    inputs.forEach(input => {
        if (Validation.isEmptyField(input.value)) {
            let error = input.nextElementSibling;
            error.innerHTML = "Обязательное поле"
            error.className = "error active"
            input.className = "input invalid"
            wasfail = true;
        } else {
            let error = input.nextElementSibling;
            error.innerHTML = ""
            error.className = "error"
            input.className = "input"
        }
    });
    
    if (!email.validity.valid) {
        let error = email.nextElementSibling;
        error.innerHTML = "Неверный email!"
        error.className = "error active"
        wasfail = true;
    }

    let testPass = Validation.validatePassword(password.value, true);
    if (testPass) {
        if (testPass === errInvalidPasswordData) {
            let error = password.nextElementSibling;
            error.innerHTML = "Пароль должен иметь 8 символов, 1 цифру, 1 в верхнем и 1 в нижнем регистре"
            error.className = "error active";
            password.className = "input invalid"
            passwordConfirm.className = "input invalid"
            wasfail = true;
        }
    } else {
        let test = Validation.validateRepass(passwordConfirm.value, password.value);
        if (test === errNotEqualPassRePass) {
            let error = passwordConfirm.nextElementSibling;
            error.innerHTML = "Пароли не совпадают";
            error.className = "error active";
            password.className = "input invalid"
            passwordConfirm.className = "input invalid"
            wasfail = true;
        }
    }
    if (wasfail) {
        passwordConfirm.value = "";
        password.value = "";
        return;
    } else {
        // HTTP POST REQUEST
    }
}, false);