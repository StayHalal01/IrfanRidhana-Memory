let users = [];

if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
} else {
    users = [];
}

function showLogin() {
    document.querySelector(".login").style.display = "block";
    document.querySelector(".signup").style.display = "none";
}

function showRegister() {
    document.querySelector(".login").style.display = "none";
    document.querySelector(".signup").style.display = "block";
}

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert("Logged in successfully!");
        document.querySelector(".authenticator").style.display = "none";
        document.querySelector(".container").style.display = "block";
    } else {
        alert("Incorrect email or password");
    }
}

function register() {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check password requirements
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).+$/;

    if (!passwordPattern.test(password)) {
        alert("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol (e.g., !@#$%^&*())");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    if (users.find(u => u.email === email)) {
        alert("Email already exists");
        return;
    }

    users.push({ name, email, password, scores: [] });
    localStorage.setItem("users", JSON.stringify(users));
    showLogin();
    
    // Clear the input fields
    document.getElementById("registerName").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("confirmPassword").value = "";
}

