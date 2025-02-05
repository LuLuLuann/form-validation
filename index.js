// errorDisplay


// no word "password" in your password -uppercase or lowercase
// function checkPasswordForWord(password, forbiddenWord) {
//     // const forbiddenWord = "password";
// const lowerPassword = password.toLowerCase(); 

// const lowerForbiddenWord = forbiddenWord.toLowerCase();
// return lowerPassword.includes(lowerForbiddenWord);
// } 
// if (checkPasswordForWord(userPassword, forbiddenWord)) {
//     console.log("Password contains the forbidden word 'password'!");
//     } else {
//       console.log("Password is valid.");
//     } 

let password1 = document.getElementById("password1").value;
let password2 = document.getElementById("password2").value;

function checkNoWordPassword(password1){
    // let password1 = document.getElementById("password1").value;
let regex = /^(?!.*password).*$/i
console.log(regex.test(`Password contains the word "password": ${password1}`));
}

 // password cannot contain username -uppercase or lowercase

// passwords have to match 
// Function to check Whether both passwords are the same or not.
        function checkPassword() {
            // let password1 = document.getElementById("password1").value;
            // let password2 = document.getElementById("password2").value;
            checkNoWordPassword(password1)

            // If password not entered
            if (password1 == ''){
                alert("Please enter Password");

            // If confirm password not entered
            } else if (password2 == ''){
                alert("Please enter confirm password");

            // If Not same return False.    
            } else if (password1 != password2) {
                alert("Password did not match: Please try again...")
                return false;
            }
            // If same return True.
            else {
                alert("Password Match: Welcome!")
                return true;
            }
        }

function validatePassword(password){

    checkPassword(registerForm);
    checkNoWordPassword(password1)
    // 
    return passwordRegex.test(password)

    
}

// listen to registration form
const registerForm = document.getElementById("registration")

// registerForm.addEventListener("submit",validatePassword)

registerForm.addEventListener("submit",validatePassword)