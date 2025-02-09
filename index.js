// --------------- Functions: -----------------------------------

// 1. ValidatePassword():
// a. checkNoWordPassword() - checks that password is not in the password
// b. checkForUsernameInPassword() - checks that username is not in the password
// c. checkPassword() - checks that both passwords match

// 2. validateUsernameReg() -checks registration username

// 3. validateEmail()

// 4. showError()

// 5. hideError()

// 6. validateUsernameLog() - checks that login username is in localStorage


// function #1 (holds function a,b,c)
function validatePassword() {
    let password1 = document.getElementById("password1").value;
    let password2 = document.getElementById("password2").value;
    let username = document.getElementById("username").value.trim().toLowerCase();

    let valid = true;
    if (!checkPassword(password1, password2)) valid = false;
    if (!checkNoWordPassword(password1)) valid = false;
    if (!checkForUsernameInPassword(password1, username)) valid = false;

    return valid;

    // wrong
    //   let passwordRegex = /^(?!.*password).*$/i;
    //   return passwordRegex.test(password1)
}


// function #1a
// checks "password" is not in the password
function checkNoWordPassword(password1) {
    // let password1 = document.getElementById("password1").value;
    let regex = /^(?!.*password).*$/i;
    if (!regex.test(password1)) {
        showError("password1Error", "Password cannot contain the word 'password'.");
        alert("Password cannot contain the word 'password'.");
        return false;
    }
    hideError("password1Error");
    return true;
}

// function #1b
// password cannot contain username -uppercase or lowercase
function checkForUsernameInPassword(password1, username) {    // username or usernameREG?
    if (password1.toLowerCase().includes(username.toLowerCase())) {
        // console.log("The username is in the password.");
        showError("password1Error", "Password cannot contain your username.");
        alert("Password cannot contain your username.");
        return false;
    }
    hideError("password1Error")
    // console.log("The username is not in the password.");
    return true;
}

// function #1c
// passwords have to match 
// Function to check Whether both passwords are the same or not.
function checkPassword(password1, password2) {
    //     let password1 = document.getElementById("password1").value;
    // let password2 = document.getElementById("password2").value;
    // If password not entered
    if (password1 === '') {
        // alert("Please enter Password");
        showError("password1Error", "Password field is empty. Please enter password.");
        alert("Password field is empty. Please enter a password.");
        return false;

        // If confirm password not entered
    } else if (password2 === '') {
        // alert("Please enter confirm password");
        showError("password2Error", "Repeat password field is empty. Please enter confirmation password.");
        alert("Repeat password field is empty. Please enter confirmation password.");
        return false;

        // If Not same return False.    
    } else if (password1 !== password2) {
        // alert("Password did not match: Please try again.")
        showError("password2Error", "Passwords do not match: Please try again.");
        alert("Passwords do not match. Please try again.");
        return false;
    } else {
        // If same return True.
        hideError("password1Error");
        hideError("password2Error");
        alert("Password Match: Welcome!"); // maybe not needed?
        return true;
    }
}

// function #2
function validateUsernameReg() {
    let username = document.getElementById("username").value.trim();
    let usernameRegex = /^[a-zA-Z0-9]{4,}$/;
    // if false
    if (!usernameRegex.test(username)) {
        showError("usernameError", "Username must be at least 4 characters long, with 2 unique characters, no special characters and no whitespace. Please try again.");
        alert("Username must be at least 4 characters long, with no special characters.");
        return false;
    }
    hideError("usernameError");
    return true;
}

// function #3
function validateEmail() {
    // email.isValidEmail(); // didn't work
    // return emailRegex.test(email.value); // didn't work
    let email = document.getElementById("email").value.trim();
    let emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError("emailError", "Invalid email format.");
        alert("Invalid email format.");
        return false;
    }
    hideError("emailError");
    return true;
}

// function #4
function showError(fieldId, message) {
    // let errorDisplay = document.getElementById(fieldId);
    // errorDisplay.style.display = 'block';
    // errorDisplay.innerHTML = message;
    let errorField = document.getElementById(fieldId);
    errorField.style.display = 'block';
    errorField.innerHTML = message;
}

