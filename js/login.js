import { hydrateSessionFromSupabase, isAuthenticated } from "./session.js";
import { loginWithPassword } from "./api.js";

const status = document.querySelector("#auth-status");
const form = document.querySelector("#login-form");

async function checkExistingSession() {
  await hydrateSessionFromSupabase();
  if (isAuthenticated()) {
    window.location.href = "viewer-dashboard.html";
  }
}

checkExistingSession();

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const username = String(data.get("username") || "").trim();
    const password = String(data.get("password") || "").trim();

    if (!username || !password) {
      status.textContent = "Username and password are required.";
      return;
    }

    status.textContent = "Signing in...";
    const result = await loginWithPassword(username, password);

    if (!result.ok) {
      status.textContent = result.message || "Login failed.";
      return;
    }

    status.textContent = "Login successful. Redirecting...";
    setTimeout(() => {
      window.location.href = "viewer-dashboard.html";
    }, 350);
  });
}
