document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registration");
    const loginForm = document.getElementById("login");
    const errorDisplay = document.getElementById("errorDisplay");

    function showError(message) {
        errorDisplay.style.display = "block";
        errorDisplay.innerHTML = message;
    }

    function hideError() {
        errorDisplay.style.display = "none";
    }

    function validateUsername(username) {
        if (!username) return "Username cannot be blank.";
        if (username.length < 4) return "Username must be at least 4 characters long.";
        if (/[^a-zA-Z0-9]/.test(username)) return "Username cannot contain special characters or spaces.";

        // Check for at least two unique characters
        const uniqueChars = new Set(username);
        if (uniqueChars.size < 2) return "Username must contain at least two unique characters.";

        // Check for uniqueness in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || {};
        if (users[username.toLowerCase()]) return "That username is already taken.";

        return "";
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "Email cannot be blank.";
        if (!emailRegex.test(email)) return "Invalid email format.";
        if (email.endsWith("@example.com")) return "Emails from 'example.com' are not allowed.";
        return "";
    }

    function validatePassword(password, username) {
        if (!password) return "Password cannot be blank.";
        if (password.length < 12) return "Password must be at least 12 characters long.";
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) return "Password must contain at least one uppercase and one lowercase letter.";
        if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
        if (!/[!@#$%^&*_=+]/.test(password)) return "Password must contain at least one special character.";
        if (/password/i.test(password)) return "Password cannot contain the word 'password'.";
        if (username && password.toLowerCase().includes(username.toLowerCase())) return "Password cannot contain your username.";
        return "";
    }

    function validatePasswordMatch(password1, password2) {
        return password1 === password2 ? "" : "Passwords do not match.";
    }

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        hideError();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password1 = document.getElementById("password1").value.trim();
        const password2 = document.getElementById("password2").value.trim();
        const termsAccepted = document.getElementById("terms").checked;

        let errorMessage =
            validateUsername(username) ||
            validateEmail(email) ||
            validatePassword(password1, username) ||
            validatePasswordMatch(password1, password2) ||
            (!termsAccepted ? "You must accept the terms and conditions." : "");

        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        // Save user data to localStorage
        let users = JSON.parse(localStorage.getItem("users")) || {};
        users[username.toLowerCase()] = { email, password: password1 };
        localStorage.setItem("users", JSON.stringify(users));

        registerForm.reset();
        showError("Registration successful!", true);
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        hideError();

        const username = document.querySelector("#login input[name='username']").value.trim().toLowerCase();
        const password = document.querySelector("#login input[name='password']").value.trim();

        let users = JSON.parse(localStorage.getItem("users")) || {};
        if (!users[username]) {
            showError("Username not found.");
            return;
        }
        if (users[username].password !== password) {
            showError("Incorrect password.");
            return;
        }

        loginForm.reset();
        showError("Login successful!", true);
    });
});
