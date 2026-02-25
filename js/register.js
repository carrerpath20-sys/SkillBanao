import { loginWithGoogle, registerWithPassword } from "./api.js";

const status = document.querySelector("#auth-status");
const registerForm = document.querySelector("#register-form");
const googleBtn = document.querySelector("#google-login");

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (!name || !email || !password) {
      status.textContent = "Name, email and password are required.";
      return;
    }

    status.textContent = "Creating account...";
    const result = await registerWithPassword(name, email, password);
    status.textContent = result.message || "Registration complete.";
  });
}

if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    status.textContent = "Starting Google login...";
    const result = await loginWithGoogle();
    status.textContent = result.message || "Google auth started.";
  });
}
