'use strict';

(function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const welcomeMessage = document.getElementById('welcome');

  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }

  function sayWelcome() {
    let user = JSON.parse(window.sessionStorage.getItem("current_user"));
    welcomeMessage.innerText += " " + user.name + " 👋🏻";
  }
  sayWelcome();
})();


const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', () => {
  window.sessionStorage.removeItem("current_user");
  location.assign('index.html');
  location.href('index.html');
  history.length = 0;
})