// function #5
function hideError(fieldId) {
    document.getElementById(fieldId).style.display = 'none';
    }

// function #6
function validateUsernameLog() {
    // if false
    // if (!usernameLOG.pattern) {
        let username = document.getElementById("usernameLOG").value.trim().toLowerCase();
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[username]) {
        showError("usernameError", "Username does not exist in our records. Please try again.");
        alert("Username does not exist in our records. Please try again.");
        return false;
    }
    hideError("usernameError");
    return true;
}

// -------------------declare variables------------------------
const usernameREG = document.getElementById("usernameREG");
const usernameLOG = document.getElementById("usernameLOG");
const registerForm = document.getElementById("registration");
const loginForm = document.getElementById("login");
const errorDisplay = document.getElementById("errorDisplay");
// const password1 = document.getElementById("password1").value;
// const password2 = document.getElementById("password2").value;
// const termsAccepted = document.getElementById("terms").checked;
const email = document.getElementById("email");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// ------------- Registration form submission ------------

// registerForm.addEventListener("submit",validatePassword)

registerForm.addEventListener("submit", function (event) {
    // listen to registration form
    event.preventDefault(); // prevent form submission initially

    let valid = true;

    if (!validateUsernameReg()) valid = false;
    // event.preventDefault();
    // return;

    if (!validateEmail()) valid = false;
    // showError("Invalid e-mail format.")
    // event.preventDefault();
    // return;

    if (!validatePassword()) valid = false;

    // event.preventDefault();

    // prevents form submission if validation fails
    if (!valid) {
        return;
    }

    // info ready to get sent to localStorage ???
    let username = document.getElementById("username").value.trim().toLowerCase();
    let emailValue = document.getElementById("email").value.trim().toLowerCase(); 
    let password1 = document.getElementById("password1").value.trim();
    // let password2 = document.getElementById("password2").value.trim();
    let message = document.getElementById("message");


    // get localStorage users to compare to it
    let users = JSON.parse(localStorage.getItem("users")) || {};

    // Checks if username exists
    if (users[username]) {
        showError("usernameError", "That username is already taken. Please try another.");
        alert("That username is already taken. Please try another.");
        return;
        // message.style.color = "red";
    }

    // Store new user
    users[username] = { email: emailValue, password: password1 };
    localStorage.setItem("users", JSON.stringify(users));

    // Clear form fields
    // document.getElementById("registrationForm").reset(); // wrong
    registerForm.reset();
    message.textContent = "Registration successful!";
    message.style.color = "green";
    alert("Registration successful!");
});


// ------------------- Real-time Validation --------------------
document.getElementById("username").addEventListener("blur", validateUsernameReg);
document.getElementById("email").addEventListener("blur", validateEmail);
document.getElementById("password1").addEventListener("blur", validatePassword);
document.getElementById("password2").addEventListener("blur", validatePassword);

// ------------------- Hover Instructions --------------------
document.getElementById("username").setAttribute("mouseover", function () {
    alert("Username must be at least 4 characters long, no special characters.");
});
document.getElementById("email").setAttribute("mouseover", function () {
    alert("Enter a valid email address.");
});
document.getElementById("password1").setAttribute("mouseover", function () {
    alert("Password cannot contain 'password' or your username.");
});
document.getElementById("password2").setAttribute("mouseover", function () {
    alert("Must match your first password.");
});






// Example: Trigger an error
// showError('Invalid input. Please try again.');

// If all validation is successful, store the username, email, and password using localStorage.
// Perhaps you want to store it with an array of user objects; or maybe an object whose keys are the usernames themselves.
// Valid usernames should be converted to all lowercase before being stored.
//Valid emails should be converted to all lowercase before being stored.
// Clear all form fields after successful submission and show a success message.
// local storage
// localStorage.setItem("myCat", "Tom");


// errorDisplay
// let errorElement = document.getElementById('errorDisplay')
// errorElement.style.display = 'block';
// document.getElementById('errorDisplay').innerHTML = 'This is an error message!"