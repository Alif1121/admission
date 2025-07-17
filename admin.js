// admin.js

import { handleLogin } from "./admin-auth.js";

const adminUser = document.getElementById("adminUser");
const adminPass = document.getElementById("adminPass");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");
const adminLoginForm = document.getElementById("adminLoginForm");
const adminPanel = document.getElementById("adminPanel");
const logoutBtn = document.getElementById("logoutBtn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const username = adminUser.value.trim();
  const password = adminPass.value.trim();

  if (handleLogin(username, password)) {
    loginError.textContent = "";
    adminLoginForm.style.display = "none";
    adminPanel.hidden = false;
    loadFromLocalStorage();
    renderTable();
  } else {
    loginError.textContent = "Invalid username or password.";
  }
});

logoutBtn.addEventListener("click", () => {
  adminLoginForm.style.display = "block";
  adminPanel.hidden = true;
  adminUser.value = "";
  adminPass.value = "";
  loginError.textContent = "";
});
