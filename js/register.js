import { loginWithGoogle, registerWithPassword } from "./api.js";

const status = document.querySelector("#auth-status");

document.querySelector("#register-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  status.textContent = "Creating account...";
  const result = await registerWithPassword(name, email, password);
  status.textContent = result.message || "Registration complete.";
});

document.querySelector("#google-login").addEventListener("click", async () => {
  status.textContent = "Starting Google login...";
  const result = await loginWithGoogle();
  status.textContent = result.message || "Google auth started.";
});
