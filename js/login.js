import { isAuthenticated, setAuthSession } from "./session.js";

if (isAuthenticated()) {
  window.location.href = "viewer-dashboard.html";
}

const status = document.querySelector("#auth-status");

document.querySelector("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const username = String(data.get("username") || "").trim();
  const password = String(data.get("password") || "").trim();

  if (!username || !password) {
    status.textContent = "Username and password are required.";
    return;
  }

  setAuthSession({ username, provider: "password" });
  status.textContent = "Login successful. Redirecting...";
  setTimeout(() => {
    window.location.href = "viewer-dashboard.html";
  }, 350);
});
