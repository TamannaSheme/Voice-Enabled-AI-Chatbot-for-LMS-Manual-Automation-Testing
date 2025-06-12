document.getElementById("change-link").addEventListener("click", function (e) {
  e.preventDefault();
  const passwordField = document.getElementById("password-field");
  passwordField.disabled = false;
  passwordField.type = passwordField.type === "password" ? "text" : "password";
});

document.getElementById("save-btn").addEventListener("click", function () {
  alert("Account settings saved successfully!");
});

document.getElementById("logout-btn").addEventListener("click", function () {
  window.location.href = "index.html";
});
