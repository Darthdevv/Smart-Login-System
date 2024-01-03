'use strict';
const registerForm = document.getElementById('register');
const loginForm = document.getElementById("login");
const registerUsername = document.getElementById('register-username');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const signInLink = document.getElementById('sign-in');
const signUpLink = document.getElementById('sign-up');
let users = [];
let isDuplicated = false;

document.onload = getUsers();

function getUsers() {
  localStorage.getItem("users") != null
    ? (users = JSON.parse(localStorage.getItem("users")))
    : (users = []);
}

function emailExistence(email) {
  return users.some((user) => user.email === email);
}

registerUsername.addEventListener("input", () => {
  const registerUsernameValue = registerUsername.value.trim();
  const usernamePattern = /^[a-zA-Z0-9_-]{3,16}$/;

  const isValidUsername = usernamePattern.test(registerUsernameValue);

  if (isValidUsername) {
    setSuccessFor(registerUsername);
  } else {
    setErrorFor(registerUsername,'Invalid Username !')
  }
});

registerEmail.addEventListener("input", () => {
  const registerEmailValue = registerEmail.value.trim();
  isDuplicated = emailExistence(registerEmail.value);

  if (isEmail(registerEmailValue)) {
    setSuccessFor(registerEmail);
  } else {
    setErrorFor(registerEmail, "Invalid Email !");
  }

  if (isDuplicated) {
    setErrorFor(registerEmail,"This Email exist's already !")
  }
});

registerPassword.addEventListener("input", () => {
  const registerPasswordValue = registerPassword.value.trim();

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const isValidPassword = passwordPattern.test(registerPasswordValue);

  if (isValidPassword) {
    console.log("Valid password!");
    setSuccessFor(registerPassword);
  } else {
    console.log("Invalid password!");
    setErrorFor(registerPassword, 'Password (8 letters) must contain at least one of each ABC,abc,123,(!@#$%^&*_) !');
  }
});

loginEmail.addEventListener('input', () => {
  const loginEmailValue = loginEmail.value.trim();

  if (isEmail(loginEmailValue)) {
    setSuccessFor(loginEmail);
  } else {
    setErrorFor(loginEmail, "Invalid Email !");
  }
})

loginPassword.addEventListener("input", () => {
  const loginPasswordValue = loginPassword.value.trim();

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const isValidPassword = passwordPattern.test(loginPasswordValue);

  if (isValidPassword) {
    console.log("Valid password!");
    setSuccessFor(loginPassword);
  } else {
    console.log("Invalid password!");
    setErrorFor(
      loginPassword,
      "Password (8 letters) must contain at least one of each ABC,abc,123,(!@#$%^&*_) !"
    );
  }
});


registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  register();
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  login(loginEmail.value,loginPassword.value);
});

function clearRegisterInputs() {
  registerUsername.value = '';
  registerEmail.value = '';
  registerPassword.value = '';
}

function clearLoginInputs() {
  loginEmail.value = "";
  loginPassword.value = "";
}

function register() {
  if (!isDuplicated) {
    let newUser = {
      name: registerUsername.value,
      email: registerEmail.value,
      password: registerPassword.value,
    };

    users.push(newUser);
    console.log(newUser)
    console.log(users)
    localStorage.setItem("users", JSON.stringify(users));

    clearRegisterInputs();
    document.getElementById('register-username').classList.remove('success');
    document.getElementById('register-email').classList.remove('success');
    document.getElementById('register-password').classList.remove('success');
    signIn();

    
  } else {
    setErrorFor(registerEmail,"This Email exist's already !");
  }
}


function signUp() {
  document.getElementById('login').classList.add('hidden');
  document.getElementById('register').classList.remove('hidden');
}

signUpLink.addEventListener('click', signUp);


function signIn() {
  document.getElementById("login").classList.remove("hidden");
  document.getElementById("register").classList.add("hidden");
}

signInLink.addEventListener('click', signIn);

function login(email,password) {
  let currentUser;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      currentUser = {
        name: users[i].name,
        email: users[i].email,
        password: users[i].password
      }
      sessionStorage.setItem("current_user", JSON.stringify(currentUser));
      break;
    }
  }
  if (currentUser) {
    clearLoginInputs();
    document.querySelector('.error-password').classList.add('hidden');
    document.getElementById('login-password').classList.remove('error');
    document.getElementById('login-email').classList.remove('success');
    document.getElementById('login-password').classList.remove('success');
    setTimeout(() => {
      location.assign("home.html");
    }, 1500);
  } else {
    setErrorFor(loginPassword,'Login failed, either the Email or Password is Invalid or empty !')
  }

}

function setSuccessFor(input) {
  const inputForm = input.parentElement;
  inputForm.className = "user-box success";
  input.className = "input success";
}

function setErrorFor(input, message) {
  const inputForm = input.parentElement;
  const small = inputForm.querySelector("small");
  inputForm.className = "user-box error";
  input.className = "input error";
  small.innerText = message;
}

function isEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

