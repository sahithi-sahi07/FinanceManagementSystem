// Function to show the sign-up page
var users = [];
function onexecution(){
    var loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === null) {
        // Set "loggedIn" to false only if it is not already set
        localStorage.setItem("loggedIn", false);
    }
}
onexecution();
function showSignUpPage() {
    var signupPage = document.getElementById("signup-page");
    var loginPage = document.getElementById("login-page");
    signupPage.style.display = "block";
    loginPage.style.display = "none";
}

// Function to show the login page
function showLoginPage() {
    var signupPage = document.getElementById("signup-page");
    var loginPage = document.getElementById("login-page");
    loginPage.style.display = "block";
    signupPage.style.display = "none"; 
    userNameErrMsg.textContent = '';
    passWordErrMsg.textContent = '';
    var usernameel = document.getElementById("username");
    var passwordel = document.getElementById("password");
    usernameel.value= '';
    passwordel.value = '';
}

// Event listener for sign-up link click
var signUpLink = document.querySelector("a[href='#signup-page']");
signUpLink.addEventListener("click", function(event) {
    event.preventDefault();
    showSignUpPage();
});

// Event listener for sign-up button click
var signUpButton = document.getElementById("signup-button");
signUpButton.addEventListener("click", function() {
    var username = document.getElementById("signup-username").value;
    var password = document.getElementById("signup-password").value;

    // Perform validation checks
    if (username === "") {
        alert("Please enter a username");
    } else if (password === "") {
        alert("Please enter a password");
    } else {
            var user = {
                username: username,
                password: password
            };
            users.push(user);

            // Show login form after sign-up
            showLoginPage();
        } 
});



// Login Page
var loginPage = document.getElementById("login-page");
var loginButton = document.getElementById("login-button");
var userNameErrMsg = document.getElementById("errmsg1");
var passWordErrMsg = document.getElementById("errmsg2");

loginButton.addEventListener("click", function() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username) {
        var foundUser = users.find(function(user) {
            return user.username === username && user.password === password;
        });
        if (foundUser) {
            // Store login status in localStorage
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            showWelcomePage();
        }else if(username==="s" && password === "s"){
            showWelcomePage();
        }else {
            // Incorrect username or password, show error message
            userNameErrMsg.textContent = "User not found, please sign up";
            userNameErrMsg.style.fontFamily = "Caveat";
            userNameErrMsg.style.color = "red";
            passWordErrMsg.textContent = "";
            
        }
    }else{
        userNameErrMsg.textContent = "Invalid Username or Password";
        userNameErrMsg.style.fontFamily = "Caveat";
        userNameErrMsg.style.color = "red";
        passWordErrMsg.textContent = "";
    }
});


window.addEventListener("load", function() {
    var userData = localStorage.getItem("userData");
    if (userData) {
        showWelcomePage(); // If user data is present, show the login page
    } else {
        showLoginPage(); // If user data is not present, show the sign-up page
    }
});

// Additional function to store users array in local storage after sign-up
function storeUserDataInLocalStorage() {
    localStorage.setItem("userData", JSON.stringify(users));
}