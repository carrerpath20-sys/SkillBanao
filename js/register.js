const status = document.querySelector("#auth-status");

document.querySelector("#register-form").addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = "Registration saved locally. Please login to continue.";
});

document.querySelector("#google-login").addEventListener("click", () => {
  status.textContent = "Google login placeholder ready. Add OAuth API key later.";
});
